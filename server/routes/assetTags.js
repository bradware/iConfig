'use strict';

var Asset = require('../models/asset');
var router = require('express').Router();


router.route('/:app_id/tags')
	.get(function(req, res, next) {
		Asset.find({ app_id: req.params.app_id },'-_id tags', function(err, assets) {
			if (err) {
				res.send(err);
			}
			else {
				var returnArray = [];
				for (var index = 0; index < assets.length; index++) {
					if (assets[index].tags) {
						var tags = assets[index].tags;
						if (tags.length !== 0) {
							for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
								var tag = tags[tagIndex];
								if (returnArray.indexOf(tag) === -1) {
									returnArray.push(tag);
								}
							}
						}
					}
				}
				res.send(returnArray);
			}
		});
});

router.route('/:app_id/assets/:asset_id/tags')
	.get(function(req, res, next) {
		Asset.find({ app_id: req.params.app_id, _id: req.params.asset_id },'-_id tags', function(err, assets) {
			if (err) {
				res.send(err);
			}
			else {
				var returnArray = [];
				for (var index = 0; index < assets.length; index++) {
					if (assets[index].tags) {
						var tags = assets[index].tags;
						if (tags.length !== 0) {
							for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
								var tag = tags[tagIndex];
								if (returnArray.indexOf(tag) === -1) {
									returnArray.push(tag);
								}
							}
						}
					}
				}
				res.send(returnArray);
			}
		});
	}) 
	.post(function(req, res, next) {
		Asset.findOne({ app_id: req.params.app_id, _id: req.params.asset_id  }, function(err, asset) {
			if(err) {
				res.send(err);
			}
			else {
				if(req.body.tags) {
					var newTags = req.body.tags;
					if(typeof newTags === 'string') {
						newTags = [newTags];
					}
					for(var tagIndex = 0; tagIndex < newTags.length; tagIndex++) {
						var tag = newTags[tagIndex];
						if(asset.tags.indexOf(tag) === -1) {
							asset.tags.push(tag);
						}
					}
				}
				asset.save();
				res.send(asset);
			}
		});
	})
	.put(function(req, res, next) {
		Asset.findOne({ app_id: req.params.app_id, _id: req.params.asset_id  }, function(err, asset) {
			if(err) {
				res.send(err);
			}
			else {
				asset.tags = req.body.tags;
				asset.save();
				res.send(asset);
			}
		});
	})
	.delete(function(req, res, next) {
		if (req.query.tag_name) {
			var tagName = req.query.tag_name; //used for partial match search
		}
		Asset.findOne({ app_id: req.params.app_id, _id: req.params.asset_id}, function(err, asset) {
			if(err) {
				res.send(err);
			}
			else {
				if(tagName !== undefined) {
					for(var i = asset.tags.length - 1; i >= 0; i--) {
					    if(asset.tags[i] === tagName) {
						      asset.tags.splice(i, 1);
    					}
					}
				} else {
					var reqTags = req.body.tags;
					if(reqTags !== undefined) {
						if(typeof reqTags === 'string') {
							reqTags = [reqTags];
						}
						for(var index = 0; index < reqTags.length; index++) {
						    var n = asset.tags.indexOf(reqTags[index]);
						    if(n !== -1) {
							    asset.tags.splice(n, 1);
	    					}
						}
					}
				}
				asset.save();
				res.send(asset);
			}
		});
	});
	

module.exports = router;
