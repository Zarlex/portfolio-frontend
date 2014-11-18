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
            imageInstance: new Image()
        });
    },

    getRenderRectangle: function () {
        return [0,0,500,500];
    },

    render: function (img) {
        var context = this.get('canvas').getContext('2d'),
            renderRectangle = this.getRenderRectangle();

        context.clearRect.apply(context, renderRectangle);
        context.drawImage(img, renderRectangle[0], renderRectangle[1], renderRectangle[2], renderRectangle[3]);
    },

    prepareToRender: function(){
        var self = this,
            imageInstance = this.get('imageInstance');

        this.set('rendering',true);
        imageInstance.src = this.get('src');
        imageInstance.onload = function(){
            self.render(this);
            self.set('rendering',false);
        };
    },

    constructor: function () {
        zxCanvas.Layer.prototype.constructor.apply(this,arguments);
        this.on('change:src', function () {
            this.prepareToRender();
        }, this);
    }
});

zxCanvas.ImageLayer = ImageLayer;
