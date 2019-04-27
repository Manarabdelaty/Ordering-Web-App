var express = require('express');
var router = express.Router();
var user = require('../db/user');
var del = require('../db/del');
var userAddr = require('../db/user_address');

module.exports = router;

// views routes
router.get('/profile', (req, res)=> {
  var userId = req.session.userId;
  console.log(userId);
  del.getArea(function(areas){
    user.getInfo(userId, function(result){
      user.getAddr(userId, function(addr){
        console.log(result);
        res.render('profile', {name: result[0].name, email: result[0].email, age: result[0].age, address: addr, area:areas});
      });
    });
  });
});


// API Routes
router.get('/updateName', (req, res)=> {
  var userInfo = {};
  userInfo.name = req.query.name;
  userInfo.userId = req.session.userId;
  console.log(userInfo);
  user.updateName(userInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/updateAge', (req, res)=> {
  var userInfo = {};
  userInfo.bdate = req.query.bdate;
  userInfo.userId = req.session.userId;
  user.updateAge(userInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/updateAddr', (req, res)=> {
  var addrInfo = {};
  addrInfo.addr_id = req.query.addr_id;
  addrInfo.user_id = req.session.userId;
  addrInfo.district = req.query.district;
  addrInfo.city = req.query.city;
  addrInfo.apt_no = req.query.apt_no;
  addrInfo.street_name = req.query.street_name;

  userAddr.updateAddr(addrInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/addAddr', (req, res)=> {
  var addrInfo = {};
  addrInfo.user_id = req.session.userId;
  addrInfo.district = req.query.district;
  addrInfo.city = req.query.city;
  addrInfo.apt_no = req.query.apt_no;
  addrInfo.street_name = req.query.street_name;

  userAddr.addAddr(addrInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/removeAddr', (req, res)=> {
  var addrInfo = {};
  addrInfo.addr_id = req.query.addr_id;
  addrInfo.user_id = req.session.userId;

  userAddr.removeAddr(addrInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});
