/**
 * Created by zarges on 26.11.14.
 */
'use strict';
var AnimationObject = zxBackbone.NestedModel.extend({
    defaults: function () {
        return {
            duration: 0,
            incrementBy: 0,
            fps: 60
        };
    },
    nested: function () {
        return {
            animationStartAttributes: zxBackbone.Model,
            animationAttributes: zxBackbone.Model,
            model: zxBackbone.Model,
            attributes: zxBackbone.Model
        };
    },
    setBeforeAnimationAttributes: function () {
        for (var key in this.get('attributes').toJSON()) {
            this.get('animationStartAttributes').set(key, this.get('model').get(key));
        }
    },
    propertyAnimationHasFinished: function(propertyKey){
        var attributes = this.get('attributes'),
            animationAttributes = this.get('animationAttributes'),
            animationStartAttributes = this.get('animationStartAttributes');

        if (animationStartAttributes.get(propertyKey) > attributes.get(propertyKey)) {
            return (animationAttributes.get(propertyKey)<=attributes.get(propertyKey));
        } else {
            return (animationAttributes.get(propertyKey)>=attributes.get(propertyKey));
        }
    },
    animationHasFinished: function () {
        var hasFinished=true;

        if (_.isEmpty(this.get('animationStartAttributes').toJSON())) {
            this.setBeforeAnimationAttributes();
            return false;
        }

        for(var key in this.get('animationAttributes').toJSON()){
           if(!this.propertyAnimationHasFinished(key)){
               hasFinished = false;
           }
        }
        return hasFinished;
    },
    getIncrementValue: function (propertyKey) {
        var delta = this.get('attributes').get(propertyKey) - this.get('animationStartAttributes').get(propertyKey),
            duration = this.get('duration'),
            fps = this.get('fps');

        return (delta / (duration / fps));
    },
    animateProperty: function (propertyKey) {
        var incrementValue = this.get('incrementBy'),
            model = this.get('model'),
            animationAttributes = this.get('animationAttributes'),
            newValue;

        if (!incrementValue) {
            incrementValue = this.getIncrementValue(propertyKey);
        }

        newValue = model.get(propertyKey) + incrementValue;

        if(this.propertyAnimationHasFinished(propertyKey)){
            model.set(propertyKey, this.get('attributes').get(propertyKey));
            animationAttributes.set(propertyKey, this.get('attributes').get(propertyKey));
        } else {
            model.set(propertyKey, newValue);
            animationAttributes.set(propertyKey, newValue);
        }
    },
    animate: function () {
        for (var key in this.get('attributes').toJSON()) {
            this.animateProperty(key);
        }
    },
    constructor: function () {
        this.once('change:model', this.setBeforeAnimationAttributes);
        return zxBackbone.NestedModel.prototype.constructor.apply(this, arguments);
    }
});

zxCanvas.AnimationObject = AnimationObject;