/**
 * Created by zarges on 12.12.14.
 */

var LayerFactory = function (canvas) {

    var _canvas = canvas;

    var _getCanvasSize = function () {
        return {
            width: _canvas.attributes.get('width'),
            height: _canvas.attributes.get('height')
        };
    };

    this.createLayer = function (Layer, attributes) {

        var layerId = _.uniqueId('layer_'),
            canvas = Backbone.$('<canvas id="' + layerId + '"></canvas>'),
            layer;


        attributes = _.extend({
                id: layerId,
                canvas: canvas[0]
            },
            _getCanvasSize(),
            attributes
        );

        layer = new Layer(attributes);

        _canvas.attributes.on('change:width change:height', function () {
            layer.set(_getCanvasSize());
        });

        return layer;

    };
};

zxCanvas.LayerFactory = LayerFactory;