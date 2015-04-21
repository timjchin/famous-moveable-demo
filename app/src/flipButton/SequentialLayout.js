/* globals define */
define(function(require, exports, module) {
  'use strict';
  var LayoutBase = require('famous-moveable/LayoutBase');
  var Transform = require('famous/core/Transform');

  function SequentialLayout () {
    LayoutBase.apply(this, arguments);
    this._direction = directionToDir(this.options.direction);
    this._setDirection = this._setDirection.bind(this);
  }

  function directionToDir (dir) {
    return dir === 'x' ? 0 : 1 
  }

  SequentialLayout.prototype = Object.create(LayoutBase.prototype);
  SequentialLayout.prototype.constructor = SequentialLayout;

  SequentialLayout.DEFAULT_OPTIONS = {
    layoutAnimation: 'cards',
    padding: 15,
    direction: 'y',
    delay: 100
  }

  SequentialLayout.animations = {
    cards: function (child, offset, options, i, cb) {
      child.halt();
      child.delayByKey('transform', i * options.delay);
      child.delayByKey('opacity', i * options.delay);
      child.setOpacity(1, { duration: 700 });
      child.setTransform(Transform.translate(offset[0], offset[1], offset[2]), { 
        curve: 'outExpo',
        duration: 400
      }, cb);
    }
  }

  SequentialLayout.prototype.layout = function (children, sizes) {
      var offset = [0,0,0];
      var dir = directionToDir(this.options.direction);
      for (var i = 0, len = children.length; i < len; i++) { 
        var child = children[i];
        var cb = i === len-1 ? this._setDirection : undefined

        SequentialLayout.animations[this.options.layoutAnimation](
          child,
          offset,
          this.options,
          i,
          cb
        );

        offset[dir] += sizes[i][dir] + this.options.padding;
      }
  }

  SequentialLayout.prototype._setDirection = function () {
    this._direction = directionToDir(this.options.direction);
  }

  module.exports = SequentialLayout;
});
