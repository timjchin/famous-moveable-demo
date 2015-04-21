define(function(require, exports, module) {
  'use strict';
  var MoveableView = require('famous-moveable/MoveableView');
  var MoveableSurface = require('famous-moveable/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var Button = require('./flipButton/Button');
  var Engine = require('famous/core/Engine');
  var RegisterCurves = require('famous-moveable/RegisterCurves');
  var Button = require('./flipButton/Button');
  var Modifier = require('famous/core/Modifier');
  var Surface= require('famous/core/Surface');

  function ButtonScene () {
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

  ButtonScene.prototype = Object.create(MoveableView.prototype);
  ButtonScene.prototype.constructor = ButtonScene;

  // create the main context
  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);
  // chrome bug, ensure that it applies perspective.
  mainContext.container.style.backfaceVisibility = 'hidden';
  mainContext.add(new ButtonScene());

});
