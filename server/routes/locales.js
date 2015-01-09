'use strict';

var ClientApp = require('../models/clientApp');
var router = require('express').Router();

router.route('/:app_id/locales')
	.get(function(req, res, next) {
		ClientApp.findById(req.params.app_id, function(err, app) {
			if(err) {
				res.send(err);
			}
			else {
				res.send(app.locale_codes);
			}
		});
	})
	.put(function(req, res, next) {
		ClientApp.findById(req.params.app_id, function(err, app) {
			if(!req.body.locale_codes) {
				res.json({message: 'Locale_Code is a required field!'});
			}
			else if(err) {
				res.send(err);
			}
			else {
				app.locale_codes = req.body.locale_codes;
				app.save();
				res.send(app);
			}
		});
	})
	.post(function(req, res, next) {
		ClientApp.findById(req.params.app_id, function(err, app) {
			if(err) {
				res.send(err);
			}
			else {
				var finalLocales = app.locale_codes;
				if(req.body.locale_codes) {
					var newLocales = req.body.locale_codes;
					if(typeof newLocales === 'string') {
						newLocales = [newLocales];
					}
					for(var localeIndex = 0; localeIndex < newLocales.length; localeIndex++) {
						var locale = newLocales[localeIndex];
						if(finalLocales.indexOf(locale) === -1) {
							finalLocales.push(locale);
						}
					}
				}
				app.locale_codes = finalLocales;
				app.save();
				res.send(app);

			}
		});
	});




module.exports = router;
