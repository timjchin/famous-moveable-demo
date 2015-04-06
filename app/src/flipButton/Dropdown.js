/* globals define */
define(function(require, exports, module) {
  var Layout = require('../base/Layout');
  var Transform = require('famous/core/Transform');

  function Dropdown () {
    Layout.apply(this, arguments);

    this._state = {
      dropdown: Dropdown.states.closed,
      selected: this.options.selected
    };

    this._showChild(this._children[this._state.selected]);
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
      shuffle: function (child, index, selectedIndex, finalTranslate) {
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
            })
            .setOpacity(1, { duration: 400 });
      },
      rotateIn: function (child, index, selectedIndex, finalTranslate, length) {
        var size = child.getSize();
        var step = -(Math.PI * .5) / length;
        child
          .setTransform(
            Transform.thenMove(
              Transform.rotateX(index * step),
              [ 0, finalTranslate[1], -finalTranslate[1]]
            ), {
              curve: 'inOutElastic',
              duration: 800
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
      fade: function (child, index, selectedIndex) {
        if (index === selectedIndex) { 
          child.setTransform(Transform.identity, {
            curve: 'outBack',
            duration: 500
          });
        } 
        else {
          child
            .setOpacity(0, { duration: 400 })
            .setTransform(Transform.translate(0,0, -index * 25), { 
              curve: 'inOutBack',
              duration: 400
            });
        }
      },
      fadeThenReturn: function (child, index, selectedIndex, length) {
        var delayStep = 100;
        var duration = 400;
        if (index === selectedIndex) {
          child.delayByKey('transform', duration)
          child.setTransform(Transform.identity, {
            curve: 'outExpo',
            duration: duration 
          });
        }
        else {
          var translate = Transform.getTranslate(child.getTransform());
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
            });
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
      console.log('evt', child.getEvent());
    }
  } 

  Dropdown.prototype.open = function () {
    var anim = Dropdown.animations.open[this.options.openAnimation];
    if (!anim) return;
    var offsetY = 0;
    var orderedChildren = this._getOrderedChildren();
    for (var i = 0, len = orderedChildren.length; i < len; i++) { 
      var child = orderedChildren[i];
      child.halt();
      var size = child.getSize();
      anim(child, i, this._state.selected, [0, offsetY], len);
      offsetY += size[1] + this.options.padding;
    }
    this._state.dropdown = Dropdown.states.open;
  }

  Dropdown.prototype.close = function () {
    var anim = Dropdown.animations.close[this.options.closeAnimation];
    if (!anim) return;
    for (var i = 0, len = this._children.length; i < len; i++) { 
      var child = this._children[i];
      child.halt();      
      anim(child, i, this._state.selected, len);
    }
    this._state.dropdown = Dropdown.states.closed;
  }

  Dropdown.prototype._getOrderedChildren = function () {
    var orderedChildren = this._children.slice(0);
    var selected = orderedChildren.splice(this._state.selected, 1);
    orderedChildren.unshift(selected[0]);
    return orderedChildren;
  }

  Dropdown.prototype.bindEvents = function (elem, i) {
    elem.on('touchdown', this._onClick.bind(this, elem));
    elem.on('mouseup', this._onClick.bind(this, elem));
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

  module.exports = Dropdown;
});
