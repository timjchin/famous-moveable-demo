define(function(require, exports, module) { 'use strict';
  var MoveableView = require('./base/MoveableView');
  var MoveableSurface = require('./base/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var HoverButton = require('./flipButton/HoverButton');
  var Button = require('./flipButton/Button');
  var Layout = require('./base/Layout');
  var Utils = require('./base/Utils');
  var Timer = require('famous/utilities/Timer');
  var SequentialLayout = require('./flipButton/SequentialLayout');
  var Dropdown = require('./flipButton/Dropdown');

  function SceneThree () {
    MoveableView.apply(this, arguments);
    document.body.classList.add('scene-two');

    var alignLeft = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-left"></i>',
      textContent: '<h6 class="text-label">Left Align</h6>',
      event: 'alignLeft'
    });

    var alignRight = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-right"></i>',
      textContent: '<h6 class="text-label">Right Align</h6>',
    });

    var alignCenter = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-center"></i>',
      textContent: '<h6 class="text-label">Center Align</h6>',
    });

    var alignJustify = new HoverButton({ 
      buttonContent: '<i class="h1 button fa fa-align-justify"></i>',
      textContent: '<h6 class="text-label">Justify Align</h6>',
    });

    var barLayout = new Layout({
      children: [
        alignLeft,
        alignCenter,
        alignJustify,
        alignRight,
      ],
      layout: new SequentialLayout({

      }),
      origin: [0.5, 0.5],
      align: [0.5, 0.5]
    });

    this.add(barLayout);
    window.barLayout = barLayout;

    var dropdown = new Dropdown({ 
      children: [
        new Button({ 
          buttonContent: '<div class="dropdown-button">test 1</div>',
          event: 'test1'
        }),
        new Button({ 
          buttonContent: '<div class="dropdown-button">test 2</div>',
          event: 'test2'
        }),
        new Button({ 
          buttonContent: '<div class="dropdown-button">test 3</div>',
          event: 'test3'
        }),
        new Button({ 
          buttonContent: '<div class="dropdown-button">test 4</div>',
          event: 'test4'
        }),
      ],
    });
    
    this.add(dropdown);
  }

  SceneThree.prototype = Object.create(MoveableView.prototype);
  SceneThree.prototype.constructor = SceneThree;

  module.exports = SceneThree;
});
