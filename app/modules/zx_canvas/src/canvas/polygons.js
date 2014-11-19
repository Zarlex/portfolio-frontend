/**
 * Created by zarges on 14.11.14.
 */
'use strict';
var Polygons = zxBackbone.Collection.extend({

    model: zxCanvas.Polygon,

    getRenderRectangle: function () {
        var polygons = this.toJSON(),
            xCoordinates = [],
            yCoordinates = [],
            startX, startY, endX, endY, width, height;

        if (polygons.length === 0) {
            return [0, 0, 0, 0];
        } else {
            polygons.forEach(function (polygon) {
                polygon.coordinates.forEach(function (coordinate) {
                    xCoordinates.push(coordinate.get('x'));
                    yCoordinates.push(coordinate.get('y'));
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