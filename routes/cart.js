var express = require('express');
var router = express.Router();
var cart = require('../helper/cart');
var order = require('../db/order');
var code = require('../db/code');
var restDisc = require('../db/restDisc');
var user_address = require('../db/user_address');
var order = require('../db/order');

module.exports = router;

// views routes
router.get('/cart', (req, res)=> {
  cart.saveCart(req);
  var items = req.session.cart.items;
  var user_id = req.session.userId;
  if(items[0]){
    var rest_id = items[0].rest_id;
    user_address.match(user_id,rest_id, function(addr){
      res.render('cart', {list: items, addr:addr});
    });
  }
  else {
    res.render('cart');
  }
});


router.get('/checkoutOrder', (req, res)=> {
  var cno = req.query.code;
  var user_address= req.query.user_address;
  var charge = parseFloat(req.query.charge);
  var item_total = parseFloat(req.session.cart.totals);
  var discount = 0;
  var total = 0;
  var tax = 0;
  var rest_disc = 0;
  var rest_id = req.session.cart.items[0].rest_id;

  order.getTax(function(taxPercent){
    restDisc.getValidByRest(rest_id, function(rest_disc){
      if(rest_disc.length > 0){
        console.log(rest_disc);
        rest_disc = parseFloat(rest_disc[0].amount);
        rest_disc = item_total * (rest_disc/100);
        tax = (parseFloat(taxPercent) / 100) *(item_total - rest_disc);
        total = item_total + charge + tax - rest_disc;
        res.render('order', {item_total: item_total, charge:charge, tax:tax, discount: discount, total: total, rest_disc: rest_disc, user_address: user_address});
      }
      else {
        if (cno){
          console.log('cno');
        code.isValid(cno, function(result){
          if(result == 1){
            code.getAmount(cno, function(discountPercent){
              rest_disc = 0;
              discount = item_total * (parseFloat(discountPercent)/100);
              tax = (parseFloat(taxPercent) / 100) *(item_total - discount);
              total = item_total + charge + tax - discount;
              res.render('order', {item_total: item_total, charge:charge, tax:tax, discount: discount, total: total, rest_disc: rest_disc,  user_address: user_address});
            });
          }
          else {
            discount = 0;
            rest_disc = 0;
            tax = (parseFloat(taxPercent)/ 100) *(item_total - discount);
            total = item_total + charge + tax - discount;
            res.render('order', {item_total: item_total, charge:charge, tax:tax, discount: discount, total: total, rest_disc: rest_disc,  user_address: user_address});
          }
        });
      }
      else {
        console.log('no cno');
        discount = 0;
        rest_disc = 0;
        tax = (parseFloat(taxPercent) / 100) *(item_total - discount);
        total = item_total + charge + tax - discount;
        res.render('order', {item_total: item_total, charge:charge, tax:tax, discount: discount, total: total, rest_disc: rest_disc,  user_address: user_address});
      }

      }

    });


  });
});


router.get('/place', (req, res)=> {
  var orderInfo = {};
  orderInfo.user_id = req.session.userId;
  orderInfo.user_address = req.query.user_address;
  orderInfo.total = req.query.total;
  orderInfo.status = req.query.status;
  orderInfo.items = cart.getItems();

  order.add(orderInfo, function(result){
    if(result == 1){
      cart.emptyCart(req);
      cart.saveCart(req);
      res.send({status: 1});
    }
    else  res.send({status: 0});
  });


});


// API Routes
router.get('/addToCart', (req, res)=> {
  var itemInfo = {};
  itemInfo.item_id = req.query.item_id;
  itemInfo.rest_id = req.query.rest_id;
  itemInfo.menue_type = req.query.menue_type;
  itemInfo.config_id = req.query.id;
  itemInfo.name = req.query.name;
  itemInfo.price = req.query.price;
  itemInfo.comment = req.query.comment;
  console.log(itemInfo);
  var qty= req.query.qty;

  if (cart.addToCart(itemInfo, qty) == 1){
      cart.saveCart(req);
      res.send({status: 1});
  }
  else res.send({status: 0});
});

router.get('/removeFromCart', (req, res)=> {
  var itemInfo = {};
  itemInfo.item_id = req.query.item_id;
  itemInfo.rest_id = req.query.rest_id;
  itemInfo.menue_type = req.query.menue_type;
  itemInfo.config_id = req.query.config_id;

  cart.removeFromCart(itemInfo.config_id,itemInfo.item_id, itemInfo.rest_id, itemInfo.menue_type);
  cart.saveCart(req);
  res.send({status: 1});
});

router.get('/editQty', (req, res)=> {
  var itemInfo = {};
  itemInfo.item_id = req.query.item_id;
  itemInfo.rest_id = req.query.rest_id;
  itemInfo.menue_type = req.query.menue_type;
  itemInfo.config_id = req.query.config_id;
  itemInfo.qty = req.query.qty;
  console.log('here');
  console.log(req.query.config_id);
  console.log(itemInfo);
  cart.editQty(itemInfo);
  cart.saveCart(req);
  res.send({status: 1});
});

router.get('/editComm', (req, res)=> {
  var itemInfo = {};
  itemInfo.item_id = req.query.item_id;
  itemInfo.rest_id = req.query.rest_id;
  itemInfo.menue_type = req.query.menue_type;
  itemInfo.config_id = req.query.config_id;
  itemInfo.comm = req.query.comm;
  console.log(itemInfo);
  cart.editComm(itemInfo);
  cart.saveCart(req);
  res.send({status: 1});
});
