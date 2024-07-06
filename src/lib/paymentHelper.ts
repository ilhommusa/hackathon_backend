import Stripe from "stripe";
// import {canceledPayment, paymentFail, subscriptionConfirmed} from "../../mails/mail-templates";
import { sendMailUsingSendGrid } from "./helper";
import prisma from "../utils/prismaInstance";
import { generateHash } from "../services/bcrypt.service";
import { generateRandomString } from "../utils/helper";

const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2023-10-16",
});

export const getCustomer = async (customerId: string) => {
  try {
    const customer: any = await stripe.customers.retrieve(customerId);
    return customer;
  } catch (e) {
    console.log("Error on get customer: ", e.message);
    return null;
  }
};

export const getCustomerProfileByCustomerId = async (
  customerId: string,
  email
) => {
  if (!customerId && !email) {
    return;
  }
  let userStripeData = await getCustomer(customerId);
  if (!userStripeData) {
    const stripeCustomerId = await getStripeCustomerId(email);
    userStripeData = await getCustomer(stripeCustomerId);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }
  }
  let userData: any = await prisma.user.findFirst({
    where: {
      stripeCustomerId: userStripeData.id,
    },
    include: {
      subscription: {
        include: {
          plans: true,
        },
      },
    },
  });
  if (!userData) {
    const password = generateRandomString(8);
    const passwordHash = await generateHash(password);
    userData = await prisma.user.create({
      data: {
        email: userStripeData.email,
        stripeCustomerId: customerId,
        subscription: {
          create: {
            stripeCustomerId: customerId,
            status: "INCOMPLETE",
          },
        },
      },
      include: { subscription: { include: { plans: true } } },
    });
    userData.newPassword = password;
  }
  if (!userData.subscription) {
    userData.subscription = await prisma.subscription.create({
      data: {
        userId: userData.id,
        stripeCustomerId: customerId,
        status: "INCOMPLETE",
      },
    });
  }
  return userData;
};
export const getStripeCustomerId = async (email: string) => {
  try {
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      // console.log("Exist customer", existingCustomers.data)
      console.log("Exist customer", existingCustomers.data[0].id);
      return existingCustomers.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({ email: email });
      return newCustomer.id;
    }
  } catch (e) {
    console.log("Error on create customer: ", e.message);
  }
};
export const saveEvent = async (subscription: any, subscriptionDataId: any) => {
  try {
    return await prisma.billingData.create({
      data: {
        data: subscription,
        subscriptionId: subscriptionDataId,
      },
    });
  } catch (e) {
    console.log("Error on saving events to billing table: ", e.message);
  }
};

export const sendSubscriptionEmail = async (
  type: string,
  ownerEmail: string,
  customerId: string
) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: ownerEmail,
      },
    });
    let template, title, session;
    switch (type) {
      case "failed":
        title = "Payment Failed - LockTheLoad";
        session = await getSessionUrl(customerId);
        // template = paymentFail(userData.firstName, userData.lastName, session.url)
        break;
      case "confirmed":
        title = "Payment Confirmed - LockTheLoad";
        // template = subscriptionConfirmed(userData.firstName)
        break;
      case "canceled":
        title = "Subscription Cancelled - LockTheLoad";
        session = await getSessionUrl(customerId);
      // template = canceledPayment(userData.firstName, session.url)
    }
    await sendMailUsingSendGrid(ownerEmail, title, template);
  } catch (e) {
    console.log("Error on send subscription email function: ", e.message);
  }
};

export const getSessionUrl = async (customerId: string) => {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.BILLING_RETURN_URL,
  });
};

export const upsertSubscription = async (
  userId,
  id,
  subsId,
  planId,
  status,
  currentPeriodEnd,
  currentPeriodStart,
  stripeCustomerId
) => {
  console.log("Upsert subscription function called.");
  const updateData: any = {
    status,
    plans: {
      connect: {
        id: planId,
      },
    },
  };
  console.log("planId", planId);
  if (currentPeriodEnd) {
    updateData.currentPeriodEnd = currentPeriodEnd;
    updateData.currentPeriodStart = currentPeriodStart;
  }
  await prisma.subscription.upsert({
    where: {
      id,
    },
    update: updateData,
    create: {
      subscriptionId: subsId,
      userId: userId,
      status,
      plans: {
        connect: {
          id: planId,
        },
      },
      currentPeriodEnd,
      currentPeriodStart,
      stripeCustomerId: stripeCustomerId,
    },
  });
};

export async function getPriceByProductName(productName, orderData) {
  const products = await stripe.products.list({
    active: true,
    limit: 100,
  });

  let product = products.data.find((p) => p.name === productName);
  if (!product) {
    product = await stripe.products.create({
      name: productName,
    });
  }

  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 1,
  });

  let price = prices.data.length > 0 ? prices.data[0] : null;
  if (!price) {
    price = await stripe.prices.create({
      unit_amount: orderData.amount * 100, // Price in cents
      currency: "usd",
      product: product.id,
    });
  }

  return price;
}
