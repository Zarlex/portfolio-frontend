/**
 * Created by zarges on 26.11.14.
 */
'use strict';
var AnimationQueue = zxBackbone.Collection.extend({
    model: zxCanvas.AnimationObject,
    attributes: (function(){
        return new zxCanvas.AnimationQueueAttributes();
    }()),
    animate: function () {
        if (this.length > 0) {
            var self = this;

            this.attributes.set('anmiating',true);
            window.requestAnimationFrame(function () {
                self.forEach(function(animationObject){
                    if(animationObject.animationHasFinished()){
                        animationObject.animate()
                        self.remove(animationObject);
                    } else {
                        animationObject.animate()
                    }
                },self);

                self.animate();
            });
        } else {
            this.attributes.set('animating',false);
        }
    },
    constructor: function () {
        this.on('add', function () {
            var self = this;
            window.requestAnimationFrame(function () {
                self.animate();
            });
        });
        return zxBackbone.Collection.prototype.constructor.apply(this, arguments);
    }
});

zxCanvas.animationQueue = new AnimationQueue();

