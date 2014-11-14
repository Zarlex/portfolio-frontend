/**
 * Created by zarges on 05.11.14.
 */
'use strict';
var NestedModel = zxBackbone.Model.extend({

    constructor: function(attributes, options){
        var attrs = attributes || {},
            nested = this._prepare();

        options = options || {};
        this.cid = _.uniqueId('c');
        this.attributes = {};
        if (options.collection) {
            this.collection = options.collection;
        }

        this.set(nested);
        if (options.parse) {
            attrs = this.parse(attrs, options) || {};
        }
        attrs = _.defaults({}, attrs, nested, _.result(this, 'defaults'));
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    },

    nested: function(){
        return {};
    },

    set: function(attributes,options){
        var obj = {};

        if(attributes instanceof Object){
            obj = attributes;
        } else if(typeof attributes === 'string'){
            obj[attributes] = options;
        }

        obj = this._setNestedAttributes(obj);

        zxBackbone.Model.prototype.set.call(this,obj);
    },

    _setNestedModel: function(key,value){
        if(typeof value === 'string'){
            var id = this.get(key).idAttribute;
            this.get(key).set(id,value);
        }
    },

    _setNestedCollection: function(key,value){

    },

    _setNestedAttributes: function(obj){

        for (var key in obj){
            var nestedAttrs = this.nested(),
                value = obj[key],
                nestedValue = nestedAttrs[key];

            if(nestedValue && !(value instanceof nestedValue) && this.get(key)){

                if(this.get(key) instanceof Backbone.Model){
                    this._setNestedModel(key,value);
                } else if (this.get(key) instanceof Backbone.Collection){
                    this._setNestedCollection(key,value);
                }

                delete obj[key];
            }
        }

        return obj;
    },

    _bindNestedEventListener: function(attribute,nestedInstance){
        nestedInstance.on('all', function(eventName,model,nestedAttribute){
            var newEventName = '';
            if(eventName.match(/change:?/) ){
                var nestedAttributeName = eventName.replace(/change:?/,''),
                    newEventNameArr = ['change',attribute,nestedAttributeName];

                newEventName = _.compact(newEventNameArr).join(':');
                this.trigger.apply(this,[newEventName,model,nestedAttribute]);
                this.trigger.apply(this,['change',model,nestedAttribute]);
            } else if(eventName.match(/add|remove/)){
                newEventName = 'change:'+attribute;
                this.trigger.apply(this,[newEventName,model,nestedAttribute]);
                this.trigger.apply(this,[newEventName+':'+eventName,model,nestedAttribute]);
                this.trigger.apply(this,['change',model,nestedAttribute]);
            }
        },this);
    },

    _prepare: function () {
        var nestedAttributes = this.nested(),
            instanceObject = {};
        for(var key in nestedAttributes){
            var instance = new nestedAttributes[key];
            instanceObject[key] = instance;
            this._bindNestedEventListener(key,instance);
        }

        return instanceObject;
    }
});

zxBackbone.NestedModel = NestedModel;

var Test = NestedModel.extend({
   nested: function(){
       return {
           test: Backbone.Model,
           test2: Backbone.Collection
       };
   }
});

var test = new Test();
test.on('change:name',function(){
   debugger;
});
test.set('test','jo');
debugger;
//test.get('test').set('name','JO');

//test.get('test2').add({key: 'NOI'});
