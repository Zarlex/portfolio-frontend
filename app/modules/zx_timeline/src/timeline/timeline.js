/**
 * Created by zarges on 02.01.15.
 */
var Timeline = zxBackbone.NestedModel.extend({

    defaults: function () {
        return {
            fps: 60,
            currentFrame: 0,
            totalFrames: 0,
            _time: null,
            _isPlaying: false
        };
    },

    nested: function () {
        return {
            animationObjects: zxTimeline.AnimationObjects
        };
    },

    calculateTotalFrames: function () {
        var animationObjects = this.get('animationObjects'),
            maxDuration = 0;

        animationObjects.each(function (animationObject) {
            var animationObjectDuration = animationObject.get('duration'),
                animationObjectOffset = animationObject.get('offset'),
                animationObjectTotal = animationObjectDuration + animationObjectOffset;

            if (animationObjectTotal > maxDuration) {
                maxDuration = animationObjectTotal;
            }
        });

        this.set('totalFrames', maxDuration);
    },

    add: function (model, animateToAttributes, opts) {
        var animationObjects = this.get('animationObjects'),
            options = {
                duration: 0,
                offset: 0
            };

        if (_.isObject(opts)) {
            options = opts;
        } else if (_.isNumber(opts)) {
            options.duration = opts;
        }

        animationObjects.add({
            model: model,
            animateToAttributes: animateToAttributes,
            duration: options.duration,
            offset: options.offset
        });
    },

    play: function () {
        var isPlaying = this.get('_isPlaying'),
            animationObjects = this.get('animationObjects');

        if (!isPlaying) {
            animationObjects.prepareAnimation();
            this.set('_isPlaying', true);
            this._update();
        }
    },

    pause: function () {
        this.set('_isPlaying', false);
    },

    stop: function () {
        this.set('_isPlaying', false);
        this.set('currentFrame', 0);
    },

    gotoAndPlay: function (frame) {
        var totalFrames = this.get('totalFrames');

        if (frame <= totalFrames) {
            this.set('currentFrame', frame);
            this.play();
        }
    },

    gotoAndStop: function (frame) {
        var animationObjects = this.get('animationObjects'),
            totalFrames = this.get('totalFrames');

        if (frame <= totalFrames) {
            animationObjects.prepareAnimation();
            animationObjects.tick(frame);

            this.set('currentFrame', frame);
            this.set('_isPlaying', false);
        }
    },

    _update: function () {
        var isPlaying = this.get('_isPlaying'),
            currentFrame = this.get('currentFrame'),
            totalFrames = this.get('totalFrames'),
            time = this.get('_time'),
            animationObjects = this.get('animationObjects'),
            currentTime = +new Date(),
            fps = 60;

        if (isPlaying && currentFrame <= totalFrames) {
            if (time) {
                fps = 1000 / (currentTime - time);
            }

            animationObjects.tick(currentFrame);

            this.set('_time', currentTime);
            this.set('fps', fps);
            this.set('currentFrame', ++currentFrame);

            window.requestAnimationFrame(this._update.bind(this));
        }
    },

    constructor: function () {
        var constructor = zxBackbone.NestedModel.prototype.constructor.apply(this, arguments),
            animationObjects = this.get('animationObjects');

        animationObjects.on('add', function (model) {
            model.on('change:duration', this.calculateTotalFrames);
            this.calculateTotalFrames();
        }, this);

        animationObjects.on('remove', function (model) {
            model.off();
            this.calculateTotalFrames();
        }, this);
        return constructor;
    }
});

zxTimeline.Timeline = Timeline;