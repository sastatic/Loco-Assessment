const express = require("express");
const app = express();
const transactionRoutes = require("./routes/transactionRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/transactionservice", transactionRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
