/**
 * Created by zarges on 05.11.14.
 */

var Canvas = Backbone.View.extend({

    _layers: new (Backbone.Collection.extend({
        comparator: 'zIndex',
        lastZIndex: 0
    }))(),

    _rendering: false,

    _layersAreReadyToRender: function () {
        var layers = this.getLayers(),
            ready = true;
        layers.forEach(function (layer) {
            if (layer.get('rendering')) {
                ready = false;
            }
        });
        return ready;
    },

    el: 'canvas',

    getContext: function () {
        return this.el.getContext('2d');
    },

    getLayers: function () {
        return this._layers;
    },

    getRenderRectangle: function () {

    },

    render: function () {
        var layers = this.getLayers(),
            context = this.getContext(),
            startCanvas = +new Date();
        console.log('Start Rendering Canvas');
        context.clearRect.apply(context, [0, 0, 500, 500]);
        layers.forEach(function (layer) {
                var context = this.getContext(),
                    renderRectangle = layer.getRenderRectangle();
                context.save();
                context.globalCompositeOperation = layer.get('globalCompositeOperation');
                console.log(layer.get('globalCompositeOperation'));
                context.drawImage(layer.get('canvas'), renderRectangle[0], renderRectangle[1]);
                context.restore();
        }, this);
        console.log('Finished Rendering Canvas', (+new Date()) - startCanvas);
    },

    prepareToRender: function () {
        if (this._layersAreReadyToRender() && !this._rendering) {
            this._rendering = true;
            this.render();
            this._rendering = false;
        } else if (!this._rendering) {
            var self = this;

            this._rendering = true;
            window.requestAnimationFrame(function () {
                self.render();
                self._rendering = false;
            });
        }
    },

    createLayer: function (Layer, zIndex) {
        var zIndex = zIndex || (this._layers.lastZIndex += 1),
            layerId = _.uniqueId('layer_'),
            canvas = Backbone.$('<canvas id="' + layerId + '" width="500px" height="500px"></canvas>'),
            layer = new Layer({id: layerId, canvas: canvas[0], zIndex: zIndex});

        this.$el.append(canvas);

        layer.on('change:rendering change:globalCompositeOperation', function () {
            this.prepareToRender();
        }, this);

        return this._layers.add(layer);
    },

    createPolygonLayer: function (zIndex) {
        return this.createLayer(zxCanvas.PolygonLayer,zIndex);
    },

    createImageLayer: function (zIndex) {
        return this.createLayer(zxCanvas.ImageLayer,zIndex);
    }

});

zxCanvas.Canvas = Canvas;
