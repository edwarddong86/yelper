var myYelp = angular.module('myYelp', []);

myYelp.controller('yelpController', function($http) {
  vm = this;

  vm.yelpBusinesses = [];

  vm.term = ['american', 'chinese', 'markets', 'gas stations', 'liquor stores', 'bars', 'korean', 'mexican', 'gyms', 'antiques', 'cafe', 'electronics', 'clothes', 'beauty salons', 'hotels', 'donuts', 'bakery', 'mediterranean', 'italian', 'drug stores', 'chiropractors'];

  vm.d3Data = [
    {"stars":"0.0-0.9", "name":"alpha"},
    {"stars":"0.0-0.9", "name":"beta"},
    {"stars":"1.0-1.9", "name":"alpha"},
    {"stars":"1.0-1.9", "name":"beta"},
    {"stars":"2.0-2.9", "name":"alpha"},
    {"stars":"2.0-2.9", "name":"beta"},
    {"stars":"3.0-3.9", "name":"alpha"},
    {"stars":"3.0-3.9", "name":"beta"},
    {"stars":"4.0-5.0", "name":"alpha"},
    {"stars":"4.0-5.0", "name":"beta"}
  ];

  vm.dataOrganizer = function(data) {

    for(var j = 0; j < data.businesses.length; j++){

      var businessInfo = {};

      if(data.businesses[j].review_count < 20){
        console.log('skip');
      } else if (data.businesses[j].id == businessInfo.id){
        console.log('skip');
      } else {
        businessInfo.name = data.businesses[j].name;
        businessInfo.claimed = data.businesses[j].is_claimed;
        businessInfo.rating = data.businesses[j].rating;
        businessInfo.reviews = data.businesses[j].review_count;
        businessInfo.id = data.businesses[j].id;
        vm.yelpBusinesses.push(businessInfo);
      }
    }
    return vm.yelpBusinesses;
  };

  vm.httpGetter = function(array){

    for(var k = 0; k < array.length; k ++) {

      for (var i = 0; i < 2; i++) {

        vm.reqNum = i * 20;

        $http.get('http://localhost:8080/businesses/' + vm.location + '/' + vm.term[k] + '/' + vm.reqNum)
            .success(function (data) {
              vm.something = vm.dataOrganizer(data);
            }).error(function (data) {
              console.log(data);
            });
      }
    }
  };

  vm.d3dataOrganizer = function(businessData){
    for(var d = 0; d < businessData.length; d++) {
      var oneStarUnclaimed = [];
      var oneStarClaimed = [];
      var twoStarUnclaimed = [];
      var twoStarClaimed = [];
      var threeStarUnclaimed = [];
      var threeStarClaimed = [];
      var fourStarUnclaimed = [];
      var fourStarClaimed = [];
      var fiveStarUnclaimed = [];
      var fiveStarClaimed = [];
      var rating = businessData[d].businessInfo.rating;
      var claimed = businessData[d].businessInfo.claimed;


      if(rating < 1.0 && claimed == false) {
        oneStarUnclaimed.push(businessData[d]);
      } else if(rating < 1.0 && claimed == true) {
        oneStarClaimed.push(businessData[d]);
      } else if(rating < 2.0 && claimed == false) {
        twoStarUnclaimed.push(businessData[d]);
      } else if(rating < 2.0 && claimed == true) {
        twoStarClaimed.push(businessData[d]);
      } else if(rating < 3.0 && claimed == false) {
        threeStarUnclaimed.push(businessData[d]);
      } else if(rating < 3.0 && claimed == true) {
        threeStarClaimed.push(businessData[d]);
      } else if(rating < 4.0 && claimed == false) {
        fourStarUnclaimed.push(businessData[d]);
      } else if(rating < 4.0 && claimed == true) {
        fourStarClaimed.push(businessData[d]);
      } else if(rating < 5.0 && claimed == false) {
        fiveStarUnclaimed.push(businessData[d]);
      } else if(rating < 5.0 && claimed == true) {
        fiveStarClaimed.push(businessData[d]);
      }
    }
    vm.d3Data[0].value = oneStarUnclaimed.length;
    vm.d3Data[1].value = oneStarClaimed.length;
    vm.d3Data[2].value = twoStarUnclaimed.length;
    vm.d3Data[3].value = twoStarClaimed.length;
    vm.d3Data[4].value = threeStarUnclaimed.length;
    vm.d3Data[5].value = threeStarClaimed.length;
    vm.d3Data[6].value = fourStarUnclaimed.length;
    vm.d3Data[7].value = fourStarClaimed.length;
    vm.d3Data[8].value = fiveStarUnclaimed.length;
    vm.d3Data[9].value = fiveStarClaimed.length;
    return vm.d3Data;
    console.log(vm.d3Data);
  };



  vm.submit = function() {

    var organizedData = vm.httpGetter(vm.term);
    var d3OrganizedData = vm.d3dataOrganizer(organizedData);

    vm.barGraph = d3plus.viz()
        .container("div#graph")
        .data(d3OrganizedData)
        .type("bar")
        .id("name")
        .x("stars")
        .y("value")
        .draw();

  };


});