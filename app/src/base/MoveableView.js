/* globals define */
define(function(require, exports, module) {
    'use strict';

    var View = require('famous/core/View');
    var Modifier = require('famous/core/Modifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var TransitionableTransform = require('famous/transitions/TransitionableTransform');
    var Utility = require('famous/utilities/Utility');

    /**
     *  @class MoveableView
     */
    function MoveableView (options) {
      View.apply(this, arguments);

      this._mod = new Modifier();
      this._node = this.add(this._mod);

      this._transitionables = {
        origin: undefined,
        align: undefined,
        opacity: undefined,
        size: undefined,
        transform: undefined,
        proportions: undefined,
      };

      if (this.options.origin) this.setOrigin(this.options.origin)
      if (this.options.align) this.setAlign(this.options.align)
      if (this.options.transform) this.setTransform(this.options.transform)
      if (this.options.proportions) this.setProportions(this.options.proportions)
      if (this.options.opacity !== undefined) this.setOpacity(this.options.opacity)
    }

    MoveableView.prototype = Object.create(View.prototype);
    MoveableView.prototype.constructor = MoveableView;

    MoveableView.DEFAULT_OPTIONS = {};

    MoveableView.types = {
      origin: 'origin',
      align: 'align',
      size: 'size',
      opacity: 'opacity',
      transform: 'transform',
      proportions: 'proportions',
    };

    MoveableView.createTransitionables = {
      origin: function (mod) {
        return new Transitionable([0,0]);
      },
      align: function (mod) {
        return new Transitionable([0,0]);
      },
      size: function (mod) {
        return new Transitionable([undefined,undefined]);
      },
      transform: function (mod) {
        return new TransitionableTransform();
      },
      opacity: function (mod) {
        return new Transitionable(1);
      },
      proportions: function (mod) {
        return new Transitionable([undefined,undefined]);
      }
    };

    MoveableView.attachToModifier = {
      origin: function (mod, val) {
        mod.originFrom(val);
      },
      align: function (mod, val) {
        mod.alignFrom(val);
      },
      size: function (mod, val) {
        mod.sizeFrom(val);
      },
      transform: function (mod, val) {
        mod.transformFrom(val);
      },
      opacity: function (mod, val) {
        mod.opacityFrom(val);
      },
      proportions: function (mod, val) {
        mod.proportionsFrom(val);
      }
    }

    MoveableView.afterCallback = function (count, callback) {
      return Utility.after(count, function () {
        if (callback) callback();
      });
    }
    
    /**
     *  @method _setByKey
     *  @protected
     *  @param {String} key - to set.
     *  @param {Array|Number|Transform|Function} value - to set on the transitionable
     *  @param {String} transition - to use
     *  @param {Function} cb - callback when completed
     */
    MoveableView.prototype._setByKey = function (key, value, transition, cb) {
      var trans;
      // functional modifier, directly attach.
      if (value instanceof Function) {
        // set to undefined to fall into the second case on a second set.
        this._transitionables[key] = undefined;
        MoveableView.attachToModifier[key](value);
        return;
      }
      else if (!this._transitionables[key]) {
        this._transitionables[key] = MoveableView.createTransitionables[key]();
        MoveableView.attachToModifier[key](this._mod, this._transitionables[key]);
      }

      this._transitionables[key].set(value, transition, cb);
    };

    /**
     *  @method _getByKey
     *  @protected
     *  @param {String} key to get value of.
     */
    MoveableView.prototype._getByKey = function (key) {
      if (this._transitionables[key]) {
        return this._transitionables[key].get();
      }
      else return undefined;
    }
    
    /**
     *  Stop animations in their current state. Either choose a key, 
     *  or halt all animatable properties.
     *
     *  @method halt
     */
    MoveableView.prototype.halt = function (key) {
      if (key && this._transitionables[key]) {
        this._transitionables[key].halt();
      }
      else {
        for (var key in this._transitionables) {
          if (this._transitionables[key]) this._transitionables[key].halt();
        }
      }
    };

    MoveableView.prototype.delayByKey = function (key, val, callback) {
      if (key == MoveableView.types.transform && this._transitionables[key]) {
        var callback = MoveableView.afterCallback(4, callback);
        this._transitionables[key].translate.delay(val, callback);
        this._transitionables[key].rotate.delay(val, callback);
        this._transitionables[key].skew.delay(val, callback);
        this._transitionables[key].scale.delay(val, callback);
      }
      else if (this._transitionables[key]) {
        this._transitionables[key].delay(val, callback);
      }
    };

    MoveableView.prototype.setOrigin = function (value, transition, cb) {
      this._setByKey(MoveableView.types.origin, value, transition, cb);
      return this;
    };

    MoveableView.prototype.getOrigin = function () {
      return this._getByKey(MoveableView.types.origin);
    };

    MoveableView.prototype.setAlign = function (value, transition, cb) {
      this._setByKey(MoveableView.types.align, value, transition, cb);
      return this;
    };

    MoveableView.prototype.getAlign = function () {
      return this._getByKey(MoveableView.types.align);
    };

    MoveableView.prototype.setSize = function (value, transition, cb) {
      this._setByKey(MoveableView.types.size, value, transition, cb);
      return this;
    };

    MoveableView.prototype.getSize = function () {
      return this._getByKey(MoveableView.types.size);
    };

    MoveableView.prototype.setTransform = function (value, transition, cb) {
      this._setByKey(MoveableView.types.transform, value, transition, cb);
      return this;
    };

    MoveableView.prototype.getTransform = function () {
      return this._getByKey(MoveableView.types.transform);
    };
    
    MoveableView.prototype.setOpacity = function (value, transition, cb) {
      this._setByKey(MoveableView.types.opacity, value, transition, cb);
      return this;
    };

    MoveableView.prototype.getOpacity = function () {
      return this._getByKey(MoveableView.types.opacity);
    };

    MoveableView.prototype.setProportions = function (value, transition, cb) {
      this._setByKey(MoveableView.types.proportions, value, transition, cb);
      return this;
    };

    MoveableView.prototype.getProportions = function () {
      return this._getByKey(MoveableView.types.proportions);
    };

    module.exports = MoveableView;
});
