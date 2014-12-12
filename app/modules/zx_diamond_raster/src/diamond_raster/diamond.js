/**
 * Created by zarges on 10.12.14.
 */
'use strict';
var Diamond = zxCanvas.Polygon.extend({

    defaults : function(){
        var defaults = zxCanvas.Polygon.prototype.defaults.apply(this,arguments);
        return _.extend(defaults,{
            width: 0,
            height: 0
        });

    },

    _setCoordinates: function(height, width){
        var coordinates = this.get('coordinates');

        coordinates.reset();
        coordinates.add({x:width/2,y:0});
        coordinates.add({x:width,y:height/2});
        coordinates.add({x:width/2,y:height});
        coordinates.add({x:0,y:height/2});
    },

    constructor: function(){

        this.on('change:width change:height', function(){
            var height = this.get('height'),
                width = this.get('width');

            this._setCoordinates(width,height);

        }, this);

        return zxCanvas.Polygon.prototype.constructor.apply(this,arguments);
    }

});

zxDiamondRaster.Diamond = Diamond;