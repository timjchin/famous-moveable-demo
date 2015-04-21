define(function(require, exports, module) {
  'use strict';
  var Engine = require('famous/core/Engine');
  var RegisterCurves = require('famous-moveable/RegisterCurves');

  var BaseFamous = require('./BaseFamous');

  // create the main context
  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);

  mainContext.add(new BaseFamous());
});
