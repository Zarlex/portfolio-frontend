/**
 * Created by zarges on 16.11.14.
 */

var ImageLayer = zxCanvas.Layer.extend({

    nested: function () {
        var nested = zxCanvas.Layer.prototype.nested.apply(this,arguments);
        return _.extend(nested,{
            image: zxCanvas.Image
        });
    },

    getRenderRectangle: function () {
        return this.get('image').getRenderRectangle();
    },

    prepareToRender: function(){
        var context = this.get('canvas').getContext('2d'),
            image = this.get('image'),
            self = this;

        if(image.get('imageLoaded') && !this.get('rendering')){
            var start = +new Date();

            this.set('rendering', true);

            window.requestAnimationFrame(function () {
                console.log('Start Rendering Layer:',self.get('id'),'IMAGE');
                self.render(context);
                console.log('Finished Rendering Layer:',self.get('id'),(+new Date())-start,'IMAGE');
                self.set('rendering', false);
            });
        }
    },

    render: function (context) {
        var image = this.get('image'),
            renderRectangle = this.getRenderRectangle();

        context.clearRect.apply(context,  this._lastRenderRectangle);

        image.render(context);

        this._lastRenderRectangle = renderRectangle;
    },

    constructor: function () {

        zxCanvas.Layer.prototype.constructor.apply(this,arguments);

        this.on('change:image', function () {
            this.prepareToRender();
        }, this);

        this.get('image').set('context',this.get('canvas').getContext('2d'));
    }
});

zxCanvas.ImageLayer = ImageLayer;
