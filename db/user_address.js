var sqlconnect = require('./db').connection;

module.exports={
  updateAddr,
  addAddr,
  removeAddr,
  match
}

function updateAddr(addrInfo, cb){
  console.log(addrInfo);
  var sql=`UPDATE user_address SET street_name=${addrInfo.street_name}, apt_no=${addrInfo.apt_no},\
                  area_code=(SELECT code from area WHERE district=${addrInfo.district} AND city=${addrInfo.city})\
                  WHERE user_id=${addrInfo.user_id} AND id=${addrInfo.addr_id}`;

  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });

}

function addAddr(addrInfo, cb){
  console.log(addrInfo);

  var sql=`INSERT INTO user_address (user_id, street_name, apt_no, area_code) VALUES (\
                       ${addrInfo.user_id},${addrInfo.street_name}, ${addrInfo.apt_no},\
                      (SELECT code from area WHERE district=${addrInfo.district} AND city=${addrInfo.city}))`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}
function removeAddr(addrInfo, cb){
  var sql=`DELETE from user_address WHERE id=${addrInfo.addr_id} AND user_id=${addrInfo.user_id}`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}
function match(user_id, rest_id, cb){
  var sql=`SELECT ua.id ,a.district, a.city, ua.street_name, ua.apt_no, ra.charge\
              from user_address ua, area a, rest_area ra WHERE\
              ua.area_code = ra.code AND\
              ra.rest_id = ${rest_id} AND\
              user_id= ${user_id} AND\
              a.code = ua.area_code` ;
  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      console.log(result);
      cb(result);
  });

}
