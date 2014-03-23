/* global define, requirejs, document, requestAnimFrame, window */

// 先配置require的环境
requirejs.config({
    //默认从 js/ 中加载模块
    baseUrl: 'js/',

    paths: {
        text: "ThirdPartyLib/text"
    }
});

define(function (require, exports, module) {

    var ImageUtil = require("lib/ImageUtil"),
        Player = require("module/player"),
        Background = require("module/background"),
        Projection = require("module/projection"),
        player = null,
        background = null,
        canvas = document.getElementById("myCanvas"),
        imgs = [];

    /**
     * 绘制整个游戏
     */
    function render() {
        background.render();
        player.render();
        requestAnimFrame(render);
    }

    // 加载图像
    ImageUtil.loadImages([
            "img/defaultPlayer-down0.png",
            "img/defaultPlayer-down1.png",
            "img/defaultPlayer-down2.png",
            "img/defaultPlayer-down3.png",
            "img/defaultPlayer-left0.png",
            "img/defaultPlayer-left1.png",
            "img/defaultPlayer-left2.png",
            "img/defaultPlayer-left3.png",
            "img/defaultPlayer-right0.png",
            "img/defaultPlayer-right1.png",
            "img/defaultPlayer-right2.png",
            "img/defaultPlayer-right3.png",
            "img/defaultPlayer-up0.png",
            "img/defaultPlayer-up1.png",
            "img/defaultPlayer-up2.png",
            "img/defaultPlayer-up3.png"
        ],
        function (imgs) {
            var imageArray = {
                down: imgs.slice(0, 4),
                left: imgs.slice(4, 8),
                right: imgs.slice(8, 12),
                up: imgs.slice(12, 16)
            };
            player = new Player(canvas, imageArray, {
                x: 1,
                y: 1
            });
        });

    ImageUtil.loadImages(["img/background.png"], function (imgs) {
        background = new Background(canvas, imgs[0]);

        // 画图像
        render();
    });

    // 添加画布点击事件
    canvas.addEventListener('click', function () {
        player.moveTo(Projection.pixToPosition({
            x: window.event.clientX,
            y: window.event.clientY
        }));
    });

});