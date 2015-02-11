/**
 * Created by zarges on 16.11.14.
 */

var Layer = zxBackbone.NestedModel.extend({
    _lastRenderRectangle: [0, 0, 0, 0],
    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            canvas: null,
            isRendering: false,
            globalAlpha: 1,
            width: 0,
            height: 0
        };
    },

    nested: function () {
        return {
            position: zxCanvas.Coordinate
        };
    },

    getRenderRectangle: function () {
        var width = this.get('width'),
            height = this.get('height'),
            position = this.get('position');

        return [position.get('x'), position.get('y'), width, height];
    },

    renderLayer: function () {

    },

    setSize: function (width, height) {
        this.set('width', width);
        this.set('height', height);
    },

    setCanvasSize: function () {
        this.get('canvas').width = this.get('width');
        this.get('canvas').height = this.get('height');
        this.askForRendering();
    },

    askForRendering: function () {
        console.log('%c' + this.get('name') + ' needs rendering', 'color:orange; font-weight:bold');
        this.set('needsRendering', true);
    },

    constructor: function () {
        var constructor = zxBackbone.NestedModel.prototype.constructor.apply(this, arguments);

        this.on('change:width change:height', this.setCanvasSize, this);

        return constructor;
    }
});

zxCanvas.Layer = Layer;