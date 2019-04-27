var express = require('express');
var router = express.Router();
var path = require('path');
var user = require('../db/user');
var code = require('../db/code');
var rest = require('../db/rest');
var menue = require('../db/menue');
var item = require('../db/item');
var del = require('../db/del');
var mailer = require('../helper/sendmail');
var rest_disc = require('../db/restDisc');
var item_config = require('../db/itemConfig');




// views routes
router.get('/admin', (req, res)=> {
  res.render('admin');
});

router.get('/adminlist', (req, res)=> {
  user.getByRole('admin', function(result){
    res.render('list', {title: 'Admin', list: result});
  });
});

router.get('/restlist', (req, res)=> {
  rest.getAll(function(result){
    rest.getCuisines(function(cuisines){
      res.render('rest', {title: 'Restuarants', list: result, cuisine: cuisines});
    });
  });
});

router.get('/editRest', (req,res)=>{
  var rest_id = req.query.rest_id;
  del.getArea(function(area){
    rest.getInfo(rest_id, function(result){
      console.log(result);
      rest.getCuisines(function(cuisines){
        res.render('editRest', {cuisines: cuisines,rest_id: rest_id, close_hr: result[0].close_hr, open_hr: result[0].opening_hr, phone: result[0].phone_no, cuisine: result[0].cuisine, name: result[0].name, street_name: result[0].street_name, district:result[0].district, city: result[0].city, area:area });
      });
    });
  });

});
router.get('/stafflist', (req, res)=> {
  user.getByRole('staff', function(result){
    res.render('list', {title: 'Staff', list: result});
  });
});

router.get('/codelist', (req, res)=> {
  code.getAll( function(result){
    console.log(result);
    res.render('code', {title: 'Discount Codes', list: result});
  });
});


router.get('/changeMyPass', (req, res)=> {
    res.render('changePass');
});

router.get('/menuelist', (req, res)=> {
  var restId = req.query.restId;
  menue.getType(function(menueType){
    menue.getByRest(restId, function(result){
      res.render('menues', {list: result, type:menueType, rest_id: restId});
    });
  });

});

router.get('/itemlist', (req,res)=>{
  var menue_type = req.query.menue_type;
  var rest_id = req.query.rest_id;
  item.getConfig(function(configList){
    item.getByMenue({menue_type, rest_id},function(result){
      res.render('item', {list: result, menue_type: menue_type, rest_id: rest_id, config:configList});
    });
  });
});

router.get('/itemConfig', (req,res)=>{
  var configInfo = {};
  configInfo.menue_type = req.query.menue_type;
  configInfo.rest_id = req.query.rest_id;
  configInfo.item_id = req.query.item_id;

  item_config.getByItem(configInfo, function(configList){
      res.render('itemConfig', {list: configList, item_id: configInfo.item_id, menue_type: configInfo.menue_type, rest_id: configInfo.rest_id});
  });
});



