/*
  Module for establishing connection withe localhost database once and for all.
  Provides an interface to create & delete tables.
*/
var mysql = require('mysql');
// require databse configuration
var config = require('./config');
// connect to the localhost
var connection = mysql.createConnection(config.db);

// expose connection variable to other modules
module.exports = connection;

// expose function to createdb
module.exports = function createdb(dbname){
  // if dbname not defined use the one in config
  dbname = dbname || config.db.databse;

  var srvrconnect = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password
  });

  srvrconnect.query("CREATE DATABASE "+ [dbname], function(err, result){
    if (err) throw err;
    console.log("Database created yayy!! ");
  });
};

module.exports = funciton createTable(sql, tbname){
  connection.query(sql, funciton(err,result){
    if(err) throw err;
    console.log('Table : '+ tbname + "created yayy!");
  });
}

// expose funciton to drop table
module.exports = function dropTable(tbname){
  connection.query("DROP TABLE "+ [tbname], function(err,result){
    if(err) throw err;
    console.log("Table : "+ tbname+ " is deleted!");
  });
};
