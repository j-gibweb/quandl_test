var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var path = require('path');


var env = process.env.NODE_ENV || 'dev';
if (env === 'dev') {require('./config');}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({extended:false}));


var Quandl = require("quandl");
var quandl = new Quandl();
var options = {
    auth_token: process.env.QUANDL_CREDS
}
quandl.configure(options);



app.get('/', function(req, res) {
  quandl.search("crude oil", { format: "json" }, function(err, response){

      if(err) { throw err; }

    res.send(response);
  });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server is working')
});