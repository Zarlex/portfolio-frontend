//(function () {
//    'use strict';
//
//    angular.module('Portfolio')
//
//        .directive('zxCanvas', function ($http) {
//            return {
//                replace: true,
//                template: '<canvas style="position: absolute; left: -90px;top:-90px;" width="3630" height="3630"></canvas>', //Width && Height = (row or col amount-1 * diamond width or height)-(diamond width or height)/2
//                scope: {
//                    opacity: '='
//                },
//                link: function (scope, el) {
//
//                    var Coordinate = function (x, y) {
//                        this.x = x;
//                        this.y = y;
//                    };
//
//                    var Color = function (red, green, blue, alpha) {
//                        this.red = red;
//                        this.green = green;
//                        this.blue = blue;
//                        this.alpha = alpha;
//
//                        this.reset = function () {
//                            this.red = red;
//                            this.green = green;
//                            this.blue = blue;
//                            this.alpha = alpha;
//                        };
//                    };
//
//                    var Diamond = function (canvas, top, left, bottom, right, color) {
//                        var _canvas = canvas,
//                            _top = top,
//                            _left = left,
//                            _bottom = bottom,
//                            _right = right,
//                            _colors = ['#111','#222','#333','#444','#555','#666','#777','#888','#999','#aaa','#bbb','#ccc','#ddd','#eee'],
//                            _globalCompositeOperation = 'source-over',
//                            _color = _colors[0];
//
//                        this.dId = top.x + ' ' + top.y + '-' + right.x + ' ' + right.y + '-' + bottom.x + ' ' + bottom.y + '-' + right.x + ' ' + right.y;
//
//                        this.setColor = function (color) {
//                            var orgColor = _color
//                            _color = color;
//                            this.render();
//                            _color = orgColor;
//                        };
//
//                        this.setGlobalCompositeOperation = function(globalCompositeOperation){
//                            _globalCompositeOperation =globalCompositeOperation
//                        };
//
//                        this.getColor = function () {
//                            return _color;
//                        };
//
//                        this.getLeft = function () {
//                            return _left;
//                        };
//
//                        this.getTop = function () {
//                            return _top;
//                        };
//
//                        function getRandomInt(min, max) {
//                            return Math.floor(Math.random() * (max - min)) + min;
//                        }
//
//                        this.render = function () {
//                            _canvas.fillStyle = this.getColor();
//                            _canvas.globalAlpha = Math.random();
//                            _canvas.globalCompositeOperation = _globalCompositeOperation;
//                            _canvas.beginPath();
//                            _canvas.moveTo(_top.x, _top.y);
//                            _canvas.lineTo(_left.x, _left.y);
//                            _canvas.lineTo(_bottom.x, _bottom.y);
//                            _canvas.lineTo(_right.x, _right.y);
//                            _canvas.closePath();
//                            _canvas.fill();
//                            return this;
//                        };
//                    };
//
//                    var Circle = function () {
//                        var _circleArray = [];
//                        this.push = function (diamond) {
//                            if (!_.findWhere(_circleArray, {dId: diamond.dId})) {
//                                _circleArray.push(diamond);
//                            }
//                        };
//
//                        this.getDiamonds = function () {
//                            return _circleArray;
//                        };
//                    };
//
//                    var Row = function (even) {
//                        var _even = even,
//                            _diamonds = [],
//                            _index = even ? 0 : 1;
//
//                        this.push = function (diamond) {
//                            _diamonds[_index] = diamond;
//                            _index += 2;
//                        };
//
//                        this.isEven = function () {
//                            return _even;
//                        };
//
//                        this.getDiamondAt = function (index) {
//                            if (_even && index % 2 !== 0) {
//                                console.warn('No Diamond available at this position in this row');
//                                return false;
//                            }
//                            if (_even) {
//                                return this.getDiamonds()[index / 2];
//                            } else {
//                                return this.getDiamonds()[(index - 1) / 2];
//                            }
//                        };
//
//                        this.getDiamonds = function () {
//                            return _.compact(_diamonds);
//                        };
//                    };
//
//                    var DiamondRaster = function (colsAmount, rowsAmount, diamondHeight, diamondWidth) {
//                        var _colsAmount = colsAmount,
//                            _rowsAmount = rowsAmount,
//                            _diamondHeight = diamondHeight,
//                            _diamondWidth = diamondWidth,
//                            _rows = [],
//                            _cols = [],
//                            _circles = [];
//
//                        this.getCircles = function () {
//                            return _.compact(_circles);
//                        };
//
//                        this.getRows = function () {
//                            return _rows;
//                        };
//
//                        this.getColumns = function () {
//                            return _cols;
//                        };
//
//                        this.paintRaster = function () {
//                            this.getRows().forEach(function (row) {
//                                row.getDiamonds().forEach(function (diamond) {
//                                    diamond.render();
//                                });
//                            });
//                        };
//
//                        var _generateRaster = function () {
//                            for (var currentRow = 0; currentRow < _rowsAmount + 2; currentRow++) {
//                                var row = new Row(currentRow % 2 === 0),
//                                    evenRow = row.isEven();
//                                for (var currentCol = evenRow ? 0 : 1; currentCol < _colsAmount + 2; currentCol += 2) {
//
//                                    var diamond = new Diamond(canvas,
//                                        new Coordinate(currentCol / 2 * _diamondWidth + (_diamondWidth / 2), currentRow / 2 * _diamondHeight),
//                                        new Coordinate(currentCol / 2 * _diamondWidth + _diamondWidth, currentRow / 2 * _diamondHeight + (_diamondHeight / 2)),
//                                        new Coordinate(currentCol / 2 * _diamondWidth + (_diamondWidth / 2), currentRow / 2 * _diamondHeight + _diamondHeight),
//                                        new Coordinate(currentCol / 2 * _diamondWidth, currentRow / 2 * _diamondHeight + (_diamondHeight / 2)),
//                                        new Color(0, 0, 0, 0.6)
//                                    );
//
//                                    row.push(diamond);
//                                }
//                                _rows.push(row);
//                            }
//                        };
//
//                        var _generateCircles = function () {
//                            var rows = this.getRows(),
//                                rowMax = rows.length / 2;
//
//                            for (var i = 0, circ = 0; i < rowMax; i++, circ += 0.5) {
//
//                                var diamondMax = (rows[i].getDiamonds().length) / 2,
//                                    circStart = Math.floor(rowMax + diamondMax - circ - 2);
//
//                                for (var j = 0, circle = circStart; j < diamondMax; j++, circle--) {
//                                    var circleArray = _circles[circle] || new Circle();
//                                    circleArray.push(rows[i].getDiamonds()[j]);
//                                    circleArray.push(rows[_rows.length - 1 - i].getDiamonds()[j]);
//                                    circleArray.push(rows[_rows.length - 1 - i].getDiamonds()[rows[i].getDiamonds().length - 1 - j]);
//                                    circleArray.push(rows[i].getDiamonds()[rows[i].getDiamonds().length - 1 - j]);
//                                    _circles[circle] = circleArray;
//                                }
//                            }
//
//                        };
//
//                        (function main(root) {
//                            _generateRaster.apply(root);
//                            _generateCircles.apply(root);
//                        })(this);
//                    };
//
//                    var canvas = el[0].getContext('2d');
//
//                    var diamondRaster = new DiamondRaster(9, 5, 240, 240);
//
//                    var image = null;
//
//                    var imageObj = new Image();
//                    imageObj.onload = function() {
//                        image = this;
//                        //canvas.globalCompositeOperation = "soft-light";
//                        canvas.globalAlpha = 1;
//                        //canvas.drawImage(this, 0, 0, 1000, 1000);
//                        /*canvas.globalCompositeOperation = "multiply";
//                        diamondRaster.paintRaster();
//
//                        diamondRaster.getCircles()[2].getDiamonds().forEach(function (diamond) {
//                            var color = diamond.getColor();
//                            diamond.setGlobalCompositeOperation('multiply');
//                            diamond.render();
//                        });*/
//                    };
//
//                    imageObj.src = 'modules/start/images/southside.jpg';
//                    var rand = 1,
//                        rand1 = 3,
//                        rand2 = 5,
//                        rand3 = 7;
//
//                    var paint = function (num) {
//
//                        canvas.clearRect(0, 0, 3620, 3620); // clear canvas
//
//                        /*diamondRaster.paintRaster();
//
//                        diamondRaster.getCircles()[0].getDiamonds().forEach(function (diamond) {
//                            var color = diamond.getColor();
//                            color.reset();
//                            color.red = 255;
//                            color.blue = 0;
//                            color.alpha = 100;
//                            diamond.render();
//                        });*/
//
//                        var blur = function(e){
//                            canvas.globalAlpha=.5;
//                            for(var t=-e;t<=e;t+=2)
//                                for(var n=-e;n<=e;n+=2)
//                                    this.context.drawImage(this.element,n,t),
//                                        n>=0&&t>=0&&canvas.drawImage(this.element,-(n-1),-(t-1));
//                            canvas.globalAlpha=1;
//                        };
//
//                        if(image){
//                            canvas.globalCompositeOperation = "source-over";
//                            canvas.globalAlpha = 1;
//                        }
//
//                        //var imageObj = new Image();
//                        //imageObj.onload = function() {
//                        //    canvas.drawImage(this, 0, 0, 1000, 1000);
//                        //    canvas.globalCompositeOperation = "multiply";
//
//
//                        var rand = Math.floor(Math.random()*diamondRaster.getCircles().length);
//
//                        if(rand+1<diamondRaster.getCircles().length){
//                            rand1 = rand+1;
//                        } else {
//                            rand1 = 0;
//                        }
//
//                        if(rand+2<diamondRaster.getCircles().length){
//                            rand2 = rand+2;
//                        } else {
//                            rand2 = 0;
//                        }
//
//                        /*if(rand1>=diamondRaster.getCircles().length){
//                            rand1 = 0;
//                        } else {
//                            rand1++;
//                        }
//
//                        if(rand2>=diamondRaster.getCircles().length){
//                            rand2 = 0;
//                        } else {
//                            rand2++;
//                        }
//
//                        if(rand3>=diamondRaster.getCircles().length){
//                            rand3 = 0;
//                        } else {
//                            rand3++;
//                        }*/
//
//                         if (num || num ===0){
//                             diamondRaster.getCircles()[num].getDiamonds().forEach(function (diamond) {
//                                 canvas.globalAlpha = 1;
//                                 diamond.setColor('#fff');
//                                 //diamond.render();
//                             });
//                         }
//
//                        diamondRaster.paintRaster();
//
//
//
//
//
//
//
//                        //};
//
//                        //requestAnimationFrame(paint);
//
//
//                    };
//
//                    paint();
//
//
//                    //setInterval(paint,200);
//
//                    /*scope.$watch('opacity', function (val) {
//                        if (val) {
//                            paint(val / 100);
//                        }
//                    });*/
//
//
//
//
//
//
//                    var contextClass = (window.AudioContext || window.webkitAudioContext);
////get mic in
//                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//                    navigator.getUserMedia(
//                        {audio:true},
//                        gotStream,
//                        function(err) {
//                            console.log("The following error occured: " + err);
//                        }
//                    );
//
//                    var audioBuffer;
////for analyser node
//                    var analyzer;
////set empty array hald of fft size or equal to frequencybincount (you could put frequency bin count here if created)
//                    var frequencyData = new Uint8Array(1024);
//                    if (contextClass) {
//                        // Web Audio API is available.
//                        var context = new contextClass();
//                        console.warn('yes!');
//                    } else {
//                        // Web Audio API is not available. Ask the user to use a supported browser.
//                        alert("Oh nos! It appears your browser does not support the Web Audio API, please upgrade or use a different browser");
//                        console.warn('poobags');
//                    }
//
//// success callback when requesting audio input stream
//                    function gotStream(stream) {
//                        createAnalyser()
//                        // Create an AudioNode from the stream.
//                        var mediaStreamSource = context.createMediaStreamSource(stream);
//                        connectAnalyser(mediaStreamSource)
//                        update();
//                    }
//
//                    function createAnalyser() {
//                        //create analyser node
//                        analyzer = context.createAnalyser();
//                        //set size of how many bits we analyse on
//                        analyzer.fftSize = 2048;
//                    }
//
//                    function connectAnalyser(source) {
//                        //connect to source
//                        source.connect(analyzer);
//                    }
//
//                    function playSound() {
//                        //passing in file
//                        createAnalyser();
//                        //creating source node
//                        var source = context.createMediaElementSource(audioElement);
//                        connectAnalyser(source);
//                    }
//                    var lastUpdate1 = 0,
//                        lastUpdate2 = 0,
//                        lastUpdate3 = 0,
//                        lastUpdate4 = 0,
//                        minWait = 60,
//                        minWait2 =80,
//                        minWait3 = 100,
//                        minWait4 = 120,
//                        start = 0;
//                    function update() {
//                        requestAnimationFrame(update);
//                        //constantly getting feedback from data
//                        analyzer.getByteFrequencyData(frequencyData);
//
//                        if ( (+new Date())-lastUpdate1>minWait){
//                            //console.log('BUM',frequencyData[0]);
//                            lastUpdate1 = +new Date();
//                            if(frequencyData[0] > 160){
//                                paint(0);
//                            } else if(frequencyData[4] > 160){
//                                paint(2);
//                            } else if(frequencyData[8] > 160){
//                                paint();
//                            } else if(frequencyData[12] > 160){
//                                paint(4);
//                            } else {
//                                paint();
//                            }
//
//                        }
//
//                        /*if ( (+new Date())-lastUpdate2>minWait2){
//                            lastUpdate2 = +new Date();
//                            if( frequencyData[4] > 160 ){
//                                paint(2);
//                            }
//
//                        }
//
//                       if ( (+new Date())-lastUpdate3>minWait3){
//                            lastUpdate3 = +new Date();
//                            if( frequencyData[8] > 160 || frequencyData[12] > 160  ){
//                                paint(4);
//                            }
//
//                        }
//
//                        if ( (+new Date())-lastUpdate4>minWait4){
//                            lastUpdate4 = +new Date();
//                            if( !(frequencyData[0] > 160 && frequencyData[4] > 160 && frequencyData[8] > 160 && frequencyData[12] > 160 ) ){
//                                paint();
//                            }
//
//                        //}*/
//
//// Animation stuff--------------------------------
//                        //var lights = document.getElementsByTagName('i');
//                        //var totalLights = lights.length;
//
//                        //console.log(frequencyData)
//                        /*for (var i=0; i<32; i++) {
//                            //set light colours
//                            //flash on frequency
//                            var freqDataKey = i*2;
//                            if (frequencyData[freqDataKey] > 160){
//                                //start animation on element
//                                //console.log(i);
//                                //lights[i].style.opacity = "1";
//                            } else {
//                                //lights[i].style.opacity = "0.2";
//                            }
//                        }*/
//                    };
//                }
//            };
//        });
//
//}());
