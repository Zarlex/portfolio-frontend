function blackAndWhiteImage(context, x, y, width, height) {
    var imageData = context.getImageData(x, y, width, height);

    grayScale(imageData, width, height);

    //redraw the image in black & white
    context.putImageData(imageData, x, y);
}


function grayScale(imgData) {
    var pixels  = imgData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
        pixels[i  ] = grayscale;        // red
        pixels[i+1] = grayscale;        // green
        pixels[i+2] = grayscale;        // blue
        //pixels[i+3]              is alpha
    }

}
