var myYelp = angular.module('myYelp', ['angular-loading-bar']);

myYelp.controller('yelpController', function($http, $q) {
  vm = this;
  vm.yelpBusinesses = [];
  vm.hideElement = 'true';

  vm.term = ['american', 'chinese', 'markets', 'gas stations', 'liquor stores', 'bars', 'korean', 'mexican', 'gyms', 'antiques', 'cafe', 'electronics', 'clothes', 'beauty salons', 'hotels', 'donuts', 'bakery', 'mediterranean', 'italian', 'drug stores', 'chiropractors'];

  vm.d3Data = [
    {"stars":"1.0-1.9", "name":"unclaimed", "color":"#92ffff"},
    {"stars":"1.0-1.9", "name":"claimed", "color":"#032832"},
    {"stars":"2.0-2.9", "name":"unclaimed", "color":"#92ffff"},
    {"stars":"2.0-2.9", "name":"claimed", "color":"#032832"},
    {"stars":"3.0-3.9", "name":"unclaimed", "color":"#92ffff"},
    {"stars":"3.0-3.9", "name":"claimed", "color":"#032832"},
    {"stars":"4.0-5.0", "name":"unclaimed", "color":"#92ffff"},
    {"stars":"4.0-5.0", "name":"claimed", "color":"#032832"}
  ];


  vm.dataOrganizer = function(httpResults) {

    for(var j = 0; j < httpResults.length; j++) {
      for(var a = 0; a < httpResults[j].data.businesses.length; a++) {

        var businessInfo = {};

        if (httpResults[j].data.businesses[a].id == businessInfo.id) {
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

      if(rating < 2.0 && claimed == false) {
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

    vm.d3Data[0].businesses = twoStarUnclaimed.length;
    vm.d3Data[1].businesses = twoStarClaimed.length;
    vm.d3Data[2].businesses = threeStarUnclaimed.length;
    vm.d3Data[3].businesses = threeStarClaimed.length;
    vm.d3Data[4].businesses = fourStarUnclaimed.length;
    vm.d3Data[5].businesses = fourStarClaimed.length;
    vm.d3Data[6].businesses = fiveStarUnclaimed.length;
    vm.d3Data[7].businesses = fiveStarClaimed.length;
    return vm.d3Data;
  };

  vm.enter = function() {
    if(event.keyCode === 13) {
      vm.httpGetter = function (array) {
        var promisedData = [];
        for (var k = 0; k < array.length; k++) {
          for (var i = 0; i < 2; i++) {
            vm.reqNum = i * 20;
            promisedData.push($http.get('http://localhost:8080/businesses/' + vm.location + '/' + vm.term[k] + '/' + vm.reqNum));
          }
        }
        $q.all(promisedData)
            .then(
            function (results) {
              vm.hideSearch = 'true';
              vm.showElement = 'true';
              var returnedData = vm.dataOrganizer(results);
              var d3OrganizedData = vm.d3dataOrganizer(returnedData);
              vm.barGraph = d3plus.viz()
                  .container("div#graph")
                  .data(d3OrganizedData)
                  .type("bar")
                  .id("name")
                  .x("stars")
                  .y("businesses")
                  .color("color")
                  .draw();
            });
        $('#graph').on('click', function (d) {
          vm.ratings = d.target.__data__.stars;
          $('#pieChartHeader').show();
          var d3PieData = [];
          for (var p = 0; p < vm.d3Data.length; p++) {
            if (vm.ratings == vm.d3Data[p].stars) {
              var pieObject = {};
              pieObject.name = vm.d3Data[p].name;
              pieObject.businesses = vm.d3Data[p].businesses;
              if(pieObject.name == "unclaimed") {
                pieObject.color = "#92ffff";
                d3PieData.push(pieObject);
              } else if(pieObject.name == "claimed") {
                pieObject.color = "#032832";
                d3PieData.push(pieObject);
              }
            }
          }
          d3plus.viz()
              .container("#pie")
              .data(d3PieData)
              .type("pie")
              .id("name")
              .size("businesses")
              .color("color")
              .draw();
          vm.showTag = 'true';
        });
      };
      vm.httpGetter(vm.term);

    }
  };

  $('#reload').click(function() {
    location.reload();
  });
  $('#pieChartHeader').hide();

});

new WOW().init();


