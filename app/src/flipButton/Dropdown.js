/* globals define */
define(function(require, exports, module) {
  var Layout = require('famous-moveable/Layout');
  var Transform = require('famous/core/Transform');
  var Engine = require('famous/core/Engine');

  function Dropdown () {
    Layout.apply(this, arguments);

    this._state = {
      dropdown: Dropdown.states.closed,
      selected: this.options.selected
    };
    this.bindEvents();
    this.close();
    this._sizeDirtyFn = function () {
      this._sizeDirty = false;
    }.bind(this);
    this._emitResize = function () {
      this.emit('resize');
    }.bind(this);
  }

  Dropdown.prototype = Object.create(Layout.prototype);
  Dropdown.prototype.constructor = Dropdown;

  Dropdown.states = { 
    closed: 0,
    open: 1
  }

  Dropdown.DEFAULT_OPTIONS = { 
    selected: 0,
    openAnimation: 'rotateIn',
    closeAnimation: 'fadeThenReturn',
    padding: 3
  }

  Dropdown.animations = {
    open: {
      shuffle: function (child, index, selectedIndex, finalTranslate, cb) {
          child.setTransform(Transform.identity);
          if (index !== 0) {
            child
              .delayByKey('transform', index * 50)
              .delayByKey('opacity', index * 50);
          }
          child
            .setTransform(Transform.translate(finalTranslate[0], finalTranslate[1], finalTranslate[2]), {
              curve: 'outBack',
              duration: 500
            }, cb)
            .setOpacity(1, { duration: 400 });
      },
      rotateIn: function (child, index, selectedIndex, finalTranslate, length, cb) {
        var size = child.getSize();
        var step = -(Math.PI * .5) / length;
        child
          .setTransform(
            Transform.thenMove(
              Transform.rotateX(index * step),
              [ 0, finalTranslate[1], -finalTranslate[1] * 2]
            ), {
              curve: 'inOutElastic',
              duration: 400
            })
          .setOpacity(0.6, {duration: 400 })
          .delayByKey('opacity', index * 50)
          .delayByKey('transform', index * 50)
          .setOpacity(1, { duration: 300 })
          .setTransform(Transform.translate(finalTranslate[0], finalTranslate[1], finalTranslate[2]), { 
              curve: 'outExpo',
              duration: 550 
          });
           
      }
    },
    close: {
      fade: function (child, index, selectedIndex, cb) {
        if (index === selectedIndex) { 
          child.setTransform(Transform.identity, {
            curve: 'outBack',
            duration: 500
          }, cb);
        } 
        else {
          child
            .setOpacity(0, { duration: 400 })
            .setTransform(Transform.translate(0,0, -index * 25), { 
              curve: 'inOutBack',
              duration: 400
            }, cb);
        }
      },
      fadeThenReturn: function (child, index, selectedIndex, length, cb) {
        var delayStep = 100;
        var duration = 400;
        if (index === selectedIndex) {
          child.delayByKey('transform', duration)
          child.setTransform(Transform.identity, {
            curve: 'outExpo',
            duration: duration 
          }, cb);
        }
        else {
          var transform = child.getTransform();
          var translate = transform ? Transform.getTranslate(transform) : [0,0,0];
          child
            .setTransform(Transform.translate(0, translate[1], -75), {
              curve: 'outBack',
              duration: duration
            })
            .setOpacity(0.5, {duration: duration})
            .delayByKey('opacity', duration + index * delayStep)
            .setOpacity(0.2, { duration: 800 })
            .setTransform(Transform.translate(0,0, -index * 5), { 
              curve: 'outExpo',
              duration: duration
            }, cb);
        }
      }
    }
  }

  Dropdown.prototype.setSelected = function (index) {
    var child = this._children[index];
    if (!child) return;
    this._state.selected = index;
    if (child.getEvent) { 
      this.emit('selected', child.getEvent());
    }
  } 

  Dropdown.prototype.open = function () {
    this._sizeDirty = true;
    var anim = Dropdown.animations.open[this.options.openAnimation];
    if (!anim) return;
    var offsetY = 0;
    var orderedChildren = this._getOrderedChildren();
    for (var i = 0, len = orderedChildren.length; i < len; i++) { 
      var child = orderedChildren[i];
      child.halt();
      var size = child.getSize();
      anim(child, i, this._state.selected, [0, offsetY], len, this._sizeDirtyFn);
      offsetY += size[1] + this.options.padding;
    }
    this._state.dropdown = Dropdown.states.open;
  }

  Dropdown.prototype.close = function () {
    this._sizeDirty = true;
    var anim = Dropdown.animations.close[this.options.closeAnimation];
    if (!anim) return;
    for (var i = 0, len = this._children.length; i < len; i++) { 
      var child = this._children[i];
      child.halt();      
      anim(child, i, this._state.selected, len, this._sizeDirtyFn);
    }
    this._state.dropdown = Dropdown.states.closed;
  }

  Dropdown.prototype._getOrderedChildren = function () {
    var orderedChildren = this._children.slice(0);
    var selected = orderedChildren.splice(this._state.selected, 1);
    orderedChildren.unshift(selected[0]);
    return orderedChildren;
  }

  Dropdown.prototype.bindEvents = function () {
    for (var i = 0; i < this._children.length; i++) { 
      var elem = this._children[i];
      elem.on('selected', this._onClick.bind(this, elem));
    }
  }

  Dropdown.prototype._onClick = function (elem) {
    var index = this._children.indexOf(elem);
    if (this._state.dropdown == Dropdown.states.closed) {
      this.open();
    }
    else if (this._state.dropdown == Dropdown.states.open) {
      this.setSelected(index);
      this.close();
    }
  }

  Dropdown.prototype.render = function () {
    if (this._sizeDirty) {
      Engine.nextTick(this._emitResize);
    }
    return Layout.prototype.render.call(this);
  }

  module.exports = Dropdown;
});
