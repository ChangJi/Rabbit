/**
 * Created by a4090_000 on 2014/8/23.
 */
class Bell extends egret.Sprite
{
    public hit:Boolean=false;
    private ys:number=0;
    private bell:egret.MovieClip;
    public isRemove:boolean=false;
    public constructor(){
        super();
        this.createView();
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    }
    private createView():void
    {
        var dataBell = RES.getRes("bellmc_json");//获取描述
        var textureBell = RES.getRes("bellmc_png");//获取大图
        this.bell = new egret.MovieClip(dataBell,textureBell);//创建电影剪辑
        this.addChild(this.bell);//添加到显示列表
        this.bell.frameRate = 30;//设置动画的帧频
        this.bell.gotoAndPlay("bell");

        this.ys=RabbitData.bellspeed;
    }
    private enterFrameHandler(event:egret.Event):void
    {
        this.bell.y+=this.ys;
        if(this.hit)
        {
//           RabbitData.bells.splice()
            this.bell.gotoAndPlay("hit");
        }else if(this.bell.y>300){
            this.bell.alpha-=0.5;
            if(this.bell.alpha<0)
            {
                this.isRemove=true;
//               RabbitData.bells.remove(this.bell);
                if(this.bell.parent)
                    this.bell.parent.removeChild(this.bell);
            }
        }
    }
}
