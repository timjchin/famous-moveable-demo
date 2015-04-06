/* globals define */
define(function(require, exports, module) {
  'use strict';
  var Surface = require('famous/core/Surface');
  var MoveableView = require('./MoveableView');

  function MoveableSurface (options) {
    MoveableView.apply(this, arguments);
    this._surface = new Surface(options);

    this.add(this._surface);
    this.add = this._add = undefined;
  }

  MoveableSurface.prototype = Object.create(MoveableView.prototype);
  MoveableSurface.prototype.constructor = MoveableSurface;

  MoveableSurface.getPassedOptions = function (self, prefix) {
    var optNames = ['Size', 'Content', 'Properties', 'Classes', 'Attributes'];
    var obj = {};
    for (var i = 0; i < optNames.length; i++) { 
      var optName = prefix + optNames[i];
      var currentOption = self.options[optName];
      if (currentOption) obj[optNames[i].toLowerCase()] = currentOption;
    }
    return obj; 
  }
  MoveableSurface.prototype.addListener = function () {
    return this._surface.on.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.on = MoveableSurface.prototype.addListener;

  MoveableSurface.prototype.removeListener = function () {
    return this._surface.removeListener.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.off = MoveableSurface.prototype.removeListener;

  MoveableSurface.prototype.setAttributes = function () {
    return this._surface.setAttributes.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.getAttributes = function () {
    return this._surface.getAttributes.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.setProperties = function () {
    return this._surface.setProperties.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.getProperties = function () {
    return this._surface.getProperties.apply(this._surface, arguments);
  }
  
  MoveableSurface.prototype.addClass = function () {
    return this._surface.addClass.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.removeClass = function () {
    return this._surface.removeClass.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.toggleClass = function () {
    return this._surface.toggleClass.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.setClasses = function () {
    return this._surface.setClasses.apply(this._surface, arguments);
  }
  
  MoveableSurface.prototype.getClassList = function () {
    return this._surface.getClassList.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.setContent = function () {
    return this._surface.setContent.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.getContent = function () {
    return this._surface.getContent.apply(this._surface, arguments);
  }

  MoveableSurface.prototype.getSize = function () {
    return this._surface.getSize.apply(this._surface, arguments);
  }

  module.exports = MoveableSurface;
});
