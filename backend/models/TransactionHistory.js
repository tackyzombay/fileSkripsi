const mongoose = require("mongoose");

  // Schema for creating TransactionHistory
  const TransactionHistory = mongoose.model("TransactionHistory", {
    transactionId: { type: Number, required: true },
    userName: { type: String },
    productList: [],
    totalPrice: { type: Number },
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    status: {type: String },
  });
module.exports ={TransactionHistory:TransactionHistory}
