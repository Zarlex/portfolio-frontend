/**
 * Created by zarges on 18.11.14.
 */

var Layers = Backbone.Collection.extend({
    comparator: 'zIndex',
    lastZIndex: 0,

    setSize: function (width, height) {
        this.forEach(function (layer) {
            layer.set('width', width);
            layer.set('height', height);
        });
    }
});

zxCanvas.Layers = Layers;