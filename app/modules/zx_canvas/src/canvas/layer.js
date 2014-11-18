/**
 * Created by zarges on 16.11.14.
 */
'use strict';
var Layer = zxBackbone.NestedModel.extend({
    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            canvas: null,
            rendering: false
        }
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
    }
});

zxCanvas.Layer = Layer;