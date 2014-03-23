/* global define */
define(function (require, exports, module) {
    var Projection = require("module/projection"),
        MoveHelper = require("module/moveHelper"),
        EnumDirection = require("module/enumDirection");

    // 走一步需要的帧数
    var ONE_STEP_FRAME_COUNT = 8;

    /**
     * 玩家，
     * @param {Canvas} canvas 画布
     * @param {Array} imgArray 该玩家的一组人物图片
     * @param {x, y} pos 玩家位置
     */
    function Player(canvas, imgArray, pos) {
        this._canvas = canvas;
        this._imgArray = imgArray;
        this._position = pos;
        this._direction = EnumDirection.DOWN;
        this._height = 50;
        this._width = 30;
        this._targetPosition = this._position;
        this._frameCounter = 0;
    }

    /**
     * 移动到某个位置
     * @param {x, y} pos 位置坐标
     */
    Player.prototype.moveTo = function (pos) {
        this._targetPosition = pos;
    };

    /**
     * 绘制
     */
    Player.prototype.render = function () {
        this._doWalk();
        this._renderMe();
    };

    /**
     * 是否需要移动
     * @return {boolean} true 表示需要移动
     */
    Player.prototype._needMove = function () {
        return (this._position.x !== this._targetPosition.x) || (this._position.y !== this._targetPosition.y);
    };

    /**
     * 判定是否应该移动
     * @return true 表示需要移动，false 不需要移动
     */
    Player.prototype._shouldWalk = function () {
        return (this._frameCounter % ONE_STEP_FRAME_COUNT) === 0;
    };

    /**
     * 移动
     */
    Player.prototype._doWalk = function () {
        this._frameCounter++;
        if (this._shouldWalk()) {
            this._walkOneStep();
        } else {
            // 考虑转向的问题
            var nextStepDirection = MoveHelper.getNextOneStepPos(this._position, this._targetPosition).direction;
            if (this._direction !== nextStepDirection && nextStepDirection !== EnumDirection.NO) {
                this._direction = nextStepDirection;
            }
        }
    };

    /**
     * 绘制自己
     */
    Player.prototype._renderMe = function () {
        var screenPos = Projection.positionToPix(this._position),
            context = this._canvas.getContext("2d"),
            imgPlace = {
                x: screenPos.x - this._width,
                y: screenPos.y - this._height
            };

        context.drawImage(this._getRenderImage(), imgPlace.x, imgPlace.y);
    };

    /**
     * 获取当前要render的图像
     * @return {Image} 需要绘制的图像
     */
    Player.prototype._getRenderImage = function () {
        if (!this._needMove()) {
            return this._getRenderImageByIndex(0);
        }

        var remainframeCount = this._frameCounter % (ONE_STEP_FRAME_COUNT * 4);
        if (remainframeCount < 2 * 4) {
            return this._getRenderImageByIndex(0);
        } else if (remainframeCount < 4 * 4) {
            return this._getRenderImageByIndex(1);
        } else if (remainframeCount < 6 * 4) {
            return this._getRenderImageByIndex(2);
        } else {
            return this._getRenderImageByIndex(3);
        }
    };

    /**
     * 使用index获取当前渲染使用的图像
     * @return {Image} 图像
     */
    Player.prototype._getRenderImageByIndex = function (index) {
        if (this._direction === EnumDirection.LEFT) {
            return this._imgArray.left[index];
        } else if (this._direction === EnumDirection.RIGHT) {
            return this._imgArray.right[index];
        } else if (this._direction === EnumDirection.UP) {
            return this._imgArray.up[index];
        } else {
            return this._imgArray.down[index];
        }
    };

    /**
     * 移动一步
     * @return {x, y} 移动后的位置坐标
     */
    Player.prototype._walkOneStep = function () {
        if (this._needMove()) {
            var nextStep = MoveHelper.getNextOneStepPos(this._position, this._targetPosition);
            this._position = nextStep.position;
            this._direction = nextStep.direction;
        }
        return this._position;
    };

    // export
    return Player;

});