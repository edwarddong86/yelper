/**
 * Created by edwarddong on 6/26/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var yelp = require('node-yelp');
var yelpKey = require('./secret.js');
console.log(yelpKey);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/pages/index.html'));
});

app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/businesses/:location/:food', function(req, res) {

  var searchParameters = {};
  var client = yelp.createClient(yelpKey.apiKey);
  searchParameters.term = 'food';
  searchParameters.location = req.params.location;
  searchParameters.category_filter = req.params.term;
console.log(searchParameters.location);
  client.search(searchParameters).then(function (data) {
    res.send(data);
  });
});

app.listen(port);
