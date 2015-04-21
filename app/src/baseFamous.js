define(function(require, exports, module) {
    'use strict';
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var TransitionableTransform = require('famous/transitions/TransitionableTransform');
    var Transform = require('famous/core/Transform');

    function SceneOne () {
      View.apply(this, arguments);

      var surface = new Surface({
        size: [50,50], 
        properties: { 
          backgroundColor: 'red',
          backfaceVisibility: 'visible'
        }
      });

      var modifier = new Modifier();
      var tt = new TransitionableTransform();
      modifier.transformFrom(tt);

      tt.set(Transform.translate(100,100));
      function move () {
        tt
          .set(Transform.translate(200, 100), {
            duration: 500, 
            curve: 'outExpo'
          })
          .set(
            Transform.thenMove(
              Transform.rotateX(Math.PI),
              [200, 200]
            ) , {
              duration: 1500, 
              curve: 'outExpo'
            })
          .set(Transform.translate(100, 100), { 
            duration: 500,
            curve: 'outExpo'
          }, move);
      }

      this.add(modifier).add(surface);
      move();
    }

    SceneOne.prototype = Object.create(View.prototype);
    SceneOne.prototype.constructor = SceneOne;

    module.exports = SceneOne;
});
