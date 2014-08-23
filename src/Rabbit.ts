/**
 * Created by a4090_000 on 2014/8/17.
 */
class Rabbit extends egret.Sprite{
    private rabbitContainer:egret.Sprite;
    public act:String="";
    public jump:boolean=false;
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
        var rabbitStand = new egret.MovieClip(dataStand,textureStand);//创建电影剪辑
        this.rabbitContainer.addChild(rabbitStand);//添加到显示列表
        rabbitStand.frameRate = 30;//设置动画的帧频
        rabbitStand.x = 100;
        rabbitStand.y = 365;
//        monkey.scaleX=-1;
        rabbitStand.gotoAndPlay("stand");

        var dataRun = RES.getRes("runmc_json");
        var textureRun = RES.getRes("runmc_png");
        var rabbitRun = new egret.MovieClip(dataRun,textureRun);
        this.rabbitContainer.addChild(rabbitRun);
        rabbitRun.frameRate = 30;
        rabbitRun.x = 100;
        rabbitRun.y = 345;
        rabbitRun.gotoAndPlay("runmc");
    }
    //head 2正 1反
    public function gotoAndPlay(act:String,head:number):void
    {
        this.rabbitContainer.removeAllChild();
        if(head==2)
        {
            this.rabbitContainer.scaleX=1;
        }else{
            this.rabbitContainer.scaleX=-1;
        }
        switch(act)
        {
            case "stand":
                {
                    
                }
            
        }
        
        
    }
}
