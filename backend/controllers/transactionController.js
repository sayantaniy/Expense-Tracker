const transactionModel = require("../models/transaction.model");
const jwt = require("jsonwebtoken");

async function createTransaction(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    const { amount, category, description, date } = req.body;

    const transaction = await transactionModel.create({
      userId,
      amount,
      category,
      description,
      date,
    });

    res.status(201).json({
      message: "Transaction Created Successfully",
      transaction,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getTransaction(req, res) {
  const transactions = await transactionModel.find({userId: req.user.id}).limit(20).sort({date:-1});
  res.status(200).json({
    message: "Transactions are fetched successfully",
    transactions,
  });
}

async function deleteTransaction(req, res) {
  const transactionId = req.params.id;

  try {
    const deletedTransaction = await transactionModel.findOneAndDelete({
      _id: transactionId,
      userId: req.user.id,
    });

    if (!deletedTransaction) {
      return res.status(404).json({
        message: "Transaction not found or already deleted",
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      transaction: deletedTransaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting transaction",
      error: err.message,
    });
  }
}

module.exports = {
  createTransaction,
  getTransaction,
  deleteTransaction,
};
