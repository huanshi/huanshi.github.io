
/* global define */
define( function (require, exports, module) {
    
    /**
     * 背景
     * @param {Canvas} canvas 画布
     * @param {Image} img 背景图像
     */
    function Background(canvas,img)
    {
        this._canvas = canvas;
        this._img = img;
        this._gridWidth = 30;
    }

    Background.prototype.render = function()
    {
        var context = this._canvas.getContext("2d");
        context.drawImage(this._img, 0, 0, 900, 600); 
        context.beginPath();
        for(var rowIndex = 0;rowIndex <= 600/this._gridWidth;rowIndex ++)
        {
            context.moveTo(0,rowIndex*this._gridWidth);
            context.lineTo(900,rowIndex*this._gridWidth);   
        }
        for(var columnIndex = 0;columnIndex <= 900/this._gridWidth;columnIndex ++)
        {
            context.moveTo(columnIndex*this._gridWidth,0);
            context.lineTo(columnIndex*this._gridWidth,600);   
        }
        context.closePath();
        context.stroke(); 
    };
    
    // export
    return Background;
} );

