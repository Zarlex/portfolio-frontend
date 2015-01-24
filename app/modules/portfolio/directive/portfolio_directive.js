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
                        diamondSize = {
                            width: 240,
                            height: 240
                        },
                        rowAmount = Math.floor(windowSize.height / diamondSize.height) + 2,
                        columnAmount = Math.floor(windowSize.width / diamondSize.width) + 2,
                        centerOffset = {
                            left: (columnAmount * diamondSize.width - windowSize.width) / 2,
                            top: (rowAmount * diamondSize.height - windowSize.height) / 2
                        },
                        imageLayer = layerFactory.createLayer(zxCanvas.ImageLayer, {
                            image: {
                                src: '/modules/portfolio/images/gaellnoe.png',
                                width: windowSize.width
                            }
                        }),
                        layerGroup = layerFactory.createLayer(zxCanvas.LayerGroup),
                        diamondRasterLayer = layerFactory.createLayer(
                            zxDiamondRaster.DiamondRaster, {
                                rowAmount: rowAmount,
                                columnAmount: columnAmount,
                                diamondHeight: diamondSize.height,
                                diamondWidth: diamondSize.width,
                                position: {
                                    x: centerOffset.left * -1,
                                    y: centerOffset.top * -1
                                }
                            }
                        ),
                        diamondRasterLayer2 = layerFactory.createLayer(
                            zxDiamondRaster.DiamondRaster, {
                                rowAmount: rowAmount,
                                columnAmount: columnAmount,
                                diamondHeight: diamondSize.height,
                                diamondWidth: diamondSize.width,
                                position: {
                                    x: centerOffset.left * -1,
                                    y: centerOffset.top * -1
                                }
                            }
                        ),
                        diamondRasterCircles = diamondRasterLayer.getCircles(),
                        diamondRasterCircles2 = diamondRasterLayer2.getCircles(),
                        diamondRasterCircleStartTimeline = new zxTimeline.Timeline();

                    var getRandomInt = function (min, max) {
                        return Math.floor(Math.random() * (max - min)) + min;
                    };

                    canvas.setSize(windowSize.width + centerOffset.left,windowSize.height + centerOffset.top);

                    diamondRasterLayer.set('globalCompositeOperation', 'destination-in');
                    diamondRasterLayer2.set('globalCompositeOperation', 'multiply');

                    canvas.addLayer(layerGroup);
                    canvas.addLayer(diamondRasterLayer);

                    layerGroup.addLayer(imageLayer);
                    layerGroup.addLayer(diamondRasterLayer2);

                    imageLayer.get('image').blur(10);

                    diamondRasterCircles.reverse().forEach(function (circle, circleIndex) {
                        circle.forEach(function (diamond) {
                            diamond.set('color', {alpha: 0});
                            diamondRasterCircleStartTimeline.add(diamond.get('color'), {alpha: 1}, {
                                duration: 20,
                                offset: 5 * circleIndex
                            });
                        });
                    });

                    var diamondRasterCircleStartTimelineDuration = diamondRasterCircleStartTimeline.get('totalFrames');

                    diamondRasterCircles2.forEach(function (circle, circleIndex) {
                        circle.forEach(function (diamond) {
                            diamond.set('color', {red: 150, blue: 150, green: 150, alpha: 0});
                            diamondRasterCircleStartTimeline.add(diamond.get('color'), {alpha: getRandomInt(0, 100) / 100}, {
                                duration: 20,
                                offset: 3 * circleIndex + diamondRasterCircleStartTimelineDuration
                            });
                        });
                    });

                    imageLayer.get('image').on('change:imageLoaded', function () {
                        angular.element('body').removeClass('loading');
                        diamondRasterCircleStartTimeline.play();
                    });
                }
            };
        });

}());
