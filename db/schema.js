

// user entity table create function
var user = ()=>{
  var sql = "CREATE TABLE IF NOT EXISTS  user ( id INT AUTO_INCREMENT PRIMARY KEY,\
                                 name VARCHAR(255) NOT NULL,\
                                 email VARCHAR(94) NOT NULL UNIQUE,\
                                 password VARCHAR(255) NOT NULL,\
                                 bdate DATE NOT NULL,\
                                 status INT(1) NOT NULL )";
  return sql;
};

var user_role = () => {
  var sql = "CREATE TABLE IF NOT EXISTS user_role ( user_id INT,\
                                 role VARCHAR(10) NOT NULL,\
                                 FOREIGN KEY (user_id) REFERENCES user(id),\
                                 CONSTRAINT PK_Person PRIMARY KEY (user_id,role),\
  )";

  return sql;
}

var discountCode = () => {
  var sql  = "CREATE TABLE IF NOT EXISTS discount_code (cno INT AUTO_INCREMENT PRIMARY KEY,\
                                  percent INT NOT NULL, \
                                  start DATETIME NOT NULL, \
                                  end DATETIME NOT NULL)";
  return sql;
}

var restaurant = () => {
  var sql = "CREATE TABLE IF NOT EXISTS restaurant (id INT AUTO_INCREMENT, \
                                        name VARCHAR(30) NOT NULL,\
                                        cuisine_id INT NOT NULL, \
                                        opening_hr TIME NOT NULL,\
                                        close_hr TIME NOT NULL,\
                                        phone_no CHAR(10) NOT NULL,\
                                        street_name VARCHAR(20) NOT NULL,\
                                        area_code INT,\
                                        CONSTRAINT restaurant_cuisine_id_fk FOREIGN KEY (cuisine_id) REFERENCES cuisine(id) ON DELETE CASCADE,\
                                        CONSTRAINT restaurant_area_code_fk FOREIGN KEY(area_code) REFERENCES area(code),\
                                        CONSTRAINT restaurant_id_pk PRIMARY KEY(id)\
  )";
  return sql;
}

var cuisine = () => {
  var sql = "CREATE TABLE IF NOT EXISTS cuisine (id INT AUTO_INCREMENT PRIMARY KEY, \
                                        name VARCHAR(30) NOT NULL)";
  return sql;
}

var menue_type = () => {
  var sql = "CREATE TABLE IF NOT EXISTS menue_type (id INT AUTO_INCREMENT,\
                                        name VARCHAR(20) NOT NULL,\
                                        CONSTRAINT menue_type_id_pk PRIMARY KEY(id),\
                                        CONSTRAINT menue_type_name_uq UNIQUE(name))";
  return sql;

}
var menue = () => {
  var sql = "CREATE TABLE IF NOT EXISTS menue (type_id INT, \
                                        rest_id INT, \
                                        start_hr TIME NOT NULL,\
                                        end_hr TIME NOT NULL,\
                                        CONSTRAINT menue_type_restId_pk PRIMARY KEY(type_id,rest_id),\
                                        CONSTRAINT menue_rest_id_fk FOREIGN KEY(rest_id) REFERENCES restaurant(id) ON DELETE CASCADE,\
                                        CONSTRAINT menue_type_fk FOREIGN KEY(type_id) REFERENCES menue_type(id) ON DELETE CASCADE\
                                        )";

  return sql;
}

var item = () => {
  var sql = "CREATE TABLE IF NOT EXISTS item (id INT AUTO_INCREMENT, \
                                        name VARCHAR(20) NOT NULL,\
                                        menue_type INT,\
                                        rest_id INT,\
                                        CONSTRAINT item_id_menue_id_pk PRIMARY KEY(id, menue_type, rest_id), \
                                        CONSTRAINT item_menue_type_fk FOREIGN KEY(menue_type) REFERENCES menue(type_id) ON DELETE CASCADE,\
                                        CONSTRAINT item_rest_id_fk FOREIGN KEY(rest_id) REFERENCES menue(rest_id) ON DELETE CASCADE,\
                                        )";
  return sql;
}

var item_config = () => {
  var sql = "CREATE TABLE IF NOT EXISTS item_config (id INT AUTO_INCREMENT,\
                                        name VARCHAR(20) NOT NULL,\
                                        item_id INT,\
                                        menue_type INT,\
                                        rest_id INT,\
                                        price INT, \
                                        CONSTRAINT item_config_pk PRIMARY KEY(id, item_id, menue_type, rest_id),\
                                        CONSTRAINT item_config_item_id_fk FOREIGN KEY(item_id) REFERENCES item(id) ON DELETE CASCADE,\
                                        CONSTRAINT item_config_menue_type_fk FOREIGN KEY(menue_type) REFERENCES item(menue_type) ON DELETE CASCADE,\
                                        CONSTRAINT item_config_rest_id_fk FOREIGN KEY(rest_id) REFERENCES item(rest_id) ON DELETE CASCADE,\
                                      )";
  return sql;

}

