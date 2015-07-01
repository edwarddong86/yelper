var myYelp = angular.module('myYelp', []);

myYelp.controller('yelpController', function($http) {
  vm = this;
  vm.submit = function() {
    for (var i = 0; i < 20; i++) {
      vm.reqNum = i;
      var yelpBusinesses = [];
      $http.get('http://localhost:8080/businesses/' + vm.location + '/' + vm.reqNum)
          .success(function (data) {
            var businessInfo = {};
            for(var j = 0; j < data.businesses.length; j++){
              businessInfo = {
                name: data.businesses[j].name,
                claimed: data.businesses[j].is_claimed,
                rating: data.businesses[j].rating,
                reviews: data.businesses[j].review_count
              };
              yelpBusinesses.push(businessInfo);
            }
          })
          .error(function (data) {
            console.log(data);
          })
    }
    console.log(yelpBusinesses);
  };

});