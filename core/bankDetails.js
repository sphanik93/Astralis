const mongoose = require("mongoose");

const bankDetails = new mongoose.Schema({
    ID : String, 
    AccountName : String, 
    AccountNo : String, 
    BankIFSC : String,
    AmountValue : String, 
    Remarks : String,
    datecreated : String,
   
});

module.exports = mongoose.model("bankDetails", bankDetails);