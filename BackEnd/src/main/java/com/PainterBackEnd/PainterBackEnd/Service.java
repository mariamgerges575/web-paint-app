package com.PainterBackEnd.PainterBackEnd;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;
import java.util.Vector;
import java.util.Stack;
import java.beans.XMLEncoder;
import java.beans.XMLDecoder;
import java.util.concurrent.ThreadLocalRandom;

public class Service {
    public Stack<Shapes> undo = new Stack<Shapes>();
    public Stack<Shapes> redo = new Stack<Shapes>();
    public Vector<Shapes> drawing = new Vector<Shapes>();
    ShapesFactory factory = new ShapesFactory();


    public RestShape ObjToRest(Shapes s1) {
        RestShape rest = new RestShape();
        rest.setType(s1.getType());
        rest.setId(s1.getId());
        rest.setX(s1.getX());
        rest.setY(s1.getY());
        rest.setWidth(s1.getWidth());
        rest.setHeight(s1.getHeight());
        rest.setColour(s1.getColour());
        rest.setStrokeColor(s1.getStrokeColor());
        rest.setRotation(s1.getRotation());
        rest.setScaleX(s1.getScaleX());
        rest.setScaleY(s1.getScaleY());
        rest.setIs_cloned(s1.isIs_cloned());
        rest.setDeleted(s1.isDeleted());
        if ((s1 instanceof Circle)) {
            rest.setRadius(((Circle) s1).getRadius());
        } else if (s1 instanceof Triangle) {
            rest.setRadius(((Triangle) s1).getRadius());
        } else if (s1 instanceof Ellipse) {
            rest.setRadiusX(((Ellipse) s1).getRadiusX());
            rest.setRadiusY(((Ellipse) s1).getRadiusY());
        } else if (s1 instanceof LineSegment) {
            rest.setPoints(((LineSegment) s1).getPoints());
        } else if (s1 instanceof FreeDrawing) {
            rest.setPoints(((FreeDrawing) s1).getPoints());
        }
        return rest;
    }

    public Vector<RestShape> ObjectsToRest() {
        Vector<RestShape> restShapes = new Vector<RestShape>();
        for (int i = 0; i < this.drawing.size(); i++) {
            restShapes.addElement(ObjToRest(this.drawing.elementAt(i)));
        }
        return restShapes;
    }

   

    public void add_edit(Shapes shape){
        int index=-1;
        redo.removeAllElements();
        for(int i=this.drawing.size()-1;i>=0;i--){
            if(shape.getId().equals(this.drawing.elementAt(i).getId())){
                index=i;
                break;
            }
        }
        if(index>=0){
            this.drawing.setElementAt(shape.cloneShape(),index);
            this.undo.push(shape.cloneShape());
            this.redo.removeAllElements();
        }
    }

    public void add_new(Shapes shape){
        undo.push(shape.cloneShape());
        drawing.addElement(shape.cloneShape());
        redo.removeAllElements();
    }

    public RestShape undo_function(){
        if(undo.size()==0){
            return new RestShape();
        }

        else if (undo.peek().deleted){
            redo.push(undo.peek().cloneShape());
            redo.peek().deleted=false;
            redo.peek().wasdeleted=true;
            drawing.addElement(redo.peek().cloneShape());
            undo.pop();
            RestShape x=ObjToRest(redo.peek());
            System.out.println(x.isDeleted());
            return ObjToRest(redo.peek());
        }
        else {
            int index = -1;
            for (int i = undo.size() - 2; i >= 0; i--) {
                if (Objects.equals(undo.peek().getId(), undo.elementAt(i).getId())) {
                    index = i;
                    break;
                }
            }
            int indexDrawing=-1;
            for(int i=drawing.size()-1;i>=0;i--){
                if(Objects.equals(undo.peek().getId(), drawing.elementAt(i).getId())){
                    indexDrawing=i;
                    break;
                }
            }
            if(index==-1 && indexDrawing!=-1 || undo.peek().wasdeleted){
                drawing.removeElementAt(indexDrawing);
                redo.push(undo.pop().cloneShape());
                redo.peek().wasdeleted=false;
                redo.peek().deleted=true;
                return ObjToRest(redo.peek().cloneShape());
            }
            else if (index==-1 && indexDrawing!=-1){
                redo.push(undo.pop());
                return ObjToRest(drawing.elementAt(indexDrawing));
            }
            else{
                drawing.removeElementAt(indexDrawing);
                drawing.addElement(undo.elementAt(index).cloneShape());
                redo.push(undo.pop().cloneShape());
                return ObjToRest(undo.elementAt(index));
            }
        }
    }

