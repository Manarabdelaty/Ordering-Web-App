
INSERT INTO user (name, email, password, bdate) VALUES ('manar','manarabdelatty@aucegypt.edu','$2b$10$9Q83IUdn3NGIP9V0zJTHi.gvekNYgPypgFv2ehk9/jUKGsg/myy2.','19-3-1997');
INSERT INTO user (name, email, password, bdate)VALUES ('Aya','aya@aucegypt.edu','$2b$10$9Q83IUdn3NGIP9V0zJTHi.gvekNYgPypgFv2ehk9/jUKGsg/myy2.','19-2-1997');
INSERT INTO user (name, email, password, bdate) VALUES ('Amal','amal@aucegypt.edu','$2b$10$9Q83IUdn3NGIP9V0zJTHi.gvekNYgPypgFv2ehk9/jUKGsg/myy2.','19-1-1997');
INSERT INTO user (name, email, password, bdate) VALUES ('Adel','adel@aucegypt.edu','$2b$10$9Q83IUdn3NGIP9V0zJTHi.gvekNYgPypgFv2ehk9/jUKGsg/myy2.','19-3-1997');
INSERT INTO user (name, email, password, bdate) VALUES ('kamal','kamal@aucegypt.edu','$2b$10$9Q83IUdn3NGIP9V0zJTHi.gvekNYgPypgFv2ehk9/jUKGsg/myy2.','14-5-1997');
INSERT INTO user (name, email, password, bdate) VALUES ('simo','simo@aucegypt.edu','$2b$10$9Q83IUdn3NGIP9V0zJTHi.gvekNYgPypgFv2ehk9/jUKGsg/myy2.','7-6-1997');


INSERT INTO user_role (user_id, role) VALUES (1,'admin');
INSERT INTO user_role (user_id, role) VALUES (2,'admin');
INSERT INTO user_role (user_id, role) VALUES (3,'staff');
INSERT INTO user_role (user_id, role) VALUES (4,'user');
INSERT INTO user_role (user_id, role) VALUES (5,'user');
INSERT INTO user_role (user_id, role) VALUES (6,'admin');


INSERT INTO area(district, city) VALUES ('venus', 'cairo');
INSERT INTO area(district, city) VALUES ('saturn', 'cairo');
INSERT INTO area(district, city) VALUES ('earth', 'cairo');
INSERT INTO area(district, city) VALUES ('jupiter', 'cairo');
INSERT INTO area(district, city) VALUES ('Uranus', 'cairo');



INSERT INTO discount_code (percent, start, end) VALUES (20,'2008-01-01 00:00:01','2008-02-01 00:00:01');
INSERT INTO discount_code (percent, start, end) VALUES (10,'2008-01-01 00:00:01','2008-02-01 00:00:01');
INSERT INTO discount_code (percent, start, end) VALUES (30,'2008-01-01 00:00:01','2008-02-01 00:00:01');
INSERT INTO discount_code (percent, start, end) VALUES (40,'2008-01-01 00:00:01','2008-02-01 00:00:01');
INSERT INTO discount_code (percent, start, end) VALUES (50,'2008-01-01 00:00:01','2008-02-01 00:00:01');
INSERT INTO discount_code (percent, start, end) VALUES (60,'2008-01-01 00:00:01','2008-02-01 00:00:01');


INSERT INTO cuisine(name) VALUES ('chinese');
INSERT INTO cuisine(name) VALUES ('Mexican');
INSERT INTO cuisine(name) VALUES ('Oriental');
INSERT INTO cuisine(name) VALUES ('Indian');
INSERT INTO cuisine(name) VALUES ('Japanese');


