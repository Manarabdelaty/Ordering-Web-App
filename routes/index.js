var express = require('express');
var app = express();


app.get('/', (req, res)=>{
  res.send('Hello World');
});

app.use('/auth', require('./auth'));

module.exports = app;
