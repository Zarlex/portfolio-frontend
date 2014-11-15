/**
 * Created by zarges on 05.11.14.
 */

var Canvas = Backbone.View.extend({

    el: 'canvas',

    _layers: new Backbone.Collection(),

    getContext: function(){
      return this.el.getContext('2d');
    },

    createPolygonLayer: function () {
        var layerId = _.uniqueId('layer_'),
            canvas = Backbone.$('<canvas id="' + layerId + '"></canvas>'),
            layer = new zxCanvas.PolygonLayer({id: layerId, canvas: canvas[0]});

        this.$el.append(canvas);

        return this._layers.add(layer);
    }

});

zxCanvas.Canvas = Canvas;
