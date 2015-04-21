/* globals define */
define(function(require, exports, module) {
  'use strict';

  var MoveableView = require('famous-moveable/MoveableView');
  var MoveableSurface = require('famous-moveable/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var Utils = require('famous-moveable/Utils');

  function Button (options) {
    MoveableView.apply(this, arguments);

    this._button = new MoveableSurface(
      MoveableSurface.getPassedOptions(this, 'button'));
    this._boundResize = this.emitResize.bind(this);

    this.onClick = this.onClick.bind(this);
    this.bindEvents();
    this.setSize(this.getSize.bind(this));

    this.add(this._button);
  }

  Button.prototype = Object.create(MoveableView.prototype);
  Button.prototype.constructor = Button;

  Button.prototype.getSize = function () {
    return this._button.getSize();
  }

  Button.prototype.emitResize = function () {
    this.emit('resize');
  }

  Button.prototype.bindEvents = function () {
    this._button.addListener('mousedown', this.onClick);
    this._button.addListener('touchend', this.onClick);
    this._button.on('resize', this._boundResize);
  }

  Button.prototype.unbindEvents = function () {
    this._button.removeListener('mousedown', this.onClick);
    this._button.removeListener('touchend', this.onClick);
    this._button.removeListener('resize', this._boundResize);
  }

  Button.prototype.onClick = function () {
    Button.animations.onClick[this.options.clickAnimation].call(this, this._button);
    if (this.options.event) this.emit(this.options.event);
    this.emit('selected');
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