INSERT INTO restaurant(name, cuisine_id, opening_hr, close_hr, phone_no, street_name, area_code) VALUES ('Tamara',1,'10:00 AM','8:00 PM','1012233444', 'ikgr', 1);
INSERT INTO restaurant(name, cuisine_id, opening_hr, close_hr, phone_no, street_name, area_code) VALUES ('Wolk and Wolk',2,'10:00 AM','8:00 PM','1012233444', 'feee', 1);
INSERT INTO restaurant(name, cuisine_id, opening_hr, close_hr, phone_no, street_name, area_code) VALUES ('Mori Sushi',3,'10:00 AM','8:00 PM','1012233444', 'fee', 2);
INSERT INTO restaurant(name, cuisine_id, opening_hr, close_hr, phone_no, street_name, area_code) VALUES ('Mac',4,'10:00 AM','8:00 PM','1012233444', 'few', 3);
INSERT INTO restaurant(name, cuisine_id, opening_hr, close_hr, phone_no, street_name, area_code) VALUES ('Cook Door',5,'10:00 AM','8:00 PM','1012233444', 'e3e', 4);


INSERT INTO menue_type(name) VALUES ('Breakfast');
INSERT INTO menue_type(name) VALUES ('Lunch');
INSERT INTO menue_type(name) VALUES ('Dinner');


INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (1,1,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (2,1,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (3,1,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (1,3,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (2,3,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (3,4,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (1,4,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (2,4,'10:00 AM', '08:00 PM');
INSERT INTO menue(type_id, rest_id, start_hr, end_hr) VALUES (3,5,'10:00 AM', '08:00 PM');


INSERT INTO item_config(name) VALUES ('Sand');
INSERT INTO item_config(name) VALUES ('meal');
INSERT INTO item_config(name) VALUES ('dessert');


INSERT INTO item( name, price, menue_type, rest_id, config_id) VALUES ('sandwich', 2.05, 1,3,1);
INSERT INTO item( name, price, menue_type, rest_id, config_id) VALUES ('makrona', '2.05', 1,3,2);
INSERT INTO item( name, price, menue_type, rest_id, config_id) VALUES ('akl', '2.05', 1,3,3);
INSERT INTO item( name, price, menue_type, rest_id, config_id) VALUES ('chipsy', '2.05', 1,3,1);




INSERT INTO rest_area(code, rest_id, charge) VALUES (1,1,50);
INSERT INTO rest_area(code, rest_id, charge) VALUES (2,1,60);
INSERT INTO rest_area(code, rest_id, charge) VALUES (3,1,70);
INSERT INTO rest_area(code, rest_id, charge) VALUES (4,1,50);
INSERT INTO rest_area(code, rest_id, charge) VALUES (1,2,50);
INSERT INTO rest_area(code, rest_id, charge) VALUES (1,3,50);
INSERT INTO rest_area(code, rest_id, charge) VALUES (5,4,50);
INSERT INTO rest_area(code, rest_id, charge) VALUES (1,6,50);
INSERT INTO rest_area(code, rest_id, charge) VALUES (2,5,50);


INSERT INTO timely_discount (amount, start_date, end_date, rest_id) VALUES (20,'2008-01-01 00:00:01','2008-02-01 00:00:01', 1);
INSERT INTO timely_discount (amount, start_date, end_date, rest_id) VALUES (10,'2009-01-01 00:00:01','2008-02-01 00:00:01', 2);
INSERT INTO timely_discount (amount, start_date, end_date, rest_id) VALUES (40,'2006-01-01 00:00:01','2008-02-01 00:00:01', 3);
INSERT INTO timely_discount (amount, start_date, end_date, rest_id) VALUES (50,'2007-01-01 00:00:01','2019-02-01 00:00:01', 4);


INSERT INTO user_address(user_id, street_name, apt_no, area_code) VALUES (1,'whatever', 3,1);
INSERT INTO user_address(user_id, street_name, apt_no, area_code) VALUES (2,'whatever', 3,2);
INSERT INTO user_address(user_id, street_name, apt_no, area_code) VALUES (3,'whatever', 3,3);
INSERT INTO user_address(user_id, street_name, apt_no, area_code) VALUES (4,'whatever', 3,4);
INSERT INTO user_address(user_id, street_name, apt_no, area_code) VALUES (5,'whatever', 3,5);


INSERT INTO tax (amount) VALUES (20);


INSERT INTO admin_action (name) VALUES ('change pass');
INSERT INTO admin_action (name) VALUES ('add staff');
INSERT INTO admin_action (name) VALUES ('add admin');
INSERT INTO admin_action (name) VALUES ('delete staff');
INSERT INTO admin_action (name) VALUES ('delete admin');
