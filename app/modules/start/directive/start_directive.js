(function () {
    'use strict';

    angular.module('Portfolio')

        .directive('zxCanvas', function ($http) {
            return {
                replace: true,
                template: '<canvas style="position: absolute; left: -90px;top:-90px;" width="3630" height="3630"></canvas>', //Width && Height = (row or col amount-1 * diamond width or height)-(diamond width or height)/2
                scope: {
                    opacity: '='
                },
                link: function (scope, el) {

                   var canvas = new zxCanvas.Canvas(el[0]),
                       background = new zxCanvas.Polygon([
                           new zxCanvas.Coordinate(0,0),
                           new zxCanvas.Coordinate(0,400),
                           new zxCanvas.Coordinate(800,400),
                           new zxCanvas.Coordinate(800,0)
                       ],{color:new zxCanvas.Color('rgba(255,0,255,0.5')}),
                       rectangle = new zxCanvas.Polygon([
                           new zxCanvas.Coordinate(0,0),
                           new zxCanvas.Coordinate(0,200),
                           new zxCanvas.Coordinate(200,200),
                           new zxCanvas.Coordinate(200,0)
                       ]),
                       rectangle1 = new zxCanvas.Polygon([
                           new zxCanvas.Coordinate(200,0),
                           new zxCanvas.Coordinate(200,200),
                           new zxCanvas.Coordinate(400,200),
                           new zxCanvas.Coordinate(400,0)
                       ]),
                       rectangle2 = new zxCanvas.Polygon([
                           new zxCanvas.Coordinate(400,0),
                           new zxCanvas.Coordinate(400,200),
                           new zxCanvas.Coordinate(600,200),
                           new zxCanvas.Coordinate(600,0)
                       ],{color: new zxCanvas.Color('yellow')});
                    //canvas.registerPolygon(background);
                    canvas.registerPolygon(rectangle);
                    canvas.registerPolygon(rectangle1);
                    canvas.registerPolygon(rectangle2);

                    setTimeout(function(){
                        rectangle2.setColor(new zxCanvas.Color('rgba(255,255,255,0'));
                    },1000)
                }
            };
        });

}());
