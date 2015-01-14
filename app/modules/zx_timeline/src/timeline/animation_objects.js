/**
 * Created by zarges on 14.01.15.
 */
var AnimationObjects = zxBackbone.Collection.extend({
    model: zxTimeline.AnimationObject,

    prepareAnimation: function(){
      this.each(function(animationObject){
          animationObject.prepareAnimation();
      });
    },

    tick: function(frame){
        this.each(function(animationObject){
           animationObject.tick(frame);
        });
    }
});

zxTimeline.AnimationObjects = AnimationObjects;