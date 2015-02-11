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
                        windowSize = {
                            width: angular.element(document).width(),
                            height: angular.element(document).height()
                        },
                        layerFactory = new zxCanvas.LayerFactory(canvas),
                        imageLayer = layerFactory.createLayer(zxCanvas.ImageLayer, {
                            image: {
                                src: '/modules/portfolio/images/gaellnoe.png',
                                width: 300
                            }, name: 'IMAGELAYER'
                        }),
                        layerGroup = layerFactory.createLayer(zxCanvas.LayerGroup, {name: 'LAYERGROUP1'}),
                        layerGroup1 = layerFactory.createLayer(zxCanvas.LayerGroup, {name: 'LAYERGROUP2'}),
                        layerGroup2 = layerFactory.createLayer(zxCanvas.LayerGroup, {name: 'LAYERGROUP3'}),
                        layer1 = layerFactory.createLayer(zxCanvas.PolygonLayer, {
                            polygons: [
                                new zxDiamondRaster.Diamond({width: 500, height: 500, color: {red: 255}})
                            ], name: 'LAYER1'
                        }),
                        layer2 = layerFactory.createLayer(zxCanvas.PolygonLayer, {
                            polygons: [
                                new zxDiamondRaster.Diamond({width: 100, height: 100, color: {red: 255}})
                            ], name: 'LAYER2'
                        }),
                        diamondRasterLayer = layerFactory.createLayer(
                            zxDiamondRaster.DiamondRaster, {
                                rowAmount: 5,
                                columnAmount: 5,
                                diamondHeight: 200,
                                diamondWidth: 200,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                name: 'DIAMONDRASTERLAYER'
                            }
                        ),
                        timeLine = new zxTimeline.Timeline();

                    layerGroup2.addLayer(diamondRasterLayer);
                    layerGroup1.addLayer(layerGroup2);
                    layerGroup.addLayer(layerGroup1);
                    //canvas.addLayer(diamondRasterLayer);
                    canvas.addLayer(layerGroup);
                    canvas.addLayer(imageLayer);

                    canvas.setSize(windowSize.width, windowSize.height);

                    layerGroup1.addLayer(layer1);
                    layerGroup1.addLayer(layer2);
                    imageLayer.set('globalAlpha', 0.9);

                    timeLine.add(layer1.get('polygons').first().get('color'), {red: 0, blue:255}, 100);

                    timeLine.play();


                    //var canvas = new zxCanvas.Canvas({el: el}),
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
                    //            src: '/modules/portfolio/images/gaellnoe.png',
                    //            width: windowSize.width
                    //        }
                    //    }),
                    //    layerGroup = layerFactory.createLayer(zxCanvas.LayerGroup),
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
                    //    diamondRasterLayer2 = layerFactory.createLayer(
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
                    //    diamondRasterCircles = diamondRasterLayer.getCircles(),
                    //    diamondRasterCircles2 = diamondRasterLayer2.getCircles(),
                    //    diamondRasterCircleStartTimeline = new zxTimeline.Timeline();
                    //
                    //var getRandomInt = function (min, max) {
                    //    return Math.floor(Math.random() * (max - min)) + min;
                    //};
                    //
                    //canvas.setSize(windowSize.width + centerOffset.left,windowSize.height + centerOffset.top);
                    //
                    //diamondRasterLayer.set('globalCompositeOperation', 'destination-in');
                    //diamondRasterLayer2.set('globalCompositeOperation', 'multiply');
                    //
                    //canvas.addLayer(layerGroup);
                    //canvas.addLayer(diamondRasterLayer);
                    //
                    //layerGroup.addLayer(imageLayer);
                    //layerGroup.addLayer(diamondRasterLayer2);
                    //
                    //imageLayer.get('image').blur(10);
                    //
                    //diamondRasterCircles.reverse().forEach(function (circle, circleIndex) {
                    //    circle.forEach(function (diamond) {
                    //        diamond.set('color', {alpha: 0});
                    //        diamondRasterCircleStartTimeline.add(diamond.get('color'), {alpha: 1}, {
                    //            duration: 20,
                    //            offset: 5 * circleIndex
                    //        });
                    //    });
                    //});
                    //
                    //var diamondRasterCircleStartTimelineDuration = diamondRasterCircleStartTimeline.get('totalFrames');
                    //
                    //diamondRasterCircles2.forEach(function (circle, circleIndex) {
                    //    circle.forEach(function (diamond) {
                    //        diamond.set('color', {red: 150, blue: 150, green: 150, alpha: 0});
                    //        diamondRasterCircleStartTimeline.add(diamond.get('color'), {alpha: getRandomInt(0, 100) / 100}, {
                    //            duration: 20,
                    //            offset: 3 * circleIndex + diamondRasterCircleStartTimelineDuration
                    //        });
                    //    });
                    //});
                    //
                    //imageLayer.get('image').on('change:imageLoaded', function () {
                    //    angular.element('body').removeClass('loading');
                    //    //diamondRasterCircleStartTimeline.play();
                    //});
                }
            };
        });

}());
