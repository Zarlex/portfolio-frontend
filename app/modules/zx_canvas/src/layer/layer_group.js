/**
 * Created by zarges on 16.11.14.
 */

var LayerGroup = zxBackbone.NestedModel.extend({
    _lastRenderRectangle: [0, 0, 0, 0],
    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            globalAlpha: 1,
            width: 0,
            height: 0,
            canvas: null,
            isPostRendering: false,
            isCompositing: false,
            isPostCompositing: false,
            needsPostRendering: false,
            needsCompositing: false,
            needsPostCompositing: false,
            currentZIndex: 0
        };
    },

    nested: function () {
        return {
            position: zxCanvas.Coordinate,
            effects: zxBackbone.Collection,
            layers: zxCanvas.Layers
        };
    },

    getRenderRectangle: function () {
        var width = this.get('width'),
            height = this.get('height'),
            position = this.get('position');

        return [position.get('x'), position.get('y'), width, height];
    },

    addLayer: function (layer) {
        var layers = this.get('layers'),
            currentZIndex = this.get('currentZIndex');

        layer.set('zIndex',currentZIndex);
        layers.add(layer);

        this.set('currentZIndex', ++currentZIndex);
    },

    layersAreReadyToPostRender: function () {
        var layers = this.get('layers'),
            isReady = true;

        layers.each(function (layer) {
            if (isReady) {
                if (layer instanceof zxCanvas.LayerGroup) {
                    isReady = layer.layersAreReadyToPostRender();
                } else {
                    isReady = (!layer.get('isRendering') && !layer.get('isPostRendering'));
                }
            }
        });
        return isReady;
    },

    layersAreReadyToComposite: function () {
        var layers = this.get('layers'),
            isReady = true;

        layers.each(function (layer) {
            if (isReady) {
                if (layer instanceof zxCanvas.LayerGroup) {
                    isReady = layer.layersAreReadyToComposite();
                } else {
                    isReady = (!layer.get('isPostRendering') && !layer.get('isCompositing'));
                }
            }
        });
        return isReady;
    },

    layerGroupsAreReadyToPostComposite: function () {
        var layers = this.get('layers'),
            isReady = !this.get('isCompositing') && !this.get('isPostCompositing');

        layers.each(function (layer) {
            if (isReady) {
                if (layer instanceof zxCanvas.LayerGroup) {
                    isReady = layer.layersAreReadyToComposite();
                }
            }
        });

        return isReady;
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

    postRenderLayers: function(){
        var layers = this.get('layers');

        layers.each(function (layer) {
            if (layer instanceof zxCanvas.LayerGroup) {
                if(layer.get('needsPostRendering')){
                    layer.postRenderLayers();
                }
            } else {
                if(layer.get('needsPostRendering')){
                    layer.postRenderLayer();
                }
            }
        });
    },

    compositeLayers: function () {
        var context = this.get('canvas').getContext('2d'),
            layers = this.get('layers'),
            renderRectangle = this.getRenderRectangle(),
            isCompositing = this.get('isCompositing');

        if (!isCompositing) {
            this.set('isCompositing', true);
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

            console.log('%cComposite '+ this.get('name'),'color:green; font-weight:bold');

            this._lastRenderRectangle = renderRectangle;
            this.set('needsCompositing', false);
            this.set('isCompositing', false);
        }

    },

    postCompositeLayerGroups: function(){
        var layers = this.get('layers');

        layers.each(function (layer) {
            if (layer instanceof zxCanvas.LayerGroup) {
                if(layer.get('needsPostCompositing')){
                    layer.postCompositeLayerGroups();
                }
            }
        });

        this.postCompositeLayerGroup();
    },

    postCompositeLayerGroup: function(){
        var isPostCompositing = this.get('isPostCompositing'),
            effects = this.get('effects'),
            context = this.get('canvas').getContext('2d'),
            width = this.get('width'),
            height = this.get('height'),
            position = this.get('position');

        if (!isPostCompositing) {
            this.set('isPostCompositing', true);
            console.log('%c' + this.get('name') + ' is postcompositing', 'color:grey; font-weight:bold');
            effects.each(function (effect) {
                effect.apply(context, position.get('x'), position.get('y'), width, height);
            });
            this.set('isPostCompositing', false);
            this.set('needsPostCompositing', false);
        }
    },

    askForRendering: function () {
        var layers = this.get('layers'),
            needsRendering = layers.where({needsRendering: true}).length>0;

        this.set('needsRendering', needsRendering);
    },

    askForPostRendering: function(){
        if(this.layersAreReadyToPostRender()){
            this.set('needsPostRendering', true);
        }
    },

    askForCompositing: function(){
        if(this.layersAreReadyToComposite()){
            this.set('needsCompositing', true);
        }
    },

    askForPostCompositing: function(){
        if(this.layerGroupsAreReadyToPostComposite()){
            this.set('needsPostCompositing', true);
        }
    },

    setSize: function (width, height) {
        var layers = this.get('layers');

        layers.each(function (layer) {
            layer.setSize(width, height);
        });

        this.set('width', width);
        this.set('height', height);
    },

    setCanvasSize: function () {
        this.get('canvas').width = this.get('width');
        this.get('canvas').height = this.get('height');
        this.askForPostRendering();
    },

    constructor: function () {
        var superConstructor = zxCanvas.Layer.prototype.constructor.apply(this, arguments),
            layers = this.get('layers');

        layers.on('change:needsRendering', this.askForRendering, this);
        layers.on('change:globalCompositeOperation change:globalAlpha change:position change:effects', this.askForPostRendering, this);
        layers.on('change:isPostRendering change:needsCompositing', this.askForCompositing, this);

        this.on('change:effects change:isCompositing change:globalCompositeOperation change:globalAlpha change:position', this.askForPostCompositing, this);

        this.on('change:width change:height', this.setCanvasSize, this);

        return superConstructor;
    }
});

zxCanvas.LayerGroup = LayerGroup;