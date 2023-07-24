package com.PainterBackEnd.PainterBackEnd;

import java.util.Vector;

public class LineSegment extends Shapes{
    protected Vector<Double> points;
    LineSegment(boolean deleted,String type, String ID, double x, double y, double width, double height, String colour, String strokeColor, double rotation, double scaleY, double scaleX, boolean is_cloned, Vector<Double> points){
        super(deleted,type, ID, x, y, width, height, colour, strokeColor, rotation, scaleY, scaleX, is_cloned);
        this.points = points;
    }

    @Override
    public LineSegment cloneShape(){
        LineSegment copy = new LineSegment(this.deleted,this.type,this.id,this.x,this.y,this.width,this.height,this.colour,this.strokeColor,this.rotation,this.scaleY,this.scaleX,this.is_cloned,this.points);
        copy.wasdeleted=this.wasdeleted;
        return copy;
    }

    public Vector<Double> getPoints() {
        return points;
    }

    public void setPoints(Vector<Double> points) {
        this.points = points;
    }
}
