/**
 * Created by zarges on 05.11.14.
 */

var Canvas = Backbone.View.extend({

    _lastRenderRectangle: [0, 0, 0, 0],

    attributes: new zxCanvas.CanvasAttributes(),

    el: 'canvas',

    getContext: function () {
        return this.el.getContext('2d');
    },

    getRenderRectangle: function () {
        var layers = this.attributes.get('layers'),
            xCoordinates = [0],
            yCoordinates = [0],
            width = [],
            height = [];

        layers.forEach(function (layer) {
            var renderRectangle = layer.getRenderRectangle();

            if(renderRectangle[0]>0){
                xCoordinates.push(renderRectangle[0]);
            }

            if(renderRectangle[1]>0){
                yCoordinates.push(renderRectangle[1]);
            }

            width.push(renderRectangle[2] + renderRectangle[0]);
            height.push(renderRectangle[3] + renderRectangle[1]);
        });

        xCoordinates = xCoordinates.sort();
        yCoordinates = yCoordinates.sort();
        width = width.sort();
        height = height.sort();

        return [xCoordinates[0], yCoordinates[0], width[width.length-1], height[height.length-1]];
    },

    render: function () {
        var layers = this.attributes.get('layers'),
            context = this.getContext(),
            renderRectangle = this.getRenderRectangle(),
            startCanvas = +new Date();

        console.log('Start Rendering Canvas', this._lastRenderRectangle);
        context.clearRect.apply(context, this._lastRenderRectangle);

        layers.forEach(function (layer) {
            context.save();
            context.globalCompositeOperation = layer.get('globalCompositeOperation');
            context.globalAlpha = layer.get('globalAlpha');
            context.drawImage(layer.get('canvas'), 0, 0);
            context.restore();
        }, this);

        this._lastRenderRectangle = renderRectangle;
        console.log('Finished Rendering Canvas', (+new Date()) - startCanvas);
    },

    prepareToRender: function () {
        var rendering = this.attributes.get('rendering');
        if (this._layersAreReadyToRender()) {
            this.render();
            this.attributes.set('rendering', false);
        } else if (!rendering) {
            var self = this;
            this.attributes.set('rendering', true);
            window.requestAnimationFrame(function () {
                self.prepareToRender();
            });
        }
    },

    _layersAreReadyToRender: function () {
        var layers = this.attributes.get('layers'),
            ready = true;

        layers.forEach(function (layer) {
            if (layer.get('rendering')) {
                ready = false;
            }
        });
        return ready;
    },

    _setSize: function () {
        var width = this.attributes.get('width'),
            height = this.attributes.get('height');

        this.el.width = width;
        this.el.height = height;
    },

    constructor: function () {
        var constructor = Backbone.View.prototype.constructor.apply(this, arguments);
        this._setSize();

        this.attributes.on('change:width change:height', this._setSize, this);
        return constructor;
    }

});

zxCanvas.Canvas = Canvas;
