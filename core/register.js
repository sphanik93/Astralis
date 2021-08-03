const mongoose = require("mongoose");

const registerUser = new mongoose.Schema({
    name : String,
    password : String,
    username: String,
    mobile : Number,
    userkey: String,
    email : {
        type : String,
        unique : true,
        required : true,
        sparse : true
    },
});

module.exports = mongoose.model("registerUser", registerUser);