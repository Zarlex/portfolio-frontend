/**
 * Created by zarges on 26.11.14.
 */
'use strict';
var AnimationQueueAttributes = zxBackbone.Model.extend({
    defaults: {
        animating: false
    }
});

zxCanvas.AnimationQueueAttributes = AnimationQueueAttributes;