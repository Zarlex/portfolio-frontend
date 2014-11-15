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
                    var polygon = new zxCanvas.Polygon({coordinates: [{x:0,y:0},{x:200,y:0},{x:200,y:200},{x:0,y:200}], color:{red:255,blue:0,green:0}});
                    layer.get('polygons').add(polygon);

                    layer.on('change:image',function(layer){
                        canvas.getContext().putImageData(layer.get('image'),0,0);
                    },this);
                }
            };
        });

}());
