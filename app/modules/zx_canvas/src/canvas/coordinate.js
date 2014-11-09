/**
 * Created by zarges on 05.11.14.
 */

var Coordinate = function (x,y) {
    var _x = x;
    var _y = y;

    this.getX = function(){
        return _x;
    };

    this.getY = function(){
        return _y;
    };

    this.get = function(){
        return [x,y];
    };

    this.toString = function(){
      return this.x+''+this.y;
    };
};

zxCanvas.Coordinate = Coordinate;
