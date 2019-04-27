var express = require('express');
var router = express.Router();
var rest = require('../db/rest');
var del = require('../db/del');
var menue = require('../db/menue');
var item = require('../db/item');
var item_config = require('../db/itemConfig');
var order = require('../db/order');
var cart = require('../helper/cart');

module.exports = router;


// views routes
router.get('/filterByArea', (req, res)=> {
  var areaInfo = req.query.areaInfo;
  console.log(rest);
  rest.getCuisines(function(cuisine){
    rest.filterByArea(areaInfo, function(rest){
      del.getArea(function(area){
            res.render('home', {rest:rest, cuisine:cuisine, area:area});
      });
    });
  });

});

router.get('/filterByCuisine', (req, res)=> {
  var cuisineName = req.query.cuisine;
  rest.getCuisines(function(cuisine){
    rest.filterByCuisine(cuisineName, function(rest){
      del.getArea(function(area){
            console.log(rest);
            res.render('home', {rest:rest, cuisine:cuisine, area:area});
      });
    });
  });

});

router.get('/getMenue', (req, res)=> {
  var rest_id = req.query.rest_id;
  menue.getByRest(rest_id, function(result){
    res.render('restMenue', {list: result, rest_id: rest_id});
  });
});

router.get('/viewActive', (req, res)=> {
  var rest_id = req.query.rest_id;
  menue.viewActive(rest_id, function(result){
    res.render('restMenue', {list: result, rest_id: rest_id});
  });
});

router.get('/getItem', (req, res)=> {
  var itemInfo = {};
  itemInfo.rest_id = req.query.rest_id;
  itemInfo.menue_type = req.query.menue_type;

  console.log(itemInfo);
  item.getMenueItem(itemInfo, function(result){
    console.log(result);
    res.render('itemMenue', {list: result, rest_id: itemInfo.rest_id, menue_type: itemInfo.menue_type});
  });
});

router.get('/getItemConfig', (req, res)=> {
  var itemInfo = {};
  itemInfo.rest_id = req.query.rest_id;
  itemInfo.menue_type = req.query.menue_type;
  itemInfo.item_id = req.query.item_id;

  item_config.getByItem(itemInfo, function(result){
    res.render('itemConfigMenue', {list: result, rest_id: itemInfo.rest_id, menue_type: itemInfo.menue_type, item_id: itemInfo.id});
  });
});

router.get('/order', (req, res)=> {
  order.getByUser(req.session.userId, function(result){
    res.render('orderHist', {list: result});
  });
});
