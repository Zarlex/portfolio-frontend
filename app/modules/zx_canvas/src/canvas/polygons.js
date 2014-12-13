/**
 * Created by zarges on 14.11.14.
 */

var Polygons = zxBackbone.Collection.extend({

    model: zxCanvas.Polygon,

    getRenderRectangle: function () {
        var xCoordinates = [],
            yCoordinates = [],
            startX, startY, endX, endY, width, height;

        if (this.length === 0) {
            return [0, 0, 0, 0];
        } else {
            this.each(function (polygon) {
                var x = polygon.get('position').get('x'),
                    y = polygon.get('position').get('y');

                polygon.get('coordinates').each(function (coordinate) {
                    xCoordinates.push(coordinate.get('x')+x);
                    yCoordinates.push(coordinate.get('y')+y);
                });
            });

            xCoordinates = xCoordinates.sort();
            yCoordinates = yCoordinates.sort();

            startX = xCoordinates[0];
            startY = yCoordinates[0];
            endX = xCoordinates[xCoordinates.length - 1];
            endY = yCoordinates[yCoordinates.length - 1];
            width = endX - startX;
            height = endY - startY;

            return [startX, startY, width, height];
        }
    }

});

zxCanvas.Polygons = Polygons;