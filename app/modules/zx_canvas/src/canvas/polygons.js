/**
 * Created by zarges on 05.11.14.
 */

var Polygon = zxBackbone.NestedModel.extend({

    nested: function () {
        return {
            coordinates: zxCanvas.Coordinates,
            color: zxCanvas.Color
        }
    },

    render: function (context) {
        var coordinates = this.get('coordinates').toJSON(),
            startEndPoint = coordinates.splice(0,1),
            color = this.get('color').toHexString();

        context.fillStyle = color;

        context.beginPath();
        context.moveTo(startEndPoint.get('x'), startEndPoint.get('y'));

        coordinates.forEach(function (coordinate) {
            context.lineTo(coordinate.get('x'), coordinate.get('y'));
        });

        context.lineTo(startEndPoint.get('x'), startEndPoint.get('y'));

        context.closePath();
        context.fill();
        return this;
    }

});

zxCanvas.Polygon = Polygon;

debugger;