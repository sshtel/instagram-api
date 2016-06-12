'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');


var authFilePath = __dirname + '/../data/auth.json';
router.post('/updateOAuth', function(req, res){
	var body = req.body;
	if(!body){
		console.log(req.body);
		res.json({result:'invalid data'});
	}
	else {
		console.log(req.body);
		console.log('authFilePath : ' + authFilePath);
		fs.readFile(authFilePath, { encoding: 'utf8'}, function(err, data){
			if(err){
				res.json({result: err});
				return;
			}
			try{
				console.log('json : ' + data);
				var json = JSON.parse(data);
				if(body.accessToken) { json.accessToken = body.accessToken; }
				if(body.clientId) { json.clientId = body.clientId; }
				if(body.clientSecret) { json.clientSecret = body.clientSecret; }
				if(body.redirectUri) { json.redirectUri = body.redirectUri; }

				fs.writeFile(authFilePath, JSON.stringify(json), function(err, data){
					if(err){
						res.json({result: err});
						return;
					}
				});
			}
			catch (ex){
				res.json({result: err});
				console.log(ex);
			}
		});
	

		res.json({result:'OK'});
	}
	
});


module.exports = router;