/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class GameApp extends egret.DisplayObjectContainer{

//    /**
//     * 加载进度界面
//     */
//    private loadingView:LoadingUI;

    private snows:Snow[];
    private rabbit:Rabbit;
    private Vy:number=0;
    private mouseX:number=0;
    private yLand:number=0;
    private oldX:number=0;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
//        //设置加载进度界面
//        this.loadingView  = new LoadingUI();
//        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
//          this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);

            egret.Profiler.getInstance().run(); //FPS等信息
            this.createGameScene();
            this.touchEnabled=true;
            this.touchChildren=true;
            this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rabbitMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.rabbitBegin,this);
//            this.addEventListener(egret.TouchEvent.TOUCH_END,this.rabbitEnd,this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.rabbitDrag,this);
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
//            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    private rabbitMove(event:egret.TouchEvent):void
    {
        if(event.type==egret.TouchEvent.TOUCH_TAP)
        {
//            alert(event.localX+"...................."+event.localY);
            if(this.rabbit.jump==false&&event.localY<300)
            {
                this.rabbit.jump = true;
                this.Vy = RabbitData.jumppower;
            }
        }
    }
    private rabbitBegin(event:egret.TouchEvent):void
    {
        if(event.type==egret.TouchEvent.TOUCH_BEGIN)
        {
            this.mouseX=event.localX;
        }
    }
