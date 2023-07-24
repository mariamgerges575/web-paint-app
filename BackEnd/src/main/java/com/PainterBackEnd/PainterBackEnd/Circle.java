package com.PainterBackEnd.PainterBackEnd;

public class Circle extends Shapes {

    protected double radius;
    public Circle(boolean deleted,String type, String ID, double x, double y, double width, double height,
                  String colour, String strokeColor, double rotation, double scaleY, double scaleX, boolean is_cloned,double radius) {
        super(deleted,type, ID, x, y, width, height, colour, strokeColor, rotation, scaleY, scaleX, is_cloned);
        this.radius = radius;
    }
    @Override
    public Circle cloneShape(){
        Circle copy = new Circle(this.deleted,this.type,this.id,this.x,this.y,this.width,this.height,this.colour,this.strokeColor,this.rotation,this.scaleY,this.scaleX,this.is_cloned,this.radius);
        copy.wasdeleted=this.wasdeleted;
        return copy;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
