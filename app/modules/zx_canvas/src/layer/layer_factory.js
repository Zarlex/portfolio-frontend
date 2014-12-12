/**
 * Created by zarges on 12.12.14.
 */
'use strict';

var LayerFactory = function (canvas) {

    var _canvas = canvas,
        _zIndex = 0;

    var _getCanvasSize = function () {
        return {
            width: canvas.attributes.get('width'),
            height: _canvas.attributes.get('height')
        };
    };

    this.createLayer = function (Layer, attributes) {

        var layerId = _.uniqueId('layer_'),
            canvas = Backbone.$('<canvas id="' + layerId + '"></canvas>'),
            width = _canvas.attributes.get('width'),
            height = _canvas.attributes.get('height'),
            layer;


        attributes = _.extend({
                id: layerId,
                canvas: canvas[0],
                zIndex: _zIndex++
            },
            _getCanvasSize(),
            attributes
        );

        layer = new Layer(attributes);

        layer.on('change:rendering change:globalCompositeOperation', function () {
            _canvas.prepareToRender();
        });

        _canvas.attributes.on('change:width change:height', function () {
            layer.set(_getCanvasSize());
        });

        return layer;

    };
};

zxCanvas.LayerFactory = LayerFactory;