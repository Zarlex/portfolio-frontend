/**
 * Created by zarges on 05.11.14.
 */

var Polygon = function (coordinates, opts) {

    opts = opts || {};
    var _coordinates = coordinates,
        _startEndCoordinate = _coordinates.splice(0,1)[0],
        _color = opts.color || new zxCanvas.Color();

    this.getXCoordinates = function () {
        var xCoordinates = [];

        _coordinates.forEach(function (coordinate) {
            xCoordinates.push(coordinate.getX());
        });

        return xCoordinates;
    };

    this.getYCoordinates = function () {
        var yCoordinates = [];

        _coordinates.forEach(function (coordinate) {
            yCoordinates.push(coordinate.getY());
        });

        return yCoordinates;
    };

    this.getStartEndCoordinate = function(){
      return _startEndCoordinate;
    };

    this.getCoordinates = function () {
        return _coordinates;
    };

    this.getColor = function(){
      return _color.get();
    };

    this.setColor = function(color){
        _color = color;
        this._canvas.addToRenderQueue(this);
    };

    this.render = function (context) {
        var coordinates = this.getCoordinates();

        //context.save();
        context.fillStyle = this.getColor();
        context.beginPath();
        context.moveTo(this.getStartEndCoordinate().getX(),this.getStartEndCoordinate().getY());
        coordinates.forEach(function(coordinate){
            context.lineTo(coordinate.getX(),coordinate.getY());
        });
        context.lineTo(this.getStartEndCoordinate().getX(),this.getStartEndCoordinate().getY());
        context.closePath();
        context.fill();
        //context.restore();
        return this;
    };

};

zxCanvas.Polygon = Polygon;