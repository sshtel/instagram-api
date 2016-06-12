'use strict';

var https = require('https');
var bodyParser = require('body-parser');
var request = require('request');


function getAccessToken(clientId, redirectUri){

  var redirect_uri = "&redirect_uri=" + redirectUri,
      response_type = "&response_type=token",
      url = "https://api.instagram.com/oauth/authorize/?client_id=" + clientId + redirect_uri + response_type;


  console.log(url);

  https.get(url, (res) => {
      console.log(`Got response: ${res.statusCode}`);
      // consume response body
      //console.log(res);

    res.on("data", function(chunk) {
        console.log("BODY: " + chunk);
      });

    res.resume();
  }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
  });

}

function getCode(clientId, redirectUri){

  var redirect_uri = "&redirect_uri=" + redirectUri,
      response_type = "&response_type=code",
      url = "https://api.instagram.com/oauth/authorize/?client_id=" + clientId + redirect_uri + response_type;

  console.log(url);

  https.get(url, (res) => {
      console.log(`Got response: ${res.statusCode}`);
      // consume response body
      //console.log(res);
      console.log(res);

    res.on("data", function(chunk) {
        console.log("BODY: " + chunk);
      });

    res.resume();
  }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
  });
}

function requestAccessToken(clientId, clientSecret, redirectUri){

  var redirect_uri = "&redirect_uri=" + redirectUri,
      response_type = "&response_type=token",
      url = "https://api.instagram.com/oauth/authorize/?client_id=" + clientId + redirect_uri + response_type;
      
  var options = {
    url: 'https://api.instagram.com/oauth/access_token',
    // url: url
     form: { 
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      // code: 'CODE',
      response_type: 'token'
    }
  }


  request.get(options, function(err, res, body){
    if (err) {
      console.log("error in Post", err)
    }else{
      console.log(JSON.parse(body))
    }
  });

}


/*

1. Require Access Token
https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token

response : http://your-redirect-uri#access_token=ACCESS-TOKEN

simply use access token

*/



/*
ask Recent Media URI
https://api.instagram.com/v1/users/{user Id}/media/recent/?access_token=3254590631.042616a.41972bad8fd04f5195b8fe69b415dabd

example:
https://api.instagram.com/v1/users/3254590631/media/recent/?access_token=3254590631.042616a.41972bad8fd04f5195b8fe69b415dabd
*/

