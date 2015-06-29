myYelp.controller('yelpController', function($http) {
  $http.get('[http://localhost:8080]' + vm.location)
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      })
});