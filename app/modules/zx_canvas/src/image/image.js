/**
 * Created by zarges on 16.11.14.
 */

var zxImage = zxBackbone.NestedModel.extend({
    defaults: function () {
     return {
         src: null,
         syncron: false,
         imageInstance: new Image(),
         imageLoaded: false,
         width: null,
         height: null
     };
    },

    nested: function () {
        var nested = zxCanvas.Layer.prototype.nested.apply(this,arguments);
        return _.extend(nested,{
            position: zxCanvas.Coordinate
        });
    },

    getRenderRectangle: function () {
        var position = this.get('position'),
            widthAndHeight = this._getWidthAndHeight(),
            width = widthAndHeight[0],
            height = widthAndHeight[1];

        return [position.get('x'),position.get('y'),width, height];
    },

    render: function (context) {
        var renderRectangle = this.getRenderRectangle(),
            imageInstance = this.get('imageInstance'),
            imageLoaded = this.get('imageLoaded');

        if(imageLoaded){
            context.drawImage(imageInstance, renderRectangle[0], renderRectangle[1], renderRectangle[2], renderRectangle[3]);
        }

    },

    _getWidthAndHeight: function(){
      var image = this.get('imageInstance'),
          width = this.get('width'),
          height = this.get('height'),
          imageWidth = image.width,
          imageHeight = image.height,
          aspectRatio = imageWidth / imageHeight;

        if(width && height){
            return [width, height];
        } else if(width){
            return [width,width/aspectRatio];
        } else if (height){
            return [height*aspectRatio,height];
        } else {
            return [imageWidth, imageHeight];
        }
    },

    _loadImage: function(){
        var imageInstance = this.get('imageInstance'),
            self = this;

        if(this.get('syncron')){
            this.set('rendering',true);
        }
        this.set('imageLoaded',false);
        imageInstance.onload = function(){
            var widthAndHeight = self._getWidthAndHeight();

            imageInstance.width = widthAndHeight[0];
            imageInstance.height = widthAndHeight[1];
            self.set('imageLoaded',true);
        };
        imageInstance.src = this.get('src');
    },

    constructor: function () {
        var constructor = zxCanvas.Layer.prototype.constructor.apply(this,arguments);

        this.on('change:src', function () {
            this._loadImage();
        }, this);
        if(this.get('src')){
            this._loadImage();
        }

        return constructor;
    }
});

zxCanvas.Image = zxImage;
