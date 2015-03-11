/**
 * Created by zarges on 20.02.15.
 */
var Filter = zxBackbone.NestedModel.extend({

    nested: function(){
        return {
            position: zxCanvas.Coordinate
        };
    },

    prepare: function(context, x, y, width, height){
        this.set('context', context);
        this.set('position', {x: x, y:y});
        this.set('width', width);
        this.set('height', height);

        this.apply(context.getImageData(x, y, width, height));
    },

    apply: function (imageData) {
        // Implement your filter here
        // Don't forget to call finish at the end of your implementation
        this.finish(imageData);
    },

    finish: function(imageData){
        var context = this.get('context'),
            position = this.get('position'),
            x = position.get('x'),
            y = position.get('y');

        context.putImageData(imageData, x, y);
    }

});

zxCanvas.Filter = Filter;