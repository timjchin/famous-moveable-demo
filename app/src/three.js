define(function(require, exports, module) {
  'use strict';
  var MoveableView = require('./base/MoveableView');
  var MoveableSurface = require('./base/MoveableSurface');
  var Transform = require('famous/core/Transform');
  var Button = require('./flipButton/Button');
  var Layout = require('./base/Layout');
  var Utils = require('./base/Utils');
  var BarLayout = require('./flipButton/BarLayout');
  var Timer = require('famous/utilities/Timer');
  var SequentialLayout = require('./flipButton/SequentialLayout');

  function SceneThree () {
    MoveableView.apply(this, arguments);
    document.body.classList.add('scene-two');

    var alignLeft = new Button({ 
      buttonContent: '<i class="h1 button fa fa-align-left"></i>',
      textContent: '<h6 class="text-label">Left Align</h6>',
    });
    window.a = Utils.listMethods(new MoveableSurface());
    console.log(a);

    var alignRight = new Button({ 
      buttonContent: '<i class="h1 button fa fa-align-right"></i>',
      textContent: '<h6 class="text-label">Right Align</h6>',
    });

    var alignCenter = new Button({ 
      buttonContent: '<i class="h1 button fa fa-align-center"></i>',
      textContent: '<h6 class="text-label">Center Align</h6>',
    });

    var alignJustify = new Button({ 
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

    Timer.setTimeout(function () {
      barLayout.setOptions({ 
        layout: 'collapsed'
      });
    }, 1500);

    this.add(barLayout);
  }

  SceneThree.prototype = Object.create(MoveableView.prototype);
  SceneThree.prototype.constructor = SceneThree;

  module.exports = SceneThree;
});
