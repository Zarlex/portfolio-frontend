/**
 * Created by zarges on 16.11.14.
 */

var ImageLayer = zxCanvas.Layer.extend({

    nested: function () {
        var nested = zxCanvas.Layer.prototype.nested.apply(this, arguments);
        return _.extend(nested, {
            image: zxCanvas.Image
        });
    },

    getRenderRectangle: function () {
        return this.get('image').getRenderRectangle();
    },

    renderLayer: function () {
        var context = this.get('canvas').getContext('2d'),
            image = this.get('image'),
            isRendering = this.get('isRendering');

        if (!isRendering) {
            this.set('isRendering', true);
            context.clearRect.apply(context, this._lastRenderRectangle);
            console.log('%cRender '+ this.get('name'),'color:blue; font-weight:bold');
            image.render(context);
            this._lastRenderRectangle = this.getRenderRectangle();

            this.set('isRendering', false);
            this.set('needsRendering', false);

        }
    },

    askForRendering: function () {
        var imageLoaded = this.get('image').get('imageLoaded');

        if (imageLoaded) {
            return zxCanvas.Layer.prototype.askForRendering.apply(this);
        }
    },

    constructor: function () {

        var superConstructor = zxCanvas.Layer.prototype.constructor.apply(this, arguments);

        this.on('change:image:imageLoaded', this.askForRendering, this);

        return superConstructor;
    }
});

zxCanvas.ImageLayer = ImageLayer;
