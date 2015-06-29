/**
 * Created by edwarddong on 6/26/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var yelp = require('node-yelp')

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/pages/index.html'));
});

app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/foods/:location', function(req, res) {

  var searchParameters = {};
  var client = yelp.createClient({
    oauth: {
      consumer_key: "O1QsJq-LZt8AudUxN5bNEA",
      consumer_secret: "nCNX2V_-fOXFNGn9Xqtu3__SVc8",
      token: "Eoqm1zjVHUoY-bvZFBhNPT12Wch7MgOT",
      token_secret: "jsdzQAYdwW5cWDDw-NVpfzK3_4M"
    }
  });

  searchParameters.terms = "food";
  searchParameters.location = req.params.location;
console.log(searchParameters.location);
  client.search(searchParameters).then(function (data) {
    res.send(data);
  });


});

app.listen(port);
