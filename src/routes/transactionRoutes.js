const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.put(
  "/transaction/:transaction_id",
  transactionController.createTransaction
);
router.get(
  "/transaction/:transaction_id",
  transactionController.getTransaction
);
router.get("/types/:type", transactionController.getTransactionsByType);
router.get("/sum/:transaction_id", transactionController.getSum);

module.exports = router;
