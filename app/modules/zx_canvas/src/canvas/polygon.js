/**
 * Created by zarges on 05.11.14.
 */
'use strict';
var Polygon = zxBackbone.NestedModel.extend({

    nested: function () {
        return {
            coordinates: zxCanvas.Coordinates,
            color: zxCanvas.Color
        };
    },

    animate: function(attributes, duration){
        var self = this;

        var runAnimation = function(){
          if(self.get('color').get('alpha')<0){
              return;
          } else {
              self.get('color').set('alpha',self.get('color').get('alpha')-0.01);
          }
          window.requestAnimationFrame(runAnimation);
        };
        runAnimation();
    },

    render: function (context) {
        var coordinates = this.get('coordinates').toJSON(),
            startEndPoint = coordinates.splice(0,1)[0],
            color = this.get('color').toRgbaString();

        context.fillStyle = color;

        context.beginPath();

        context.moveTo(startEndPoint.x, startEndPoint.y);

        coordinates.forEach(function (coordinate) {
            context.lineTo(coordinate.x, coordinate.y);
        });

        context.lineTo(startEndPoint.x, startEndPoint.y);

        context.closePath();
        context.fill();
        return this;
    }

});

zxCanvas.Polygon = Polygon;