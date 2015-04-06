/* globals define */
define(function(require, exports, module) {
  'use strict';

  var MoveableView = require('../base/MoveableView');
  var MoveableSurface = require('../base/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var Utils = require('../base/Utils');

  function Layout (options) {
    MoveableView.apply(this, arguments);
    this._initialized = false;
    this._childSizes = [];
    this._children = this.options.children;
    this._activeLayout = this.options.layout;

    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      this._hideChild(child);
      this.bindEvents(child);
      this.add(child);
    }

    this._listenForSize();
  }

  Layout.prototype = Object.create(MoveableView.prototype);
  Layout.prototype.constructor = Layout;

  Layout.prototype.destroy = function () {
    for (var i = 0; i < this._children.length; i++) { 
      var child = this._children[i];
      this.unbindEvents(child);
    }
  }

  Layout.prototype.layout = function () {
    this._readSizes();
    if (this._activeLayout) {
      this._activeLayout.layout(this._children, this._childSizes);
    }
    return this;
  }

  Layout.prototype.bindEvents = function (elem) {};

  Layout.prototype.unbindEvents = function (elem) {};

  Layout.prototype.getSize = function () {
    if (this._initialized && this._activeLayout) {
      return this._activeLayout.getSize(
        this._children, this._childSizes);
    }
    else return undefined;
  }

  Layout.DEFAULT_OPTIONS = {
  };

  Layout.prototype._listenForSize = function (child, anim) {
    var self = this;
    Utils.when(function () {
      for (var i = 0; i < self._children.length; i++) { 
        var child = self._children[i];
        var size = child.getSize();
        if (!size || size[0] === true || size[1] === true || size[0] === 0 || size[1] === 0) { 
          return false;
        }
        return true;
      }
    }, this._sizeSafe.bind(this));
  }

  Layout.prototype._sizeSafe = function (child, anim) {
    this._initialized = true;
    this.setSize(this.getSize.bind(this));
    this.layout();
  }

  Layout.prototype._readSizes = function () {
    for (var i = 0; i < this._children.length; i++) { 
      var child = this._children[i];
      this._childSizes[i] = child.getSize().slice(0);
    }
  }

  Layout.prototype._hideChild = function (child, anim) {
    child.setOpacity(0, anim);
    child.setTransform(Transform.scale(0.001, 0.001), anim);
  }

  module.exports = Layout;
});
