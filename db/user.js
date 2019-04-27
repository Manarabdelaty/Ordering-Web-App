var sqlconnect = require('./db').connection;
var phash = require('../helper/sec');

module.exports = {
  authenticate,
  create,
  findOne,
  getByRole,
  getInfo,
  getAddr,
  updateRole,
  setToAdmin,
  setToStaff,
  updatePass,
  changeMyPass,
  resetPass,
  updateName,
  updateAge
};

// getById, update

function authenticate({email, password}, cb){
  findOne(email, function(result){
    if (result.length > 0)
      cb(phash.match(password, result[0].password), result[0].id, result[0].status);
    else
      cb (false, "");
  });

};

function create(userInfo, cb){
  findOne(userInfo.email, function(found){
    if (found.length > 0){
      throw 'User email:'+ userInfo.email + 'already taken';
    }
    else {

      userInfo.password = phash.hash(userInfo.password);

      var sql = 'INSERT INTO user (name, email, password, bdate) VALUES ?';
      var values = [
        [userInfo.name,
        userInfo.email,
        userInfo.password,
        userInfo.bdate]
      ];

     sqlconnect.query(sql, [values], function(err, result){
       if (result){
         sql = 'INSERT INTO user_role (user_id, role) VALUES ?';
         values = [
           [result.insertId, 'user']
         ];
         sqlconnect.query(sql,[values], function(err, result2){
           if(err) cb(false, "");
           cb(true, result.insertId);
         });
       }
       else cb(false, "");
     });
    }
  });

};

function findOne(email, cb){

  var sql = 'SELECT * FROM user WHERE email = ? LIMIT 1';

  sqlconnect.query(sql,[email], function(err,result){
    cb(result);
  });

};

function getByRole(userRole, cb){

  var sql = `SELECT id,name,email from user WHERE id IN ( \
                SELECT user_id  from user_role WHERE role = '${userRole}')`;
  sqlconnect.query(sql, function(err,result){
    if (err) throw err;
    console.log(result);
    cb(result);
  });
}

function updateRole(userId,admin_id, newRole, prev_role, cb){
  console.log(userId);
  var action_name = '';

  if(prev_role=='Admin')
    action_name = 'delete admin';
  else if (prev_role == 'Staff')
    action_name = 'delete staff';

  var sql = `UPDATE user_role SET role = '${newRole}' WHERE user_id = '${userId}'`;
  var sql_record = `INSERT INTO record (user_id, admin_id, action_id) VALUES(\
                        ${userId},\
                        ${admin_id},\
                        (SELECT id from admin_action WHERE name='${action_name}'))`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    if(result.changedRows == 1){
    sqlconnect.query(sql_record, function(err,res){
      if(err) throw err;
      cb(result.changedRows);
    });
    }
    else cb(result.changedRows);
  });
}

function setToAdmin(userEmail,admin_id, cb){
    var sql = `UPDATE user_role SET role = 'admin' WHERE user_id = \
                  (SELECT id from user where email = '${userEmail}')`;

    var sql_record = `INSERT INTO record (user_id, admin_id, action_id) VALUES(\
                      (SELECT id from user WHERE email='${userEmail}'),\
                      ${admin_id},\
                      (SELECT id from admin_action WHERE name='add admin'))`;

    sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      if(result.changedRows == 1){
      sqlconnect.query(sql_record, function(err,res){
        if(err) throw err;
        cb(result.affectedRows, result.changedRows);
      });
      }
      else cb(result.affectedRows, result.changedRows);
    });
}

function setToStaff(userEmail,admin_id, cb){
  var sql = `UPDATE user_role SET role= 'staff' WHERE user_id = \
              (SELECT id from user where email = '${userEmail}')`;

  var sql_record = `INSERT INTO record (user_id, admin_id, action_id) VALUES(\
                        (SELECT id from user WHERE email='${userEmail}'),\
                        ${admin_id},\
                        (SELECT id from admin_action WHERE name='add staff'))`;

  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      if(result.changedRows == 1){
        sqlconnect.query(sql_record, function(err,res){
        if(err) throw err;
        cb(result.affectedRows, result.changedRows);
        });
      }
      else cb(result.affectedRows, result.changedRows);
  });
}
function updatePass(userId, newPass, admin_id, cb){
  var hashed = phash.hash(newPass);
  var sql = `UPDATE user SET password = '${hashed}' WHERE id = '${userId}'`;

  var sql_record = `INSERT INTO record (user_id, admin_id, action_id) VALUES(\
                        ${userId},\
                        ${admin_id},\
                        (SELECT id from admin_action WHERE name='change pass'))`;

  sqlconnect.query(sql, function(err,result){
      if(err) throw err;
      if(result.changedRows == 1){
        sqlconnect.query(sql_record, function(err,res){
        if(err) throw err;
        cb(result.changedRows);
        });
      }
      else cb(result.changedRows);
  });
}

function changeMyPass(userId, newPass,cb){
  var hashed = phash.hash(newPass);
  var sql = `UPDATE user SET password = '${hashed}' WHERE id = '${userId}'`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.changedRows);
  });
}

function resetPass(email, newPass, cb){
  var hashed = phash.hash(newPass);
  var sql = `UPDATE user SET password = '${hashed}' WHERE email='${email}'`;
  sqlconnect.query(sql, function(err,result){
    if(err) throw err;
    cb(result.changedRows);
  });
}
function getInfo(userId, cb){
  var sql= `SELECT name, email, YEAR(CURDATE())-YEAR(bdate) as age\
            from user WHERE id=${userId}`;

  sqlconnect.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}

function getAddr(userId, cb){
  var sql= `SELECT ua.id, ua.street_name, ua.apt_no, a.district, a.city\
            from user_address ua, area a\
            WHERE ua.user_id=${userId}\
            AND a.code = ua.area_code`;
  sqlconnect.query(sql, function(err, result){
    if(err) throw err;
    cb(result);
  });
}

function updateName(userInfo,cb){
  var sql=`UPDATE user SET name='${userInfo.name}' WHERE id=${userInfo.userId}`;
  sqlconnect.query(sql, function(err, result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}
function updateAge(userInfo,cb){
  var sql=`UPDATE user SET bdate='${userInfo.bdate}' WHERE id=${userInfo.userId}`;
  sqlconnect.query(sql, function(err, result){
    if(err) throw err;
    cb(result.affectedRows);
  });
}
