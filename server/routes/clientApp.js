'use strict';

var util = require('../../utility');
var router = require('express').Router();
var ClientApp = require('../models/clientApp');



router.route('/')
	.get(function(req, res, next) {
		var query = { };
		if (req.query.name) {
			query.name = new RegExp(req.query.name); //used for partial match search
		}
		ClientApp.find(query, function(err, apps) {	
			if (err) {
				res.send(err);
			}
			else {
				res.send(apps);
			}
		});
	})	
	.post(function(req, res, next) {
		var newApp = new ClientApp();
		newApp.name = req.body.name;
		newApp.access_groups = req.body.access_groups;
		newApp.locale_codes = req.body.locale_codes;
		newApp.primary_locale_code = req.body.primary_locale_code;
		newApp.created_by = req.body.created_by;
		newApp.last_modified_by = req.body.last_modified_by;

		newApp.save(function(err) {
			if(err) {
				res.send(err);
			}
			else {
				res.send(newApp);
			}

		});
});

router.route('/:app_id')
		.put(function(req, res, next){
			var updatedApp =  util.updateDocument(ClientApp, req);
			updatedApp.last_modified_date = new Date();
			ClientApp.findByIdAndUpdate(req.params.app_id, { $set: updatedApp, $inc: { __v: 1}} , function(err, app) {
					if (err) {
						res.send(err);
					} 
					else {
						res.send(app);
					}
			});

		})
		.delete(function(req, res, next) {
			ClientApp.remove({_id: req.params.app_id}, function(err) {
				if(err) {
					res.send(err);
				}
				else {
					res.json({message: 'Application Deleted!'});
				}
			});
		})
		.get(function(req, res, next) {
			ClientApp.findById(req.params.app_id, function(err, app) {
				if (err) {
					res.status(404);
					res.send(err);
				} 
				else {
					res.send(app);
				}
		});
	});

module.exports = router;
