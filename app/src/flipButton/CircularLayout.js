/* globals define */
define(function(require, exports, module) {
  'use strict';
  var LayoutBase = require('famous-moveable/LayoutBase');
  var Transform = require('famous/core/Transform');

  function CircularLayout () {
    LayoutBase.apply(this, arguments);
  }

  CircularLayout.prototype = Object.create(LayoutBase.prototype);
  CircularLayout.prototype.constructor = CircularLayout;

  CircularLayout.DEFAULT_OPTIONS = {
    layoutAnimation: 'cards',
    padding: 15,
    radius: 100,
    span: Math.PI * 1.75,
    offset: Math.PI * 0.25
  }

  CircularLayout.animations = {
    cards: function (child, finalPos, i, cb) {
      child.delayByKey('transform', i * 25);
      child.setTransform(Transform.translate(
        finalPos[0], finalPos[1], finalPos[2]), {
          curve: 'inOutExpo',
          duration: 1200
        });
    }
  }

  CircularLayout.prototype.layout = function (children, sizes) {
      var offset = [0,0,0];
      var halfRadius = this.options.radius * 0.5;
      var center = [halfRadius, halfRadius, 0];
      var interval = this.options.span / children.length;
      for (var i = 0, len = children.length; i < len; i++) { 
        var child = children[i];
        var step = interval * i + this.options.offset;
        var pos = [
          center[0] + Math.cos(step) * this.options.radius,
          center[1] + Math.sin(step) * this.options.radius,
          0
        ];

        child.halt();
        CircularLayout.animations[this.options.layoutAnimation](
          child,
          pos,
          i
        );
      }
  }

  CircularLayout.prototype.getSize = function () {
    return [this.options.radius * 2, this.options.radius * 2];
  }

  module.exports = CircularLayout;
});
