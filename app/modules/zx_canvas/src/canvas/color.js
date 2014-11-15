/**
 * Created by zarges on 05.11.14.
 */

var Color = zxBackbone.Model.extend({
    defaults: function () {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0
        }
    },

    toHexString: function () {
        return '#' +
            this.get('red').toString(16) +
            this.get('green').toString(16) +
            this.get('blue').toString(16);
    },

    toRgbString: function () {
        return 'rgb(' + this.get('red') + ',' + this.get('green') + ',' + this.get('blue') + ')';
    },

    toRgbaString: function () {
        return 'rgba(' + this.get('red') + ',' + this.get('green') + ',' + this.get('blue') + ',' + this.get('alpha') + ')';
    }
});

zxCanvas.Color = Color;
