/**
 * Created by zarges on 05.11.14.
 */

var Canvas = Backbone.View.extend({

    attributes: new zxCanvas.CanvasAttributes(),

    el: 'canvas',

    getContext: function () {
        return this.el.getContext('2d');
    },

    getRenderRectangle: function () {
        var layers = this.get('layers'),
            xCoordinates = [],
            yCoordinates = [],
            startX, startY, endX, endY, width, height;

        layers.forEach(function (layer) {
            var renderRectangle = layer.getRenderRectangle();
            xCoordinates.push(renderRectangle[0]);
            yCoordinates.push(renderRectangle[1]);
        });

        xCoordinates = xCoordinates.sort();
        yCoordinates = yCoordinates.sort();

        startX = xCoordinates[0];
        startY = yCoordinates[0];
        endX = xCoordinates[xCoordinates.length - 1];
        endY = yCoordinates[yCoordinates.length - 1];
        width = endX - startX;
        height = endY - startY;

        return [startX, startY, width, height];
    },

    render: function () {
        var layers = this.attributes.get('layers'),
            context = this.getContext(),
            startCanvas = +new Date();
        console.log('Start Rendering Canvas');
        context.clearRect.apply(context, [0, 0, 500, 500]);
        layers.forEach(function (layer) {
            var context = this.getContext(),
                renderRectangle = layer.getRenderRectangle();

            context.save();
            context.globalCompositeOperation = layer.get('globalCompositeOperation');
            context.drawImage(layer.get('canvas'), renderRectangle[0], renderRectangle[1]);
            context.restore();
        }, this);
        console.log('Finished Rendering Canvas', (+new Date()) - startCanvas);
    },

    prepareToRender: function () {
        var rendering = this.attributes.get('rendering');
        if (this._layersAreReadyToRender()) {
            this.render();
            this.attributes.set('rendering',false);
        } else if (!rendering) {
            var self = this;
            this.attributes.set('rendering',true);
            window.requestAnimationFrame(function () {
                self.prepareToRender();
            });
        }
    },

    createLayer: function (Layer, zIndex) {
        var zIndex = zIndex || (this._layers.lastZIndex += 1),
            layerId = _.uniqueId('layer_'),
            canvas = Backbone.$('<canvas id="' + layerId + '"></canvas>'),
            width = this.attributes.get('width'),
            height = this.attributes.get('height'),
            layer = new Layer({id: layerId, canvas: canvas[0], zIndex: zIndex, height: height, width: width});

        this.$el.append(canvas);

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

    _setSize: function(){
        var width = this.attributes.get('width'),
            height = this.attributes.get('height');

        this.el.width = width;
        this.el.height = height;

        this.attributes.get('layers').setSize(width, height);
    },

    constructor: function(){
        var constructor = Backbone.View.prototype.constructor.apply(this,arguments);
        this._setSize();

        this.attributes.on('change:width change:height', this._setSize, this);
        return constructor;
    }

});

zxCanvas.Canvas = Canvas;
