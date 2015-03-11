/**
 * Created by zarges on 20.02.15.
 */
var BlurFilter = zxCanvas.Filter.extend({

    defaults: function () {
        return {
            radius: 0,
            alpha: false
        };
    },

    apply: function (imageData) {
        var alpha = this.get('alpha'),
            width = this.get('width'),
            height = this.get('height'),
            radius = this.get('radius');

        if (alpha) {
            window.stackBlurCanvasRGBA(imageData, width, height, radius);
        } else {
            window.stackBlurCanvasRGB(imageData, width, height, radius);
        }

        this.finish(imageData);
    }

});

zxCanvas.filters = zxCanvas.filters || {};
zxCanvas.filters.BlurFilter = BlurFilter;