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
        console.log('SET CANVAS')
        this.el.width = this.attributes.get('width');
        this.el.height = this.attributes.get('height');
    },

    setSize: function(width, height){
        console.log('set size',width,height)
        var layerGroup = this.attributes.get('layerGroup');

        this.attributes.set('width', width);
        this.attributes.set('height', height);

        layerGroup.setSize(width, height);
    },

    addLayer: function(layer){
        var layerGroup = this.attributes.get('layerGroup');

        layerGroup.addLayer(layer);
    },

    constructor: function () {
        var constructor = Backbone.View.prototype.constructor.apply(this, arguments),
            layerGroup = this.attributes.get('layerGroup');


        layerGroup.set('canvas', this.el);
        this.attributes.set('layerGroup', layerGroup);
        this.attributes.on('change:width change:height', this.setCanvasSize, this);
        return constructor;
    }

});

zxCanvas.Canvas = Canvas;
