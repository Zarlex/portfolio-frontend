/**
 * Created by zarges on 05.11.14.
 */
'use strict';
var NestedModel = zxBackbone.Model.extend({

    constructor: function(attributes, options){
        var attrs = attributes || {},
            nested = {};

        options = options || {};
        this.cid = _.uniqueId('c');
        this.attributes = {};
        if (options.collection) {
            this.collection = options.collection;
        }
        nested = this._prepare();
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
test.on('change:test2:add',function(){
   debugger;
});
//test.set('name','jo');
//test.get('test').set('name','JO');

test.get('test2').add({key: 'NOI'});
