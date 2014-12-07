/**
 * Created by zarges on 05.11.14.
 */
'use strict';
var Polygon = zxBackbone.NestedModel.extend({

    nested: function () {
        return {
            coordinates: zxCanvas.Coordinates,
            color: zxCanvas.Color,
            animationQueue: zxBackbone.Collection
        };
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