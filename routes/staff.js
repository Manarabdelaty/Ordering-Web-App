var express = require('express');
var router = express.Router();
var path = require('path');
var order = require('../db/order');


router.get('/orderPanel', (req,res)=>{
  order.getUnProcessed(function(result){
    res.render('orderPanel', {list: result});
  });
});

router.get('/orderInfo', (req,res)=>{
  var order_id = req.query.order_id;
  order.getInfo(order_id, function(result){
    order.getItems(order_id, function(items){
      console.log(result);
      console.log(items);
      res.render('orderInfo', {total: result[0].total,
                              status: result[0].status,
                              rest: items[0].rest_name,
                              phone_no: items[0].phone_no,
                              address: result[0].apt_no + ', '+ result[0].street_name + ', '+ result[0].district + ', '+ result[0].city,
                              items: items,
                              order_id: order_id});
    });
  });
});

router.get('/cancelOrder', (req,res)=>{
  var order_id = req.query.order_id;
  order.cancel(order_id, function(result){
    if(result ==0)
      res.send({status: 0});
    else res.send({status: 1});
  });
});

router.get('/updateStatus', (req,res)=>{
  var order_id = req.query.order_id;
  var status = req.query.status;

  order.updateStatus(order_id,status, function(result){
    if(result ==0)
      res.send({status: 0});
    else res.send({status: 1});
  });
});
module.exports = router;
