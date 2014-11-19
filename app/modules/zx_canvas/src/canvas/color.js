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
            alpha: 0
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
        return 'rgba(' + this.get('red') + ',' + this.get('green') + ',' + this.get('blue') + ',' + this.get('alpha') + ')';
    }
});

zxCanvas.Color = Color;
