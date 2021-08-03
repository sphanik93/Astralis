'use strict';

const crypto = require('crypto');
const algorithm = "aes-256-cbc";
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; 
// const ENC_KEY = "dSgUkXp2s5v8y/BE(H+MbQeThWmYq3t";
const IV = "5183666c72eec9e4"; 

const phrase = "who let the dogs out";

var encrypt = ((val) => {
  let cipher = crypto.createCipheriv(algorithm, ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

var decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv(algorithm, ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});


module.exports = {
    encrypt,
    decrypt
};