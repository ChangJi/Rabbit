/**
 * Created by a4090_000 on 2014/8/16.
 */
class Snow extends egret.Sprite
{
    private  range:number;
    private  speed:number;
    private  startx:number;
    private  xs:number;
    private  ys:number;

    private snow:egret.Bitmap;
    public isRemove:boolean = false;
    public constructor(){
        super();
        this.createView();
    }
    private createView():void
    {
        this.snow = ResUtils.createBitmapByName("snow_png");
        this.addChild(this.snow);
        this.range = 0.500000 + Math.random()*5 / 10;
        this. speed =  0.020000 + Math.random()*2 / 100;
        this. startx = this.snow.x;
        this. xs = this.range;
        if(Math.random()*100>50){
            this.xs = -this.xs;
        }
        this.ys = 1.0000000 + Math.random();
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    }
    private enterFrameHandler(event:egret.Event):void {
        this.snow.x=this.snow.x+this.xs;
        if(this.snow.x>this.startx)
        {
            this.xs=Math.max(this.xs-this.speed, -this.range)
        }else{
            this.xs=Math.min(this.xs+this.speed, this.range)
        }
        this.snow.y=this.snow.y+this.ys;
        if(this.snow.y>600){
            this.removeChild(this.snow);
            this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
            this.isRemove=true;
        }
    }
}


//range = 0.500000 + random(5) / 10;
//speed = 0.020000 + random(4) / 100;
//startx = _x;
//xs = range;
//if (random(100) > 50)
//{
//    xs = -xs;
//} // end if
//ys = 1.500000 + random(10) / 10;
//onenterframe = function ()
//{
//    setProperty("", _x, _x + xs);
//    if (_x > startx)
//    {
//        xs = math.max(xs - speed, -range);
//    }
//    else
//    {
//        xs = math.min(xs + speed, range);
//    } // end else if
//    setProperty("", _y, _y + ys);
//    if (_y > -r.ynow + 600)
//    {
//        this.removeMovieClip();
//    } // end if
//};
