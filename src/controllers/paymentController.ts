import Stripe from "stripe";
import express, { Request, Response } from "express";
import {
  getCustomerProfileByCustomerId,
  getStripeCustomerId,
  saveEvent,
  sendSubscriptionEmail,
  upsertSubscription,
} from "../lib/paymentHelper";
import { sendMessageToTelegram } from "../lib/helper";
import prisma from "../utils/prismaInstance";

const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2023-10-16",
});

export const cancelPlan = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user } = req.session;
  try {
    const subscriptionData = await prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!subscriptionData) {
      return res.status(404).json({ message: "You have not any subscription" });
    }
    await stripe.subscriptions.update(subscriptionData.subscriptionId, {
      cancel_at_period_end: true,
    });
    const subscription = await stripe.subscriptions.retrieve(
      subscriptionData.subscriptionId
    );
    const invoice = await stripe.invoices.retrieve(
      `${subscription.latest_invoice}`
    );
    // const charge = invoice.charge;
    return res.status(200).json({ message: "You have successfully canceled" });
  } catch (error) {
    next(error);
    console.error("Error canceling subscription:", error.message);
  }
};

export const billingHistory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.session;
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!userData.stripeCustomerId) {
      return res.status(400).json({ message: "You have not customerId" });
    }
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: process.env.BILLING_RETURN_URL,
    });
    return res.status(200).json({ historyUrl: session.url });
  } catch (error) {
    next(error);
    console.error("Error retrieving subscription:", error.message);
    res.status(500).json({ message: "internation server error" });
  }
};
export const webhook = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Webhook called");

  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error(
      `⚠️ Error verifying Stripe webhook signature: ${err.message}`
    );
    next(err);
    return res.status(400).json({
      message: "Error verifying Stripe webhook signature",
      error: err,
    });
  }
  if (
    event.type === "payment_intent.succeeded" ||
    event.type === "payout.reconciliation_completed" ||
    event.type === "payment_intent.created" ||
    event.type === "payout.paid" ||
    event.type === "payout.created"
  ) {
    //no data is coming to handle.
    return res.status(200).json({ message: "success" });
  }

  const userData = await getCustomerProfileByCustomerId(
    (event.data.object as any).customer,
    (event.data.object as any)?.customer_details?.email
  );
  try {
    console.log("subscription event type: ", event.type);

    switch (event.type) {
      case "customer.subscription.created":
        const subscription = event.data.object as any;
        //userId,id, subsId, planId, status,currentPeriodEnd,currentPeriodStart, stripeCustomerId
        await upsertSubscription(
          userData.id,
          userData.subscription.id,
          subscription.id,
          subscription.plan.id,
          subscription.status?.toUpperCase(),
          undefined,
          undefined,
          subscription.customer
        );
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const updatedSubscription = event.data.object as any;
        let status = updatedSubscription.status?.toUpperCase();
        if (updatedSubscription.cancel_at_period_end) {
          await sendSubscriptionEmail(
            "canceled",
            userData.email,
            userData.stripeCustomerId
          );
          status = "CANCELED";
        }
        await upsertSubscription(
          userData.id,
          userData.subscription.id,
          updatedSubscription.id,
          updatedSubscription.plan.id,
          status,
          new Date(updatedSubscription.current_period_end * 1000),
          new Date(updatedSubscription.current_period_start * 1000),
          updatedSubscription.customer as string
        );
        break;
      case "invoice.payment_failed":
        await prisma.subscription.update({
          where: { id: userData.subscription.id },
          data: {
            status: "FAILED",
          },
        });
        await sendSubscriptionEmail(
          "failed",
          userData.email,
          userData.stripeCustomerId
        );
        break;
      case "invoice.payment_succeeded":
        const invoice = event.data.object as any;
        console.log(invoice, "invoice");

        const lastDataIndex = invoice.lines.data.length - 1;
        await upsertSubscription(
          userData.id,
          userData.subscription.id,
          userData.subscription.id,
          invoice.lines.data[lastDataIndex].plan.id,
          "ACTIVE",
          new Date(invoice.lines.data[lastDataIndex].period.start * 1000),
          new Date(invoice.lines.data[lastDataIndex].period.end * 1000),
          invoice.customer as string
        );

        break;
      case "charge.refunded":
        await prisma.subscription.update({
          where: { id: userData.subscription.id },
          data: {
            status: "REFUNDED",
            currentPeriodEnd: new Date(),
          },
        });
        break;
      case "checkout.session.completed":
        break;
    }
    if (event) {
      const { object: subscription } = event.data;
      await saveEvent(subscription, userData.subscription.id);
    }
    res.status(200).json({ profile: userData });
  } catch (e) {
    console.log("Error on Stripe webhook: ", e);

    return res
      .status(500)
      .json({ message: "International server error", error: e });
  }
};