var  area = () => {
  var sql = "CREATE TABLE IF NOT EXISTS area (code INT AUTO_INCREMENT,\
                                        district VARCHAR(15) NOT NULL,\
                                        city VARCHAR(15) NOT NULL,\
                                        CONSTRAINT area_code_pk PRIMARY KEY(code))";
  return sql;
}

var rest_area = () => {
  var sql= "CREATE TABLE IF NOT EXISTS rest_area(code INT,\
                                rest_id INT,\
                                charge FLOAT(5,2),\
                                CONSTRAINT rest_area_code_rest_id_pk PRIMARY KEY(code,rest_id),\
                                CONSTRAINT rest_area_code_fk FOREIGN KEY(code) REFERENCES area(code) ON DELETE CASCADE,\
                                CONSTRAINT rest_area_rest_id FOREIGN KEY(rest_id) REFERENCES restaurant(id) ON DELETE CASCADE)";
  return sql;
}

var timely_discount = () => {
  var sql = "CREATE TABLE IF NOT EXISTS timely_discount (id INT AUTO_INCREMENT, \
                                        start_date DATETIME NOT NULL,\
                                        end_date DATETIME NOT NULL,\
                                        amount INT NOT NULL,\
                                        rest_id INT,\
                                        CONSTRAINT timely_discount_id_pk PRIMARY KEY(id),\
                                        CONSTRAINT timely_discount_rest_id_fk FOREIGN KEY(rest_id) REFERENCES restaurant(id) ON DELETE CASCADE) ";
  return sql;
}

/*var restaurant_discount = () => {
  var sql = "CREATE TABLE IF NOT EXISTS restaurant_discount (disc_id INT,\
                                        rest_id INT, \
                                        CONSTRAINT restaurant_discount_pk PRIMARY KEY(disc_id, rest_id),\
                                        CONSTRAINT restaurant_discount_disc_id_fk FOREIGN KEY (disc_id) REFERENCES timely_discount(id),\
                                        CONSTRAINT restaurant_discount_rest_id_fk FOREIGN KEY (rest_id) REFERENCES restaurant(id))";
  return sql;
}*/

var user_address = () => {
  var sql = "CREATE TABLE IF NOT EXISTS user_address ( id INT AUTO_INCREMENT,\
                                                       user_id INT, \
                                                       street_name VARCHAR(20) NOT NULL, \
                                                       apt_no INT NOT NULL,\
                                                       area_code INT,\
                                                       CONSTRAINT user_address_area_code_fk FOREIGN KEY(area_code) REFERENCES area(code),\
                                                       CONSTRAINT user_address_id_pk PRIMARY KEY(id),\
                                                       CONSTRAINT user_address_user_id_fk FOREIGN KEY(user_id) REFERENCES user(id))";
  return sql;
}

var tax = () => {
  var sql = "CREATE TABLE IF NOT EXISTS tax(amount INT)";
  return sql;
}

var admin_action = ()=>{
  var sql="CREATE TABLE IF NOT EXISTS admin_action (id INT AUTO_INCREMENT,\
                                                    name VARCHAR(20),\
                                                    CONSTRAINT admin_action_id_pk PRIMARY KEY(id))"
}

var record = () => {
  var sql ="CREATE TABLE IF NOT EXISTS record (id INT AUTO_INCREMENT,\
                                      action_id INT NOT NULL,\
                                      time TIMESTAMP NOT NULL,\
                                      user_id INT NOT NULL,\
                                      admin_id INT NOT NULL,\
                                      CONSTRAINT record_id_pk PRIMARY KEY(id),\
                                      CONSTRAINT record_user_id_fk FOREIGN KEY(user_id) REFERENCES user(id),\
                                      CONSTRAINT record_admin_id_fk FOREIGN KEY(admin_id) REFERENCES user(id),\
                                      CONSTRAINT record_action_id_fk FOREIGN KEY(action_id) REFERENCES admin_action(id))";
  return sql;
}

module.exports = {
  user,
  user_role,
  discountCode,
  restaurant,
  cuisine,
  menue_type,
  menue,
  item,
  item_config,
  area,
  rest_area,
  timely_discount,
  user_address,
  tax,
  admin_action,
  record
};
