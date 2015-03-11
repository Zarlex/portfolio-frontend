/**
 * Created by zarges on 20.02.15.
 */
var BlackAndWhiteFilter = zxCanvas.Filter.extend({

    apply: function (imageData) {
        var pixels  = imageData.data,
            grayScale;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
            grayScale = pixels[i] * 0.3 + pixels[i+1] * 0.59 + pixels[i+2] * 0.11;
            pixels[i  ] = grayScale;        // red
            pixels[i+1] = grayScale;        // green
            pixels[i+2] = grayScale;        // blue
            //pixels[i+3]              is alpha
        }
        this.finish(imageData);
    }

});

zxCanvas.filters = zxCanvas.filters || {};
zxCanvas.filters.BlackAndWhiteFilter = BlackAndWhiteFilter;