export const getSessionUrl = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { user } = req.session;
    const priceId = req.query.priceId as string;
    const plan = await prisma.plan.findUnique({
      where: {
        planId: priceId,
      },
    });
    if (!plan) {
      return res.status(400).json({ message: "Invalid price id entered" });
    }

    const paymentMode = plan.type === "ONETIME" ? "payment" : "subscription";

    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!userData.stripeCustomerId) {
      const stripeCustomerId = await getStripeCustomerId(userData.email);
      if (!stripeCustomerId) {
        return res
          .status(400)
          .json({ message: "Error on getting stripe customer id" });
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId,
        },
      });
      userData.stripeCustomerId = stripeCustomerId;
    }
    const freeTrialDays = plan.freeTrialdays;
    const sessionData: any = {
      success_url: `${process.env.STRIPE_SESSION_SUCCESS_URL}/${plan.planId}`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: paymentMode,
      allow_promotion_codes: true,
      customer: userData.stripeCustomerId,
      metadata: {
        userId: userData.id,
        product: req.body.product || "",
        plan: plan.productType,
        planId: plan.planId,
      },
    };
    if (freeTrialDays) {
      sessionData.subscription_data = {
        trial_period_days: freeTrialDays,
      };
    }
    const session = await stripe.checkout.sessions.create(sessionData);
    const tgText = `#PurchaseClicked (button just clicked)
Email: ${userData?.email}
profileId: ${userData?.id}
selected plan: ${plan?.productType}`;
    sendMessageToTelegram(tgText)
      .then(() => {})
      .catch((error) => {
        console.log("Error on send telegram message: ", error.message);
        sendMessageToTelegram(tgText)
          .then(() => {})
          .catch((e) => {});
      });
    return res.status(200).json({ sessionUrl: session.url });
  } catch (e) {
    console.log("Error on getting session url: ", e.message);
    next(e);
    res.status(500).json({ message: "Internation server error." });
  }
};

export const getPlans = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const plans = await prisma.plan.findMany({
      where: {
        status: "ACTIVE",
      },
    });

    return res.status(200).json({ plans });
  } catch (e) {
    console.log("Error on getting plans: ", e.message);
    next(e);
    res.status(500).json({ message: "Internation server error." });
  }
};

function sendPurchaseMessageToTelegram(email, userId, plan) {
  const headText = "Purchased"; // userData.role === "OWNER" ? "ReNew" :
  const tgText = `#${headText} - ♥️
Email: ${email}
profileId: ${userId}
selected plan: ${plan}`;
  sendMessageToTelegram(tgText)
    .then(() => {})
    .catch((error) => {
      console.log("Error on send telegram message: ", error.message);
      sendMessageToTelegram(tgText)
        .then(() => {})
        .catch((e) => {});
    });
}

