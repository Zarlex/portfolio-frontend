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

    setCanvasSize: function () {
        this.el.width = this.attributes.get('width');
        this.el.height = this.attributes.get('height');
    },

    setSize: function (width, height) {
        var layerGroup = this.attributes.get('layerGroup');

        this.attributes.set('width', width);
        this.attributes.set('height', height);

        layerGroup.setSize(width, height);
    },

    addLayer: function (layer) {
        var layerGroup = this.attributes.get('layerGroup');

        layerGroup.addLayer(layer);
    },

    compositeCanvas: function(){
        var layerGroup = this.attributes.get('layerGroup'),
            needsCompositing = layerGroup.get('needsCompositing'),
            isCompositing = layerGroup.get('isCompositing'),
            canvasIsCompositing = this.attributes.get('canvasIsCompositing');

        if(needsCompositing && !isCompositing && !canvasIsCompositing){
            this.attributes.set('canvasIsCompositing', true);
            window.requestAnimationFrame(function () {
                layerGroup.compositeLayers.call(layerGroup);
                this.attributes.set('canvasIsCompositing', false);
            }.bind(this));
        }
    },

    renderCanvas: function () {
        var layerGroup = this.attributes.get('layerGroup'),
            needsRendering = layerGroup.get('needsRendering'),
            isRendering = layerGroup.get('isRendering'),
            canvasIsRendering= this.attributes.get('canvasIsRendering');

        if (needsRendering && !isRendering && !canvasIsRendering) {
            this.attributes.set('canvasIsRendering', true);
            window.requestAnimationFrame(function () {
                this.attributes.set('canvasIsCompositing', true);
                layerGroup.renderLayers();
                layerGroup.compositeLayers();
                this.attributes.set('canvasIsCompositing', false);
                this.attributes.set('canvasIsRendering', false);
            }.bind(this));
        }
    },

    constructor: function () {
        var superConstructor = Backbone.View.prototype.constructor.apply(this, arguments),
            layerGroup = this.attributes.get('layerGroup');

        layerGroup.set('canvas', this.el);
        layerGroup.set('name', 'MAINLAYERGROUP');

        layerGroup.on('change:needsRendering', this.renderCanvas, this);
        layerGroup.on('change:needsCompositing', this.compositeCanvas, this);

        this.attributes.set('layerGroup', layerGroup);
        this.attributes.on('change:width change:height', this.setCanvasSize, this);

        return superConstructor;
    }

});

zxCanvas.Canvas = Canvas;

