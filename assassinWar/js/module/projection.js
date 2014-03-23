/* global define */
define(function (require, exports, module) {

    // 一个方格的宽度
    var CELL_WIDTH = 30; 
    
    /**
     * 画布屏幕坐标转换到游戏坐标系中的坐标
     * @param {x,y} pos 这个坐标是画布的相对坐标，不是整个屏幕的绝对坐标
     */
    function pixToPosition( pos ) {
        return {
            x: parseInt(pos.x / CELL_WIDTH),
            y: parseInt(pos.y / CELL_WIDTH)
        };
    }

    /**
     * 游戏坐标转换到画布屏幕坐标
     * @param {x, y} pos 游戏坐标
     * @return {x, y} 画布内屏幕坐标，是个相对于画布起始点的坐标
     */
    function positionToPix( pos ) {
        return {
            x: (pos.x + 1) * CELL_WIDTH - 1,
            y: (pos.y + 1) * CELL_WIDTH - 1
        };
    }

    exports.pixToPosition = pixToPosition;
    exports.positionToPix = positionToPix;
    
});