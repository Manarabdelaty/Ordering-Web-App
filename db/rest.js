var con = require('./db').connection;

module.exports = {
  add,
  remove,
  getById,
  getInfo,
  getAll,
  getCuisines,
  getNames,
  filterByCuisine,
  filterByArea,
  editName,
  editPhone,
  editOpenHr,
  editCloseHr,
  editCuisine,
  editStreet,
  editAddr
}

function add(restInfo, cb){
  var sql =  `INSERT INTO restaurant (name, cuisine_id, opening_hr, close_hr, phone_no)\
                        VALUES (${restInfo.name} , \
                                (SELECT id from cuisine c WHERE c.name = ${restInfo.cuisine}),\
                                ${restInfo.opening_hr},\
                                ${restInfo.close_hr},\
                                ${restInfo.phone})`;



  console.log(sql);
  console.log(restInfo);

  con.query(sql, function(err, result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function getAll(cb){
  var sql = `SELECT r.id,r.name , r.opening_hr, r.close_hr, r.phone_no, c.name as cuisine \
             from restaurant r , cuisine c \
             WHERE c.id = r.cuisine_id \ `;

  con.query(sql, function(err, result){
    if(err) throw err;
    console.log(result);
    cb(result);
  });
}

function getById(restId, cb){
  var sql =`SELECT * from restaurant WHERE id=${restId}`;
  con.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}
function getInfo(restId, cb){
  var sql =`SELECT r.name,c.name as cuisine, opening_hr, close_hr, phone_no, r.street_name, a.district, a.city \
            from restaurant r, cuisine c, area a\
            WHERE r.id=${restId} AND\
            r.cuisine_id = c.id AND\
            a.code= r.area_code`;

  con.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}
function getNames(cb){
  var sql= `SELECT id, name from restaurant`;
  con.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}
function getCuisines(cb){
  var sql = `SELECT name from cuisine`;
  con.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function filterByCuisine(cuisine,cb){
  var sql = `SELECT name,id from restaurant WHERE cuisine_id = (\
                      SELECT c.id from cuisine c WHERE c.name = '${cuisine}'\
  )`;
  console.log(sql);
  con.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}
function filterByArea(areaInfo, cb){
  areaInfo =  areaInfo.split(" ");
  var district = areaInfo[0];
  var city = areaInfo[1];

  var sql=`SELECT name, id from restaurant WHERE id IN (\
                  SELECT rest_id from rest_area WHERE code = \
                      (SELECT code from area WHERE district='${district}' AND city='${city}')\
                  )`;
  con.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}
function remove(restId, cb){
  var sql = `DELETE from restaurant WHERE id = ${restId}`;
  console.log(sql);
  con.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function editName(restId, name, cb){
  var sql=`UPDATE restaurant SET name=${name} WHERE id=${restId}`;
  con.query(sql, function(err,result){
    if(err) throw err;
    console.log(result);
    cb(result.changedRows);
  });
}
function editPhone(restId, phone_no, cb){
  console.log(phone_no);
  var sql=`UPDATE restaurant SET phone_no=${phone_no} WHERE id=${restId}`;
  console.log(sql);
  con.query(sql, function(err,result){
    if(err) throw err;
    cb(result.changedRows);
  });
}
function editOpenHr(restId, open_hr, cb){
  var sql=`UPDATE restaurant SET opening_hr=${open_hr} WHERE id=${restId}`;
  con.query(sql, function(err,result){
    if(err) throw err;
    cb(result.changedRows);
  });
}

function editCloseHr(restId, close_hr, cb){
  var sql=`UPDATE restaurant SET close_hr=${close_hr} WHERE id=${restId}`;
  con.query(sql, function(err,result){
    if(err) throw err;
    console.log(result);
    cb(result.changedRows);
  });
}

function editCuisine(restId, cuisine, cb){
  var sql=`UPDATE restaurant SET cuisine_id=(SELECT id from cuisine WHERE name = ${cuisine}) WHERE id=${restId}`;
  con.query(sql, function(err,result){
    if(err) throw err;
    cb(result.changedRows);
  });
}

function editStreet(restId, street_name, cb){
  var sql=`UPDATE restaurant SET street_name=${street_name} WHERE id=${restId}`;
  console.log(sql);
  con.query(sql, function(err,result){
    if(err) throw err;
    cb(result.changedRows);
  });
}

function editAddr(restId, district, city, cb){
  var sql=`UPDATE restaurant SET area_code=(SELECT code from area WHERE district=${district} AND city=${city}) WHERE id=${restId}`;
  console.log(sql);
  con.query(sql, function(err,result){
    if(err) throw err;
    cb(result.changedRows);
  });
}
