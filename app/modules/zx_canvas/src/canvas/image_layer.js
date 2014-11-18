/**
 * Created by zarges on 16.11.14.
 */
'use strict';
var ImageLayer = zxCanvas.Layer.extend({
    defaults: function () {
        var defaults = zxCanvas.Layer.prototype.defaults.apply(this,arguments);
        return _.extend(defaults,{
            src: null,
            rendering: false,
            syncron: false,
            imageInstance: new Image(),
            imageLaoded: false
        });
    },

    getRenderRectangle: function () {
        var img = this.get('imageInstance');
        return [0,0,img.width,img.height];
    },

    render: function (img) {
        var context = this.get('canvas').getContext('2d'),
            renderRectangle = this.getRenderRectangle();
        console.log('loaded img');
        context.clearRect.apply(context, renderRectangle);
        context.drawImage(this.get('imageInstance'), renderRectangle[0], renderRectangle[1], renderRectangle[2], renderRectangle[3]);
    },

    prepareToRender: function(){
        var self = this,
            imageInstance = this.get('imageInstance');

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
        return constructor;
    }
});

zxCanvas.ImageLayer = ImageLayer;
