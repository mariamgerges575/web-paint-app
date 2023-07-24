package com.PainterBackEnd.PainterBackEnd;

public class Ellipse extends Shapes {
    protected double radiusX;
    protected double radiusY;

    public Ellipse(boolean deleted,String type, String ID, double x, double y, double width, double height, String colour, String strokeColor, double rotation, double scaleY, double scaleX, boolean is_cloned,double radiusX,double radiusY) {
        super(deleted,type, ID, x, y, width, height, colour, strokeColor, rotation, scaleY, scaleX, is_cloned);
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }
    @Override
    public Ellipse cloneShape(){
        Ellipse copy = new Ellipse(this.deleted,this.type,this.id,this.x,this.y,this.width,this.height,this.colour,this.strokeColor,this.rotation,this.scaleY,this.scaleX,this.is_cloned,this.radiusX,this.radiusY);
        copy.wasdeleted=this.wasdeleted;
        return copy;
    }

    public double getRadiusX() {
        return radiusX;
    }

    public void setRadiusX(double radiusX) {
        this.radiusX = radiusX;
    }

    public double getRadiusY() {
        return radiusY;
    }

    public void setRadiusY(double radiusY) {
        this.radiusY = radiusY;
    }
}
