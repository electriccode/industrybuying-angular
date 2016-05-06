'use strict';

var routeConfig = function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('products', {
      abstarct: true
      , templateUrl: 'product.index.html'
      , controller: 'appProductController'
      , controllerAs: 'product'
    }
  ).state('products.cart', {
    url: ''
    , templateUrl: 'cart.index.html'
    , controller: 'appCartController'
    , controllerAs: 'cart'
  })
}

angular.module('app.product.routes',['app.product.controller', 'app.cart.controller']).config(routeConfig);
