/**
 * Created by zarges on 14.01.15.
 */
var AnimationObject = zxBackbone.Model.extend({

    defaults: function () {
        return {
            model: null,
            animateToAttributes: null,
            startValues: null,
            duration: 0,
            offset: 0
        };
    },

    prepareAnimation: function () {
        var animateToAttributes = this.get('animateToAttributes'),
            startValues = {},
            model = this.get('model');

        _.keys(animateToAttributes).forEach(function(key){
            var startValue = model.get(key);
            if(!_.isUndefined(startValue)){
                startValues[key] = startValue;
            }
        });

        this.set('startValues', startValues);
    },

    animateProperty: function (property, animateToValue, frame) {
        var model = this.get('model'),
            offset = this.get('offset'),
            duration = this.get('duration'),
            startValue = this.get('startValues')[property],
            offsetFrame = frame-offset,
            deltaValue,
            newValue;

        if(offsetFrame >= 0 && !_.isUndefined(startValue)){
            deltaValue = ( ( Math.abs(animateToValue - startValue)) / duration ) * offsetFrame;
            deltaValue = Math.round(deltaValue*1000)/1000;

            if(animateToValue>=startValue){
              newValue = startValue + deltaValue;
            } else {
              newValue = startValue - deltaValue;
            }

            console.log('Set '+property, newValue);

            model.set(property, newValue);
        }
    },

    tick: function (frame) {
        var animateToAttributes = this.get('animateToAttributes');

        _.pairs(animateToAttributes).forEach(function(pair){
            this.animateProperty(pair[0], pair[1], frame);
        },this);
    }
});

zxTimeline.AnimationObject = AnimationObject;