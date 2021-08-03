"use strict";
const express = require("express");
const router = express.Router();
const ip = require("ip");
const ipAddress = ip.address();
var rand = require("random-key");
var { encrypt, decrypt } = require('../core/crpyto');
var registerUser = require('../core/register')
var bankDetails = require("../core/bankDetails")
console.log("Hii IP ==>>",ipAddress)


/* GET home page. */
router.get("/", function (request, response, next) {
    response.render("welcome", {
      title: "Express Page for Astralis application.",
    });
  });


  router.post("/Signup", async function (req, res) {
    var data = req.body;
    var authkey = rand.generate();
    console.log(authkey,"dataaaa",new Date(),"encript",encrypt(data.Password))

    var item={
      name : data.Name,
      email : data.Email,
      mobile : data.Mobile,
      username : data.Username,
      password : encrypt(data.Password),
      userkey : authkey,
      datecreated : new Date()
     }
   
     const userObj = new registerUser(item);
     await userObj.save(function (error, result) {
       console.log("====",error,result)
      //
      if(result){
        res.send({
                result: "Registered Successfully",
              }); 
      }
      else if(error['code'] == 11000){
        res.send({
          result: "User Already Registered",
        });
    }
    });
  
         
  });


  router.post("/Login", async function (req, res) {
    var results 
    var email = req.body.Email;
    var password = encrypt(req.body.Password);

     await registerUser.find({
      "email": email,
      "password": password
  }).then((response) => {
    console.log("login res",response)
    if (response.length == 0) {
        res.send({
          "status": 404,
          "message": "User Not Found"        
        });
    } else {
      res.send({
        "status":200,
        "UserKey": response[0].userkey,
      });
    
    }
  });
  });

  
  router.post("/bankdetails", async function (req, res) {
    var data = req.body;
    console.log("dataaaa",data)

    var item={
      ID : data.ID, 
      AccountName : encrypt(data.AccountName), 
      AccountNo : encrypt(data.AccountNo), 
      BankIFSC : encrypt(data.BankIFSC), 
      AmountValue : encrypt(data.AmountValue), 
      Remarks : encrypt(data.Remarks),
      datecreated : new Date()
     }
   
     const bankObj = new bankDetails(item);
     await bankObj.save(function (error, result) {
       console.log("====",error,result)
      //
      if(result){
        res.send({
                result: "Bank Details Added Successfully",
        }); 
      }
    });
  });


  router.post("/getbankdetails", async function (req, res) {
    var results 
    var AccountNo = encrypt(req.body.AccountNo);

    await bankDetails.find({
      "AccountNo": AccountNo  
    }).then((response) => {
    console.log("login res",response)
    if (response.length == 0) {
        res.send({
          "status": 404,
          "message": "User Not Found"        
        });
    } else {
      let accountno = response[0].AccountName;
      let accountname = response[0].AccountNo;
      let ifsc = response[0].BankIFSC;
      let amount = response[0].AmountValue;
      let remarks = response[0].Remarks;
      let date = response[0].datecreated;

      results = {AccountName: decrypt(accountno),
                  AccountNo:decrypt(accountname),
                  BankIFSC:decrypt(ifsc),
                  AmountValue:decrypt(amount),
                  Remarks:decrypt(remarks),
                  Date:date}
      res.send({
        "status":200,
        "Bank Details": results,
      });
    
    }
  });
  });


module.exports = router ;

