/**
 * Created by zarges on 05.11.14.
 */
'use strict';
var Coordinate = zxBackbone.Model.extend({
    defaults: function(){
        return {
            x: 0,
            y: 0
        };
    },

    toString: function(){
        return this.get('x')+''+this.get('y');
    }
});

zxCanvas.Coordinate = Coordinate;
