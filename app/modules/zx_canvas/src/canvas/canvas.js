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
        //var layerGroup = this.attributes.get('layerGroup');

        this.attributes.set('width', width);
        this.attributes.set('height', height);

        //layerGroup.setSize(width, height);
    },

    addLayer: function (layer) {
        var layerGroup = this.attributes.get('layerGroup');

        layerGroup.addLayer(layer);
    },

    renderCanvas: function () {
        var layerGroup = this.attributes.get('layerGroup'),
            needsRendering = layerGroup.get('needsRendering'),
            isRendering = layerGroup.get('isRendering'),
            canvasIsRendering= this.attributes.get('canvasIsRendering');

        if (needsRendering && !isRendering && !canvasIsRendering) {
            this.attributes.set('canvasIsRendering', true);
            this.attributes.set('canvasIsPostRendering', true);
            this.attributes.set('canvasIsCompositing', true);
            this.attributes.set('canvasIsPostCompositing', true);
            window.requestAnimationFrame(function () {
                layerGroup.renderLayers();
                layerGroup.postRenderLayers();
                layerGroup.compositeLayers();
                layerGroup.postCompositeLayerGroups();
                this.attributes.set('canvasIsRendering', false);
                this.attributes.set('canvasIsPostRendering', false);
                this.attributes.set('canvasIsCompositing', false);
                this.attributes.set('canvasIsPostCompositing', false);
            }.bind(this));
        }
    },

    postRenderCanvas: function(){
        var layerGroup = this.attributes.get('layerGroup'),
            needsPostRendering = layerGroup.get('needsPostRendering'),
            isPostRendering = layerGroup.get('isPostRendering'),
            canvasIsPostRendering = this.attributes.get('canvasIsPostRendering');

        if(needsPostRendering && !isPostRendering && !canvasIsPostRendering){
            this.attributes.set('canvasIsPostRendering', true);
            this.attributes.set('canvasIsCompositing', true);
            this.attributes.set('canvasIsPostCompositing', true);
            window.requestAnimationFrame(function () {
                layerGroup.postRenderLayers();
                layerGroup.compositeLayers();
                layerGroup.postCompositeLayerGroups();
                this.attributes.set('canvasIsPostRendering', false);
                this.attributes.set('canvasIsCompositing', false);
                this.attributes.set('canvasIsPostCompositing', false);
            }.bind(this));
        }
    },

    compositeCanvas: function(){
        var layerGroup = this.attributes.get('layerGroup'),
            needsCompositing = layerGroup.get('needsCompositing'),
            isCompositing = layerGroup.get('isCompositing'),
            canvasIsCompositing = this.attributes.get('canvasIsCompositing');

        if(needsCompositing && !isCompositing && !canvasIsCompositing){
            this.attributes.set('canvasIsCompositing', true);
            this.attributes.set('canvasIsPostCompositing', true);
            window.requestAnimationFrame(function () {
                layerGroup.compositeLayers.call(layerGroup);
                layerGroup.postCompositeLayerGroups();
                this.attributes.set('canvasIsCompositing', false);
                this.attributes.set('canvasIsPostCompositing', false);
            }.bind(this));
        }
    },

    postCompositeCanvas: function(){
        var layerGroup = this.attributes.get('layerGroup'),
            needsPostCompositing = layerGroup.get('needsPostCompositing'),
            isPostCompositing = layerGroup.get('isPostCompositing'),
            canvasIsPostCompositing = this.attributes.get('canvasIsPostCompositing');

        if(needsPostCompositing && !isPostCompositing && !canvasIsPostCompositing){
            this.attributes.set('canvasIsPostCompositing', true);
            window.requestAnimationFrame(function () {
                layerGroup.postCompositeLayers.call(layerGroup);
                this.attributes.set('canvasIsPostCompositing', false);
            }.bind(this));
        }
    },

    constructor: function () {
        var superConstructor = Backbone.View.prototype.constructor.apply(this, arguments),
            layerGroup = this.attributes.get('layerGroup');

        layerGroup.set('canvas', this.el);
        layerGroup.set('name', 'MAINLAYERGROUP');

        layerGroup.on('change:needsRendering', this.renderCanvas, this);
        layerGroup.on('change:needsPostRendering', this.postRenderCanvas, this);
        layerGroup.on('change:needsCompositing', this.compositeCanvas, this);
        layerGroup.on('change:needsPostCompositing', this.postCompositeCanvas, this);

        this.attributes.set('layerGroup', layerGroup);
        this.attributes.on('change:width change:height', this.setCanvasSize, this);

        return superConstructor;
    }

});

zxCanvas.Canvas = Canvas;

