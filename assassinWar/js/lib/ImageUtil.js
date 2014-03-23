/* global define, requirejs, Image */
define(function (require, exports, module) {

    /**
     * 批量加载图片
     * @param {string} urls 要加载的图片链接
     * @param {function} 回调函数
     */
    function loadImages(urls, callback) {
        var imgs = [],
            loadedCount = 0;

        var doComplete = function () {
            loadedCount++;
            if (loadedCount === urls.length) {
                callback.call(this, imgs);
            }
        };

        var onLoadImage = function () {
            doComplete();
        };

        for (var urlIndex = 0, urlCount = urls.length; urlIndex < urlCount; urlIndex++) {
            imgs[urlIndex] = new Image();
            imgs[urlIndex].src = urls[urlIndex];
            if (imgs[urlIndex].complete) {
                doComplete();
            } else {
                imgs[urlIndex].onload = onLoadImage;
            }
        }
    }

    // export function
    exports.loadImages = loadImages;

});