/**
* Created by a4090_000 on 2014/8/24.
*/
var GameUtils = (function () {
    function GameUtils() {
    }
    GameUtils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    GameUtils.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;

        //        rect1.width=obj1.width;
        //        rect1.height=obj1.height;
        rect2.x = obj2.x;
        rect2.y = obj2.y;

        //        rect2.width=obj2.width;
        //        rect2.height=obj2.height;
        return rect1.intersects(rect2);
    };
    return GameUtils;
})();
GameUtils.prototype.__class__ = "GameUtils";
//# sourceMappingURL=GameUtils.js.map
