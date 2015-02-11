/**
 * Created by zarges on 18.11.14.
 */

var CanvasAttributes = zxBackbone.NestedModel.extend({
    defaults: function () {
        return {
            width: 200,
            height: 200,
            canvasIsRendering: false,
            canvasIsCompositing: false
        };
    },
    nested: function(){
        return {
            layerGroup: zxCanvas.LayerGroup
        };
    }
});

zxCanvas.CanvasAttributes = CanvasAttributes;