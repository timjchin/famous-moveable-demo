/* globals define */
define(function(require, exports, module) {
  'use strict';

  module.exports = {
    inherits: function (_parent, _child) {
      _child.prototype = Object.create(_parent.prototye);
      _child.prototype.constructor = child;
    }
  };

});
