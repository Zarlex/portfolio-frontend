/**
 * Created by zarges on 05.11.14.
 */

var Canvas = Backbone.View.extend({

    _layers: new (Backbone.Collection.extend({
        comparator: 'zIndex',
        lastZIndex: 0
    })) (),

    _layersAreReadyToRender: function(){
        var layers = this.getLayers(),
            ready = true;
        layers.forEach(function(layer){
            if(!layer.get('image') || layer.get('rendering') ){
                ready = false;
            }
        });
        return ready;
    },

    el: 'canvas',

    getContext: function(){
      return this.el.getContext('2d');
    },

    getLayers: function(){
        return this._layers;
    },

    render: function(){
        if(this._layersAreReadyToRender()){
            var layers = this.getLayers();
            layers.forEach(function(layer){
                var context = this.getContext(),
                    renderRectangle = layer.getRenderRectangle();
                context.save();
                context.globalCompositeOperation = layer.get('globalCompositeOperation');
                context.putImageData(layer.get('image'),renderRectangle[0],renderRectangle[1]);
                context.restore();
            },this);
        } else {
            var self = this;
            window.requestAnimationFrame(function(){
                self.render();
            });
        }
    },

    createPolygonLayer: function (zIndex) {
        zIndex = zIndex || (this._layers.lastZIndex += 1);
        var layerId = _.uniqueId('layer_'),
            canvas = Backbone.$('<canvas id="' + layerId + '"></canvas>'),
            layer = new zxCanvas.PolygonLayer({id: layerId, canvas: canvas[0],zIndex: zIndex});

        this.$el.append(canvas);

        layer.on('change:image', function(){
            this.render();
        },this);

        return this._layers.add(layer);
    }

});

zxCanvas.Canvas = Canvas;
