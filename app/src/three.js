define(function(require, exports, module) { 'use strict';
  var MoveableView = require('famous-moveable/MoveableView');
  var MoveableSurface = require('famous-moveable/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var HoverButton = require('./flipButton/HoverButton');
  var Button = require('./flipButton/Button');
  var Layout = require('famous-moveable/Layout');
  var Utils = require('famous-moveable/Utils');
  var Timer = require('famous/utilities/Timer');
  var SequentialLayout = require('./flipButton/SequentialLayout');
  var CircularLayout = require('./flipButton/CircularLayout');
  var Dropdown = require('./flipButton/Dropdown');

  function SceneThree () {
    MoveableView.apply(this, arguments);

    this.addBar();
    this.addDropdown();
    this.addWriting();
  }

  SceneThree.prototype = Object.create(MoveableView.prototype);
  SceneThree.prototype.constructor = SceneThree;

  SceneThree.prototype.addBar = function () {
    var self = this;
    var alignLeft = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-left"></i>',
      textContent: '<h6 class="text-label">Left Align</h6>',
      opacity: 0,
      event: 'alignLeft'
    });

    alignLeft.on('alignLeft', function () {
      self._writing.setProperties({ 
        textAlign: 'left'
      });
    });

    var alignRight = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-right"></i>',
      textContent: '<h6 class="text-label">Right Align</h6>',
      opacity: 0,
      event: 'alignRight'
    });

    alignRight.on('alignRight', function () {
      self._writing.setProperties({ 
        textAlign: 'right'
      });
    });

    var alignCenter = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-center"></i>',
      textContent: '<h6 class="text-label">Center Align</h6>',
      opacity: 0,
      event: 'alignCenter'
    });

    alignCenter.on('alignCenter', function () {
      self._writing.setProperties({ 
        textAlign: 'center'
      });
    });

    var alignJustify = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-justify"></i>',
      textContent: '<h6 class="text-label">Justify Align</h6>',
      opacity: 0,
      event: 'alignJustify'
    });

    alignJustify.on('alignJustify', function () {
      self._writing.setProperties({ 
        textAlign: 'justify'
      });
    });

    var save = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-floppy-o"></i>',
      textContent: '<h6 class="text-label">Save</h6>',
      opacity: 0,
      event: 'save'
    });

    var newButton = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-file-o"></i>',
      textContent: '<h6 class="text-label">New</h6>',
      opacity: 0,
      event: 'new'
    });
    newButton.on('new', function () {
      var trans = { curve: 'inOutExpo', duration: 600 }
      self._writingContainer
        .setRotate([0,Math.PI, 0], trans, function () {
          self._writing.setValue(' ');
        })
        .setRotate([0,Math.PI * 1.999, 0], trans, function () {
          self._writing.focus();
        })
    });

    var openButton = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-folder-open-o"></i>',
      textContent: '<h6 class="text-label">Load</h6>',
      opacity: 0,
      event: 'open'
    });

    openButton.on('open', function () {
      self._writing.setProperties({ 
        textAlign: 'justify'
      });
    });
    
    this._barSequential = new SequentialLayout();
    this._barCircular = new CircularLayout();
    this._barLayout = new Layout({
      children: [
        alignLeft,
        alignCenter,
        alignJustify,
        alignRight,
        save,
        openButton,
        newButton
      ],
      layout: this._barSequential,
      origin: [0, 0],
      align: [0.05, 0.05]
    });

    this.add(this._barLayout);
  }

  SceneThree.prototype.addDropdown = function () {
    var directionDropdown = new Dropdown({ 
      children: [
        new Button({ 
          buttonContent: '<div class="dropdown-button">Vertical</div>',
          event: 'y'
        }),       
        new Button({ 
          buttonContent: '<div class="dropdown-button">Horizontal</div>',
          event: 'x'
        }),
        new Button({ 
          buttonContent: '<div class="dropdown-button">Circular</div>',
          event: 'circular'
        }),
      ],
      origin: [1, 0],
      align: [0.98, 0.05]
    });

    var self = this;
    directionDropdown.on('selected', function (e) {
      var trans = {
        curve: 'outExpo',
        duration: 1200
      }
      if (e === 'y' || e === 'x') {
        if (self._barLayout.getLayout !== self._barSequential) {
          self._barLayout.setLayout(self._barSequential);
        }

        self._barLayout.setLayoutOptions({ 
          direction: e,
          delay: 50
        });
        
        if (e === 'y') {
          self._barLayout.setAlign([0.05, 0.05], trans);
          self._barLayout.setOrigin([0, 0], trans);
          self._writingContainer.setAlign([0.5, 0.05], trans);
          self._writingContainer.setProportions([0.6, 0.9], trans);
          self._writingContainer.setOrigin([0.5, 0], trans);
        } 
        else {
          self._barLayout.setAlign([0.05, 0.05], trans);
          self._barLayout.setOrigin([0, 0], trans);
          self._writingContainer.setAlign([0.05, 0.15], trans);
          self._writingContainer.setOrigin([0, 0], trans);
          self._writingContainer.setProportions([0.8, 0.75], trans);
        }
        
      } else if (e == 'circular') {
        if (self._barLayout.getLayout !== self._barCircular) {
          self._barLayout.setLayout(self._barCircular);

          self._barLayout.setAlign([0.1, 0.5], trans);
          self._barLayout.setOrigin([0, 0.5], trans);
          self._writingContainer.setAlign([0.6, 0.05], trans);
          self._writingContainer.setProportions([0.5, 0.9], trans);
          self._writingContainer.setOrigin([0.5, 0], trans);
        }
      }
      self._barLayout.layout();
    });

    this.add(directionDropdown);
  }

  SceneThree.prototype.addWriting = function () {
    this._writingContainer = new MoveableSurface({
      type: 'container',
      properties: {
        overflow: 'scroll',
        backgroundColor: '#222'
      },
      proportions: [0.6, 0.9],
      origin: [0.5, 0],
      align: [0.5, 0.05]
    });
    this._writingBackground = new MoveableSurface({
      rotate: [0, Math.PI, 0],
      origin: [0.5, 0.5],
      align: [0.5, 0.5],
      size: [undefined, undefined],
      translate: [0,0,-2],
      classes: ['main-text-background']
    });
    this._writing = new MoveableSurface({
      type: 'textarea', 
      classes: ['main-text-box'],
      properties: {
        backfaceVisibility: 'visible'
      },
      size: [undefined, undefined],
      placeholder: 'Start typing..'
    });
    this._writingContainer.add(this._writing);
    this._writingContainer.add(this._writingBackground);
    this.add(this._writingContainer);
  }

  module.exports = SceneThree;
});
