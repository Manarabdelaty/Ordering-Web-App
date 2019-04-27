/*
  Module for establishing connection withe localhost database once and for all.
  Provides an interface to create & delete tables.
*/
var mysql = require('mysql');
// require databse configuration
var config = require('./config');
var schema = require('./schema');
// connect to the localhost
var connection = mysql.createConnection(config.db);

// expose connection variable to other modules
module.exports = {
   connection,
   createdb,
   createTable,
   dropTable,
   createTables
};


// expose function to createdb
function createdb(dbname){

  // if dbname not defined use the one in config
  dbname = dbname || config.db.databse;

  var srvrconnect = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password
  });
  console.log("bere");
  console.log(config.db.databse);
  srvrconnect.query("CREATE DATABASE "+ [dbname], function(err, result){
    if (err){
      console.log("Error creating db");
      throw err;
    }
    console.log("Database created yayy!! ");
  });
};

function createTable (sql, tbname){

  connection.query(sql, function(err,result){
     if (err){
       console.log("Error Creating Tabel: ${tbname}");
       throw err;
    }
    console.log("table created")});

};

function dropTable(tbname){
  connection.query("DROP TABLE "+ [tbname], function(err,result){
    if(err) {
      console.log("ERROR in dropping table");
      throw err;
    }
    console.log("Table : "+ tbname+ " is deleted!");
  });
};

// Initialize Database with tables
function createTables(){
  console.log(schema);
  createTable(schema.user(), 'user');
}
