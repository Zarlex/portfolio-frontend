/**
 * Created by zarges on 05.11.14.
 */

var Canvas = function (canvasEl) {
    var _canvas = canvasEl,
        _context = _canvas.getContext('2d'),
        _registeredElements = [],
        _renderQueue = [];

    this.addToRenderQueue = function (el) {
        _renderQueue.push(el);
    };

    this.registerPolygon = function (polygon, index) {

        if (!polygon instanceof zxCanvas.Polygon) {
            throw new Error('Element is not a polygon');
        }

        polygon._canvas = this;

        if (!index) {
            _registeredElements.push(polygon);
        } else {

        }

        _renderQueue.push(polygon);
    };

    this.getContext = function () {
        return _context;
    };

    var getClearRectangle = function () {
        var xCoordinates = [],
            yCoordinates = [];
        _renderQueue.forEach(function(renderEl){
            xCoordinates.push(renderEl.getStartEndCoordinate().getX());
            xCoordinates.push(renderEl.getXCoordinates());
            yCoordinates.push(renderEl.getStartEndCoordinate().getY());
            yCoordinates.push(renderEl.getYCoordinates());
        });
        xCoordinates = _.flatten(xCoordinates).sort();
        yCoordinates = _.flatten(yCoordinates).sort();
        return [xCoordinates[0],yCoordinates[0],xCoordinates[xCoordinates.length-1]-xCoordinates[0],yCoordinates[yCoordinates.length-1]-yCoordinates[0]];
    };

    var render = function () {
        if (_renderQueue.length > 0) {
            var clearRectangle = getClearRectangle();
            _context.clearRect.apply(_context,clearRectangle);

            _registeredElements.forEach(function (el) {
                _context.save();
                el.render();
                _context.restore();
            });
            _renderQueue = [];
        }
        window.requestAnimationFrame(render);
    };

    (function main() {
        render();
    })();


};

zxCanvas.Canvas = Canvas;
