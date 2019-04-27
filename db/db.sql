

CREATE TABLE IF NOT EXISTS  user ( id INT AUTO_INCREMENT PRIMARY KEY,
                                 name VARCHAR(255) NOT NULL,
                                 email VARCHAR(94) NOT NULL UNIQUE,
                                 password VARCHAR(255) NOT NULL,
                                 bdate DATE NOT NULL,
                                 status INT(1) NOT NULL );



CREATE TABLE IF NOT EXISTS user_role ( user_id INT,
                                role VARCHAR(10) NOT NULL,
                                FOREIGN KEY (user_id) REFERENCES user(id),
                                CONSTRAINT PK_Person PRIMARY KEY (user_id,role),
);

CREATE TABLE IF NOT EXISTS discount_code (cno INT AUTO_INCREMENT PRIMARY KEY,
                                  percent INT NOT NULL,
                                  start DATETIME NOT NULL,
                                  end DATETIME NOT NULL);

CREATE TABLE IF NOT EXISTS restaurant (id INT AUTO_INCREMENT,
                                        name VARCHAR(30) NOT NULL,
                                        cuisine_id INT NOT NULL,
                                        opening_hr TIME NOT NULL,
                                        close_hr TIME NOT NULL,
                                        phone_no CHAR(10) NOT NULL,
                                        street_name VARCHAR(20) NOT NULL,
                                        area_code INT,
                                        CONSTRAINT restaurant_cuisine_id_fk FOREIGN KEY (cuisine_id) REFERENCES cuisine(id) ON DELETE CASCADE,
                                        CONSTRAINT restaurant_area_code_fk FOREIGN KEY(area_code) REFERENCES area(code),
                                        CONSTRAINT restaurant_id_pk PRIMARY KEY(id));

// CUISINE
CREATE TABLE IF NOT EXISTS cuisine (id INT AUTO_INCREMENT PRIMARY KEY,
                                        name VARCHAR(30) NOT NULL)
// MENUE TYPE
CREATE TABLE IF NOT EXISTS menue_type (id INT AUTO_INCREMENT,
                                        name VARCHAR(20) NOT NULL,
                                        CONSTRAINT menue_type_id_pk PRIMARY KEY(id),
                                        CONSTRAINT menue_type_name_uq UNIQUE(name));

// MENUE
CREATE TABLE IF NOT EXISTS menue (type_id INT,
                                        rest_id INT,
                                        start_hr TIME NOT NULL,
                                        end_hr TIME NOT NULL,
                                        CONSTRAINT menue_type_restId_pk PRIMARY KEY(type_id,rest_id),
                                        CONSTRAINT menue_rest_id_fk FOREIGN KEY(rest_id) REFERENCES restaurant(id) ON DELETE CASCADE,
                                        CONSTRAINT menue_type_fk FOREIGN KEY(type_id) REFERENCES menue_type(id) ON DELETE CASCADE
                                      );

// ITEM
CREATE TABLE IF NOT EXISTS item (id INT AUTO_INCREMENT,
                                        name VARCHAR(20) NOT NULL,
                                        menue_type INT,
                                        rest_id INT,
                                        CONSTRAINT item_id_menue_id_pk PRIMARY KEY(id, menue_type, rest_id),
                                        CONSTRAINT item_menue_type_fk FOREIGN KEY(menue_type) REFERENCES menue(type_id) ON DELETE CASCADE,
                                        CONSTRAINT item_rest_id_fk FOREIGN KEY(rest_id) REFERENCES menue(rest_id) ON DELETE CASCADE
                                        );
// ITEM CONFIG
CREATE TABLE IF NOT EXISTS item_config (id INT AUTO_INCREMENT,
                                        name VARCHAR(20) NOT NULL,
                                        price FLOAT(7,2) NOT NULL,
                                        item_id INT,
                                        menue_type INT,
                                        rest_id INT,
                                        CONSTRAINT item_config_pk PRIMARY KEY(id, item_id, menue_type, rest_id),
                                        CONSTRAINT item_config_item_id_fk FOREIGN KEY(item_id) REFERENCES item(id) ON DELETE CASCADE,
                                        CONSTRAINT item_config_menue_type_fk FOREIGN KEY(menue_type) REFERENCES item(menue_type) ON DELETE CASCADE,
                                        CONSTRAINT item_config_rest_id_fk FOREIGN KEY(rest_id) REFERENCES item(rest_id) ON DELETE CASCADE
                                      );