    public RestShape redo_function() {

        if (redo.size() == 0) {
            return new RestShape();
        }
        else if (redo.peek().deleted) {
            undo.push(redo.peek().cloneShape());
            undo.peek().wasdeleted=true;
            undo.peek().deleted = false;
            drawing.addElement(redo.pop().cloneShape());
            return ObjToRest(undo.peek());
        }
        else {
            int index = -1;
            for (int i = redo.size() - 2; i >= 0; i--) {
                if (Objects.equals(redo.peek().getId(), redo.elementAt(i).getId())) {
                    index = i;
                    break;
                }
            }
            int indexDrawing=-1;
            for(int i=drawing.size()-1;i>=0;i--){
                if(Objects.equals(redo.peek().getId(), drawing.elementAt(i).getId())){
                    indexDrawing=i;
                    break;
                }
            }
            if(redo.peek().wasdeleted){
                drawing.removeElementAt(indexDrawing);
                undo.push(redo.pop().cloneShape());
                undo.peek().wasdeleted=false;
                undo.peek().deleted=true;
                return ObjToRest(undo.peek().cloneShape());


            }
            else if(indexDrawing!=-1 && index!=-1 || index == -1 && indexDrawing!=-1){
                drawing.removeElementAt(indexDrawing);
                drawing.addElement(redo.peek().cloneShape());
                undo.push(redo.peek().cloneShape());
                return ObjToRest(redo.pop());
            }
            else if (index==-1 && indexDrawing==-1){
                System.out.println("heheheh");
                undo.push(redo.peek().cloneShape());
                undo.peek().deleted=false;
                undo.peek().wasdeleted=true;
                drawing.addElement(undo.peek().cloneShape());
                return ObjToRest(redo.peek());

            }
            else {
                System.out.println("ana hna ya hbla");
                drawing.addElement(redo.peek().cloneShape());
                undo.push(redo.pop().cloneShape());
                return ObjToRest(redo.pop());
            }
        }
    }

    public void delete_object(String id){
        int indexDrawing=-1;
        for(int i=drawing.size()-1;i>=0;i--) {
            if (Objects.equals(drawing.elementAt(i).getId(), id)) {
                indexDrawing = i;
                break;
            }
        }
        System.out.println(indexDrawing);
        undo.push(drawing.elementAt(indexDrawing).cloneShape());
        undo.peek().deleted=true;
        if(drawing.size()!=0)
            drawing.removeElementAt(indexDrawing);
    }

public String saveXML_function(String path,String name){
    try {
        if(Files.isDirectory(Path.of(path))){
            FileOutputStream file = new FileOutputStream(new File((String) path +name+ ".xml"));
            PrintWriter writer = new PrintWriter(file);
            writer.print("");
            XMLEncoder encoder = new XMLEncoder(file);
            Integer n = drawing.size();
            encoder.writeObject(n);
            for (int i = 0; i < drawing.size(); i++) {
                encoder.writeObject(ObjToRest(drawing.elementAt(i)));
            }
            encoder.close();
            file.close();
            return "okay";
        }
        else {
            return "null";
        }
    }
    catch (IOException ex) {
        ex.printStackTrace();
        return "null";
    }
}


