const prisma = require("../src/config/prisma");

async function main() {
  // Clear the database
  await prisma.transaction.deleteMany({});

  // Seed transactions
  await prisma.transaction.createMany({
    data: [
      { id: 1, amount: 5000, type: "cars", parent_id: null },
      { id: 2, amount: 10000, type: "shopping", parent_id: 1 },
      { id: 3, amount: 3000, type: "cars", parent_id: 1 },
      { id: 4, amount: 2000, type: "electronics", parent_id: null },
      { id: 5, amount: 1500, type: "shopping", parent_id: 2 },
      { id: 6, amount: 1000, type: "shopping", parent_id: 2 },
    ],
  });

  console.log("Database has been seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
