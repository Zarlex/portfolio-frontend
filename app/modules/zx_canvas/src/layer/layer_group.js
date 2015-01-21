/**
 * Created by zarges on 16.11.14.
 */

var LayerGroup = zxCanvas.Layer.extend({
    _lastRenderRectangle: [0,0,0,0],

    nested: function(){
        return _.extend(zxCanvas.Layer.prototype.nested.apply(this,arguments),{
            layers: zxCanvas.Layers
        });
    },

    addLayer: function(layer){
        var layers = this.get('layers');

        layers.add(layer);
    },

    isReadyToRender: function(){
      var layers = this.get('layers'),
          isReady = true;

      layers.each(function(layer){
          if(isReady){
              if(layer instanceof zxCanvas.Layer){
                  isReady = !layer.get('rendering');
              } else if (layer instanceof zxCanvas.LayerGroup){
                  isReady = layer.isReadyToRender();
              }
          }
      });

      return isReady;
    },

    render: function(context){
        var layers = this.get('layers'),
            renderRectangle = this.getRenderRectangle(),
            startCanvas = +new Date();

        console.log('Start Rendering LayerGroup', this._lastRenderRectangle);
        context.clearRect.apply(context, this._lastRenderRectangle);

        layers.each(function (layer) {
            context.save();
            context.globalCompositeOperation = layer.get('globalCompositeOperation');
            context.globalAlpha = layer.get('globalAlpha');
            context.drawImage(layer.get('canvas'), layer.get('position').get('x'), layer.get('position').get('y'));
            context.restore();
        }, this);

        this._lastRenderRectangle = renderRectangle;
        console.log('Finished Rendering LayerGroup', (+new Date()) - startCanvas);
    },

    prepareToRender: function () {
        var context = this.get('canvas').getContext('2d');

        if (this.isReadyToRender() && !this.get('rendering')) {
            this.set('rendering', true);
            window.requestAnimationFrame(function () {
                this.render(context);
                this.set('rendering', false);
            }.bind(this));
        }
    },

    setSize: function(width, height){
        var layers = this.get('layers');

        layers.each(function(layer){
            layer.setSize(width, height);
        });

        return zxCanvas.Layer.prototype.setSize.apply(this,arguments);
    },

    constructor: function(){
        var superConstructor = zxCanvas.Layer.prototype.constructor.apply(this,arguments),
            layers = this.get('layers');

        layers.on('add', function(layer){
            layer.on('change:rendering', this.prepareToRender, this);
        }, this);

        return superConstructor;
    }
});

zxCanvas.LayerGroup = LayerGroup;