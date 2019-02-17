var app = require('./routes/index');

var port = require('./db/config').port;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
