var nodemailer = require('nodemailer');

module.exports = {
  send
};

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'yummyappeg@gmail.com',
        pass: '799682.lvf'
    }
});

const mailOptions = {
  from:'yummyappeg@gmail.com', // sender address
  to: 'manarabdelatty@aucegypt.edu', // list of receivers
  subject: 'Your New Password', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

function send (email, password, cb){

  mailOptions.html = `<p> Your new password is ${password}</p>`;
  mailOptions.to = email;

  transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        cb(false);
      else
        cb(true);
  });
}
