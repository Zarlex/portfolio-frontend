/**
 * Created by zarges on 14.11.14.
 */

var PolygonLayer = zxBackbone.NestedModel.extend({

    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            image: null,
            canvas: null,
            rendering: false
        }
    },

    nested: function () {
        return {
            polygons: zxCanvas.Polygons
        }
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

        this.set('image',context.getImageData.apply(context,renderRectangle));

        this.set('rendering', false);
    },

    initialize: function () {

        this.on('add remove change:globalCompositeOperation change:polygons', function () {
            var self = this;
            if (!this.get('rendering')) {
                this.set('rendering', true);
                window.requestAnimationFrame(function () {
                    self.render();
                    self.set('rendering', false);
                });
            }

        }, this);
    }
});

zxCanvas.PolygonLayer = PolygonLayer;