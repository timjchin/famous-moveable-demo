/* globals define */
define(function(require, exports, module) {
    'use strict';
    var MoveableView = require('famous-moveable/MoveableView');
    var MoveableSurface = require('famous-moveable/MoveableSurface');
    var Transform = require('famous/core/Transform');

    function SceneOne () {
      MoveableView.apply(this, arguments);

      var surf = new MoveableSurface({
        size: [50,50], 
        properties: { 
          backgroundColor: 'red',
          backfaceVisibility: 'visible'
        }
      });

      surf.setTransform(Transform.translate(100,100));
      function move() {
        surf
            .setTransform(Transform.translate(200, 100), {
              duration: 500, 
              curve: 'outExpo'
            })
            .setTransform(
              Transform.thenMove(
                Transform.rotateX(Math.PI),
                [200, 200]
              ) , {
                duration: 1500, 
                curve: 'outExpo'
              })
            .setTransform(Transform.translate(100, 100), { 
              duration: 500,
              curve: 'outExpo'
            }, move);
      }; 
      this.add(surf);
      move();
    }

    SceneOne.prototype = Object.create(MoveableView.prototype);
    SceneOne.prototype.constructor = SceneOne;

    module.exports = SceneOne;
});
