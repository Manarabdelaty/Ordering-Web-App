var express = require('express');
var schema = require('../db/schema');
var db = require('../db/db');
var rest = require('../db/rest');
var del = require('../db/del');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('express-handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
  secret: 'secret session key',
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
  name: 'session cookie name'
}));


/*
// express session to store user id
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));*/

// load static files
app.use('/public',express.static('public'));
app.use('/jquery',express.static('jquery'));


// homeMiddleware
function homeMiddleware (req, res, next) {
  if (req.session.userId){
    var isAdmin = (req.session.user===0);
    var isStaff = (req.session.user===1);
    var isUser  =  (req.session.user ===2);

    del.getArea(function(area){
      rest.getCuisines(function(cuisine){
        rest.getNames(function(rest){
          res.render('home', {rest:rest, cuisine: cuisine, area:area, isAdmin: isAdmin, isStaff: isStaff, isUser: isUser});
        });
      });
    });

  }
  else res.send("NOT authorized");
}

app.get('/', homeMiddleware);

/*app.get('/', homeMiddleware,  (req, res)=>{
  if (req.session.userId)
  del.getArea(function(area){
    rest.getCuisines(function(cuisine){
      rest.getNames(function(rest){
        res.render('home', {rest:rest, cuisine: cuisine, area:area});
      });
    });
  });
  else res.send("NOT authorized");
});*/

db.createTables();

app.use('/', require('./auth'));
app.use('/', require('./admin'));
app.use('/', require('./profile'));
app.use('/', require('./home'));
app.use('/', require('./cart'));
app.use('/', require('./staff'));



module.exports = app;
