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
        this.hit = false;
        this.ys = 0;
        this.isRemove = false;
        this.createView();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }
    Bell.prototype.createView = function () {
        var dataBell = RES.getRes("bellmc_json");
        var textureBell = RES.getRes("bellmc_png");
        this.bell = new egret.MovieClip(dataBell, textureBell); //创建电影剪辑
        this.addChild(this.bell); //添加到显示列表
        this.bell.frameRate = 30; //设置动画的帧频
        this.bell.gotoAndPlay("bell");

        this.ys = RabbitData.bellspeed;
    };
    Bell.prototype.enterFrameHandler = function (event) {
        this.bell.y += this.ys;
        if (this.hit) {
            //           RabbitData.bells.splice()
            this.bell.gotoAndPlay("hit");
        } else if (this.bell.y > 300) {
            this.bell.alpha -= 0.5;
            if (this.bell.alpha < 0) {
                this.isRemove = true;

                //               RabbitData.bells.remove(this.bell);
                if (this.bell.parent)
                    this.bell.parent.removeChild(this.bell);
            }
        }
    };
    return Bell;
})(egret.Sprite);
Bell.prototype.__class__ = "Bell";
//# sourceMappingURL=Bell.js.map
