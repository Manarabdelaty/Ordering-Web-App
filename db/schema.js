var sqlconnect = require('./db');




// user entity table create function
var users = ()=>{
  var sql = "CREATE TABLE user ( id INT AUTO_INCREMENT PRIMARY KEY,\
                                 name VARCHAR(255) NOT NULL,\
                                 email VARCHAR(94) NOT NULL,\
                                 password VARCHAR(255) NOT NULL,\
                                 status INT(1) NOT NULL,\
                                 bdate DATE NOT NULL )";
  return sql;
};
