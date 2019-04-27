/*
  login and signup route
*/
var express = require('express');
var router = express.Router();
var path = require('path');
var user = require('../db/user');
var mailer = require('../helper/sendmail');
var generator = require('generate-password');

// views routes
router.get('/register', (req, res)=> {
  res.sendFile(path.join(__dirname, '../templates/register.html'));
});

router.get('/login', (req, res)=> {
  res.sendFile(path.join(__dirname, '../templates/login.html'));
});

router.get('/forgot', (req, res)=> {
  res.sendFile(path.join(__dirname, '../templates/forgot.html'));
});

router.get('/home', (req,res)=>{
  res.sendFile(path.join(__dirname, '../templates/home.html'));
});

// REST API routes
// register post body : {name: "", email: "", password: "", bdate:"", status: ""}
router.post('/register', (req,res)=>{
  console.log('register called');
  userInfo = req.body;
  user.findOne(userInfo.email, function(found){
    if (found.length > 0){
      console.log('user found');
      res.send({status : 0});  // failed to register
    }
    else {
      user.create(userInfo, function(inserted, id){
        if (inserted){
          req.session.userId = id;
          res.send({status : 1});
        }
        else
        {
          console.log('insert failed');
          res.send({status : 0});
        }
      });    // insert user info in db
    }

  });   // • Modify restaurant info (opening hours, address, cuisine, supported delivery areas and charges)make sure that email isn't registered

});

router.post('/login', (req,res)=>{
  var userInfo = req.body;
  var email = userInfo.email;
  var password = userInfo.password;

  user.authenticate({email, password}, function(result, id, status){
    if (result){
      req.session.userId = id;
      req.session.user = status;
      console.log(id);
      console.log(req.session.userId);
      res.send({status: 1});
    }
    else res.send({status: 0});
  });

});

router.post('/forgot', (req,res)=>{
  var userInfo = req.body;
  var email = userInfo.email;
  var password = generator.generate({
    length: 10,
    numbers: true
  });
  user.resetPass(email, password, function(result){
    if(result == 1){
    mailer.send(email,password, function(result){
      if (result) res.send({status: 1});
      else res.send({status: 0});
    });
   }
   else res.send({status: 1});
  });

});

router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/home');
      }
    });
  }
});

module.exports = router;
