/* globals define */
define(function(require, exports, module) {
  'use strict';
  var OptionsManager = require('famous/core/OptionsManager');
  var Utility = require('famous/utilities/Utility');

  function LayoutBase (options) {
    this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || {});
    this._optionsManager = new OptionsManager(this.options);
    if (options) this.setOptions(options);
  }

  LayoutBase.DEFAULT_OPTIONS = {};

  LayoutBase.prototype.layout = function (children, sizes, options) {};
  LayoutBase.prototype.getSize = function (children, sizes, options) {};

  LayoutBase.prototype.setOptions = function (options) {
    this._optionsManager.patch(options);
  }
  

  module.exports = LayoutBase;
});