// AREA
CREATE TABLE IF NOT EXISTS area (code INT AUTO_INCREMENT,
                                district VARCHAR(15) NOT NULL,
                                city VARCHAR(15) NOT NULL,
                                CONSTRAINT area_code_pk PRIMARY KEY(code),
                                CONSTRAINT area_district_city UNIQUE(district, city));

// restaurant area
CREATE TABLE IF NOT EXISTS rest_area(code INT,
                        rest_id INT,
                        charge FLOAT(5,2),
                        CONSTRAINT rest_area_code_rest_id_pk PRIMARY KEY(code,rest_id),
                        CONSTRAINT rest_area_code_fk FOREIGN KEY(code) REFERENCES area(code) ON DELETE CASCADE,
                        CONSTRAINT rest_area_rest_id FOREIGN KEY(rest_id) REFERENCES restaurant(id) ON DELETE CASCADE);

// Timely Discount
CREATE TABLE IF NOT EXISTS timely_discount (id INT AUTO_INCREMENT,
                        start_date DATETIME NOT NULL,
                        end_date DATETIME NOT NULL,
                        amount INT NOT NULL,
                        rest_id INT,
                        CONSTRAINT timely_discount_id_pk PRIMARY KEY(id),
                        CONSTRAINT timely_discount_rest_id_fk FOREIGN KEY(rest_id) REFERENCES restaurant(id) ON DELETE CASCADE);



// user address
CREATE TABLE IF NOT EXISTS user_address ( id INT AUTO_INCREMENT,
                          user_id INT,
                          street_name VARCHAR(20) NOT NULL,
                          apt_no INT NOT NULL,
                          area_code INT,
                          CONSTRAINT user_address_area_code_fk FOREIGN KEY(area_code) REFERENCES area(code),
                          CONSTRAINT user_address_id_pk PRIMARY KEY(id),
                          CONSTRAINT user_address_user_id_fk FOREIGN KEY(user_id) REFERENCES user(id));

// Tax
CREATE TABLE IF NOT EXISTS tax(amount INT);

// ADMIN ACTION
CREATE TABLE IF NOT EXISTS admin_action (id INT AUTO_INCREMENT,
                          name VARCHAR(20),
                          CONSTRAINT admin_action_id_pk PRIMARY KEY(id));


// RECORD
CREATE TABLE IF NOT EXISTS record (id INT AUTO_INCREMENT,
                                      action_id INT NOT NULL,
                                      time TIMESTAMP NOT NULL,
                                      user_id INT NOT NULL,
                                      admin_id INT NOT NULL,
                                      CONSTRAINT record_id_pk PRIMARY KEY(id),
                                      CONSTRAINT record_user_id_fk FOREIGN KEY(user_id) REFERENCES user(id),
                                      CONSTRAINT record_admin_id_fk FOREIGN KEY(admin_id) REFERENCES user(id),
                                      CONSTRAINT record_action_id_fk FOREIGN KEY(action_id) REFERENCES admin_action(id));

// order
CREATE TABLE IF NOT EXISTS orders(id INT AUTO_INCREMENT,
                           user_id INT,
                           user_address INT,
                           status VARCHAR(20) NOT NULL,
                           time TIMESTAMP NOT NULL,
                           total FLOAT(5,2) NOT NULL,
                           CONSTRAINT order_id_pk PRIMARY KEY(id),
                           CONSTRAINT order_user_id_fk FOREIGN KEY(user_id) REFERENCES user(id),
                           CONSTRAINT order_user_address_fk FOREIGN KEY(user_address) REFERENCES user_address(id))


// order Items
CREATE TABLE IF NOT EXISTS order_item(order_id INT,
                           rest_id INT,
                           menue_type INT,
                           item_id INT,
                           config_id INT,
                           comment VARCHAR(150),
                           CONSTRAINT order_item_pk PRIMARY KEY(order_id, rest_id, menue_type, item_id,config_id),
                           CONSTRAINT order_item_order_id_fk FOREIGN KEY(order_id) REFERENCES orders(id),
                           CONSTRAINT order_item_config_id_fk FOREIGN KEY(config_id) REFERENCES item_config(id),
                           CONSTRAINT order_item_rest_id_fk FOREIGN KEY(rest_id) REFERENCES item_config(rest_id),
                           CONSTRAINT order_item_menue_type_fk FOREIGN KEY(menue_type) REFERENCES item_config(menue_type),
                           CONSTRAINT order_item_item_id_fk FOREIGN KEY(item_id) REFERENCES item_config(item_id))
