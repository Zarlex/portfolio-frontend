(function () {
    'use strict';

    angular.module('Portfolio')

        .directive('zxCanvas', function ($http) {
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
                        diamondRasterLayer = layerFactory.createLayer(zxDiamondRaster.DiamondRaster,{rows:5,columns:9,diamondHeight:240,diamondWidth:240});

                    canvas.attributes.set({width: windowSize.width, height: windowSize.height});
                    layers.add(diamondRasterLayer);

                    scope.$watch('opacity',function(value){
                        if(value){
                            diamondRasterLayer.get('polygons').each(function(diamond){
                                diamond.set({color:{alpha:value/100}});
                            });
                        }
                    });


                    //var diamondRaster = zxDiamondRaster.DiamondRaster();
                    //canvas.createLayer(diamondRaster,300);
                    //var layer = canvas.createPolygonLayer(100);
                    //var layer2 = canvas.createPolygonLayer(200);
                    //var layer2b = canvas.createPolygonLayer(30);
                    //var layer3 = canvas.createImageLayer(4);
                    //var polygon = new zxCanvas.Polygon({coordinates: [
                    //    {x: 0, y: 0},
                    //    {x: 300, y: 0},
                    //    {x: 100, y: 500},
                    //    {x: 0, y: 200}
                    //], color: {red: 144, blue: 144, green: 144}});
                    //var polygon2 = new zxCanvas.Polygon({coordinates: [
                    //    {x: 200, y: 0},
                    //    {x: 400, y: 0},
                    //    {x: 400, y: 200},
                    //    {x: 200, y: 200}
                    //], color: {red: 255, blue: 0, green: 255}});
                    //var polygon3 = new zxCanvas.Polygon({coordinates: [
                    //    {x: 200, y: 400},
                    //    {x: 400, y: 400},
                    //    {x: 400, y: 600},
                    //    {x: 200, y: 600}
                    //], color: {red: 255, blue: 0, green: 255}});
                    //var diamond = new zxDiamondRaster.Diamond({height: 100, width:100,position:{x:0,y:0}});
                    //
                    //console.log(diamond);
                    //
                    //canvas.attributes.set({width: windowSize.width, height: windowSize.height});
                    //
                    //layer.get('polygons').add(polygon);
                    //layer2.get('polygons').add(polygon2);
                    //layer2b.get('polygons').add(polygon3);
                    //layer2.get('polygons').add(diamond);
                    //
                    //layer3.set('src', '/modules/start/images/southside.jpg');
                    //
                    //window.polygon2 = polygon2;
                    //layer.set('globalCompositeOperation', 'screen');
                    //
                    //setTimeout(function () {
                    //    zxCanvas.animationQueue.add({duration:2000,model:polygon2.get('color'),attributes:{blue:255,red:0,green:0}});
                    //    zxCanvas.animationQueue.add({duration:2000,model:polygon3.get('position'),attributes:{x:100,y:100}});
                    //}, 1000);
                    //
                }
            };
        });

}());
