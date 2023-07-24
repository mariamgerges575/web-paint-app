package com.PainterBackEnd.PainterBackEnd;

import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Vector;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/painter")
public class Controller {
    ShapesFactory shapesFactory = new ShapesFactory();
    Service service = new Service();

    @PostMapping("/draw")
    @ResponseBody
    public void getShape( @RequestBody @NotNull RestShape shape){
        System.out.println("1");
        Shapes newShape = shapesFactory.makeShape(false,shape.getType(),shape.getId(),shape.getX(),shape.getY(),shape.getWidth(),shape.getHeight(),shape.getColour(),shape.getStrokeColor(),shape.getRotation(),shape.getScaleY(),shape.getScaleX(),true,shape.getRadius(),shape.getRadiusX(),shape.getRadiusY(),shape.getPoints());
        service.add_new(newShape);
    }

    @PostMapping("/edit")
    @ResponseBody
    public void editShape(@RequestBody @NotNull RestShape shape){
        System.out.println("2");
        Shapes newShape = shapesFactory.makeShape(false,shape.getType(),shape.getId(),shape.getX(),shape.getY(),shape.getWidth(),shape.getHeight(),shape.getColour(),shape.getStrokeColor(),shape.getRotation(),shape.getScaleY(),shape.getScaleX(),true,shape.getRadius(),shape.getRadiusX(),shape.getRadiusY(),shape.getPoints());
        service.add_edit(newShape);
    }

    @GetMapping("/undo")
    @ResponseBody
    public RestShape undo(){
        System.out.println("3");
        return service.undo_function();
    }
    @GetMapping("/redo")
    @ResponseBody
    public RestShape redo(){
        System.out.println("4");
        return service.redo_function();
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete_shape(@RequestBody String id){
        System.out.println("5");
        service.delete_object(id);

    }
    @GetMapping("/save/xml")
    public String save(@RequestParam("path") String path,@RequestParam("filename") String filname){
        System.out.println("6");
        String ret=service.saveXML_function(path,filname);
        return ret;

    }
    @GetMapping("/load/xml")
    public Vector<RestShape> load(@RequestParam("p") String path){
        System.out.println("7");
        return service.loadXML_function(path);
    }

    @GetMapping("/load/json")
    public Vector<RestShape> loadDrawingJSON(@RequestParam("p") String path){
        System.out.println("8");
        return service.loadJSON_function(path);
    }
    
    @GetMapping("/save/json")
    public String saveDrawingJSON(@RequestParam("path") String path,@RequestParam("filename") String filename){
        System.out.println("9");
        try {
            String res=service.saveJSON_function(path,filename);
            return res;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping("/clear")
    @ResponseBody
    public void clear(){
        System.out.println("10");
        service.drawing.removeAllElements();
        service.undo.removeAllElements();
        service.redo.removeAllElements();
    }

}
