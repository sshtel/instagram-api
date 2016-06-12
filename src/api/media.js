'use strict';
var https = require('https');

function recent_media(userId, accessToken){

  var url = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=' + accessToken;

  console.log(url);
  https.get(url, (res) => {
      console.log(`Got response: ${res.statusCode}`);

    res.on("data", function(chunk) {
        console.log("BODY: " + chunk);
      });

    res.resume();
  }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
  });

}
