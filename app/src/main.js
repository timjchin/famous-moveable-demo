define(function(require, exports, module) {
  'use strict';
  var Engine = require('famous/core/Engine');
  var RegisterCurves = require('famous-moveable/RegisterCurves');

  var SceneThree = require('./three');
  var Modifier = require('famous/core/Modifier');
  var Surface= require('famous/core/Surface');

  // create the main context
  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);
  // chrome bug, ensure that it applies perspective.
  mainContext.container.style.backfaceVisibility = 'hidden';
  mainContext.add(new SceneThree());

});
