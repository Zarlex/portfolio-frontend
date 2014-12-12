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
        var polygons = this.get('polygons'),
            rows = this.get('rows'),
            columns = this.get('columns');

        polygons.reset();

        for(var r=0;r<rows;r++){
            for(var c=0;c<columns;c++){
                var dWitdh = this.get('diamondWidth'),
                    dHeight = this.get('diamondHeight'),
                    diamond = new zxDiamondRaster.Diamond({width:dWitdh,height:dHeight});

                diamond.get('position').set({x:c*dWitdh,y:r*dHeight});
                polygons.add(diamond);
            }
        }

        for(var r= 0.5;r<rows;r++){
            for(var c= 0.5;c<columns;c++){
                var dWitdh = this.get('diamondWidth'),
                    dHeight = this.get('diamondHeight'),
                    diamond = new zxDiamondRaster.Diamond({width:dWitdh,height:dHeight});

                diamond.get('position').set({x:c*dWitdh,y:r*dHeight});
                polygons.add(diamond);
            }
        }
    },

    constructor: function(){
        var superConstructor = zxCanvas.PolygonLayer.prototype.constructor.apply(this,arguments);
        this._generate();
        return superConstructor;
    }

});

zxDiamondRaster.DiamondRaster = DiamondRaster;