/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Engine = require('famous/core/Engine');

  var MoveableView = require('./base/MoveableView');
  var RegisterCurves = require('./base/RegisterCurves');

  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');

  var SceneOne = require('./one');
  var SceneTwo = require('./two');
  var SceneThree = require('./three');
  var Button = require('./flipButton/Button');

  // create the main context
  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);

  mainContext.add(new SceneThree());
});
