var sqlconnect = require('./db').connection;

module.exports = {
  getTax,
  add,
  getByUser,
  getUnProcessed,
  getInfo,
  getItems,
  cancel,
  updateStatus
}

function getTax(cb){
  var sql=`SELECT amount from tax`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result[0].amount);
  });
}

function add(orderInfo, cb){
  console.log(orderInfo);
  var sql= `INSERT INTO orders (user_id, user_address,status, total) VALUES (\
                                ${orderInfo.user_id},\
                                ${orderInfo.user_address},\
                                '${orderInfo.status}',\
                                ${orderInfo.total})`;

  var sql_items = `INSERT INTO order_item (order_id, rest_id, menue_type, item_id, config_id) VALUES ?`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    if(result.affectedRows == 1){
      console.log(orderInfo.items);
      for (var i=0; i<orderInfo.items.length; i++){
        console.log('here');
        orderInfo.items[i][0] = `${result.insertId}`;
      }
      console.log(orderInfo);
      console.log(sql_items);
      sqlconnect.query(sql_items, [orderInfo.items], function(err,res){
        if(err) throw err;
        cb(res.affectedRows);
      });
    }
    else{
      cb(result.changedRows);
    }
  });
}

function getByUser(user_id, cb){
  var sql= `SELECT * from orders WHERE user_id=${user_id}`;
  sqlconnect.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}

function getUnProcessed(cb){
  var sql=`SELECT * from orders WHERE status='processing'`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getInfo(order_id, cb){
  var sql=`SELECT o.status, o.total, ua.street_name, ua.apt_no, a.district, a.city \
           from orders o , user_address ua, area a \
           WHERE o.id=${order_id} AND\
                 ua.id = o.user_address AND\
                 ua.user_id = o.user_id AND\
                 a.code = ua.area_code`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getItems(order_id, cb){
  var sql=`SELECT o.comment , ic.name as config_name, i.name as item_name, r.name as rest_name, r.phone_no  \
           from order_item o, item_config ic, item i, restaurant r \
           WHERE o.order_id = ${order_id} AND\
           r.id = o.rest_id AND\
           o.config_id = ic.id AND\
           o.item_id = ic.item_id AND\
           o.menue_type = ic.menue_type AND\
           o.rest_id = ic.rest_id AND\
           i.id = ic.item_id AND\
           i.menue_type = ic.menue_type AND\
           i.rest_id = ic.rest_id`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function updateStatus(order_id, status, cb){
  var sql=`UPDATE orders SET status=${status} WHERE id=${order_id}`;
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.changedRows);
  });
}
function cancel(order_id, cb){
  var sql=`UPDATE orders SET status='canceled' WHERE id=${order_id}`;
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.changedRows);
  });
}
