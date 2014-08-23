var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by a4090_000 on 2014/8/23.
*/
var Bell = (function (_super) {
    __extends(Bell, _super);
    function Bell() {
        _super.call(this);
        this.createView();
    }
    Bell.prototype.createView = function () {
        var dataBell = RES.getRes("bellmc_json");
        var textureBell = RES.getRes("bellmc_png");
        var bell = new egret.MovieClip(dataBell, textureBell);
        this.addChild(bell); //添加到显示列表
        bell.frameRate = 30; //设置动画的帧频
        bell.x = 100;
        bell.y = 100;

        //        monkey.scaleX=-1;
        bell.gotoAndPlay("bell");
    };
    return Bell;
})(egret.Sprite);
Bell.prototype.__class__ = "Bell";
//# sourceMappingURL=Bell.js.map
