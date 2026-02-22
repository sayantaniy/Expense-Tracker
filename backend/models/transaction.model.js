const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Food",
      "Transport",
      "Shopping",
      "Bills",
      "Groceries",
      "Health",
      "Education",
      "Entertainment",
      "Travel",
      "Investments",
      "Salary",
      "Business",
      "EMI",
      "Utilities",
      "Rent",
      "Other",
    ],
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const transactionModel = new mongoose.model('transaction', transactionSchema)

module.exports = transactionModel