export const getPublicSessionUrl = async (req: Request, res: Response) => {
  try {
    const quantity = parseInt(req.query.quantity as string) || 1;
    const priceId = req.query.priceId as string;
    const plan = await prisma.plan.findUnique({
      where: {
        planId: priceId,
      },
    });
    if (!plan) {
      return res.status(400).json({ message: "Invalid price id entered" });
    }
    const paymentSuccessUrl = process.env.UNAUTHORIZED_PAYMENT_SUCCESS;
    const paymentMode = plan.type === "ONETIME" ? "payment" : "subscription";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: paymentMode,
      allow_promotion_codes: true,
      metadata: {
        planId: plan.planId,
      },
      success_url: `${paymentSuccessUrl}`,
      cancel_url: process.env.ORDER_PAYMENT_FAILED_URL,
    });
    return res.status(200).json({ sessionUrl: session.url });
  } catch (e) {
    console.log("Error on PUBLIC getting session url: ", e.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const testWebhook = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Webhook TEST called");
  let event = req.body;
  // console.log("event: ", event)
  const subscriptionData = event;
  const userData = await getCustomerProfileByCustomerId(
    (event.data.object as any).customer,
    (event.data.object as any)?.customer_details?.email
  );
  try {
    console.log("subscription event type: ", event.type);
    switch (event.type) {
      case "customer.subscription.created":
        const subscription = event.data.object as any;
        //userId,id, subsId, planId, status,currentPeriodEnd,currentPeriodStart, stripeCustomerId
        await upsertSubscription(
          userData.id,
          userData.subscription.id,
          subscription.id,
          subscription.plan.id,
          subscription.status?.toUpperCase(),
          undefined,
          undefined,
          subscription.customer
        );
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const updatedSubscription = event.data.object as any;
        let status = updatedSubscription.status?.toUpperCase();
        if (updatedSubscription.cancel_at_period_end) {
          await sendSubscriptionEmail(
            "canceled",
            userData.email,
            userData.stripeCustomerId
          );
          status = "CANCELED";
        }
        await upsertSubscription(
          userData.id,
          userData.subscription.id,
          updatedSubscription.id,
          updatedSubscription.plan.id,
          status,
          new Date(updatedSubscription.current_period_end * 1000),
          new Date(updatedSubscription.current_period_start * 1000),
          updatedSubscription.customer as string
        );
        break;
      case "invoice.payment_failed":
        await prisma.subscription.update({
          where: { id: userData.subscription.id },
          data: {
            status: "FAILED",
          },
        });
        await sendSubscriptionEmail(
          "failed",
          userData.email,
          userData.stripeCustomerId
        );
        break;
      case "invoice.payment_succeeded":
        const invoice = event.data.object as any;
        console.log(invoice, "invoice");

        const lastDataIndex = invoice.lines.data.length - 1;
        await upsertSubscription(
          userData.id,
          userData.subscription.id,
          userData.subscription.id,
          invoice.lines.data[lastDataIndex].plan.id,
          "ACTIVE",
          new Date(invoice.lines.data[lastDataIndex].period.start * 1000),
          new Date(invoice.lines.data[lastDataIndex].period.end * 1000),
          invoice.customer as string
        );

        const metaDataValues = invoice.lines.data[lastDataIndex].metadata;
        await sendSubscriptionEmail(
          "confirmed",
          userData.email,
          userData.stripeCustomerId
        );
        const headText = "Purchased"; // userData.role === "OWNER" ? "ReNew" :
        sendPurchaseMessageToTelegram(
          userData.email,
          userData.id,
          metaDataValues.product
        );
        break;
      case "charge.refunded":
        await prisma.subscription.update({
          where: { id: userData.subscription.id },
          data: {
            status: "REFUNDED",
            currentPeriodEnd: new Date(),
          },
        });
        break;
      case "checkout.session.completed":
        const session = event.data.object;
        console.log(`Payment was successful for session ID: ${session.id}`);
        const metadata = session.metadata;
        console.log(`metadata:`, metadata);
        // console.log("User data: ", userData)
        metadata.userId = userData.id;

        sendPurchaseMessageToTelegram(
          userData.email,
          userData.id,
          metadata.plan
        );
        break;
    }
    if (event) {
      const { object: subscription } = event.data;
      await saveEvent(subscription, userData.subscription.id);
    }
    res.status(200).json({ profile: userData });
  } catch (e) {
    console.log("Error on Stripe webhook: ", e);
    const tgText = `#Error
@nightcoderr error on webhook: ${e.message}`;
    sendMessageToTelegram(tgText)
      .then(() => {})
      .catch((error) => {
        console.log("Error on send telegram message: ", error.message);
        sendMessageToTelegram(tgText)
          .then(() => {})
          .catch((e) => {});
      });
    return res
      .status(500)
      .json({ message: "International server error", error: e });
  }
};
