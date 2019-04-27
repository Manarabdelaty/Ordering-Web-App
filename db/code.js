var sqlconnect = require('./db').connection;

module.exports = {
  getAll,
  getValid,
  getAmount,
  isValid,
  removeByNo,
  add,
  markInvalid
};

function getAll(cb){
  var sql = 'SELECT * from discount_code';

  sqlconnect.query(sql,function(err,result){
    if (err) throw err;
    console.log(result);
    cb(result);
  });
}

function getAmount(cno, cb){
  var sql=`SELECT percent from discount_code WHERE cno=${cno}`;
  sqlconnect.query(sql, function(err,result){
    if (err) throw err;
    cb(result);
  });
}

function getValid(cb){
  var sql = 'SELECT * from discount_code WHERE DATE(NOW()) < DATE(end)';
  sqlconnect.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}

function isValid(cno, cb){
  var sql = `SELECT DATE(NOW()) < DATE(end) from discount_code WHERE cno = ${cno}`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result);
  });
}

function removeByNo(cno, cb){
  var sql= `DELETE FROM discount_code WHERE cno= ${cno}`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}

function markInvalid(cno,cb){
  var sql=`UPDATE discount_code SET end=NOW() WHERE cno=${cno}`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}
function add(codeInfo, cb){
  console.log(codeInfo);
  var sql = `INSERT INTO discount_code (percent, start, end) VALUES (\
                        ${codeInfo.percent},
                        ${codeInfo.start},
                        ${codeInfo.end}
  )`;
  console.log('here');
  console.log(sql);
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}
