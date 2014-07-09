var	mongoose = require('mongoose');
//var express = require('express');
//var	bodyParser = require('body-parser');
//var	port = process.env.PORT || 3000;
//var	router = express.Router();
//var	app = express();


var clientAppSchema = mongoose.Schema({
	name: { type: String, required: true},
	access_groups: [String],			
	locale_codes: { type: [String], required: true },
	primary_locale_code: { type: String, required: true },
	created_by: { type: String, required: true},
	created_date: { type: Date, default: Date.now, required: true },
	last_modified_by: String,
	last_modified_date: { type: Date, default: Date.now }

});

var ClientApp = mongoose.model('ClientApp', clientAppSchema, 'ClientApp'); 	//3rd argument is collection
module.exports = ClientApp;