'use strict';

function cartController($scope, $localStorage, appCartService) {
  $scope.clearCart = function() {
    appCartService.clear()
  }
  $scope.remove = function(product) {
    appCartService.remove(product, function(productRemoved) {
      // console.log(productRemoved)
    })
  }
  $scope.cartItems = appCartService.all()
  $scope.cartItemsTotal = appCartService.total()

  $scope.$watch(function() {return $localStorage.cartTotal}, function(newValue, oldValue) {
    $scope.cartItemsTotal = newValue
  })
  $scope.$watch(function() {return $localStorage.cartItems}, function(newValue, oldValue) {
    $scope.cartItems = newValue
  })
}

cartController.$inject = ['$scope', '$localStorage', 'appCartService']

angular.module('app.cart.controller', ['app.cart.service']).controller('appCartController', cartController);
