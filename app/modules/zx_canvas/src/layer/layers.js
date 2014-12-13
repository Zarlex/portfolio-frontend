/**
 * Created by zarges on 18.11.14.
 */

var Layers = zxBackbone.Collection.extend({
    comparator: 'zIndex',

    setSize: function (width, height) {
        this.forEach(function (layer) {
            layer.set('width', width);
            layer.set('height', height);
        });
    }
});

zxCanvas.Layers = Layers;