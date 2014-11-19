/**
 * Created by zarges on 05.11.14.
 */
'use strict';
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

            width.push(renderRectangle[2]);
            height.push(renderRectangle[3]);
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
            var renderRectangle = layer.getRenderRectangle();

            context.save();
            context.globalCompositeOperation = layer.get('globalCompositeOperation');
            context.drawImage(layer.get('canvas'), renderRectangle[0], renderRectangle[1]);
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

    createLayer: function (Layer, zIndex) {
        zIndex = zIndex || (this._layers.lastZIndex += 1);

        var layerId = _.uniqueId('layer_'),
            canvas = Backbone.$('<canvas id="' + layerId + '"></canvas>'),
            width = this.attributes.get('width'),
            height = this.attributes.get('height'),
            layer = new Layer({id: layerId, canvas: canvas[0], zIndex: zIndex, height: height, width: width});

        layer.on('change:rendering change:globalCompositeOperation', function () {
            this.prepareToRender();
        }, this);

        return this.attributes.get('layers').add(layer);
    },

    createPolygonLayer: function (zIndex) {
        return this.createLayer(zxCanvas.PolygonLayer, zIndex);
    },

    createImageLayer: function (zIndex) {
        return this.createLayer(zxCanvas.ImageLayer, zIndex);
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

        this.attributes.get('layers').setSize(width, height);
    },

    constructor: function () {
        var constructor = Backbone.View.prototype.constructor.apply(this, arguments);
        this._setSize();

        this.attributes.on('change:width change:height', this._setSize, this);
        return constructor;
    }

});

zxCanvas.Canvas = Canvas;
