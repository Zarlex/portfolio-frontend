/**
 * Created by zarges on 16.11.14.
 */
'use strict';
var ImageLayer = zxCanvas.Layer.extend({
    defaults: function () {
        var defaults = zxCanvas.Layer.prototype.defaults.apply(this,arguments);
        return _.extend(defaults,{
            src: null,
            syncron: false,
            imageInstance: new Image(),
            imageLoaded: false
        });
    },

    nested: function () {
        var nested = zxCanvas.Layer.prototype.nested.apply(this,arguments);
        return _.extend(nested,{
            position: zxCanvas.Coordinate
        });
    },

    getRenderRectangle: function () {
        var img = this.get('imageInstance'),
            position = this.get('position');
        return [position.get('x'),position.get('y'),img.width,img.height];
    },

    render: function () {
        var context = this.get('canvas').getContext('2d'),
            renderRectangle = this.getRenderRectangle();

        context.clearRect.apply(context,  this._lastRenderRectangle);
        context.drawImage(this.get('imageInstance'), renderRectangle[0], renderRectangle[1], renderRectangle[2], renderRectangle[3]);
        this._lastRenderRectangle = renderRectangle;
    },

    prepareToRender: function(){
        var self = this;

        if(this.get('imageLoaded')){
            self.set('rendering',true);
            self.render(this);
            self.set('rendering',false);
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
            self.set('imageLoaded',true);
            self.prepareToRender();
        };
        imageInstance.src = this.get('src');
    },

    constructor: function () {
        var constructor = zxCanvas.Layer.prototype.constructor.apply(this,arguments);
        this.on('change:src', function () {
            this._loadImage();
        }, this);
        this.on('change:position', function(){
            this.prepareToRender();
        },this);
        return constructor;
    }
});

zxCanvas.ImageLayer = ImageLayer;
