/**
 * Created by zarges on 05.11.14.
 */

var Polygon = zxBackbone.NestedModel.extend({

    nested: function () {
        return {
            position: zxCanvas.Coordinate,
            coordinates: zxCanvas.Coordinates,
            color: zxCanvas.Color
        };
    },

    render: function (context) {
        var coordinates = this.get('coordinates').toJSON(),
            startEndPoint = coordinates.splice(0,1)[0],
            color = this.get('color').toRgbaString(),
            position = this.get('position'),
            x = position.get('x'),
            y = position.get('y');

        context.fillStyle = color;

        context.beginPath();

        context.moveTo(startEndPoint.x+x, startEndPoint.y+y);

        coordinates.forEach(function (coordinate) {
            context.lineTo(coordinate.x+x, coordinate.y+y);
        });

        context.lineTo(startEndPoint.x+x, startEndPoint.y+y);

        context.closePath();
        context.fill();
        return this;
    }

});

zxCanvas.Polygon = Polygon;