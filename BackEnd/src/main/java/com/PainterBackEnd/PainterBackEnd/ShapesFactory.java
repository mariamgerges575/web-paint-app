package com.PainterBackEnd.PainterBackEnd;

import java.util.Vector;

public class ShapesFactory {

    public Shapes makeShape(boolean deleted,String type, String ID, double x, double y, double width, double height, String colour, String strokeColor, double rotation, double scaleY, double scaleX, boolean is_cloned, double radius, double radiusX, double radiusY, Vector<Double> points){
        if(type.equals("circle")){
            return new Circle(deleted,type,ID,x,y,width,height,colour,strokeColor,rotation,scaleY,scaleX,true,radius);
        }
        else if (type.equals("rectangle")) {
            return new Rectangle(deleted,type,ID,x,y,width,height,colour,strokeColor,rotation,scaleY,scaleX,true);
        }
        else if (type.equals("triangle")) {
            return new Triangle(deleted,type,ID,x,y,width,height,colour,strokeColor,rotation,scaleY,scaleX,true,radius);
        }
        else if (type.equals("ellipse")) {
            return new Ellipse(deleted,type,ID,x,y,width,height,colour,strokeColor,rotation,scaleY,scaleX,true,radiusX,radiusY);
        }
        else if (type.equals("square")) {
            return new Square(deleted,type,ID,x,y,width,height,colour,strokeColor,rotation,scaleY,scaleX,true);
        }
        else if (type.equals("lineSegment")) {
            return new LineSegment(deleted,type,ID,x,y,width,height,colour,strokeColor,rotation,scaleY,scaleX,true,points);
        }
        else if (type.equals("freeDrawing")) {
            return new FreeDrawing(deleted,type,ID,x,y,width,height,colour,strokeColor,rotation,scaleY,scaleX,true,points);
        }
        return null;
    }
}
