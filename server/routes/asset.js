'use strict';
var router = require('express').Router();
var Asset = require('../models/asset');
var util = require('../../utility');

router.route('/:app_id/assets')
	.get(function(req, res, next) {
		console.log('Using GET');
		var query = { };
		query.app_id = req.params.app_id;
		if (req.query.name) {
			query.name = new RegExp(req.query.name); //used for partial match search
		}
		Asset.find(query, function(err, assets) {
			if (err) {
				res.send(err);
			}
			else {
				res.send(assets);
			}
		});
	})
	.post(function(req, res, next) {
		console.log('Using POST');
		console.log(req.body);
		var newAsset = new Asset();
		newAsset.name = req.body.name;
		newAsset.status = req.body.status;
		newAsset.app_id = req.params.app_id;
		if(!req.body.tags) {
			newAsset.tags = [ ];
		} 
		else {
			newAsset.tags = req.body.tags;
		}
		newAsset.project_id = req.body.project_id;
		newAsset.created_by = req.body.created_by;
		newAsset.last_modified_by = req.body.created_by;
		if(!req.body.values) {
			newAsset.values = [ ];
		} else {
			newAsset.values = req.body.values;
		}
			
		newAsset.save(function(err) {
			if(err) {
				res.send(err);
			}
			else{
				res.send(newAsset);
			}

		});
	})
	.put(function(req, res, next) {
		console.log('Using PUT');
		var query = { };
		query.app_id = req.params.app_id;
		if (req.query.name) {
			query.name = new RegExp(req.query.name); //used for partial match search
		}
		var updatedAsset =  util.updateDocument(Asset, req);
		updatedAsset.last_modified_date = new Date();
		Asset.update(query, { $set: updatedAsset, $inc: { __v: 1}} , {multi: true}, function(err, assets) {
			if (err) {
				res.send(err);
			} 
			else {
				res.json({message: 'Updates were successful!'});
			}
		});
	})
	.delete(function(req, res, next) {
		console.log('Using DELETE');
		var query = { };
		query.app_id = req.params.app_id;
		if (req.query.name) {
			query.name = req.query.name; 
		}
		Asset.remove( query, function(err) {
			if(err) {
				res.send(err);
			}
			else {
				res.json({message: 'Asset Deleted!'});
			}
		});
});

router.route('/:app_id/assets/:asset_id')
	.get(function(req, res, next) {
		console.log('Using GET for AssetID');
		Asset.findById(req.params.asset_id, function(err, asset) {
			if (err) {
				res.send(err);
			}
			else {
				res.send(asset);
			}
		});
	})
	.put(function(req, res, next) {
		console.log('Using PUT for AssetID');
		var updatedAsset =  util.updateDocument(Asset, req);
		updatedAsset.last_modified_date = new Date();
		Asset.findByIdAndUpdate(req.params.asset_id, { $set: updatedAsset, $inc: { __v: 1}} , function(err, asset) {	
			if (err) {
				res.send(err);
			} 
			else {
				res.send(asset);
			}
		});
	})
	.delete(function(req, res, next) {
		console.log('Using DELETE for AssetID');
		Asset.remove( { _id: req.params.asset_id }, function(err) {
			if(err) {
				res.send(err);
			}
			else {
				res.json({message: 'Asset Deleted!'});
			}
		});
});






module.exports = router;
