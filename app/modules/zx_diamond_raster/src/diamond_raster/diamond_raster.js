/**
 * Created by zarges on 08.12.14.
 */

var DiamondRaster = zxCanvas.PolygonLayer.extend({

            defaults: function () {
                var defaults = zxCanvas.PolygonLayer.prototype.defaults.apply(this, arguments);
                return _.extend(defaults, {
                    rowAmount: 0,
                    columnAmount: 0,
                    diamondWidth: 0,
                    diamondHeight: 0
                });
            },

            getRows: function () {

                var polygons = this.get('polygons'),
                    rowAmount = this.get('rowAmount'),
                    columnAmount = this.get('columnAmount'),
                    rows = [];

                for (var r = -0.5; r < rowAmount; r += 0.5) {
                    var row = [];
                    for (var c = r % 1 > 0 ? 0.5 : 0; c < columnAmount; c += 1) {
                        var diamond = polygons.findWhere({row:r,column:c});
                        row.push(diamond);
                    }
                    rows.push(row);
                }

                return rows;
            },

            getColumns: function(){
                var polygons = this.get('polygons'),
                    rowAmount = this.get('rowAmount'),
                    columnAmount = this.get('columnAmount'),
                    columns = [];

                for (var c = 0; c < columnAmount; c += 0.5) {
                    var column = [];
                    for (var r = -0.5; r < rowAmount; r += 0.5) {
                        var diamond = polygons.findWhere({row:r,column:c});
                        if(diamond){
                            column.push(diamond);
                        }

                    }
                    columns.push(column);
                }

                return columns;

            },

            _generate: function () {
                var polygons = this.get('polygons'),
                    rowAmount = this.get('rowAmount'),
                    columnAmount = this.get('columnAmount');

                polygons.reset();

                for (var r = -0.5; r < rowAmount; r += 0.5) {
                    for (var c = r % 1 > 0 ? 0.5 : 0; c < columnAmount; c += 1) {
                        var dWitdh = this.get('diamondWidth'),
                            dHeight = this.get('diamondHeight'),
                            diamond = new zxDiamondRaster.Diamond({width: dWitdh, height: dHeight});

                        diamond.get('position').set({x: c * dWitdh, y: r * dHeight});
                        diamond.set({row:r,column:c});
                        polygons.add(diamond);
                    }
                }
            },

            constructor: function () {
                var superConstructor = zxCanvas.PolygonLayer.prototype.constructor.apply(this, arguments);
                this._generate();
                return superConstructor;
            }

        }
    );

zxDiamondRaster.DiamondRaster = DiamondRaster;