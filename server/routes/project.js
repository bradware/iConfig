'use strict';
var Project = require('../models/project');
var util = require('../../utility');
var router = require('express').Router();
var Asset = require('../models/asset');

router.route('/')
	.post(function(req, res, next) {
		var newProject = new Project();
		newProject.name = req.body.name;
		newProject.description = req.body.description;
		if(!req.body.statuses) {
			newProject.statuses = [ ];
		} else {
			newProject.statuses = req.body.statuses;
		}
		if(!req.body.assets) {
			newProject.assets = [ ];
		} else {
			newProject.assets = req.body.assets;
		}
		newProject.created_by = req.body.created_by;
		newProject.last_modified_by = req.body.last_modified_by;
		
		newProject.save(function(err) {
			if(err) {
				res.send(err);
			}
			else {
				res.send(newProject);
			}
		});
	})
	.get(function(req, res, next) {
		var query = { };
		if (req.query.name) {
			query.name = new RegExp(req.query.name); //used for partial match search
		}
		Project.find(query, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				res.send(project);
			}
		});
});

router.route('/:project_id')
	.get(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				res.send(project);
			}
		});
	})
	.put(function(req, res, next){
		var updatedProject =  util.updateDocument(Project, req);
		updatedProject.last_modified_date = new Date();
		Project.findByIdAndUpdate(req.params.project_id, { $set: updatedProject, $inc: { __v: 1}} , function(err, project) {
			if (err) {
				res.send(err);
			} 
			else {
				res.send(project);
			}
		});

	})
	.delete(function(req, res, next) {
		Project.remove({ _id: req.params.project_id }, function(err) {
			if(err) {
				res.send(err);
			}
			else {
				res.json({ message: 'Project Deleted!' });
			}
		});
});

router.route('/:project_id/statuses')
	.post(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				var newStatus = { };
				newStatus.status = req.body.status;
				newStatus.date = new Date();
				project.statuses.push(newStatus);
				project.last_modified_date = new Date();
				project.save(function(err) {
					if(err) {
						res.send(err);
					}
					else{
						res.send(project.statuses);
					}
				});
			}
		});
	})
	.get(function(req, res, next) {		
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				if(req.query.status === undefined && req.query.date === undefined) {
					res.send(project.statuses);
				} else {
					var query = { };
					if (req.query.status) {
						query.status = new RegExp(req.query.status); //used for partial match search
					}
					if(req.query.date) {
						query.date = new RegExp(req.query.date);
					}
					if(typeof project.statuses === 'string') {
						project.statuses = [project.statuses];
					}
					var returnArray = [ ];
					for(var index = 0; index < project.statuses.length; index ++) {
						if(query.date === undefined) {
							if(project.statuses[index].status.match(query.status)) {
								returnArray.push(project.statuses[index]);
							}
						} else {
							if(project.statuses[index].date === query.date) {
								returnArray.push(project.statuses[index]);
							}
						}
					}
					res.send(returnArray);
				}
			}
		});
	});

router.route('/:project_id/statuses/current')
	.get(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				res.send(project.statuses);
			}
		});
	});


router.route('/:project_id/statuses/:status_id')
	.get(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				var wasSent;
				for(var index = 0; index < project.statuses.length; index++) {
					var haystack = JSON.stringify(project.statuses[index]._id);
					var key = JSON.stringify(req.params.status_id);
					if(haystack === key) {
						res.send(project.statuses[index]);
						wasSent = true;
						break;
					}
				}
				if(wasSent === false) {
					res.send({});
				}

			}
		});
	})
	/**
		THIS METHOD IS FOR TESTING PURPOSES ONLY. NOT FOR iConfigurator library. DELETES A STATUS FROM A PROJECT
	*/
	.delete(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				for(var index = 0; index < project.statuses.length; index++) {
					var haystack = JSON.stringify(project.statuses[index]._id);
					var key = JSON.stringify(req.params.status_id);
					if(haystack === key) {
						project.statuses.splice(index, 1);
					}
				}
				project.save();
				res.send(project);
			}
		});
	});

router.route('/:project_id/assets')
	.get(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				res.send(project.assets);
			}
		});
	})
	.post(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				if(req.body.asset) {
					if(Asset.findById(req.body.asset, function(err, asset) {
						if(err) {
							res.send(err);
						} else {
							project.assets.push(asset._id);
							project.save();
							res.send(project.assets);
						}
					}));
					
				} else {
					res.json({message: 'Please Provide an AssetId'});
				}
				
			}
		});
	})
	.delete(function(req, res, next) {
		Project.findById(req.params.project_id, function(err, project) {	
			if (err) {
				res.send(err);
			}
			else {
				if(req.body.asset) {
					for(var index = 0; index < project.assets.length; index++) {
						if(req.body.asset.match(project.assets[index])) {
							project.assets.splice(index, 1);
						}
					}
					project.save();
					res.send(project.assets);
				} else {
					res.json({message: 'Please Provide an AssetId'});
				}
				
			}
		});
	});	



module.exports = router;