/**
 * Created by zarges on 18.11.14.
 */
'use strict';
var CanvasAttributes = zxBackbone.NestedModel.extend({
    defaults: function () {
        return {
            rendering: false,
            width: 200,
            height: 200
        };
    },

    nested: function(){
        return {
            layers: zxCanvas.Layers
        };
    }
});

zxCanvas.CanvasAttributes = CanvasAttributes;