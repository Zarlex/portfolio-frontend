(function () {
    'use strict';

    angular.module('Portfolio')

        .directive('appendClassAccordingToRoute', function () {
            return {
                link: function (scope, el) {
                    scope.$on('$routeChangeSuccess', function (event, current) {
                        el.addClass(current.cssClasses);
                    });
                }
            };
        })

        .directive('zxCanvas', function () {
            return {
                replace: true,
                template: '<canvas style="position: absolute; left: 0;top:0"></canvas>',
                scope: {
                    opacity: '='
                },
                link: function (scope, el) {

                    var canvas = new zxCanvas.Canvas({el: el}),
                        layerFactory = new zxCanvas.LayerFactory(canvas),
                        windowSize = {
                            width: angular.element(document).width(),
                            height: angular.element(document).height()
                        },
                        layerGroup = layerFactory.createLayer(zxCanvas.LayerGroup),
                        diamond1 = layerFactory.createLayer(zxCanvas.PolygonLayer, {polygons:[
                            new zxDiamondRaster.Diamond({width:100,height:100, color:{red:0}})
                        ]}),
                        diamond2 = layerFactory.createLayer(zxCanvas.PolygonLayer, {polygons:[
                            new zxDiamondRaster.Diamond({width:50,height:50, color:{red:255}})
                        ]}),
                        diamond3 = layerFactory.createLayer(zxCanvas.PolygonLayer, {polygons:[
                            new zxDiamondRaster.Diamond({width:175,height:75, color:{blue:255,alpha:1}})
                        ]}),
                        imageLayer = layerFactory.createLayer(zxCanvas.ImageLayer, {
                            image: {
                                src: '/modules/portfolio/images/southside.jpg',
                                width: windowSize.width
                        }
                    });

                    //diamond2.set('globalCompositeOperation', 'copy');
                    //diamond3.set('globalCompositeOperation', 'destination-out');

                    layerGroup.set('position',{x:100});

                    canvas.setSize(windowSize.width, windowSize.height);
                    canvas.addLayer(layerGroup);

                    layerGroup.addLayer(diamond1);
                    layerGroup.addLayer(diamond2);

                    canvas.addLayer(diamond3);


                    //var canvas = new zxCanvas.Canvas({el: el}),
                    //    layers = canvas.attributes.get('layers'),
                    //    layerFactory = new zxCanvas.LayerFactory(canvas),
                    //    windowSize = {
                    //        width: angular.element(document).width(),
                    //        height: angular.element(document).height()
                    //    },
                    //    diamondSize = {
                    //        width: 240,
                    //        height: 240
                    //    },
                    //    rowAmount = Math.floor(windowSize.height / diamondSize.height) + 2,
                    //    columnAmount = Math.floor(windowSize.width / diamondSize.width) + 2,
                    //    centerOffset = {
                    //        left: (columnAmount * diamondSize.width - windowSize.width) / 2,
                    //        top: (rowAmount * diamondSize.height - windowSize.height) / 2
                    //    },
                    //    imageLayer = layerFactory.createLayer(zxCanvas.ImageLayer, {
                    //        image: {
                    //            src: '/modules/portfolio/images/southside.jpg',
                    //            width: windowSize.width
                    //        }
                    //    }),
                    //    diamondRasterLayer = layerFactory.createLayer(
                    //        zxDiamondRaster.DiamondRaster, {
                    //            rowAmount: rowAmount,
                    //            columnAmount: columnAmount,
                    //            diamondHeight: diamondSize.height,
                    //            diamondWidth: diamondSize.width,
                    //            position: {
                    //                x: centerOffset.left * -1,
                    //                y: centerOffset.top * -1
                    //            }
                    //        }
                    //    ),
                    //    diamondRasterLayer2 = diamondRasterLayer.clone(),
                    //    diamondRasterCircles = diamondRasterLayer.getCircles(),
                    //    diamondRasterCircles2 = diamondRasterLayer.getCircles(),
                    //    diamondRasterCircleStartTimeline = new zxTimeline.Timeline();
                    //
                    //var getRandomInt = function (min, max) {
                    //    return Math.floor(Math.random() * (max - min)) + min;
                    //};
                    //
                    //canvas.attributes.set({
                    //    width: windowSize.width + centerOffset.left,
                    //    height: windowSize.height + centerOffset.top
                    //});
                    //
                    //diamondRasterLayer.set('globalCompositeOperation', 'destination-in');
                    //diamondRasterLayer2.set('globalCompositeOperation', 'screen');
                    //
                    //layers.add(diamondRasterLayer);
                    //
                    //layers.add(imageLayer);
                    //
                    //layers.add(diamondRasterLayer);
                    //
                    //layers.add(diamondRasterLayer2);

                    //diamondRasterCircles.reverse().forEach(function (circle, circleIndex) {
                    //    circle.forEach(function (diamond) {
                    //        diamond.set('color', {alpha: 0});
                    //        diamondRasterCircleStartTimeline.add(diamond.get('color'), {alpha: 1}, {
                    //            duration: 10,
                    //            offset: 2 * circleIndex
                    //        });
                    //    });
                    //});
                    //
                    //
                    //var diamondRasterCircleStartTimelineDuration = diamondRasterCircleStartTimeline.get('totalFrames');
                    //
                    //diamondRasterCircles2.forEach(function (circle, circleIndex) {
                    //    circle.forEach(function (diamond) {
                    //        diamond.set('color', {red: 150, blue: 150, green: 150, alpha: 0});
                    //        diamondRasterCircleStartTimeline.add(diamond.get('color'), {alpha: getRandomInt(20, 80) / 100}, {
                    //            duration: 40,
                    //            offset: 2 * circleIndex + diamondRasterCircleStartTimelineDuration
                    //        });
                    //    });
                    //});

                    //imageLayer.get('image').on('change:imageLoaded', function () {
                    //    var circles = diamondRasterLayer.getCircles();
                    //    console.log(circles);
                    //    diamondRasterCircleStartTimeline.play();
                    //});
                }
            };
        });

}());
