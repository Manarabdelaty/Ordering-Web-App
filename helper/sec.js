/*
  Helper module to hash and compare user passwords.
*/
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

const saltRounds = 10;

module.exports = {
  hash,
  match
};

function hash(password){

  return bcrypt.hashSync(password,saltRounds);

};

function match(password, passwordHashed){
  return bcrypt.compareSync(password, passwordHashed);
};
