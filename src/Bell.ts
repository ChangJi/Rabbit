/**
 * Created by a4090_000 on 2014/8/23.
 */
class Bell extends egret.Sprite
{
    public constructor(){
        super();
        this.createView();
    }
    private createView():void
    {
        var dataBell = RES.getRes("bellmc_json");//获取描述
        var textureBell = RES.getRes("bellmc_png");//获取大图
        var bell = new egret.MovieClip(dataBell,textureBell);//创建电影剪辑
        this.addChild(bell);//添加到显示列表
        bell.frameRate = 30;//设置动画的帧频
        bell.x = 100;
        bell.y = 100;
//        monkey.scaleX=-1;
        bell.gotoAndPlay("bell");
    }
}