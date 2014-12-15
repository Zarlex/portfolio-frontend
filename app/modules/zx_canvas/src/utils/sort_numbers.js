/**
 * Created by zarges on 15.12.14.
 */

var sortNumbers = function(numberArray){

    return numberArray.sort(function(a,b){
        return a-b;
    });
};

zxCanvas.utils.sortNumbers = sortNumbers;