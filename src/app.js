var express = require('express');
var parser = require('body-parser');
var router = require('./api');

var app = express();

app.use('/', express.static('public'));
app.use(parser.json());

app.use('/api', router);


// public routing
app.use('/access_token', express.static('public/access_token.html'));



app.listen(80, function(){
	console.log("server running at 80 port");
});

