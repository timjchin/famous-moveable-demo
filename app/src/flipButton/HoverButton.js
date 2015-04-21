/* globals define */
define(function(require, exports, module) {
  'use strict';

  var MoveableView = require('famous-moveable/MoveableView');
  var Button = require('./Button');
  var MoveableSurface = require('famous-moveable/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var Utils = require('famous-moveable/Utils');

  function HoverButton (options) {
    this.showText = this.showText.bind(this);
    this.hideText = this.hideText.bind(this);
  
    Button.apply(this, arguments);

    this._text = new MoveableSurface(Utils.extend(
      MoveableSurface.getPassedOptions(this, 'text'), {
        properties: { 
          'pointerEvents': 'none',
          'zIndex': 10
        },
        opacity: 0
      }));

    this.add(this._text);
  }

  HoverButton.prototype = Object.create(Button.prototype);
  HoverButton.prototype.constructor = HoverButton;

  HoverButton.prototype.showText = function () {
    var showAnimation = this.constructor.animations.show[this.options.show];
    showAnimation.call(this, this._button, this._text, this.options);
  }

  HoverButton.prototype.hideText = function () {
    var hideAnimation = this.constructor.animations.hide[this.options.hide];
    hideAnimation.call(this, this._button, this._text, this.options);
  }

  HoverButton.prototype.setShow = function (key) {
    if (this.constructor.animations.show[key]) {
      this.options.show = key;
    }
  }

  HoverButton.prototype.setHide = function (key) {
    if (this.constructor.animations.hide[key]) {
      this.options.show = key;
    }
  }

  HoverButton.prototype.getSize = function () {
    return this._button.getSize();
  }

  HoverButton.prototype.bindEvents = function () {
    Button.prototype.bindEvents.call(this);
    this._button.addListener('mouseover', this.showText);
    this._button.addListener('mouseout', this.hideText);
  }

  HoverButton.prototype.unbindEvents = function () {
    Button.prototype.unbindEvents.call(this);
    this._button.removeListener('mouseover', this.showText);
    this._button.removeListener('mouseout', this.hideText);
  }

  HoverButton.DEFAULT_OPTIONS = Utils.mergeOptions(Button.DEFAULT_OPTIONS, {
    textContent: 'Button 1',
    buttonSize: [true,true],
    textSize: [true, true],
    padding: 15,
    buttonContent: '',
    show: 'moveDown',
    hide: 'fade',
    duration: 500
  });

  HoverButton.animations = {
    show: {
      'fade': function (button, text, options) {
        text.halt();
        var buttonSize = button.getSize();
        var textX = this._getTextX();
        text.setTransform(Transform.translate(textX, buttonSize[1] + options.padding));
        text.setOpacity(1, { duration: 500, curve: 'outExpo' });
      },
      'moveDown': function (button, text, options) {
        text.halt();
        var buttonSize = button.getSize();
        var textX = this._getTextX();
        text
          .setOpacity(1, { duration: 250, curve: 'outExpo' })
          .setTransform(Transform.translate(textX, buttonSize[1]))
          .setTransform(Transform.translate(textX, buttonSize[1] + options.padding), {
            duration: 500,
            curve: 'outExpo'
          })
      },
      'rotateDown': function (button, text, options) {
        text.halt();
        var buttonSize = button.getSize();
        var textX = this._getTextX();
        text
          .setOpacity(1, { duration: 350, curve: 'outExpo' })
          .setTransform(
            Transform.moveThen(
              [textX, buttonSize[1]],
              Transform.rotateY(Math.PI * 0.8)))
          .setTransform(Transform.translate(textX, buttonSize[1] + options.padding), {
            duration: 950,
            curve: 'inOutBack'
          })
      },
    },
    hide: {
      'fade': function (button, text, options) {
        text.halt();
        text.setOpacity(0, { 
          duration: 150,
          curve: 'outExpo'
        });
      },
      'rotateOut': function (button, text, options) {
        var buttonSize = button.getSize();
        var textX = this._getTextX();
        text.halt();
        text
          .setOpacity(0, { 
            duration: 750,
            curve: 'outExpo'
          })
          .setTransform(
            Transform.moveThen(
              [textX, buttonSize[1]],
              Transform.rotateY(Math.PI * 0.5)), {
                duration: 500, 
                curve: 'inOutBack'
          })
      }
    }
  }

  HoverButton.prototype._getTextX = function () {
      var buttonSize = this._button.getSize();
      var textSize = this._text.getSize();
      return buttonSize[0] * 0.5 - textSize[0] * 0.5;
  }

  module.exports = HoverButton;
});
