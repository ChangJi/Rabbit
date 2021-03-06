/**
 * Created by a4090_000 on 2014/8/17.
 */
class Rabbit extends egret.Sprite{
    private rabbitContainer:egret.Sprite;
    public act:String="";
    public jump:boolean=false;

    private rabbitStand:egret.MovieClip;
    private rabbitRun:egret.MovieClip;
    private rabbitJump:egret.MovieClip;
    public constructor(){
        super();
        this.createView();
    }

    private createView():void
    {
        this.rabbitContainer = new egret.Sprite();
        this.addChild(this.rabbitContainer);

        var dataStand = RES.getRes("standmc_json");//获取描述
        var textureStand = RES.getRes("standmc_png");//获取大图
        this.rabbitStand = new egret.MovieClip(dataStand,textureStand);//创建电影剪辑
        this.rabbitContainer.addChild(this.rabbitStand);//添加到显示列表
        this.rabbitStand.frameRate = 30;//设置动画的帧频
        this.rabbitStand.x = 0;
        this.rabbitStand.y = 20;
//        monkey.scaleX=-1;
        this.rabbitStand.gotoAndPlay("stand");

        var dataRun = RES.getRes("runmc_json");
        var textureRun = RES.getRes("runmc_png");
        this.rabbitRun = new egret.MovieClip(dataRun,textureRun);
        this.rabbitContainer.addChild(this.rabbitRun);
        this.rabbitRun.frameRate = 30;
        this.rabbitRun.x = 0;
        this.rabbitRun.y = 0;
        this.rabbitRun.gotoAndPlay("runmc");

        var dataJump = RES.getRes("jumpmc_json");
        var textureJump = RES.getRes("jumpmc_png");
        this.rabbitJump = new egret.MovieClip(dataJump,textureJump);
        this.rabbitContainer.addChild(this.rabbitJump);
        this.rabbitJump.frameRate = 30;
        this.rabbitJump.x = 0;
        this.rabbitJump.y = 0;
        this.rabbitJump.gotoAndPlay("jump");
    }
    //head 2正 1反 /
    public gotoAndPlay(act:String,head:number):void
    {
        this.rabbitStand.visible=false;
        this.rabbitRun.visible=false;
        this.rabbitJump.visible=false;
        if(head==2)
        {
            this.rabbitContainer.scaleX=-1;
        }else{
            this.rabbitContainer.scaleX=1;
        }

        switch(act)
        {
            case "stand":
            {
//                this.rabbitContainer.addChild(this.rabbitStand);
                this.rabbitStand.visible=true;
                break;
            }
            case "run":
            {
//                this.rabbitContainer.addChild(this.rabbitRun);
                this.rabbitRun.visible=true;
                break;
            }
            case "jump":
            {
//                this.rabbitContainer.addChild(this.rabbitJump);
                this.rabbitJump.visible=true;
                break;
            }
        }
    }
    public gotoJumpPlay()
    {
        this.rabbitJump.gotoAndPlay("jump");
    }
}
