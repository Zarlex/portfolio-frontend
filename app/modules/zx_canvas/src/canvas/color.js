/**
 * Created by zarges on 05.11.14.
 */

var Color = function (r,g,b,a) {
    var _hex = r;

    this.get = function(){
        return _hex;
    };
};

zxCanvas.Color = Color;
