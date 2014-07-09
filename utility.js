'use strict';

var updateDocument = function(SchemaTarget, req) {
  var updatedDoc = {};
  for (var field in SchemaTarget.schema.paths) {
      if ((field !== '_id') && (field !== '__v') && (field !== 'created_date') &&
      		(field !== 'created_by' && field !== 'status')) {
	        if (req.body[field] !== undefined) {
	            updatedDoc[field] = req.body[field];
	        }
      } else {
          if(field === 'status') {
            if(req.body.status === 'Translated' || req.body.status === 'Not Translated' ||
                req.body.status === 'In Progress') {
                  updatedDoc.status = req.body.status;
            } 
          }
      }
      
  }
  
  return updatedDoc;
};


module.exports.updateDocument = updateDocument;