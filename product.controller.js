'use strict';

var productController = function($scope, $localStorage, appProductService, appCartService) {
  $scope.products = appProductService.all().then(function resolve(response) {
    $scope.products = response.data;

    // Sync with cart data
    appCartService.all().forEach(function (cp,i) {
      $scope.products.forEach(function(p,j) {
        if(p.id == cp.id) {
          console.log([p,cp]);
          p.quantity = cp.quantity;
          return;
        }
      })
    })
  })
  $scope.addToCart = function(product) {
    appProductService.addToCart(product);
  }
  $scope.removeFromCart = function(product) {
    appProductService.removeFromCart(product);
  }
  $scope.$watch(function() {return $localStorage.cartItems}, function(newValue, oldValue) {
    // Update when cart is cleared
    if(typeof newValue !== 'undefined') {
      if(newValue.length == 0) {
        if(typeof $scope.products.length !== 'undefined') {
          $scope.products.forEach(function(p,i) {
            p.quantity = 0;
          })
        }
      }
    }
  })
}

productController.$inject = ['$scope', '$localStorage', 'appProductService', 'appCartService'];

angular.module('app.product.controller',['app.product.service', 'app.cart.service']).controller('appProductController', productController);
