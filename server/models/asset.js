'use strict';
var	mongoose = require('mongoose');


var assetSchema = mongoose.Schema({
		name: { type: String, required: true },
		status: { type: String, enum: ['Translated', 'Not Translated', 'In Progress'], required: true },		
		app_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ClientApp', required: true },

		tags: [String],	
		description: String,
		project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
		created_by: { type: String, required: true },			//This will eventualy be changed to a user_id for a User object - outside the scope of my implementation
		created_date: { type: Date, default: Date.now, required: true},
		last_modified_by: String,	//This will eventualy be changed to a user_id for a User object - outside the scope of my implementation
		last_modified_date: { type: Date, default: Date.now },
		values: [ {
			string: { type: String, required: true},
			status: { type: String, enum: ['Translated', 'Not Translated', 'In Progress'], required: true },		
			locale_code: {type: String, required: true},   //THIS NeEDS TO BE VALIDATED WITH CLIENTAPP
			created_by: { type: String, required: true},			
			created_date: { type: Date, default: Date.now, required: true}
		} ]
});

assetSchema.index({ name: 1, app_id: -1 });
assetSchema.set('autoIndex', false);
var Asset = mongoose.model('Asset', assetSchema, 'Asset'); 	//3rd argument is collection
Asset.ensureIndexes(function (err) {
	  if (err) {
	  	console.log('Error in indexing Asset Collection');
	  }
});

module.exports = Asset;
