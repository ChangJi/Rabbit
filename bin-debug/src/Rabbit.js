var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by a4090_000 on 2014/8/17.
*/
var Rabbit = (function (_super) {
    __extends(Rabbit, _super);
    function Rabbit() {
        _super.call(this);
        this.createView();
    }
    Rabbit.prototype.createView = function () {
        this.rabbitContainer = new egret.Sprite();
        this.addChild(this.rabbitContainer);
        var dataStand = RES.getRes("standmc_json");
        var textureStand = RES.getRes("standmc_png");
        var rabbitStand = new egret.MovieClip(dataStand, textureStand);
        this.rabbitContainer.addChild(rabbitStand); //添加到显示列表
        rabbitStand.frameRate = 30; //设置动画的帧频
        rabbitStand.x = 100;
        rabbitStand.y = 365;

        //        monkey.scaleX=-1;
        rabbitStand.gotoAndPlay("stand");

        var dataRun = RES.getRes("runmc_json");
        var textureRun = RES.getRes("runmc_png");
        var rabbitRun = new egret.MovieClip(dataRun, textureRun);
        this.rabbitContainer.addChild(rabbitRun);
        rabbitRun.frameRate = 30;
        rabbitRun.x = 100;
        rabbitRun.y = 345;
        rabbitRun.gotoAndPlay("runmc");
    };
    return Rabbit;
})(egret.Sprite);
Rabbit.prototype.__class__ = "Rabbit";
//# sourceMappingURL=Rabbit.js.map
