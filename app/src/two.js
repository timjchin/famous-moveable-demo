define(function(require, exports, module) {
  'use strict';
  var MoveableView = require('./base/MoveableView');
  var MoveableSurface = require('./base/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var Button = require('./flipButton/Button');

  function SceneTwo () {
    MoveableView.apply(this, arguments);
    document.body.classList.add('scene-two');

    var textButton = new Button({ 
      buttonContent: '<i class="h1 button fa fa-align-left"></i>',
      textContent: '<h6 class="text-label">Left Align</h6>',
      origin: [0.5, 0.5],
      align: [0.5, 0.5],
      opacity: 0,
      transform: Transform.rotateY(Math.PI)
    });

    textButton
      .setOpacity(1, { 
        duration: 2000
      })
      .setTransform(Transform.identity, {
        duration: 2000,
        curve: 'outExpo'
      });

    this.add(textButton);
  }

  SceneTwo.prototype = Object.create(MoveableView.prototype);
  SceneTwo.prototype.constructor = SceneTwo;

  module.exports = SceneTwo;
});
