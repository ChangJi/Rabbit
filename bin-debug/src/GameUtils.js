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

        var p = obj2.localToGlobal(obj2.bell.x, obj2.bell.y);
        rect2.x = p.x;
        rect2.y = p.y;
        return rect1.intersects(rect2);
    };
    return GameUtils;
})();
GameUtils.prototype.__class__ = "GameUtils";
//# sourceMappingURL=GameUtils.js.map
