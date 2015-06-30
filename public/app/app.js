var myYelp = angular.module('myYelp', []);

myYelp.controller('yelpController', function($http) {
  vm = this;
  vm.submit = function() {
    vm.message = 'hello';
    $http.get('http://localhost:8080/businesses/' + vm.location + '/' + vm.type)
        .success(function (data) {
          vm.data = data.businesses;
          vm.type = data.term;
          vm.img = data.image_url;
          console.log(data);

        })
        .error(function (data) {
          console.log(data);
        })
  }
});