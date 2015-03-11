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

    renderLayer: function () {
        var context = this.get('canvas').getContext('2d'),
            polygons = this.get('polygons'),
            isRendering = this.get('isRendering');

        if(!isRendering){
            this.set('isRendering', true);

            context.clearRect.apply(context, this._lastRenderRectangle);
            console.log('%cRender '+ this.get('name'),'color:blue; font-weight:bold');
            polygons.render(context);

            this._lastRenderRectangle = this.getRenderRectangle();

            this.set('isRendering', false);
            this.set('needsRendering', false);
        }
    },

    constructor: function () {

        var superConstructor = zxCanvas.Layer.prototype.constructor.apply(this,arguments);

        this.on('add change:polygons', function () {
            this.askForRendering();
        }, this);
        
        return superConstructor;
    }
});

zxCanvas.PolygonLayer = PolygonLayer;