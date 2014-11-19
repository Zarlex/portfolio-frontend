/**
 * Created by zarges on 16.11.14.
 */
'use strict';
var Layer = zxBackbone.NestedModel.extend({
    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            canvas: null,
            rendering: false,
            width: null,
            height: null
        };
    },

    nested: function(){
      return {};
    },

    getRenderRectangle: function () {

    },

    render: function () {

    },

    prepareToRender: function(){
        if (!this.get('rendering')) {
            this.set('rendering', true);
            var self = this,
                start = +new Date();
            window.requestAnimationFrame(function () {
                console.log('Start Rendering Layer:',self.get('id'));
                self.render();
                console.log('Finished Rendering Layer:',self.get('id'),(+new Date())-start);
                self.set('rendering', false);
            });
        }
    },

    _setSize: function(){
        this.get('canvas').width = this.get('height');
        this.get('canvas').height = this.get('width');
        this.prepareToRender();
    },

    constructor: function(){
        var constructor = zxBackbone.NestedModel.prototype.constructor.apply(this,arguments);
        this.on('change:width change:height', this._setSize, this);
        return constructor;
    }
});

zxCanvas.Layer = Layer;