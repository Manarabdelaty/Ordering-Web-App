var sqlconnect = require('./db').connection;

module.exports = {
  getByRest,
  getArea,
  remove,
  add,
  edit
}

function getByRest(restId, cb){
  var sql = `SELECT a.district, a.city, ra.charge from rest_area ra, area a \
             WHERE rest_id=${restId} AND \
             ra.code = a.code`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getArea(cb){
  var sql = `SELECT CONCAT(district ,' ', city) as district from area`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    console.log(result);
    cb(result);
  });
}

function remove(rest_id, district, city, cb){
  console.log({rest_id, district, city});
  var sql = `DELETE from rest_area WHERE rest_id=${rest_id} AND \
             code = (SELECT code from area WHERE district='${district}' AND city='${city}')`;

  console.log(sql);
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.affectedRows);
  });
}

function add(areaInfo, cb){
  var sql = `INSERT INTO rest_area (code, rest_id, charge) VALUES (\
                (SELECT code from area WHERE district=${areaInfo.district} AND city=${areaInfo.city}),\
                ${areaInfo.rest_id},\
                ${areaInfo.charge}\
  )`;
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.affectedRows);
  });
}

function edit(areaInfo,cb){
  var sql = `UPDATE rest_area SET charge =${areaInfo.charge} WHERE code = \
                  (SELECT code from area WHERE district='${areaInfo.district}' AND city='${areaInfo.city}') AND\
                  rest_id = ${areaInfo.rest_id}`;
  
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.affectedRows);
  });
}
