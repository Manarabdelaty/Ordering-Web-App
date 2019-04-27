var sqlconnect = require('./db').connection;

module.exports = {
  add,
  remove,
  getByMenue,
  getConfig,
  edit,
  getMenueItem
}

function add(itemInfo,cb){
  var sql = `INSERT INTO item (name, menue_type, rest_id) VALUES (\
                                ${itemInfo.name},\
                                ${itemInfo.menue_type},\
                                ${itemInfo.rest_id})`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function remove(itemPk,cb){
  var sql= `DELETE from item WHERE id=${itemPk.item_id} AND \
                                   menue_type=${itemPk.menue_type} AND \
                                   rest_id=${itemPk.rest_id}`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function getByMenue(itemInfo, cb){

  var sql = `SELECT  t.id,t.name, t.rest_id, t.menue_type \
                            from item t WHERE \
                            menue_type=${itemInfo.menue_type} AND \
                            rest_id=${itemInfo.rest_id}`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getMenueItem(itemInfo, cb){
  var sql = `SELECT  t.name, t.id as item_id, t.rest_id, t.menue_type \
                            from item t WHERE \
                            t.menue_type=(SELECT id from menue_type WHERE name=${itemInfo.menue_type}) AND \
                            t.rest_id=${itemInfo.rest_id}`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function getConfig(cb){
  var sql= 'SELECT name from item_config';
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function edit(itemInfo, cb){
  var sql = `UPDATE item SET name='${itemInfo.name}'\
                        WHERE id=${itemInfo.item_id} AND \
                        menue_type=${itemInfo.menue_type} AND \
                        rest_id=${itemInfo.rest_id}`;
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      cb(result.affectedRows);
  });

}
