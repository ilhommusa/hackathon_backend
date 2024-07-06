import { generateHash } from "../src/services/bcrypt.service";

import { PlanType, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// async function main() {
//   console.log("Start seeding ...");
//   const password = await generateHash("v+#5xK0$6+90");
//   await prisma.user.create({
//     data: {
//       email: "admin@weautomate.studio",
//       role: "ADMIN",
//       status: "ACTIVE",
//     },
//   });
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

async function createPlans() {
  const plansTest = [
    {
      id: "price_1PPy42LjSoSCii8PbgaKQJ5h",
      productType: PlanType.PRO,
      type: PlanType.MONTHLY,
      price: 1499,
    },
    {
      id: "price_1PQSZBLjSoSCii8PUB1AOhU6",
      productType: PlanType.PRO,
      type: PlanType.YEARLY,
      price: 14390.4,
    },
    {
      id: "price_1PPy3bLjSoSCii8P5ADtIKlk",
      productType: PlanType.STANDARD,
      type: PlanType.MONTHLY,
      price: 699,
    },
    {
      id: "price_1PQSbrLjSoSCii8PfOXdeJx6",
      productType: PlanType.STANDARD,
      type: PlanType.YEARLY,
      price: 6710.4,
    },
  ];
  // const plansPRod = [
  //     {
  //         id: "price_1PYvlSLjSoSCii8PIGUg1PP4",
  //         productType: PlanType.UTILITY,
  //         type: PlanType.MONTHLY,
  //         price: 1499
  //     },
  //     {
  //         id: "price_1PYvlSLjSoSCii8PIGUg1PP4",
  //         productType: PlanType.UTILITY,
  //         type: PlanType.YEARLY,
  //         price: 14390.4
  //     },
  //     {
  //         id: "price_1PYvlWLjSoSCii8PvM9iIG83",
  //         productType: PlanType.PRO,
  //         type: PlanType.MONTHLY,
  //         price: 699
  //     },
  //     {
  //         id: "price_1PYvlWLjSoSCii8PlGYTNxTJ",
  //         productType: PlanType.PRO,
  //         type: PlanType.YEARLY,
  //         price: 6710.4
  //     },
  //     {
  //         id: "price_1PYvlOLjSoSCii8P8fCAhF4g",
  //         productType: PlanType.COMMUNITY,
  //         type: PlanType.ONETIME,
  //         price: 49.99
  //     },
  //     {
  //         id: "price_1PYvl8LjSoSCii8P852J6k6p",
  //         productType: PlanType.ESSENTIALS,
  //         type: PlanType.ONETIME,
  //         price: 259.99
  //     },
  // ]

  for (let plan of plansTest) {
    await prisma.plan.upsert({
      where: {
        planId: plan.id,
      },
      update: {},
      create: {
        id: plan.id,
        productType: plan.productType,
        type: plan.type,
        status: "ACTIVE",
        planId: plan.id,
        amount: plan.price,
      },
    });
  }
}

// createPlans()
//   .then(() => {
//     console.log("Success");
//   })
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function seedCategorues() {
  const categories = [
    { icons: "🏠", name: "All" },
    { icons: "🤖", name: "Artificial intelligence" },
    { icons: "📈", name: "Productivity" },
    { icons: "📣", name: "Marketing" },
    { icons: "💻", name: "Developer tools" },
    { icons: "🎨", name: "Design" },
    { icons: "🔍", name: "SEO" },
    { icons: "🤖", name: "Chatbots" },
    { icons: "📱", name: "Social media" },
    { icons: "🤝", name: "Customer support" },
    { icons: "🚫", name: "No code" },
    { icons: "👨‍🎨", name: "Content creation" },
    { icons: "📝", name: "Blogging" },
    { icons: "✍️", name: "Writing" },
    { icons: "🛠️", name: "Productized services" },
    { icons: "💰", name: "Sales" },
    { icons: "📱", name: "iOS" },
    { icons: "👷", name: "Website builders" },
    { icons: "👩‍💻", name: "Developer APIs" },
    { icons: "📊", name: "Analytics" },
    { icons: "🏗️", name: "Building products" },
    { icons: "🎬", name: "Video" },
    { icons: "📣", name: "Feedback tools" },
    { icons: "🎓", name: "Education" },
    { icons: "🔌", name: "Chrome extensions" },
    { icons: "📚", name: "Knowledge management" },
    { icons: "🍎", name: "Mac" },
    { icons: "✉️", name: "Email" },
    { icons: "📊", name: "Market research" },
    { icons: "🎥", name: "Video editing" },
    { icons: "💳", name: "E-commerce" },
    { icons: "📝", name: "Note taking" },
    { icons: "🗣️", name: "Voice" },
    { icons: "🕵️", name: "Business intelligence" },
    { icons: "🔊", name: "Audio" },
    { icons: "🚀", name: "Ship fast" },
    { icons: "💰", name: "Finance" },
    { icons: "📚", name: "Reading" },
    { icons: "📈", name: "Lead generation" },
    { icons: "🛒", name: "Marketplaces" },
    { icons: "🤝", name: "Collaboration" },
    { icons: "📋", name: "Task management" },
    { icons: "💻", name: "SaaS boilerplates" },
    { icons: "📝", name: "Notion" },
    { icons: "📊", name: "Data visualization" },
    { icons: "👀", name: "Monitoring" },
    { icons: "📚", name: "Books" },
    { icons: "👩‍💻", name: "Freelancers" },
    { icons: "📷", name: "Photography" },
    { icons: "📊", name: "Project management" },
    { icons: "🗣️", name: "Speech recognition" },
    { icons: "🔍", name: "Databases" },
    { icons: "📸", name: "Screenshots" },
    { icons: "🔍", name: "Optimization" },
    { icons: "🤖", name: "Bots" },
    { icons: "🌐", name: "Web hosting" },
    { icons: "🤖", name: "Machine learning" },
    { icons: "📢", name: "Advertising" },
    { icons: "💼", name: "Careers" },
    { icons: "🎙️", name: "Podcasting" },
    { icons: "📋", name: "Form builders" },
    { icons: "🐧", name: "Open source" },
    { icons: "🏡", name: "Remote work" },
    { icons: "🏷️", name: "Branding" },
    { icons: "👨‍💼", name: "Jobs" },
    { icons: "☁️", name: "Cloud computing" },
    { icons: "📝", name: "To do lists" },
    { icons: "🧩", name: "Browser extensions" },
    { icons: "📑", name: "Accounting" },
    { icons: "📄", name: "CMS" },
    { icons: "🏘️", name: "Communities" },
    { icons: "📰", name: "News" },
    { icons: "🔒", name: "Privacy" },
    { icons: "☁️", name: "Cloud infrastructure" },
    { icons: "🗣️", name: "Language learning" },
    { icons: "📋", name: "Job boards" },
    { icons: "📔", name: "Journaling" },
    { icons: "🔨", name: "Scrapers" },
    { icons: "🛋️", name: "Interior design" },
    { icons: "💰", name: "Fintech" },
    { icons: "🔍", name: "Search" },
    { icons: "💸", name: "Payments" },
    { icons: "🌍", name: "Translation" },
    { icons: "📈", name: "Performance monitoring" },
    { icons: "🤑", name: "Reduce costs" },
    { icons: "🧠", name: "Mental health" },
    { icons: "🎥", name: "Motion design" },
    { icons: "🗓️", name: "Online scheduling" },
    { icons: "👥", name: "Recruiting" },
    { icons: "📰", name: "Journalism" },
    { icons: "🔒", name: "Security" },
    { icons: "💸", name: "Fundraising" },
    { icons: "👼", name: "Angel investing" },
    { icons: "📷", name: "Image recognition" },
    { icons: "💪", name: "Fitness" },
    { icons: "🗄️", name: "Storage" },
    { icons: "📁", name: "File sharing" },
    { icons: "💬", name: "Messaging" },
    { icons: "👨‍👩‍👧‍👦", name: "Parenting" },
    { icons: "💰", name: "Venture capital" },
    { icons: "🖼️", name: "Stable diffusion" },
    { icons: "🎵", name: "Music" },
    { icons: "💻", name: "Meeting software" },
    { icons: "👨‍👩‍👧‍👦", name: "Families" },
    { icons: "⌚", name: "Apple watch" },
    { icons: "💰", name: "Affiliate tracking" },
    { icons: "🌍", name: "Tourism" },
    { icons: "📊", name: "Big data" },
    { icons: "☁️", name: "Google cloud" },
    { icons: "💼", name: "Investment management" },
    { icons: "📊", name: "A/B testing" },
    { icons: "🌟", name: "Testimonials" },
    { icons: "⚖️", name: "Legal" },
    { icons: "💱", name: "Trading" },
    { icons: "🌐", name: "Web3" },
    { icons: "📋", name: "Jira" },
    { icons: "👨‍🍳", name: "Restaurants" },
    { icons: "💑", name: "Dating" },
    { icons: "💸", name: "Billing" },
    { icons: "🏡", name: "Home inventory" },
    { icons: "📚", name: "Guides" },
    { icons: "✈️", name: "Travel" },
    { icons: "✉️", name: "Waitlist" },
    { icons: "🖥️", name: "3D technology" },
    { icons: "💵", name: "Banking" },
    { icons: "🥦", name: "Nutrition" },
  ];

  categories.forEach(async (category) => {
    await prisma.category.create({
      data: {
        name: category.icons + " " + category.name,
      },
    });
  });
}

seedCategorues()
  .then(() => {
    console.log("Success categiry");
  })
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
