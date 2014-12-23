(function () {
    'use strict';

    angular.module('Portfolio')

        .directive('zxCanvas', function () {
            return {
                replace: true,
                template: '<canvas style="position: absolute; left: 0;top:0"></canvas>', //Width && Height = (row or col amount-1 * diamond width or height)-(diamond width or height)/2
                scope: {
                    opacity: '='
                },
                link: function (scope, el) {

                    var canvas = new zxCanvas.Canvas({el: el}),
                        layers = canvas.attributes.get('layers'),
                        layerFactory = new zxCanvas.LayerFactory(canvas),
                        windowSize = {
                            width: angular.element(document).width(),
                            height: angular.element(document).height()
                        },
                        diamondRasterLayer = layerFactory.createLayer(zxDiamondRaster.DiamondRaster,{rowAmount:5,columnAmount:5,diamondHeight:120,diamondWidth:120,position:{x:0,y:0}});

                    canvas.attributes.set({width: windowSize.width, height: windowSize.height});
                    layers.add(diamondRasterLayer);

                    scope.$watch('opacity',function(value){
                        if(value){

                            var circles = diamondRasterLayer.getCircles();

                            circles[0].forEach(function(diamond){
                                diamond.set({color:{alpha:value/100}});
                            });

                            circles[2].forEach(function(diamond){
                                diamond.set({color:{alpha:value/100}});
                            });
                        }
                    });
                }
            };
        });

}());
