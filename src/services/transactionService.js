const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new transaction
exports.createTransaction = async (id, amount, type, parent_id = null) => {
  return await prisma.transaction.create({
    data: { id, amount, type, parent_id },
  });
};

// Get a transaction by ID (including child transactions)
exports.getTransaction = async (id) => {
  return await prisma.transaction.findUnique({
    where: { id },
    include: { children: true }, // Assuming our schema has a self-relation for child transactions
  });
};

// Get all transactions of a specific type and return their IDs
exports.getTransactionsByType = async (type) => {
  const transactions = await prisma.transaction.findMany({
    where: { type },
    select: { id: true },
  });
  return transactions.map((t) => t.id);
};

// Get the sum of all transactions linked by parent_id to a specific transaction
exports.getSum = async (transaction_id) => {
  let total = 0;

  const calculateSum = async (id) => {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { children: true }, // Fetch child transactions
    });

    if (transaction) {
      total += transaction.amount;

      // Recursively calculate the sum for all child transactions
      for (const child of transaction.children) {
        await calculateSum(child.id);
      }
    }
  };

  await calculateSum(transaction_id);
  return total;
};
