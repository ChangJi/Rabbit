/**
 * Created by a4090_000 on 2014/8/24.
 */
class GameUtils{
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public static hitTest(obj1:egret.DisplayObject,obj2:Bell):boolean
    {
        var rect1:egret.Rectangle = obj1.getBounds();
        var rect2:egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;

        var p:egret.Point=obj2.localToGlobal(obj2.bell.x,obj2.bell.y);
        rect2.x = p.x;
        rect2.y = p.y;
        return rect1.intersects(rect2);
    }
}
