'use strict';

var cartService = function($localStorage) {
  return {
    add: add
    , get: get
    , all: all
    , remove: remove
    , clear: clear
    , total: total
  }

  function get(product) {
    if($localStorage.cartItems) {
      return Array.prototype.filter.call($localStorage.cartItems, function(ci) {
        if(ci.id == product.id) return ci;
      });
    } else {
      return [];
    }
  }

  function total() {
    return $localStorage.cartTotal
  }

  function add(product) {
    if(typeof $localStorage.cartItems === 'undefined' || $localStorage.cartItems.length == 0) {
      $localStorage.cartItems = [product];
      $localStorage.cartTotal = product.price;
    } else {
      var existingCartItem = get(product);
      if(existingCartItem.length > 0) {
        existingCartItem[0] = product;
        $localStorage.cartTotal += existingCartItem[0].price;
      } else {
        $localStorage.cartItems.push(product);
        $localStorage.cartTotal += product.price;
      }
    }
  }

  function clear() {
    $localStorage.cartItems = [];
    $localStorage.cartTotal = 0;
  }

  function all() {
    return typeof $localStorage.cartItems === 'undefined' ? [] : $localStorage.cartItems;
  }

  function remove(product, callback) {
    if(typeof $localStorage.cartItems !== 'undefined' && $localStorage.cartItems.length > 0) {
      var existingCartItem = get(product);
      if(existingCartItem[0].quantity == 0) {
        $localStorage.cartItems = Array.prototype.filter.call($localStorage.cartItems, function(p) {
          if(product.id != p.id)  return p;
        })
      }
      existingCartItem[0] = product
      $localStorage.cartTotal -= existingCartItem[0].price;
      if(callback) {
        callback(existingCartItem);
      }
    }
  }
}

cartService.$inject = ['$localStorage'];


angular.module('app.cart.service', []).factory('appCartService', cartService);
