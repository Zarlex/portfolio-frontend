/**
 * Created by zarges on 05.11.14.
 */
'use strict';
var Color = zxBackbone.Model.extend({
    defaults: function () {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
        };
    },

    _colorToHexString: function(color){
        var hex = color.toString(16);
        if(hex.length===1){
            return '0'+hex;
        } else {
            return hex;
        }
    },

    _getFlooredColor: function(color, decimalAmount){
        decimalAmount = decimalAmount || 0;
        color = this.get(color);

        var decimalMultiplier = Math.pow(10,decimalAmount);

        return Math.floor(color*decimalMultiplier)/decimalMultiplier;

    },

    _getInRangeNumber: function(num,min,max){
        if(num>max){
            num = max;
        } else if(num < min){
            num = min;
        };

        return num;
    },

    toHexString: function () {
        return '#' +
            this._colorToHexString(this.get('red')) +
            this._colorToHexString(this.get('green')) +
            this._colorToHexString(this.get('blue'));
    },

    toRgbString: function () {
        return 'rgb(' + this.get('red') + ',' + this.get('green') + ',' + this.get('blue') + ')';
    },

    toRgbaString: function () {
        var red = this._getInRangeNumber(this._getFlooredColor('red'),0,255),
            blue= this._getInRangeNumber(this._getFlooredColor('blue'),0,255),
            green = this._getInRangeNumber(this._getFlooredColor('green'),0,255),
            alpha = this._getInRangeNumber(this._getFlooredColor('alpha',2),0,1);

        return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
    }
});

zxCanvas.Color = Color;
