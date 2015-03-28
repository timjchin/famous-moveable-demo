/* globals define */
define(function(require, exports, module) {
    'use strict';
    var MoveableView = require('./base/MoveableView');
    var MoveableSurface = require('./base/MoveableSurface');
    var Transform = require('famous/core/Transform');

    function SceneOne () {
      MoveableView.apply(this, arguments);

      var surf = new MoveableSurface({
        size: [50,50], 
        properties: { 
          backgroundColor: 'red'
        }
      });

      surf.setTransform(Transform.translate(200, 200), {
        duration: 500, 
        curve: 'outExpo'
      });

      surf.delayByKey('transform', 500);

      surf.setTransform(Transform.translate(50, 50), { 
        duration: 500,
        curve: 'outExpo'
      });

      this.add(surf);
    }

    SceneOne.prototype = Object.create(MoveableView.prototype);
    SceneOne.prototype.constructor = SceneOne;

    module.exports = SceneOne;
});
