/* globals define */
define(function(require, exports, module) {
  'use strict';

  var MoveableView = require('../base/MoveableView');
  var MoveableSurface = require('../base/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var Utils = require('../base/Utils');

  function Button (options) {
    MoveableView.apply(this, arguments);

    this._button = new MoveableSurface(
      MoveableSurface.getPassedOptions(this, 'button'));

    this.onClick = this.onClick.bind(this);
    this.bindEvents();

    this.add(this._button);
  }

  Button.prototype = Object.create(MoveableView.prototype);
  Button.prototype.constructor = Button;

  Button.prototype.getSize = function () {
    return this._button.getSize();
  }
  Button.prototype.addListener = function () {
    return this._button.on.apply(this._button, arguments);
  }

  Button.prototype.on = Button.prototype.addListener;

  Button.prototype.removeListener = function () {
    return this._button.removeListener.apply(this._button, arguments);
  }

  Button.prototype.off = Button.prototype.removeListener;

  Button.prototype.bindEvents = function () {
    this._button.addListener('mousedown', this.onClick);
    this._button.addListener('touchend', this.onClick);
  }

  Button.prototype.unbindEvents = function () {
    this._button.removeListener('mousedown', this.onClick);
    this._button.removeListener('touchend', this.onClick);
  }

  Button.prototype.onClick = function () {
    Button.animations.onClick[this.options.clickAnimation].call(this, this._button);
    if (this.options.event) this.emit(this.options.event);
  }

  Button.prototype.getEvent = function () {
    return this.options.event;
  }

  Button.DEFAULT_OPTIONS = {
    event: undefined,
    buttonSize: [true,true],
    textSize: [true, true],
    padding: 15,
    clickAnimation: 'scalePop',
    buttonContent: '',
  };
  Button.animations = {
    onClick: {
      'scalePop': function (elem) {
        elem.halt('transform');

        elem.setTransform(
            Utils.originMatrix(
              [0.5, 0.5], 
              elem.getSize(), 
              Transform.scale(0.5,0.5)))

          .setTransform(Transform.identity, {
            curve: 'outBack',
            duration: 250
          });
      }
    }
  }

  module.exports = Button;
});
