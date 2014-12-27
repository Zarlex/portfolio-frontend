/**
 * Created by zarges on 16.11.14.
 */

var Layer = zxBackbone.NestedModel.extend({
    _lastRenderRectangle: [0,0,0,0,0],
    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            canvas: null,
            rendering: false,
            globalAlpha: 1
        };
    },

    nested: function(){
      return {
          position: zxCanvas.Coordinate
      };
    },

    getRenderRectangle: function () {
        return [];
    },

    render: function (context) {
        return context;
    },

    prepareToRender: function(){
        if (!this.get('rendering')) {
            this.set('rendering', true);
            var self = this,
                context = this.get('canvas').getContext('2d'),
                start = +new Date();
            window.requestAnimationFrame(function () {
                console.log('Start Rendering Layer:',self.get('id'));
                self.render(context);
                console.log('Finished Rendering Layer:',self.get('id'),(+new Date())-start);
                self.set('rendering', false);
            });
        }
    },

    _setSize: function(){
        this.get('canvas').width = this.get('width');
        this.get('canvas').height = this.get('height');
        this.prepareToRender();
    },

    constructor: function(){
        var constructor = zxBackbone.NestedModel.prototype.constructor.apply(this,arguments);
        this.on('change:width change:height', this._setSize, this);
        this.on('change:position', this.prepareToRender, this);
        return constructor;
    }
});

zxCanvas.Layer = Layer;