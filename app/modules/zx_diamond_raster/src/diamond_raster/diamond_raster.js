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

            for (var r = 0; r < rowAmount; r += 0.5) {
                var row = [];
                for (var c = r % 1 > 0 ? 0.5 : 0; c < columnAmount; c++) {
                    row.push(polygons.findWhere({row: r, column: c}));
                }
                rows.push(row);
            }

            return rows;
        },

        getColumns: function () {
            var polygons = this.get('polygons'),
                rowAmount = this.get('rowAmount'),
                columnAmount = this.get('columnAmount'),
                columns = [];

            for (var c = 0; c < columnAmount; c += 0.5) {
                var column = [];
                for (var r = c % 1 > 0 ? 0.5 : 0; r < rowAmount; r++) {
                    column.push(polygons.findWhere({row: r, column: c}));
                }
                columns.push(column);
            }

            return columns;

        },

        getCircles: function () {
            var polygons = this.get('polygons'),
                rowAmount = this.get('rowAmount'),
                columnAmount = this.get('columnAmount'),
                circles = [];

            for (var r = 0; r < rowAmount / 2; r += 0.5) {
                var circleStartNum = Math.floor(rowAmount - r),
                    diamondsTop = polygons.where({row: r}),
                    diamondsBottom = polygons.where({row: rowAmount - 1 - r});

                for (var circleIncrementor = 0;
                     circleIncrementor<diamondsTop.length/2 && circleIncrementor<diamondsBottom.length/2;
                     circleIncrementor++) {

                    var circleNum = circleStartNum-circleIncrementor + (columnAmount-rowAmount)/2 -1,
                        circle = circles[circleNum] || [];

                    //Put all diamond of the top half into the circle
                    circle.push(diamondsTop[circleIncrementor]);
                    circle.push(diamondsTop[diamondsTop.length-1-circleIncrementor]);

                    //Put all diamond of the bottom half into the circle
                    circle.push(diamondsBottom[circleIncrementor]);
                    circle.push(diamondsBottom[diamondsBottom.length-1-circleIncrementor]);

                    circles[circleNum] = circle;
                }
            }

            return circles;
        },

        _generate: function () {
            var polygons = this.get('polygons'),
                rowAmount = this.get('rowAmount'),
                columnAmount = this.get('columnAmount');

            polygons.reset();

            for (var r = 0; r < rowAmount - 0.5; r += 0.5) {
                for (var c = r % 1 > 0 ? 0.5 : 0; c < columnAmount - 0.5; c += 1) {
                    var dWitdh = this.get('diamondWidth'),
                        dHeight = this.get('diamondHeight'),
                        diamond = new zxDiamondRaster.Diamond({width: dWitdh, height: dHeight});

                    diamond.get('position').set({x: c * dWitdh, y: r * dHeight});
                    diamond.set({row: r, column: c});
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