    public Vector<RestShape> loadXML_function(String path){
        try {
            if(Files.exists(Path.of(path+ ".xml"))) {
                FileInputStream file = new FileInputStream(new File((String) path+ ".xml"));
                XMLDecoder decoder = new XMLDecoder(file);
                drawing.removeAllElements();
                undo.removeAllElements();
                redo.removeAllElements();
                Integer n = (Integer) decoder.readObject();
                for (int i = 0; i < n; i++) {
                    RestShape shape = (RestShape) decoder.readObject();
                    Shapes newShape = factory.makeShape(false, shape.getType(), shape.getId(), shape.getX(), shape.getY(), shape.getWidth(), shape.getHeight(), shape.getColour(), shape.getStrokeColor(), shape.getRotation(), shape.getScaleY(), shape.getScaleX(), true, shape.getRadius(), shape.getRadiusX(), shape.getRadiusY(), shape.getPoints());
                    drawing.addElement(newShape.cloneShape());
                }
                decoder.close();
                file.close();
                return ObjectsToRest();
            }
            else {
                return null;
            }
        }
        catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }

    }
    public String saveJSON_function(String path,String name) throws IOException {
        if(Files.isDirectory(Path.of(path))) {

            ObjectMapper mapper = new ObjectMapper();
            String jsonData = mapper.writeValueAsString(ObjectsToRest());
            FileWriter file = new FileWriter(path + name + ".json", false);
            file.write(jsonData);
            file.close();
            return "okay";
        }
        else{
            return null;
        }
    }


    
    public Vector<RestShape> loadJSON_function(String path) {
        JSONParser jsonP = new JSONParser();
        try {
            if(Files.exists(Path.of(path+".json"))) {
                FileReader reader = new FileReader(path +".json");
                Vector<RestShape> restShapes = new Vector<RestShape>();
                this.drawing.removeAllElements();
                this.undo.removeAllElements();
                this.redo.removeAllElements();
                Object obj = jsonP.parse(reader);
                JSONArray shapeList = (JSONArray) obj;
                shapeList.forEach(shape -> parseShape((JSONObject) shape, restShapes));
                return restShapes;
            }
            else {
                return null;
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
    public void parseShape(JSONObject shapes,Vector<RestShape> restShapes) {
        RestShape restShape = new RestShape();
        restShape.setIs_cloned((boolean) shapes.get("is_cloned"));
        restShape.setRotation((double) shapes.get("rotation"));
        restShape.setType((String) shapes.get("type"));
        restShape.setScaleX((double) shapes.get("scaleX"));
        restShape.setScaleY((double) shapes.get("scaleY"));
        restShape.setColour((String) shapes.get("colour"));
        restShape.setX((double) shapes.get("x"));
        restShape.setWidth((double) shapes.get("width"));
        restShape.setRadiusY((double) shapes.get("radiusY"));
        restShape.setY((double) shapes.get("y"));
        restShape.setRadiusX((double) shapes.get("radiusX"));
        restShape.setId((String) shapes.get("id"));
        restShape.setStrokeColor((String) shapes.get("strokeColor"));
        restShape.setRadius((double) shapes.get("radius"));
        restShape.setHeight((double) shapes.get("height"));
        JSONArray points =(JSONArray) shapes.get("points");
        restShape.setDeleted((boolean) shapes.get("deleted"));
        if(points!=null) {
            Vector<Double> temp = new Vector<Double>();
            for (int i = 0; i < points.size(); i++) {
                temp.addElement((Double) points.get(i));
            }
            restShape.setPoints(temp);
        }
        Shapes newShape = this.factory.makeShape(restShape.isDeleted(),restShape.getType(),restShape.getId(),restShape.getX(),restShape.getY(),restShape.getWidth(),restShape.getHeight(),restShape.getColour(),restShape.getStrokeColor(),restShape.getRotation(),restShape
                .getScaleY(),restShape.getScaleX(),restShape.isIs_cloned(),restShape.getRadius(),restShape.getRadiusX(),restShape.getRadiusY(),restShape.getPoints());
        this.drawing.addElement(newShape.cloneShape());
        restShapes.addElement(restShape);
    }


}

