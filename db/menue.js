var sqlconnect = require('./db').connection;

module.exports = {
  getByRest,
  add,
  remove,
  getType,
  edit,
  viewActive
}

function getByRest(restId, cb){
  var sql = `SELECT t.name, t.id as type_id, m.rest_id, m.start_hr, m.end_hr from menue m, menue_type t \
                  WHERE m.type_id = t.id AND \
                        m.rest_id=${restId}`;
  console.log(sql);
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getType(cb){
  var sql = 'SELECT name from menue_type';
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}
function add(menueInfo, cb){
  console.log(menueInfo);
  var sql = `INSERT INTO menue (type_id, rest_id, start_hr, end_hr) VALUES(\
                                (SELECT id from menue_type WHERE name='${menueInfo.menue_type}'),\
                                ${menueInfo.rest_id},'${menueInfo.start_hr}','${menueInfo.end_hr}')`;
  console.log(sql);
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function edit(menueInfo, cb){
  var sql= `UPDATE menue SET start_hr='${menueInfo.start_hr}',\
                  end_hr='${menueInfo.end_hr}',\
                  type_id=(SELECT id from menue_type WHERE name='${menueInfo.menue_type}')\
                  WHERE rest_id=${menueInfo.rest_id} AND\
                        type_id=${menueInfo.type_id}`;
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.affectedRows);
  });
}
function remove(menuePk, cb){
  var sql = `DELETE from menue WHERE \
                         type_id=${menuePk.type_id} AND\
                         rest_id =${menuePk.rest_id}`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function viewActive(rest_id, cb){
  var sql = `SELECT t.name, m.rest_id from menue m, menue_type t \
                  WHERE m.type_id = t.id AND \
                        m.rest_id=${rest_id} AND \
                        TIME(m.end_hr) > CURRENT_TIME AND\
                        TIME(m.start_hr) <= CURRENT_TIME`;

  console.log(sql);
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result);
  });
}
