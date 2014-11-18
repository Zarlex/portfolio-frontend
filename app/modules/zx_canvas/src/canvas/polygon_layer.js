/**
 * Created by zarges on 14.11.14.
 */

var PolygonLayer = zxCanvas.Layer.extend({

    nested: function () {
        var nested = zxCanvas.Layer.prototype.nested.apply(this,arguments);
        return _.extend(nested,{
            polygons: zxCanvas.Polygons
        });
    },

    getRenderRectangle: function () {
        return this.get('polygons').getRenderRectangle();
    },

    render: function () {
        var context = this.get('canvas').getContext('2d'),
            renderRectangle = this.getRenderRectangle();

        context.clearRect.apply(context, renderRectangle);

        this.get('polygons').forEach(function (polygon) {
            polygon.render(context);
        }, this);
    },

    constructor: function () {

        zxCanvas.Layer.prototype.constructor.apply(this,arguments);
        this.on('add remove change:polygons', function () {
            this.prepareToRender();
        }, this);
    }
});

zxCanvas.PolygonLayer = PolygonLayer;