//    private rabbitEnd(event:egret.TouchEvent):void
//    {
//        if(event.type==egret.TouchEvent.TOUCH_END)
//        {
//            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.rabbitDrag,this);
//        }
//    }
    private rabbitDrag(event:egret.TouchEvent):void
    {
        if(event.type==egret.TouchEvent.TOUCH_MOVE)
        {
            this.mouseX=event.localX;
        }
    }
    private frame:number=0;
    private bellFrame:number=0;
    private head:number=1;
    private enterFrameHandler( event:egret.Event):void {

        for(var i:number=0;i<this.snows.length;i++)
        {
            var snow:Snow=this.snows[i];
            if(snow.isRemove&&snow.parent)
            {
                snow.parent.removeChild(snow);
                this.snows.splice(i,1);
            }
        }
        for(var j:number=0;j<RabbitData.bells.length;j++)
        {
            var bell:Bell=RabbitData.bells[j];
            if(bell.isRemove&&bell.parent)
            {
                bell.parent.removeChild(bell);
                RabbitData.bells.splice(j,1);
            }
        }

        this.frame++;
        if(this.frame>12)
        {
            var snow:Snow = new Snow();
            snow.x =  Math.random()*750;
            snow.y = -20;
            snow.scaleX=snow.scaleY=0.3+Math.random()*0.7;
            snow.alpha=0.5+Math.random()*0.5;
            this.addChild(snow);
            this.snows.push(snow);
            this.frame=0;
        }

        this.bellFrame++;
        if(this.bellFrame>60)
        {
            var bell:Bell=Bell.produce("bell");
            bell.x = Math.random()*750;
            bell.y = -20;
            this.addChild(bell);
            RabbitData.bells.push(bell);
            this.bellFrame=0;
        }


        var preAct:String=this.rabbit.act;
        var preHead:number=this.head;

        if(this.rabbit.jump==true){
            if(this.mouseX<this.rabbit.x)
            {
                this.head=2;
            }else if(this.mouseX>this.rabbit.x){
                this.head=1;
            }
            var nx:number=this.rabbit.x + (this.mouseX - this.rabbit.x) / 8;
            nx = Math.max(nx,0);
            nx = Math.min(nx,750);
            this.rabbit.x=nx;
            this.rabbit.act="jump";
            this.Vy=this.Vy+RabbitData.grav;
            var ny:number=this.rabbit.y+this.Vy;
            if(ny<0)
            
            if(ny>this.yLand)
            {
                ny = this.yLand;
                this.Vy = 0;
                this.rabbit.jump = false;
                this.rabbit.act = "run";
            }
            this.rabbit.y=ny;
            var i = 0;
            while (i < RabbitData.bells.length)
            {
                var it:Bell =  RabbitData.bells[i];
                if (GameUtils.hitTest(this.rabbit,it))
                {
//                    alert("..............hit...........");
                    this.Vy = RabbitData.bouncepower;
                    this.rabbit.gotoJumpPlay();
                    it.hit = true;
                }
                ++i;
            }
        }else{
            var oldX:number = this.rabbit.x;
            var newX:number=this.mouseX;
            newX = Math.max(this.mouseX,0);
            newX = Math.min(newX, 750);
            var dx:number =newX - oldX;
            if (Math.abs(dx) > 1)
            {
                if (dx > 0)
                {
                    this.head= 1;
                }
                else
                {
                    this.head = 2;
                }
            }

            if (Math.abs(dx) > 10)  //临界点10 频繁切换问题
            {
                this.rabbit.act = "run";
            }else{
                this.rabbit.act = "stand";
            }
            if (Math.abs(dx) > 15 && this.rabbit.act == "run")  //临界点10 频繁切换问题
            {
                var rabbitX:number;
                if (dx > 0)
                {
                    rabbitX  = this.rabbit.x + RabbitData.pspeed;
                }else if(dx<0){
                    rabbitX = this.rabbit.x - RabbitData.pspeed;
                }else if(dx=0){
                }
//                this.rabbit.act = "run";
                this.rabbit.x = rabbitX;
            }else{
                this.rabbit.act = "stand";
            }

//            if (oldX == this.rabbit.x||this.rabbit.x == 0 || this.rabbit.x == 750)
//            {
//                    this.rabbit.act = "stand";
//            }
        }
        if(preAct!=this.rabbit.act||preHead!=this.head)
        {
            this.rabbit.gotoAndPlay(this.rabbit.act,this.head);
        }

    }
    private textContainer:egret.Sprite;
    /**
     * 创建游戏场景
     */
    private createGameScene():void{

        var sky:egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var length:number = 15+Math.random()*10;
        this.snows=[];
        for(var i:number=0;i<length;i++)
        {
            var snow:Snow = new Snow();
            snow.x =  Math.random()*750;
            snow.y = Math.random()*400;
            snow.scaleX=snow.scaleY=0.3+Math.random()*0.7;
            this.addChild(snow);
            this.snows.push(snow);
        }


        this.rabbit=new Rabbit();
        this.rabbit.x=100;
        this.rabbit.y=345;
        this.addChild(this.rabbit);
        this.mouseX=this.rabbit.x;
        this.yLand=this.rabbit.y;
//        var bell:Bell = new Bell();
//        this.addChild(bell);
//        var data = RES.getRes("standmc_json");//获取描述
//        var texture = RES.getRes("standmc_png");//获取大图
//        var monkey = new egret.MovieClip(data,texture);//创建电影剪辑
//        this.addChild(monkey);//添加到显示列表
//        monkey.frameRate = 30;//设置动画的帧频
//        monkey.x = 100;
//        monkey.y = 365;
////        monkey.scaleX=-1;
//        monkey.gotoAndPlay("stand");
//
//        var dataRun = RES.getRes("runmc_json");
//        var textureRun = RES.getRes("runmc_png");
//        var rabbitRun = new egret.MovieClip(dataRun,textureRun);
//        this.addChild(rabbitRun);
//        rabbitRun.frameRate = 30;
//        rabbitRun.x = 100;
//        rabbitRun.y = 345;
//        rabbitRun.gotoAndPlay("runmc");

//        var topMask:egret.Shape = new egret.Shape();
//        topMask.graphics.beginFill(0x000000, 0.5);
//        topMask.graphics.drawRect(0, 0, stageW, stageH);
//        topMask.graphics.endFill();
//        topMask.width = stageW;
//        topMask.height = stageH;
//        this.addChild(topMask);
//
//        var icon:egret.Bitmap = this.createBitmapByName("egretIcon");
//        icon.anchorX = icon.anchorY = 0.5;
//        this.addChild(icon);
//        icon.x = stageW / 2;
//        icon.y = stageH / 2 - 60;
//        icon.scaleX = 0.55;
//        icon.scaleY = 0.55;
//
//        var colorLabel:egret.TextField = new egret.TextField();
//        colorLabel.x = stageW / 2;
//        colorLabel.y = stageH / 2 + 50;
//        colorLabel.anchorX = colorLabel.anchorY = 0.5;
//        colorLabel.textColor = 0xffffff;
//        colorLabel.textAlign = "center";
//        colorLabel.text = "Hello Egret";
//        colorLabel.size = 20;
//        this.addChild(colorLabel);
//
//        var textContainer:egret.Sprite = new egret.Sprite();
//        textContainer.anchorX = textContainer.anchorY = 0.5;
//        this.addChild(textContainer);
//        textContainer.x = stageW / 2;
//        textContainer.y = stageH / 2 + 100;
//        textContainer.alpha = 0;
//
//        this.textContainer = textContainer;
//
//        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
//        RES.getResAsync("description",this.startAnimation,this)
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
//    /**
//     * 描述文件加载成功，开始播放动画
//     */
//    private startAnimation(result:Array<any>):void{
//        var textContainer:egret.Sprite = this.textContainer;
//        var count:number = -1;
//        var self:any = this;
//        var change:Function = function() {
//            count++;
//            if (count >= result.length) {
//                count = 0;
//            }
//            var lineArr = result[count];
//
//            self.changeDescription(textContainer, lineArr);
//
//            var tw = egret.Tween.get(textContainer);
//            tw.to({"alpha":1}, 200);
//            tw.wait(2000);
//            tw.to({"alpha":0}, 200);
//            tw.call(change, this);
//        }
//
//        change();
//    }
    /**
     * 切换描述内容
     */
//    private changeDescription(textContainer:egret.Sprite, lineArr:Array<any>):void {
//        textContainer.removeChildren();
//        var w:number = 0;
//        for (var i:number = 0; i < lineArr.length; i++) {
//            var info:any = lineArr[i];
//            var colorLabel:egret.TextField = new egret.TextField();
//            colorLabel.x = w;
//            colorLabel.anchorX = colorLabel.anchorY = 0;
//            colorLabel.textColor = parseInt(info["textColor"]);
//            colorLabel.text = info["text"];
//            colorLabel.size = 40;
//            textContainer.addChild(colorLabel);
//
//            w += colorLabel.width;
//        }
//    }
}


