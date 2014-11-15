/**
 * Created by zarges on 14.11.14.
 */

var PolygonLayer = zxBackbone.NestedModel.extend({

    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            image: null,
            canvas: null
        }
    },

    nested: function () {
        return {
            polygons: zxCanvas.Polygons
        }
    },

    getRenderRectangle: function(){
        return this.get('polygons').getRenderRectangle();
    },

    render: function () {
        var context = this.get('canvas').getContext('2d'),
            renderRectangle = this.getRenderRectangle();

        context.clearRect.apply(context,renderRectangle);

        this.get('polygons').forEach(function(polygon){
            polygon.render(context);
        }, this);

        this.set(image,context.getImageData())
    },

    initialize: function () {

        this.on('change:globalCompositeOperation change:polygons', function () {
            window.requestAnimationFrame(this.render);
        },this);
    }
});

zxCanvas.PolygonLayer = PolygonLayer;