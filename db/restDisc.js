var sqlconnect = require('./db').connection;

module.exports = {
  getAll,
  getValid,
  add,
  remove,
  getByRest,
  getValidByRest
}

function getAll(cb){
  var sql=`SELECT tdisc.start_date, tdisc.end_date, tdisc.amount, rest.name  \
                  from restaurant_discount rest_disc, restaurant rest, timely_discount tdisc \
                  WHERE rest_disc.rest_id  = rest.id AND \
                  rest_disc.disc_id  = tdisc.id `;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getValid(cb){
  var sql=`SELECT tdisc.start_date, tdisc.end_date, tdisc.amount, rest.name  \
                  from restaurant_discount rest_disc, restaurant rest, timely_discount tdisc \
                  WHERE rest_disc.rest_id  = rest.id AND \
                  rest_disc.disc_id  = tdisc.id AND \
                  DATE(NOW()) < DATE(tdisc.end_date)`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getByRest(rest_id, cb){
  var sql=`SELECT id, amount, start_date, end_date from timely_discount WHERE rest_id=${rest_id}`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getValidByRest(rest_id, cb){
  var sql=`SELECT id, amount, start_date, end_date\
           from timely_discount\
           WHERE rest_id=${rest_id}\
           AND DATE(NOW()) < DATE(end_date)`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });

}
function add(discInfo, cb){
  var sql =`INSERT INTO timely_discount (start_date, end_date, amount, rest_id) VALUES (${discInfo.start_date},\
                                  ${discInfo.end_date},\
                                  ${discInfo.amount},\
                                  ${discInfo.rest_id})`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function remove(discId, cb){
  var sql = `DELETE from timely_discount WHERE  id=${discId}`;
  console.log(sql);
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}
