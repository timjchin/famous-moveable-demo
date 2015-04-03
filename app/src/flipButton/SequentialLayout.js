/* globals define */
define(function(require, exports, module) {
  'use strict';
  var LayoutBase = require('../base/LayoutBase');
  var Transform = require('famous/core/Transform');

  function SequentialLayout () {
    LayoutBase.apply(this, arguments);
  }

  SequentialLayout.prototype = Object.create(LayoutBase.prototype);
  SequentialLayout.prototype.constructor = SequentialLayout;

  SequentialLayout.DEFAULT_OPTIONS = {
    layoutAnimation: 'cards',
    sequentialPadding: 15,
    sequentialDirection: 'y'
  }

  SequentialLayout.animations = { 
    cards: function (child, offset, options, i) {
      child.setTransform(Transform.translate(0,0, i * 15));
      child.delayByKey('transform', i * 200);
      child.delayByKey('opacity', i * 200);
      child.setOpacity(1, { duration: 700 });
      child.setTransform(Transform.translate(offset[0], offset[1], offset[2]), { 
        curve: 'inOutBack',
        duration: 400
      });
    }
  }

  SequentialLayout.prototype.layout = function (children, sizes) {
      var offset = [0,0,0];
      var dir = this.options.sequentialDirection == 'x' ? 0 : 1;
      for (var i = 0; i < children.length; i++) { 
        var child = children[i];

        SequentialLayout.animations[this.options.layoutAnimation](
          child,
          offset,
          this.options,
          i
        );

        offset[dir] += sizes[i][dir] + this.options.sequentialPadding;
      }
  }

  SequentialLayout.prototype.getSize = function (children, sizes) {
    var totalSize = [0,0];
    var dir = this.options.sequentialDirection == 'x' ? 0 : 1;
    var oppositeDir = dir === 0 ? 1 : 0;
    for (var i = 0; i < sizes.length; i++) { 
      var childSize = sizes[i];
      totalSize[dir] += childSize[dir] + this.options.sequentialPadding;
      totalSize[oppositeDir] = Math.max(childSize[oppositeDir], totalSize[oppositeDir]);
    }
    return totalSize;
  }

  module.exports = SequentialLayout;
});
