/**
 * Created by zarges on 16.11.14.
 */

var LayerGroup = zxCanvas.Layer.extend({
    _lastRenderRectangle: [0, 0, 0, 0],
    defaults: function () {
        var defaults = zxCanvas.Layer.prototype.defaults.apply(this, arguments);
        return _.extend(defaults, {
            isCompositing: false,
            needsCompositing: false,
            currentZIndex: 0
        });
    },

    nested: function () {
        return _.extend(zxCanvas.Layer.prototype.nested.apply(this, arguments), {
            layers: zxCanvas.Layers
        });
    },

    addLayer: function (layer) {
        var layers = this.get('layers'),
            currentZIndex = this.get('currentZIndex');

        layer.set('zIndex',currentZIndex);
        layers.add(layer);

        this.set('currentZIndex', ++currentZIndex);
    },

    layersAreReadyToComposite: function () {
        var layers = this.get('layers'),
            isReady = true;

        layers.each(function (layer) {
            if (isReady) {
                if (layer instanceof zxCanvas.LayerGroup) {
                    isReady = layer.layersAreReadyToComposite();
                } else {
                    isReady = (!layer.get('isRendering') && !layer.get('isCompositing'));
                }
            }
        });
        return isReady;
    },

    compositeLayers: function () {
        var context = this.get('canvas').getContext('2d'),
            layers = this.get('layers'),
            renderRectangle = this.getRenderRectangle(),
            isCompositing = this.get('isCompositing');

        if (!isCompositing) {
            this.set('isCompositing', true);
            console.log('%cComposite '+ this.get('name'),'color:green; font-weight:bold');
            context.clearRect.apply(context, this._lastRenderRectangle);
            layers.each(function (layer) {
                context.save();
                if(layer instanceof zxCanvas.LayerGroup && layer.get('needsCompositing')){
                    layer.compositeLayers();
                }
                context.globalCompositeOperation = layer.get('globalCompositeOperation');
                context.globalAlpha = layer.get('globalAlpha');

                context.drawImage(layer.get('canvas'), layer.get('position').get('x'), layer.get('position').get('y'));
                context.restore();
            }, this);

            this._lastRenderRectangle = renderRectangle;
            this.set('needsCompositing', false);
            this.set('isCompositing', false);
        }

    },

    renderLayers: function () {
        var layers = this.get('layers');

        layers.each(function (layer) {
            if (layer instanceof zxCanvas.LayerGroup) {
                if(layer.get('needsRendering')){
                    layer.renderLayers();
                }
            } else {
                if(layer.get('needsRendering')){
                    layer.renderLayer();
                }
            }
        });
    },

    askForRendering: function () {
        var layers = this.get('layers'),
            needsRendering = layers.where({needsRendering: true}).length>0;

        this.set('needsRendering', needsRendering);
    },

    askForCompositing: function(){
        if(this.layersAreReadyToComposite()){
            this.set('needsCompositing', true);
        }
    },

    setSize: function (width, height) {
        var layers = this.get('layers');

        layers.each(function (layer) {
            layer.setSize(width, height);
        });

        return zxCanvas.Layer.prototype.setSize.apply(this, arguments);
    },

    constructor: function () {
        var superConstructor = zxCanvas.Layer.prototype.constructor.apply(this, arguments),
            layers = this.get('layers');

        layers.on('change:needsRendering', this.askForRendering, this);
        layers.on('change:needsCompositing change:isRendering change:globalCompositeOperation change:globalAlpha change:position', this.askForCompositing, this);
        this.on('change:globalCompositeOperation change:globalAlpha change:position', this.askForCompositing, this);

        return superConstructor;
    }
});

zxCanvas.LayerGroup = LayerGroup;