const logger = require("../middlewares/logger");
const transactionService = require("../services/transactionService");

exports.createTransaction = async (req, res) => {
  try {
    const transaction_id = parseInt(req.params.transaction_id, 10);
    const { amount, type, parent_id } = req.body;

    const result = await transactionService.createTransaction(
      transaction_id,
      amount,
      type,
      parent_id
    );
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Error creating transaction" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaction_id = parseInt(req.params.transaction_id, 10);
    const { amount, type, parent_id } = req.body;

    const result = await transactionService.updateTransaction(
      transaction_id,
      amount,
      type,
      parent_id
    );
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Error updating transaction" });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction_id = parseInt(req.params.transaction_id, 10);
    const transaction = await transactionService.getTransaction(transaction_id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving transaction" });
  }
};

exports.getTransactionsByType = async (req, res) => {
  try {
    const type = req.params.type;
    const transactionIds = await transactionService.getTransactionsByType(type);

    res.status(200).json(transactionIds);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving transactions by type" });
  }
};

exports.getSum = async (req, res) => {
  try {
    const transaction_id = parseInt(req.params.transaction_id, 10);
    const sum = await transactionService.getSum(transaction_id);

    res.status(200).json({ sum });
  } catch (error) {
    res.status(500).json({ error: "Error calculating sum" });
  }
};
