/**
 * Created by zarges on 16.11.14.
 */

var Layer = zxBackbone.NestedModel.extend({
    _lastRenderRectangle: [0, 0, 0, 0],
    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            canvas: null,
            rendering: false,
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

    render: function (context) {
        return context;
    },

    prepareToRender: function () {
        if (!this.get('rendering')) {
            this.set('rendering', true);
            var self = this,
                context = this.get('canvas').getContext('2d'),
                start = +new Date();
            window.requestAnimationFrame(function () {
                console.log('Start Rendering Layer:', self.get('id'));
                self.render(context);
                console.log('Finished Rendering Layer:', self.get('id'), (+new Date()) - start);
                self.set('rendering', false);
            });
        }
    },

    setSize: function (width, height) {
        this.set('width', width);
        this.set('height', height);
    },

    setCanvasSize: function () {
        this.get('canvas').width = this.get('width');
        this.get('canvas').height = this.get('height');
        this.prepareToRender();
    },

    constructor: function () {
        var constructor = zxBackbone.NestedModel.prototype.constructor.apply(this, arguments);

        this.on('change:globalCompositeOperation change:globalAlpha change:position', this.prepareToRender, this);
        this.on('change:width change:height', this.setCanvasSize, this);

        return constructor;
    }
});

zxCanvas.Layer = Layer;