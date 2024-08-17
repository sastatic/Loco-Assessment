const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const logger = require("../middlewares/logger");

// Create a new transaction
exports.createTransaction = async (id, amount, type, parent_id = null) => {
  try {
    const transaction = await prisma.transaction.create({
      data: { id: id, amount, type, parent_id },
    });
    logger.info(`Transaction created: ${transaction.id}`);
    return transaction;
  } catch (error) {
    logger.error(`Error creating transaction: ${error.message}`);
    throw error;
  }
};

exports.updateTransaction = async (id, amount, type, parent_id = null) => {
  try {
    let transaction = await this.getTransaction(id);
    if (transaction) {
      transaction = await prisma.transaction.update({
        where: { id },
        data: { amount, type, parent_id },
      });
      logger.info(`Transaction Updated: ${id}`);
    } else {
      transaction = await this.createTransaction(id, amount, type, parent_id);
    }
    return transaction;
  } catch (error) {
    logger.error(`Error updating transaction: ${error.message}`);
    throw error;
  }
};

// Get a transaction by ID (including child transactions)
exports.getTransaction = async (id) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      logger.info(`Transaction ${id} not found.`);
    } else {
      logger.info(`Fetched transaction: ${id}`);
    }
    return transaction;
  } catch (error) {
    logger.error(`Error fetching transaction ${id}: ${error.message}`);
    throw error;
  }
};

// Get all transactions of a specific type and return their IDs
exports.getTransactionsByType = async (type) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { type },
      select: { id: true },
    });
    if (!transactions) {
      logger.error(`Null Error fetching transactions ${type}\n`);
      throw new Error(`Transactions type ${type} are Null`);
    }
    if (transactions.length === 0) {
      logger.info(`Transactions of type ${type} is Empty`);
    }
    logger.info(`Fetched transactions of type: ${type}`);
    return transactions.map((t) => t.id);
  } catch (error) {
    logger.error(`Error fetching transactions ${type}: ${error.message}`);
    throw error;
  }
};

// Get the sum of all transactions linked by parent_id to a specific transaction
exports.getSum = async (transaction_id) => {
  let total = 0;
  const calculateSum = async (id) => {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { children: true },
    });

    if (transaction) {
      total += transaction.amount;
      for (const child of transaction.children) {
        await calculateSum(child.id);
      }
    }
  };
  try {
    await calculateSum(transaction_id);
    logger.info(`Fetched transaction sum: ${transaction_id}`);
    return total;
  } catch (error) {
    logger.error(
      `Error fetching transaction sum ${transaction_id}: ${error.message}`
    );
    throw error;
  }
};