router.get('/addItemConfig', (req,res)=>{
  var configInfo = {};
  configInfo.menue_type = req.query.menue_type;
  configInfo.rest_id = req.query.rest_id;
  configInfo.item_id = req.query.item_id;
  configInfo.name = req.query.name;
  configInfo.price = req.query.price;


  item_config.add(configInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/removeItemConfig', (req,res)=>{
  var configInfo = {};
  configInfo.menue_type = req.query.menue_type;
  configInfo.rest_id = req.query.rest_id;
  configInfo.item_id = req.query.item_id;
  configInfo.id = req.query.id;


  item_config.remove(configInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.post('/editItemConfig', (req,res)=>{
  var configInfo = req.body;

  item_config.edit(configInfo, function(result){
    if (result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/dellist', (req,res)=>{
  var rest_id = req.query.restId;
  del.getArea(function(district){
    console.log(district);
    del.getByRest(rest_id, function(result){
      res.render('del', {title: 'Deleivery Area', list: result, rest_id: rest_id, district: district});
    });
  });

});

router.get('/restDisc', (req,res)=>{
  var rest_id = req.query.restId;
  rest_disc.getByRest(rest_id, function(result){
    res.render('disc', {title: 'Restuarant Discounts', list:result, rest_id: rest_id});
  });
});

// API routes
router.get('/remove', function (req, res) {
  var userId = req.query.id;
  var prev_role = req.query.prev_role;
  var admin_id = req.session.userId;

  user.updateRole(userId,admin_id, 'user',prev_role, function(result){
      if (result == 1)
        res.send({status: 1});
      else res.send({status: 0});
  });
});

router.get('/addAdmin', function (req, res) {
  var userEmail = req.query.email;
  var admin_id = req.session.userId;

  user.setToAdmin(userEmail,admin_id, function(affectedRows, changedRows){
      if (changedRows == 1)
        res.send({status: 1});
      else res.send({status: 0});
  });
});

router.get('/addStaff', function (req, res) {
  var userEmail = req.query.email;
  var admin_id = req.session.userId;

  user.setToStaff(userEmail,admin_id, function(affectedRows, changedRows){
      if (changedRows == 1)
        res.send({status: 1});
      else res.send({status: 0});
  });
});

router.post('/changePass', function (req, res) {
  var  userInfo = req.body;
  var admin_id = req.session.userId;
  user.updatePass(userInfo.id,userInfo.pass, admin_id, function(changedRows){
      if (changedRows == 1)
        res.send({status: 1});
      else res.send({status: 0});
  });
});

router.post('/changeMyPass', function (req, res) {
  var newPass = req.body.pass;
  var userId = req.session.userId;
  console.log(userId);
  user.changeMyPass(userId, newPass, function(changedRows){
      if (changedRows == 1)
        res.send({status: 1});
      else res.send({status: 0});
  });
});

router.get('/addCode', (req, res)=> {
  var percent = req.query.percent;
  var start = req.query.start;
  var end = req.query.end;
  console.log(req.query.start);
  console.log(start);
  console.log(end);
  code.add({percent, start, end}, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/removeCode', (req,res) => {
  var cno = req.query.cno;
  code.removeByNo(cno, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/markInvalid', (req,res)=> {
  var cno = req.query.cno;
  code.markInvalid(cno, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

// Restuarant routes
router.get('/addRest', (req, res)=> {
  var name = req.query.name;
  var opening_hr = req.query.opening_hr;
  var close_hr = req.query.close_hr;
  var cuisine = req.query.cuisine;
  var phone = req.query.phone;

  rest.add({name, opening_hr, close_hr, cuisine, phone}, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/removeRest', (req, res)=> {
  var restId = req.query.id;
  rest.remove(restId, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/editName',(req,res)=>{
  var rest_id = req.query.rest_id;
  var name = req.query.name;

  rest.editName(rest_id, name, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/editCuisine',(req,res)=>{
  var rest_id = req.query.rest_id;
  var cuisine = req.query.cuisine;

  rest.editCuisine(rest_id, cuisine, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/editOpenHr',(req,res)=>{
  var rest_id = req.query.rest_id;
  var open_hr = req.query.open_hr;

  rest.editOpenHr(rest_id, open_hr, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/editCloseHr',(req,res)=>{
  var rest_id = req.query.rest_id;
  var close_hr = req.query.close_hr;

  rest.editCloseHr(rest_id, close_hr, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/editPhone',(req,res)=>{
  var rest_id = req.query.rest_id;
  var phone = req.query.phone_no;

  rest.editPhone(rest_id, phone, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/editStreet',(req,res)=>{
  var rest_id = req.query.rest_id;
  var street_name = req.query.street_name;

  rest.editStreet(rest_id, street_name, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/editAddr',(req,res)=>{
  var rest_id = req.query.rest_id;
  var district = req.query.district;
  var city = req.query.city;

  rest.editAddr(rest_id, district, city, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});
// Menue Routes

router.get('/addMenue', (req,res)=>{
  var menueInfo = {}
  menueInfo.start_hr = req.query.start_hr;
  menueInfo.end_hr = req.query.end_hr;
  menueInfo.menue_type = req.query.menue_type;
  menueInfo.rest_id = req.query.rest_id;

  menue.add(menueInfo, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});

  });

});

router.get('/removeMenue', (req,res)=> {
  var type_id = req.query.type_id;
  var rest_id = req.query.rest_id;
  menue.remove({type_id,rest_id}, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.post('/editMenue', (req,res)=> {
  var menueInfo = req.body;

  menue.edit(menueInfo, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });

});
// Item Routes

router.get('/removeItem', (req,res) => {
  var item_id = req.query.id;
  var menue_type = req.query.type_id;
  var rest_id = req.query.rest_id;

  console.log(item_id);
  console.log(menue_type);
  console.log(rest_id);

  item.remove({item_id, menue_type, rest_id}, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/addItem', (req,res)=> {
  var itemInfo = {};
  itemInfo.menue_type = req.query.menue_type;
  itemInfo.rest_id    = req.query.rest_id;
  itemInfo.name       = req.query.name;

  item.add(itemInfo, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });

});

router.post('/editItem', (req,res)=> {
  var itemInfo = req.body;

  item.edit(itemInfo, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

// Deleivery area
router.get('/removeDel', (req,res)=> {
  var restId = req.query.restId;
  var district = req.query.district;
  var city = req.query.city;
  del.remove(restId, district, city, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.get('/addDel', (req,res)=> {
  var areaInfo = {};
  areaInfo.rest_id = req.query.rest_id;
  areaInfo.district = req.query.district;
  areaInfo.city = req.query.city;
  areaInfo.charge = req.query.charge;

  del.add(areaInfo, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});

router.post('/editDel', (req,res)=> {
  var areaInfo = req.body;
  console.log(areaInfo);
  del.edit(areaInfo, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });
});


// restaurant discount
router.get('/removeRestDisc', (req,res)=>{
  var disc_id = req.query.disc_id;
  console.log(disc_id);
  rest_disc.remove(disc_id, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });

});

router.get('/addRestDisc', (req,res)=>{
  var discInfo = {};

  discInfo.rest_id = req.query.rest_id;
  discInfo.start_date = req.query.start_date;
  discInfo.end_date = req.query.end_date;
  discInfo.amount = req.query.amount;

  rest_disc.add(discInfo, function(result){
    if(result == 1)
      res.send({status: 1});
    else res.send({status: 0});
  });

});
module.exports = router;
