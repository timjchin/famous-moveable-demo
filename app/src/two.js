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
  var HoverButton = require('./flipButton/HoverButton');
  var Dropdown = require('./flipButton/Dropdown');
  var Layout = require('famous-moveable/Layout');
  var SequentialLayout = require('./flipButton/SequentialLayout');

  function ButtonScene () {
    MoveableView.apply(this, arguments);

    var textButton = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-left"></i>',
      textContent: '<h6 class="text-label">Left Align</h6>',
      origin: [0.5, 0.5],
      align: [0.5, 0.5],
      show: 'fade',
      opacity: 0,
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

    var showAnimation = new Dropdown({
      children: [
        new Button({ 
          buttonContent: '<div class="dropdown-button">Fade</div>',
          event: 'fade'
        }),       
        new Button({ 
          buttonContent: '<div class="dropdown-button">Move Down</div>',
          event: 'moveDown'
        }),       
        new Button({ 
          buttonContent: '<div class="dropdown-button">Rotate Down</div>',
          event: 'rotateDown'
        }),       
      ]
    });
    showAnimation.on('selected', function (e) {
      textButton.setOptions({
        show: e
      });
    });

    var hideAnimation = new Dropdown({
      children: [
        new Button({ 
          buttonContent: '<div class="dropdown-button">Fade</div>',
          event: 'fade'
        }),       
        new Button({ 
          buttonContent: '<div class="dropdown-button">Rotate Out</div>',
          event: 'rotateOut'
        }),       
      ]
    });

    hideAnimation.on('selected', function (e) {
      textButton.setOptions({
        hide: e
      });
    });

    var dropdownLayout = new Layout({
      children: [
        showAnimation,
        hideAnimation
      ],
      layout: new SequentialLayout({
        direction: 'x',
        padding: 15
      }),
      origin: [1, 0],
      align: [0.98, 0.05]
    });
    

    this.add(dropdownLayout);
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
