var sqlconnect = require('./db').connection;

module.exports = {
  add,
  remove,
  getByItem,
  edit
}

function add(configInfo, cb){

  var sql=`INSERT INTO item_config (name, price, item_id, menue_type, rest_id) VALUES (\
            ${configInfo.name},\
            ${configInfo.price},\
            ${configInfo.item_id},\
            ${configInfo.menue_type},\
            ${configInfo.rest_id})`;

  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.affectedRows);
  });
}

function remove(configInfo, cb){

  var sql=`DELETE from item_config WHERE rest_id=${configInfo.rest_id}\
                                AND menue_type=${configInfo.menue_type}\
                                AND item_id=${configInfo.item_id}\
                                AND id=${configInfo.id}`;

  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.affectedRows);
  });
}

function getByItem(itemInfo, cb){

  var sql =`SELECT * from item_config WHERE rest_id=${itemInfo.rest_id} AND menue_type=${itemInfo.menue_type} AND item_id=${itemInfo.item_id}`;
  console.log(sql);
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      console.log(result);
      cb(result);
  });
}

function edit(itemInfo, cb){
  var sql;

  if (itemInfo.price & itemInfo.name)
     sql =`UPDATE item_config SET price=${itemInfo.price}, name=${itemInfo.name}\
              WHERE id=${itemInfo.id} AND rest_id=${itemInfo.rest_id} AND menue_type=${itemInfo.menue_type} AND item_id=${itemInfo.item_id}`;
  else if (itemInfo.price)
    sql =`UPDATE item_config SET price=${itemInfo.price}\
           WHERE id=${itemInfo.id} AND rest_id=${itemInfo.rest_id} AND menue_type=${itemInfo.menue_type} AND item_id=${itemInfo.item_id}`;
  else if (itemInfo.name)
    sql =`UPDATE item_config SET name='${itemInfo.name}'\
           WHERE id=${itemInfo.id} AND rest_id=${itemInfo.rest_id} AND menue_type=${itemInfo.menue_type} AND item_id=${itemInfo.item_id}`;

  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.changedRows);
  });
}
