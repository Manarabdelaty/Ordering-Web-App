var app = require('./routes/index');
var port = require('./db/config').port;
var hbs = require('express-handlebars');
var path = require('path');

// handlebars view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname + '/views/layout'}));
app.set('views', path.join(__dirname, '/views/layout'));
app.set('view engine', 'hbs');



app.listen(port, () => console.log(`App listening on port ${port}!`));
