/**
 * Created by a4090_000 on 2014/8/23.
 */
class Bell extends egret.Sprite
{
    public hit:Boolean=false;
    private ys:number=0;
    private bell:MovieClip;
    public constructor(){
        super();
        this.createView();
        this.addEventListsner(egret.EnterFrame,this.enterFrame);
    }
    private createView():void
    {
        var dataBell = RES.getRes("bellmc_json");//获取描述
        var textureBell = RES.getRes("bellmc_png");//获取大图
        bell = new egret.MovieClip(dataBell,textureBell);//创建电影剪辑
        this.addChild(bell);//添加到显示列表
        bell.frameRate = 30;//设置动画的帧频
        bell.x = 100;
        bell.y = 100;
//        monkey.scaleX=-1;
        bell.gotoAndPlay("bell");
        
        ys=Data.bellspeed;
    }
    private enterFrame(event:egret.Event):void
    {
        this.bell.y+=ys;
        if(hit)
        {
            Data.bells.remove(this.bell);
            this.bell.gotoAndPlay("hit");
        }else if(this.y>300){
            this.bell.alpha-=0.1;
            if(this.bell.alpha<0)
            {
                Data.bells.remove(this.bell);
                this.removeChild(this.bell);
            }
        }
    }
}
