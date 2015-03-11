/**
 * Created by zarges on 16.11.14.
 */

var Layer = zxBackbone.NestedModel.extend({
    _lastRenderRectangle: [0, 0, 0, 0],
    defaults: function () {
        return {
            globalCompositeOperation: 'source-over',
            canvas: null,
            isRendering: false,
            isPostRendering: false,
            needsRendering: false,
            needsPostRendering: false,
            globalAlpha: 1,
            width: 0,
            height: 0
        };
    },

    nested: function () {
        return {
            position: zxCanvas.Coordinate,
            filters: zxCanvas.Filters
        };
    },

    addFilter: function(filter){
        var filters = this.get('filters');

        filters.add(filter);
    },

    getRenderRectangle: function () {
        var width = this.get('width'),
            height = this.get('height'),
            position = this.get('position'),
            x = position.get('x'),
            y = position.get('y');

        return [x, y, width, height];
    },

    renderLayer: function () {

    },

    postRenderLayer: function () {
        var isRendering = this.get('isRendering'),
            needsPostRendering = this.get('needsPostRendering'),
            isPostRendering = this.get('isPostRendering'),
            filters = this.get('filters'),
            context = this.get('canvas').getContext('2d'),
            renderRectangle = this.getRenderRectangle();

        if (!isRendering && needsPostRendering && !isPostRendering) {
            this.set('isPostRendering', true);
            console.log('%c' + this.get('name') + ' is postrendering', 'color:lila; font-weight:bold');
            filters.each(function (filter) {
                filter.prepare(context, renderRectangle[0], renderRectangle[1], renderRectangle[2], renderRectangle[3]);
            }, this);
            this.set('isPostRendering', false);
            this.set('needsPostRendering', false);
        }
    },

    setSize: function (width, height) {
        this.set('width', width);
        this.set('height', height);
    },

    setCanvasSize: function () {
        this.get('canvas').width = this.get('width');
        this.get('canvas').height = this.get('height');
        this.askForRendering();
    },

    askForRendering: function () {
        this.set('needsRendering', true);
    },

    askForPostRendering: function () {
        this.set('needsPostRendering', true);
    },


    constructor: function () {
        var constructor = zxBackbone.NestedModel.prototype.constructor.apply(this, arguments);

        this.on('change:width change:height', this.setCanvasSize, this);

        this.on('change:isRendering', this.askForPostRendering);

        return constructor;
    }
});

zxCanvas.Layer = Layer;