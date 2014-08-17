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
    return ResUtils;
})();
ResUtils.prototype.__class__ = "ResUtils";
