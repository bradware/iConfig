'use strict';

var Asset = require('../models/asset');
var router = require('express').Router();


router.route('/:app_id/assets/:asset_id/values')
	.get(function(req, res, next) {
		Asset.findById(req.params.asset_id, function(err, asset) {
			var localeQuery;
			if(req.query.locale) {
				localeQuery = new RegExp(req.query.locale);
			}
			if (err) {
				res.send(err);
			}
			else {
				if(localeQuery) {
					var returnVals = [ ];
					for(var index = 0; index < asset.values.length; index++) {
						if(asset.values[index].locale_code.match(localeQuery)) {
							returnVals.push(asset.values[index]);
						}
					}
					res.send(returnVals);
				} 
				else {
					res.send(asset.values);
				}
			}
		});
	})
	.post(function(req, res, next) {
		Asset.findById(req.params.asset_id, function(err, asset) {
			var newValue = { };
			newValue.string = req.body.string;
			newValue.status = req.body.status;
			newValue.locale_code = req.body.locale_code;
			newValue.created_by = req.body.created_by;
			asset.values.push(newValue);
			asset.last_modified_date = new Date();
			asset.save(function(err) {
				if(err) {
					res.send(err);
				}
				else{
					res.send(asset.values);
				}
			});
		
	});
});

router.route('/:app_id/assets/:asset_id/values/current')
	.get(function(req, res, next) {
		Asset.findById(req.params.asset_id, function(err, asset) {
			var localeQuery;
			if(req.query.locale) {
				localeQuery = new RegExp(req.query.locale);
			}
			if (err) {
				res.send(err);
			}
			else {
				if(localeQuery) {
					var returnVals = [ ];
					for(var index = 0; index < asset.values.length; index++) {
						if(asset.values[index].locale_code.match(localeQuery)) {
							returnVals.push(asset.values[index]);
						}
					}
					res.send(returnVals);
				} 
				else {
					res.send(asset.values);
				}
			}
		});
	});



/*
Not Technically in the API, but thought they would be useful to keep anyways
*/
router.route('/:app_id/assets/:asset_id/values')
	.delete(function(req, res, next) {
		Asset.findById(req.params.asset_id, function(err, asset) {
			var stringQuery;
			if(req.query.string) {
				stringQuery = new RegExp(req.query.string);
			}
			if (err) {
				res.send(err);
			}
			else {
				if(stringQuery) {
					for(var index = 0; index < asset.values.length; index++) {
						if(asset.values[index].string.match(stringQuery)) {
							asset.values.splice(index, 1);

						}
					}
				}
				asset.save();
				res.send(asset.values);
			}
		});
	});

		
module.exports = router;

