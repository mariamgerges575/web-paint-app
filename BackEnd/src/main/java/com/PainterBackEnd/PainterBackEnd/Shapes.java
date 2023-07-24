package com.PainterBackEnd.PainterBackEnd;

public abstract class Shapes {
    protected String type;
    protected String id;
    protected double x;
    protected double y;
    protected double width;
    protected double height;
    protected String colour;
    protected String strokeColor;
    protected double rotation;
    protected double scaleY;
    protected double scaleX;
    protected boolean is_cloned;

    protected boolean deleted;
    protected boolean wasdeleted;


    public Shapes(boolean deleted,String type, String ID, double x, double y, double width, double height, String colour, String strokeColor, double rotation, double scaleY, double scaleX, boolean is_cloned) {
        this.type = type;
        this.id = ID;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.strokeColor = strokeColor;
        this.rotation = rotation;
        this.scaleY = scaleY;
        this.scaleX = scaleX;
        this.is_cloned = is_cloned;
        this.deleted=deleted;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getStrokeColor() {
        return strokeColor;
    }

    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    public double getRotation() {
        return rotation;
    }

    public void setRotation(double rotation) {
        this.rotation = rotation;
    }

    public double getScaleY() {
        return scaleY;
    }

    public void setScaleY(double scaleY) {
        this.scaleY = scaleY;
    }

    public double getScaleX() {
        return scaleX;
    }

    public void setScaleX(double scaleX) {
        this.scaleX = scaleX;
    }

    public boolean isIs_cloned() {
        return is_cloned;
    }

    public void setIs_cloned(boolean is_cloned) {
        this.is_cloned = is_cloned;
    }

    public Shapes cloneShape(){
        return null;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
