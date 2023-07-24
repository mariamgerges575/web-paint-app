package com.PainterBackEnd.PainterBackEnd;

public class Rectangle extends Shapes {
    public Rectangle(boolean deleted,String type, String ID, double x, double y, double width, double height, String colour, String strokeColor, double rotation, double scaleY, double scaleX, boolean is_cloned) {
        super(deleted,type, ID, x, y, width, height, colour, strokeColor, rotation, scaleY, scaleX, is_cloned);
    }

    @Override
    public Rectangle cloneShape(){
        Rectangle copy = new Rectangle(this.deleted,this.type,this.id,this.x,this.y,this.width,
                this.height,this.colour,this.strokeColor,this.rotation,this.scaleY,this.scaleX,this.is_cloned);

        copy.wasdeleted=this.wasdeleted;
        return copy;
    }
}
