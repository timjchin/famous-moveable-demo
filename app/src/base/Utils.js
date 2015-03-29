/* globals define */
define(function(require, exports, module) {
  'use strict';
  var Engine = require('famous/core/Engine');

  module.exports = {
    inherits: function (_parent, _child) {
      _child.prototype = Object.create(_parent.prototye);
      _child.prototype.constructor = child;
    },
    when: function (predicate, cb) {
      var checkPred = function () {
        var bool = predicate();
        if (bool) {
          cb();
        }
        else {
          Engine.nextTick(checkPred);
        }
      }
      Engine.nextTick(checkPred);
    },
    extend: function (a /**, b.. */) {
      var _args = Array.prototype.slice.call(arguments, 1, arguments.length)
      for (var i = 0; i < _args.length; i++) { 
        var obj = _args[i];
        for (var key in obj) {
          a[key] = obj[key];
        }
      }
      return a;
    }
  };

});
