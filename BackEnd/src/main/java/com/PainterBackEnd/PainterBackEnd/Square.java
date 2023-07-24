package com.PainterBackEnd.PainterBackEnd;

public class Square extends Shapes{

    public Square(boolean deleted,String type, String ID, double x, double y, double width, double height, String colour, String strokeColor, double rotation, double scaleY, double scaleX, boolean is_cloned) {
        super(deleted,type, ID, x, y, width, height, colour, strokeColor, rotation, scaleY, scaleX, is_cloned);
    }

    @Override
    public Square cloneShape(){
        Square copy = new Square(this.deleted,this.type,this.id,this.x,this.y,this.width,this.height,this.colour,this.strokeColor,this.rotation,this.scaleY,this.scaleX,this.is_cloned);
        copy.wasdeleted=this.wasdeleted;
        return copy;
    }
}
