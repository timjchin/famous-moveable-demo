/* globals define */
define(function(require, exports, module) {
    'use strict';

    var MoveableView = require('../base/MoveableView');
    var MoveableSurface = require('../base/MoveableSurface');
    var Transform = require('famous/core/Transform');

    function HoverButton (options) {
      MoveableView.apply(this, arguments);

      this._button = new MoveableSurface(
        MoveableSurface.getPassedOptions(this, 'button'));

      this._text = new MoveableSurface(
        MoveableSurface.getPassedOptions(this, 'text'));
      
      this._text.setOpacity(0);

      this.showText = this.showText.bind(this);
      this.hideText = this.hideText.bind(this);
      this.onClick = this.onClick.bind(this);

      this.bindEvents();

      this.add(this._button);
      this.add(this._text);
    }

    HoverButton.prototype = Object.create(MoveableView.prototype);
    HoverButton.prototype.constructor = HoverButton;

    HoverButton.DEFAULT_OPTIONS = {
      textContent: 'Button 1',
      buttonSize: [true,true],
      textSize: [true, true],
      padding: 15,
      buttonContent: '',
      show: 'rotateDown',
      hide: 'rotateOut',
      duration: 500
    };

    HoverButton.animations = {
      show: {
        'fade': function (button, text, options) {
          text.halt();
          var buttonSize = button.getSize();
          text.setTransform(Transform.translate(0, buttonSize[1] + options.padding));
          text.setOpacity(1, { duration: 500, curve: 'outExpo' });
        },
        'moveDown': function (button, text, options) {
          text.halt();
          var buttonSize = button.getSize();
          text
            .setOpacity(1, { duration: 500, curve: 'outExpo' })
            .setTransform(Transform.translate(0, buttonSize[1]))
            .setTransform(Transform.translate(0, buttonSize[1] + 25), {
              duration: 500,
              curve: 'outExpo'
            })
        },
        'rotateDown': function (button, text, options) {
          text.halt();
          var buttonSize = button.getSize();
          text
            .setOpacity(1, { duration: 500, curve: 'outExpo' })
            .setTransform(
              Transform.thenMove(
                Transform.rotateY(Math.PI), 
                [0, buttonSize[1]]))
            .setTransform(Transform.translate(0, buttonSize[1] + 25), {
              duration: 500,
              curve: 'inOutBack'
            })
        },
      },
      hide: {
        'fade': function (button, text, options) {
          text.halt();
          text.setOpacity(0, { 
            duration: 250,
            curve: 'outExpo'
          });
        },
        'rotateOut': function (button, text, options) {
          var buttonSize = button.getSize();
          text.halt();
          text
            .setOpacity(0, { 
              duration: 750,
              curve: 'outExpo'
            })
            .setTransform(
              Transform.thenMove(
                Transform.rotateY(Math.PI * 0.5), 
                [0, buttonSize[1]]), {
                  duration: 500, 
                  curve: 'inOutBack'
            })
        }
      }
    }

    HoverButton.prototype.bindEvents = function () {
      this._button.addListener('mouseover', this.showText);
      this._button.addListener('mouseout', this.hideText);
      this._button.addListener('mousedown', this.onClick);
      this._button.addListener('touchend', this.onClick);
    }

    HoverButton.prototype.unbindEvents = function () {
      this._button.removeListener('mouseover', this.showText);
      this._button.removeListener('mouseout', this.hideText);
      this._button.removeListener('mousedown', this.onClick);
      this._button.removeListener('touchend', this.onClick);
    }

    HoverButton.prototype.showText = function () {
      var showAnimation = this.constructor.animations.show[this.options.show];
      showAnimation(this._button, this._text, this.options);
    }

    HoverButton.prototype.hideText = function () {
      var hideAnimation = this.constructor.animations.hide[this.options.hide];
      hideAnimation(this._button, this._text, this.options);
    }

    HoverButton.prototype.onClick = function () {
      this._button.halt('transform');
      this._button.setTransform(
        Transform.translate(0,0, -500))
        .setTransform(Transform.identity, {
          curve: 'outBack',
          duration: 250
        })
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

    module.exports = HoverButton;
});
