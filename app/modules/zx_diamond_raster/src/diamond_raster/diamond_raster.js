/**
 * Created by zarges on 08.12.14.
 */

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

        for(var r2= 0.5;r2<rows;r2++){
            for(var c2= 0.5;c2<columns;c2++){
                var dWitdh2 = this.get('diamondWidth'),
                    dHeight2 = this.get('diamondHeight'),
                    diamond2 = new zxDiamondRaster.Diamond({width:dWitdh2,height:dHeight2});

                diamond2.get('position').set({x:c2*dWitdh2,y:r2*dHeight2});
                polygons.add(diamond2);
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