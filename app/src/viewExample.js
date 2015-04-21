/* globals define */
define(function(require, exports, module) {
    var MoveableView = require('famous-moveable/MoveableView');
    var MoveableSurface = require('famous-moveable/MoveableSurface');
    var Transform = require('famous/core/Transform');

    function SceneOne () {
      MoveableView.apply(this, arguments);

      var surfOne = new MoveableSurface({
        size: [50,50], 
        properties: { 
          backgroundColor: 'red',
          backfaceVisibility: 'visible'
        }
      });

      var surfTwo = new MoveableSurface({
        size: [50,50], 
        properties: { 
          backgroundColor: 'red',
          backfaceVisibility: 'visible'
        },
        transform: Transform.translate(50, 0)
      });

      this.add(surfOne);
      this.add(surfTwo);
    }

    SceneOne.prototype = Object.create(MoveableView.prototype);
    SceneOne.prototype.constructor = SceneOne;

    module.exports = SceneOne;
});
