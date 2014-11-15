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

                   var canvas = new zxCanvas.Canvas({el:el});

                    var layer = canvas.createPolygonLayer();
                    var layer2 = canvas.createPolygonLayer();
                    var polygon = new zxCanvas.Polygon({coordinates: [{x:0,y:0},{x:200,y:0},{x:200,y:200},{x:0,y:200}], color:{red:255,blue:0,green:0}});
                    var polygon2 = new zxCanvas.Polygon({coordinates: [{x:200,y:0},{x:400,y:0},{x:400,y:200},{x:200,y:200}], color:{red:255,blue:0,green:255}});

                    layer.get('polygons').add(polygon);
                    layer2.get('polygons').add(polygon2);


                    setTimeout(function(){
                        polygon.set('color',{red:0,blue:255,green:0});
                    },1000);
                }
            };
        });

}());
