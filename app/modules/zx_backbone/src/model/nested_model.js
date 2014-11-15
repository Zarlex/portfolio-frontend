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

        if(_.isString(attributes)){
            obj[attributes] = options;
        } else if(_.isObject(attributes)){
            obj = attributes;
        }

        obj = this._setNestedAttributes(obj);

        zxBackbone.Model.prototype.set.call(this,obj);
    },

    _setNestedModel: function(key,value){
        if(_.isString(value)){
            var id = this.get(key).idAttribute;
            this.get(key).set(id,value);
        } else if(_.isObject(value)){
            this.get(key).set(value);
        }
    },

    _setNestedCollection: function(key,value){
        if(_.isString(value)){
            var id = this.get(key).model.prototype.idAttribute,
                obj = {};
            obj[id]=value;
            this.get(key).add(obj);
        } else if(_.isObject(value)){
            this.get(key).add(value);
        }
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

    _bindNestedModelListener: function (attribute, nestedModel) {
        nestedModel.on('change', function (model) {
            var changedAttributes = model.changedAttributes();
            for(var attrName in changedAttributes){
                this.trigger.call(this, 'change:'+attribute+':'+attrName, model);
            }
            this.trigger('change:'+attribute,model);
            this.trigger('change',model);
        }, this);
    },

    _bindNestedCollectionListener: function (attribute, nestedCollection) {
        nestedCollection.on('add remove change', function(model,collection,opts){
            opts = opts || {};
            if(opts.add){
                this.trigger('change:'+attribute+':add',model,collection,opts);
            } else if( opts.remove){
                this.trigger('change:'+attribute+':remove',model,collection,opts);
            }
            this.trigger('change:'+attribute,model,collection,opts);
            this.trigger('change',model,collection,opts);
        }, this);
    },

    _bindNestedEventListener: function (attribute, nestedInstance) {

        if (nestedInstance instanceof Backbone.Model) {
            this._bindNestedModelListener(attribute, nestedInstance);
        } else if (nestedInstance instanceof Backbone.Collection) {
            this._bindNestedCollectionListener(attribute, nestedInstance);
        }
    },

    _prepare: function () {
        var nestedAttributes = this.nested(),
            instanceObject = {};
        for(var key in nestedAttributes){
            var instance = new nestedAttributes[key]();
            instanceObject[key] = instance;
            this._bindNestedEventListener(key,instance);
        }

        return instanceObject;
    }
});

zxBackbone.NestedModel = NestedModel;


