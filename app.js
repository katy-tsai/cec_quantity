var express =require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var looger = require('./logger');
var path = require('path');
var routes = require('./server/router/index');
var main = require('./server/router/main');
var ajax = require('./server/router/ajax');
var app = express();
var http = require('http').Server(app);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/main',main);
app.use('/ajax',ajax);


http.listen(3000,function(){
  console.log("App listening on port 3000")
})

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
module.exports = app;
