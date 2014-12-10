/**
 * Created by zarges on 08.12.14.
 */
'use strict';
var DiamondRaster = zxCanvas.PolygonLayer.extend({

    defaults : function(){
        var defaults = zxCanvas.PolygonLayer.prototype.defaults.apply(this,arguments);
        return _.extend(defaults,{
            rows: 0,
            columns: 0,
            diamondWidth: 0,
            diamondHeight: 0
        });
    },

    _generate: function(){
        var polygons = this.get('polygons');
        polygons.reset();
    },

    constructor: function(){

        this._generate();

        return zxCanvasPolygonLayer.prototype.constructor.apply(this,arguments);
    }

});

zxDiamondRaster.DiamondRaster = DiamondRaster;