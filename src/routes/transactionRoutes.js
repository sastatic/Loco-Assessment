const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post(
  "/transaction/:transaction_id",
  transactionController.createTransaction
);
router.put(
  "/transaction/:transaction_id",
  transactionController.updateTransaction
);
router.get(
  "/transaction/:transaction_id",
  transactionController.getTransaction
);
router.get("/types/:type", transactionController.getTransactionsByType);
router.get("/sum/:transaction_id", transactionController.getSum);

module.exports = router;
