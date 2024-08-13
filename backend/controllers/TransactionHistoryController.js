const {TransactionHistory} = require("../models/TransactionHistory")
let TransactionHistoryController = {
    getTransactionHistory: async (req, res) =>{
        await TransactionHistory.find({"userName" : req.user.id}).then((transaction) => res.send(transaction));
        console.log("Transaction History");
    },
    createTransactionHistory: async (req,res)=>{

    }
}
module.exports = {TransactionHistoryController:TransactionHistoryController}