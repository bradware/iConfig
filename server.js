'use strict';

var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var clientAppRouter = require('./server/routes/clientApp.js');
var assetRouter = require('./server/routes/asset.js');
var assetValueRouter = require('./server/routes/assetValue.js');
var tagRouter = require('./server/routes/assetTags.js');
var localeRouter = require('./server/routes/locales.js');
var projectRouter = require('./server/routes/project.js');
//var clientRouter = require('./public/system/routes/system.js');
//var favicon = require('serve-favicon');
//var cookieParser = require('cookie-parser');
//var methodOverride = require('method-override');
var app = express();


//app.use(favicon());   ****WILL NEED TO IMPLEMENT THIS LATER WHEN CHOOSING A FAV ICON
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/system'));

mongoose.connect('mongodb://localhost/iconfig2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//The ordering of these routers does matter****
//app.use('/iconfig', clientRouter);
app.use('/projects', projectRouter);
app.use('/apps', clientAppRouter);
app.use('/apps', assetRouter);
app.use('/apps', assetValueRouter);
app.use('/apps', tagRouter);
app.use('/apps', localeRouter);



app.listen(port);
module.exports = app;
