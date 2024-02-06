import Konva from 'konva';
import { Component, OnInit } from '@angular/core';
import { Stage, stages } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { Shape } from './app.shape';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from './app.interface';
import { KonvaNodeEvent } from 'konva/lib/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paint';
  
  stage!: Stage;
  layer!: Layer;
  tr!:Konva.Transformer;
  //Maps
  createdShapes_map_konva=new Map();
  createdShapes_map=new Map();
  //variables
  current_Id:any=0 //to generate new IDs
  selected_shape_prev_properties:number[]=[]; //to compare the selected shape properties before and after 
  selected_object_ID:any; 
  copyObj:any; //holds the copied object
  //properties
  colour:any='transparent';
  stroke_colour:any='black';
  //booleans
  filling:boolean=false;
  strokingColour:boolean=false;
  is_free_drawing:boolean=false;
  there_is_a_selected_shape:boolean=false;
  is_sth_copied:boolean=false;
  
  // _value=this.fill_input?.value;
  
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    
    
    document.body.style.cursor = "default";
    //konva initializations
    this.stage = new Stage({
      container: 'container',
      width: 1160,
      height: 570
    });
    this.tr=new Konva.Transformer();
    this.layer = new Layer();
    this.layer.add(this.tr);
    this.stage.add(this.layer);
    
    this.addEventsListener();
    this.initialize_booleans();
  
  }
  initialize_booleans(){
    this.filling=false;
    this.strokingColour=false;
    this.is_free_drawing=false;
    this.there_is_a_selected_shape=false;
    this.is_sth_copied=false;
  }
  change_fill_colour(){
    document.body.style.cursor = "pointer";
    this.colour=(document.getElementById('fill') as HTMLInputElement).value;
    this.tr.nodes([]);                 //deselecting selected items
    this.initialize_booleans();        //setting all booleans with false
    this.kill_free_drawing();
    this.filling=true;      
  }
  change_Stroke_colour(){

    document.body.style.cursor = "pointer";
    this.stroke_colour=(document.getElementById('fill') as HTMLInputElement).value;
    this.tr.nodes([]);                  //deselecting selected items
    this.initialize_booleans();         //setting all booleans with false
    this.kill_free_drawing();
    this.strokingColour=true;
  }

  stop_colour(){
    document.body.style.cursor = "default";
    // this.filling=false;
    this.strokingColour=false;
    this.is_sth_copied=false;
    this.colour="transparent";
  }
  
  kill_free_drawing(){
    this.stage.removeEventListener('mousedown');
    this.stage.removeEventListener('mouseup');
    this.stage.removeEventListener('mousemove');
    this.set_dragging(true);
    this.addEventsListener();
    // this.stop_colour();
    this.is_sth_copied=false;
    }
 
  set_dragging(bool:boolean){
    for (let key of this.createdShapes_map_konva.keys())
      this.createdShapes_map_konva.get(key).draggable(bool);
    }

  free_drawing(){
    
    this.is_sth_copied=false;
    this.killEventListeners();     //stop normal event listeners
    this.set_dragging(false);
    this.tr.nodes([]);             //deselect selected shape
    let id_of_freedrawing:number=-1;
    //trace mouse down event
    this.stage.on('mousedown',()=>{
      let pos=this.stage.getPointerPosition();
      if (pos!=null){
        this.is_free_drawing=true;
        id_of_freedrawing=this.current_Id;
        this.shape("freeDrawing",[Math.round(pos.x),Math.round(pos.y)]);
      }
    });
    
    //trace mouse move event
    this.stage.on('mousemove',(e:any)=>{
      if (this.is_free_drawing){
        e.evt.preventDefault();
        let pos=this.stage.getPointerPosition();
        if (pos!=null){
          let new_points_array=this.createdShapes_map_konva.get(String(id_of_freedrawing)).points().concat([Math.round(pos.x),Math.round(pos.y)]);
          this.createdShapes_map_konva.get(String(id_of_freedrawing)).points(new_points_array);
          this.createdShapes_map.get(String(id_of_freedrawing)).update();
        }
      }
    });
  
    this.stage.on('mouseup',()=>{
      //user finished his free drawing shape
      this.parse_into_json(this.createdShapes_map.get(String(id_of_freedrawing)),true);
      this.createdShapes_map_konva.get(String(id_of_freedrawing)).draggable(false)
      // this.kill_free_drawing();
      this.is_free_drawing=false;
    });
  
  }
  eventListeners_for_drawing_positions(id:number,type:any){
    //this function allows the user to draw by holding down the mouse and dragging out a shape
    this.set_dragging(false);
    this.killEventListeners();
    this.kill_free_drawing();
    this.tr.nodes([]);
    let is_there_start_pos=false;
    let xposition:number;
    let yposition:number;
    
    this.stage.on('mousedown',()=>{
      let pos=this.stage.getPointerPosition();
      if (pos!=null){
        if (type!="lineSegment"){
          this.createdShapes_map_konva.get(String(id)).x(pos.x);
          this.createdShapes_map_konva.get(String(id)).y(pos.y);}
        else
          this.createdShapes_map_konva.get(String(id)).points([pos.x,pos.y]);
        xposition=pos.x
        yposition=pos.y;
        is_there_start_pos=true;
      }
    });

    this.stage.on('mousemove',()=>{

      if (is_there_start_pos){
        let pos=this.stage.getPointerPosition();

        if (pos!=null){
          this.set_dragging(false);

          if (type=="circle")
            this.createdShapes_map_konva.get(String(id)).width(2.15*Math.abs(pos.x-xposition));

          else if (type=='rectangle'){
            this.createdShapes_map_konva.get(String(id)).width((pos.x-xposition));
            this.createdShapes_map_konva.get(String(id)).height((pos.y-yposition));}
          
          else if (type=='square'){
            if ((pos.x-xposition)>(pos.y-yposition)){
              this.createdShapes_map_konva.get(String(id)).width((pos.x-xposition));
              this.createdShapes_map_konva.get(String(id)).height((pos.x-xposition));}
            else{
              this.createdShapes_map_konva.get(String(id)).width((pos.y-yposition));
              this.createdShapes_map_konva.get(String(id)).height((pos.y-yposition));}}
          
          else if (type=='triangle'){
            if ((pos.x-xposition)>(pos.y-yposition))
              this.createdShapes_map_konva.get(String(id)).height(2.25*(pos.x-xposition));
            else
              this.createdShapes_map_konva.get(String(id)).height(2.25*(pos.y-yposition));}
          
          else if (type=="lineSegment"){
              let points:number[]=[xposition,yposition,pos.x,pos.y]
              this.createdShapes_map_konva.get(String(id)).points(points);}
          
          else if (type=="ellipse"){
              this.createdShapes_map_konva.get(String(id)).width(2.25*Math.abs(pos.x-xposition));
              this.createdShapes_map_konva.get(String(id)).height(2.25*Math.abs(pos.y-yposition));} 
        }
      }
    });
    this.stage.on('mouseup',()=>{
      
      this.stage.removeEventListener('mousemove');
      this.stage.removeEventListener('mousedown');
      this.stage.removeEventListener('mouseup');
      this.createdShapes_map.get(String(id)).update();
      this.set_dragging(true);
      this.parse_into_json(this.createdShapes_map.get(String(id)),true);
      this.addEventsListener();
    });
  }
  
  killEventListeners(){
    this.stage.removeEventListener('mousedown touchstart');
    this.stage.removeEventListener('mouseup touchstart');
    this.stage.removeEventListener('click tap');
  }

  addEventsListener(){
    const component = this;
    let double_error:boolean=false;
    this.stage.on('click tap', function (e) {
      if (e.target === component.stage) {
        //deselect all shapes when clicking in a blank area
        component.tr.nodes([]);
        component.there_is_a_selected_shape=false;
        return;
      }
      else if (component.filling){
        //fill selected shape
        let current=component.createdShapes_map.get(component.selected_object_ID);
        current.fill_colour(component.colour);
        if (double_error){
        component.parse_into_json(component.createdShapes_map.get(component.selected_object_ID),false);
        double_error=false;
      }
        
      }
      else if (component.strokingColour){
        //change the border of selected shape
        let current=component.createdShapes_map.get(component.selected_object_ID);
        current.stroke_colour(component.stroke_colour);
        if (double_error){
        component.parse_into_json(component.createdShapes_map.get(component.selected_object_ID),false);
      double_error=false;}
      }
      else{
        //if changing colours booleans are false select the shape
        component.tr.nodes([e.target]);
        component.there_is_a_selected_shape=true;
        component.selected_object_ID=e.target.name();}
    })
    
    this.stage.on('mousedown touchstart', function (e) {
      if (e.target === component.stage) {
        component.there_is_a_selected_shape=false;
        
      }
      else if (e.target.name()=="bottom-right _anchor"||e.target.name()=="bottom-left _anchor"||e.target.name()=="bottom-center _anchor"||e.target.name()=="top-center _anchor"||e.target.name()=="top-right _anchor"||e.target.name()=="top-left _anchor"||e.target.name()== "middle-left _anchor"||e.target.name()==  "middle-right _anchor"||e.target.name()=="rotater _anchor"){
        //this condition is for resizing
        //this condition only occurs if a user previously selected a shape by a click so the selected_object_ID is saved
        return;
      }
      else{
        double_error=true;
        
        component.there_is_a_selected_shape=true;
        component.selected_object_ID=e.target.name();
        component.save_previous_properties(e.target.x(),e.target.y(),e.target.width(),e.target.height()); //properties of the shape are saved to be compared with new properties after mouse is up
      }
      
      
    })
    
    this.stage.on('mouseup touchstart', function (e) {

      if (component.there_is_a_selected_shape){
        let create_new_object=component.is_there_a_change(component.createdShapes_map_konva.get(component.selected_object_ID).x(),component.createdShapes_map_konva.get(component.selected_object_ID).y(),component.createdShapes_map_konva.get(component.selected_object_ID).width(),component.createdShapes_map_konva.get(component.selected_object_ID).height());
        if (create_new_object)
        {
          component.createdShapes_map.get(component.selected_object_ID).update();
          component.parse_into_json(component.createdShapes_map.get(component.createdShapes_map_konva.get(component.selected_object_ID).name()),false);
          
        }
      }
    })
    

  }

  parse_into_json(newly_created_object:any,is_new:boolean){
    //this function parses the object into json when creating or editting a shape (as a database or history for our program)
    let _url:string="Http://localhost:8080/painter/draw";;
    if (!is_new)
      _url="Http://localhost:8080/painter/edit";
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(newly_created_object);
    //for debugging
    console.log("parsedIntoJson");
    console.log(newly_created_object.id);
    console.log(body);
    
  }

  clear(send_down:boolean=false,delete_maps:boolean=false){
    
    this.kill_free_drawing()
    this.tr.nodes([]);
    let hwa_mwafe2:boolean=false;
    if (send_down)
      hwa_mwafe2=confirm("if you clear your drawing it can't be undone");

    if (send_down && hwa_mwafe2)
      this.http.post('Http://localhost:8080/painter/clear',{observe:'body',responseType:'json'}).subscribe();
    
    if (hwa_mwafe2 && send_down || !send_down)
    for (let key of this.createdShapes_map_konva.keys()){
      let konva=this.createdShapes_map_konva.get(key);
      konva.remove();
      if (delete_maps){
        this.createdShapes_map.delete(key);
        this.createdShapes_map_konva.delete(key);
      }
    }
  }

  draw(){
    for (let key of this.createdShapes_map_konva.keys()){
      let konva=this.createdShapes_map_konva.get(key);
      this.layer.add(konva);
    }
  }
  
  copy(){
    if (this.there_is_a_selected_shape){
      document.body.style.cursor = "copy";
      this.copyObj=this.createdShapes_map.get(this.selected_object_ID);
      this.is_sth_copied=true;
    }
  }
  paste(){
    if (this.is_sth_copied){    
      let pastedObj=this.copyObj.clone(this.current_Id);
      let konva=pastedObj.create();
      pastedObj.update();
      this.layer.add(konva);
      this.parse_into_json(pastedObj,true);
      this.createdShapes_map.set(String(this.current_Id),pastedObj);
      this.createdShapes_map_konva.set(String(this.current_Id),konva);
      this.layer.add(konva);
      this.current_Id+=1;
    }
  }

  deletee(send_down:boolean=true){
    this.is_sth_copied=false;
    let del=this.createdShapes_map_konva.get(this.selected_object_ID);
    if (send_down)
      del.destroy();
    else
      del.remove();
    this.createdShapes_map_konva.delete(this.selected_object_ID);
    this.createdShapes_map.delete(this.selected_object_ID);
    this.tr.nodes([]);
    this.initialize_booleans();
    if (send_down){
      this.http.post('Http://localhost:8080/painter/delete', String(this.selected_object_ID),{observe:'body',responseType:'json'}).subscribe();
    }
  }

  undo(){
    this.kill_free_drawing()
    const req=this.http.get<data>('Http://localhost:8080/painter/undo',{observe:'body',responseType:'json'});
    req.subscribe(body=>{
      if (body.id!=null){
      if (body.deleted)
      {
        this.selected_object_ID=body.id;
        this.deletee(false);
      }
      else{
      let p=[]
      if (body.points!=null){
        for (let point of body.points){
          p.push(point);}
        }
      
      let obj=new Shape (body.id,body.strokeColor,body.type,p,body.x,body.y,body.width,body.height,body.colour,body.rotation,body.radius,body.radiusX,body.radiusY,body.scaleX,body.scaleY,false,true);
      let konva_obj=obj.create();
      konva_obj.x(body.x);
      konva_obj.y(body.y);
      konva_obj.stroke(body.strokeColor);
      konva_obj.fill(body.colour);
      this.clear();
      this.createdShapes_map.delete(body.id);
      this.createdShapes_map_konva.delete(body.id);
      this.createdShapes_map.set(body.id,obj);
      this.createdShapes_map_konva.set(body.id,konva_obj);
      this.draw();
        }
      }
    })
  }
  redo(){
    this.kill_free_drawing()
    const req=this.http.get<data>('Http://localhost:8080/painter/redo',{observe:'body',responseType:'json'});
    req.subscribe(body=>{
      if (body.id!=null){
      if (body.deleted)
      {
        this.selected_object_ID=body.id;
        this.deletee(false);
      }
      else{
      let p=[]
      if (body.points!=null){
        for (let point of body.points){
          p.push(point);}
        }
      let obj=new Shape (body.id,body.strokeColor,body.type,p,body.x,body.y,body.width,body.height,body.colour,body.rotation,body.radius,body.radiusX,body.radiusY,body.scaleX,body.scaleY,false,true);
      let konva_obj=obj.create();
      konva_obj.x(body.x);
      konva_obj.y(body.y);
      this.clear();
      this.createdShapes_map.delete(body.id);
      this.createdShapes_map_konva.delete(body.id);
      this.createdShapes_map.set(body.id,obj);
      this.createdShapes_map_konva.set(body.id,konva_obj);
      this.draw();
        }
      }
    })
  }
  
  save(filetype:string){
    
      var filename =prompt("enter file name ");
      if (filename==null)
        return;
      else if ( filename==""){
        window.alert("WARNING \n unsuitable file name");
      }
      else{
      var path = prompt("enter path:\n(eg:C:\\Users\\Samni\\Desktop\\)");
      if (path==null)
        return;
      else if (path=="" ){
        window.alert("WARNING \n unsuitable file path");
      }
      else{
        this.http.get('Http://localhost:8080/painter/save/'+filetype,{params:{path:path,filename:filename},observe:'body',responseType:'text'}).subscribe(res=>{
        if (res==null || res=="null"||res==''){
        window.alert("WARNING \n path doesn't exist");
        return;
        }
        else{
          window.alert("your file is saved :)")
        }
        
        }
        );
        
      }
      
      }
  }

  load(filetype:string){
    var path = prompt("enter path:\n(eg:C:\\Users\\Samni\\Desktop)");
    if (path==null)
      return;
    else if (path=="")
      window.alert("WARNING \n unsuitable path ");
    else{
    
    const req=this.http.get<data[]>('Http://localhost:8080/painter/load/'+filetype,{params:{p:String(path)},observe:'body',responseType:'json'});
    this.current_Id=0;
    req.subscribe(body=>{
      if (body==null){
        window.alert("WARNING \n you entered a wrong path or the file you loaded is empty");
      }
      else{
        this.clear(false,true);
        for (let shape of body){
          let p=[]
          if (Number(shape.id)>this.current_Id)
            this.current_Id=Number(shape.id)
          if (shape.type=="lineSegment"||shape.type=="freeDrawing"){
            
            for (let point of shape.points){
              p.push(point);}
          }
          let obj=new Shape (shape.id,shape.strokeColor,shape.type,p,shape.x,shape.y,shape.width,shape.height,shape.colour,shape.rotation,shape.radius,shape.radiusX,shape.radiusY,shape.scaleX,shape.scaleY,false,true);
          let konva_obj=obj.create();
          this.createdShapes_map.set(shape.id,obj);
          this.createdShapes_map_konva.set(shape.id,konva_obj);
        }
        this.current_Id+=1;
        this.clear();
        this.draw();}
      })
  }
}

  is_there_a_change(x:number,y:number,width:number,height:number){
    if (this.selected_shape_prev_properties[0]==x && this.selected_shape_prev_properties[1]==y && this.selected_shape_prev_properties[2]==height && this.selected_shape_prev_properties[3]==width)
      return false;
    else
      return true;
  }

  save_previous_properties(x:number,y:number,width:number,height:number){
    this.selected_shape_prev_properties[0]=x;
    this.selected_shape_prev_properties[1]=y;
    this.selected_shape_prev_properties[2]=height;
    this.selected_shape_prev_properties[3]=width;

  }
  
  shape(type:string,points:number[]=[]){
    
    if (type!="freeDrawing"){
      this.kill_free_drawing();
      this.eventListeners_for_drawing_positions(this.current_Id,type);
    }
    const component = this;
    const sh= new Shape(this.current_Id,this.stroke_colour,type,points);
    this.current_Id+=1;
    let shape_konva=sh.create();
    component.layer.add(shape_konva);
    this.createdShapes_map_konva.set(shape_konva.name(),shape_konva);
    this.createdShapes_map.set(shape_konva.name(),sh);
    this.stop_colour();
    
  }
}