'use strict';

var productService = function($http, appCartService) {
  return {
    all: all,
    addToCart: addToCart,
    removeFromCart: removeFromCart
  }

  function addToCart(product) {
    var cartProduct = appCartService.get(product)
    if(typeof product.quantity === 'undefined') {
      product.quantity = 1;
    } else {
      product.quantity += 1;
    }
    appCartService.add(product);
  }
  function removeFromCart(product) {
    var cartProduct = appCartService.get(product)
    product.quantity -= 1;
    appCartService.remove(product)
  }

  function all() {
    return $http.get('http://localhost:4646/data/data.json')
  }
}

productService.$inject = ['$http', 'appCartService'];

angular.module('app.product.service', ['app.cart.service']).factory('appProductService', productService);
