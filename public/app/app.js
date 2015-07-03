var myYelp = angular.module('myYelp', []);

myYelp.controller('yelpController', function($http, $q) {
  vm = this;

  vm.yelpBusinesses = [];

  vm.term = ['american', 'chinese', 'markets', 'gas stations', 'liquor stores', 'bars', 'korean', 'mexican', 'gyms', 'antiques', 'cafe', 'electronics', 'clothes', 'beauty salons', 'hotels', 'donuts', 'bakery', 'mediterranean', 'italian', 'drug stores', 'chiropractors'];

  vm.d3Data = [
    {"stars":"0.0-0.9", "name":"unclaimed"},
    {"stars":"0.0-0.9", "name":"claimed"},
    {"stars":"1.0-1.9", "name":"unclaimed"},
    {"stars":"1.0-1.9", "name":"claimed"},
    {"stars":"2.0-2.9", "name":"unclaimed"},
    {"stars":"2.0-2.9", "name":"claimed"},
    {"stars":"3.0-3.9", "name":"unclaimed"},
    {"stars":"3.0-3.9", "name":"claimed"},
    {"stars":"4.0-5.0", "name":"unclaimed"},
    {"stars":"4.0-5.0", "name":"claimed"}
  ];


  vm.dataOrganizer = function(httpResults) {

    for(var j = 0; j < httpResults.length; j++) {
      for(var a = 0; a < httpResults[j].data.businesses.length; a++) {

        var businessInfo = {};

        if (httpResults[j].data.businesses[a].review_count < 10) {
          console.log('skip');
        } else if (httpResults[j].data.businesses[a].id == businessInfo.id) {
          console.log('skip');
        } else {
          businessInfo.name = httpResults[j].data.businesses[a].name;
          businessInfo.claimed = httpResults[j].data.businesses[a].is_claimed;
          businessInfo.rating = httpResults[j].data.businesses[a].rating;
          businessInfo.reviews = httpResults[j].data.businesses[a].review_count;
          businessInfo.id = httpResults[j].data.businesses[a].id;
          vm.yelpBusinesses.push(businessInfo);
        }
      }
    }
    return vm.yelpBusinesses;
  };

  vm.d3dataOrganizer = function(businessData){
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

    for(var d = 0; d < businessData.length; d++) {

      var rating = businessData[d].rating;
      var claimed = businessData[d].claimed;

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
    console.log( oneStarUnclaimed.length);
    vm.d3Data[1].value = oneStarClaimed.length;
    vm.d3Data[2].value = twoStarUnclaimed.length;
    vm.d3Data[3].value = twoStarClaimed.length;
    vm.d3Data[4].value = threeStarUnclaimed.length;
    vm.d3Data[5].value = threeStarClaimed.length;
    vm.d3Data[6].value = fourStarUnclaimed.length;
    vm.d3Data[7].value = fourStarClaimed.length;
    vm.d3Data[8].value = fiveStarUnclaimed.length;
    vm.d3Data[9].value = fiveStarClaimed.length;
    console.log(fourStarClaimed.length);
    return vm.d3Data;
  };



  vm.submit = function() {
    vm.httpGetter = function(array) {
      var promisedData = [];
      for (var k = 0; k < array.length; k++) {
        for (var i = 0; i < 2; i++) {
          vm.reqNum = i * 20;
          promisedData.push($http.get('http://localhost:8080/businesses/' + vm.location + '/' + vm.term[k] + '/' + vm.reqNum));
        }
      }
      $q.all(promisedData)
          .then(
          function(results) {
            var returnedData = vm.dataOrganizer(results);
            console.log(returnedData);
            var d3OrganizedData = vm.d3dataOrganizer(returnedData);
            console.log(d3OrganizedData);
            vm.barGraph = d3plus.viz()
                .container("div#graph")
                .data(d3OrganizedData)
                .type("bar")
                .id("name")
                .x("stars")
                .y("value")
                .draw();
          });
    };
    vm.httpGetter(vm.term);
  };

});





