/* global define */
define(function (require, exports, module) {
    var EnumDirection = require("module/enumDirection");

    /**
     * 获取下一步的位置
     */
    function getNextOneStepPos(curPos, targetPos) {
        var nextPos = {
            x: curPos.x,
            y: curPos.y
        },
            direction = EnumDirection.NO;

        if (curPos.x < targetPos.x) {
            direction = EnumDirection.RIGHT;
            nextPos.x = nextPos.x + 1;
        } else if (curPos.x > targetPos.x) {
            direction = EnumDirection.LEFT;
            nextPos.x = nextPos.x - 1;
        } else if (curPos.y < targetPos.y) {
            direction = EnumDirection.DOWN;
            nextPos.y = nextPos.y + 1;
        } else if (curPos.y > targetPos.y) {
            direction = EnumDirection.UP;
            nextPos.y = nextPos.y - 1;
        }

        return {
            direction: direction,
            position: nextPos
        };
    }

    // export;
    exports.getNextOneStepPos = getNextOneStepPos;

});