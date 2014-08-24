/**
* Created by a4090_000 on 2014/8/16.
*/
var ResUtils = (function () {
    function ResUtils() {
    }
    ResUtils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    ResUtils.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    return ResUtils;
})();
ResUtils.prototype.__class__ = "ResUtils";
//# sourceMappingURL=ResUtils.js.map
