/**
 * Created by edwarddong on 6/26/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var yelp = require('node-yelp');
var yelpKey = require('./secret.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/pages/index.html'));
});

app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/businesses/:location/:term/:reqNum', function(req, res) {

  var client = yelp.createClient(yelpKey.apiKey);
  var searchParameters = {};
  searchParameters.location = req.params.location;
  searchParameters.term = req.params.term;
  searchParameters.sort = 1;
  searchParameters.offset = req.params.reqNum;
  searchParameters.limit = 20;
  searchParameters.radius_filter = 40000;

    client.search(searchParameters).then(function (data) {
      res.send(data);
    });
});

app.listen(port);
