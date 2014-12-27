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
                                src: '/modules/portfolio/images/southside.jpg',
                                width: windowSize.width
                            }
                        }),
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
                        );

                    canvas.attributes.set({
                        width: windowSize.width + centerOffset.left,
                        height: windowSize.height + centerOffset.top
                    });

                    layers.add(diamondRasterLayer);

                    layers.add(imageLayer);

                    scope.$watch('opacity', function (value) {
                        if (value) {
                            var circles = diamondRasterLayer.getCircles();

                            circles[0].forEach(function (diamond) {
                                diamond.set({color: {alpha: value / 100}});
                            });

                            circles[2].forEach(function (diamond) {
                                diamond.set({color: {alpha: value / 100}});
                            });
                        }
                    });
                }
            };
        });

}());
