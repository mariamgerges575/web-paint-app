

import Konva from 'konva';
import { VirtualTimeScheduler } from 'rxjs';
export class Shape {

    //common attributes
    type:string="";
    id:string='0';
    x:number=0;
    y:number=0;
    width:number=0;
    height:number=0;
    colour:string='transparent';
    strokeColor:string='black';
    rotation:number=0;
    konva_shape:any=null;
    scaleY:number=1;
    scaleX:number=1;
    is_cloned:boolean=false;
    is_sent:boolean=false;
    //circle triangle
    radius:any=1;
    //ellipse 
    radiusX:number=0;
    radiusY:number=0;
    //line segment and free drawing
    points:number[]=[];

    constructor(id:string,strokeColor:string='black',type:any,points:number[]=[],x:number=0,y:number=0,width:number=100,height:number=80,Color:any='transparent',rotation:number=0,radius:number=100,radiusX:number=50,radiusY:number=50,scaleX:number=1,scaleY:number=1,is_cloned:boolean=false,is_sent:boolean=false){
      this.id=id;
      this.strokeColor=strokeColor;
      this.type=type;
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;
      this.strokeColor=strokeColor;
      this.rotation=rotation;
      this.radius=radius;
      this.radiusX=radiusX;
      this.radiusY=radiusY;
      for (let i of points)
        this.points.push(i);
      this.scaleX=scaleX;
      this.scaleY=scaleY;
      this.is_cloned=is_cloned;
      this.colour=Color;
      this.is_sent=is_sent;
  
    }
   
  create(){
    if (this.type=="circle"){
      return this.createCircle();
    }
    else if (this.type=="rectangle"){
    return this.createRectangle();
    }
    else if (this.type=="square"){
      return this.createSquare();
    }
    else if (this.type=="ellipse"){
      return this.createEllipse();
    }
    else if (this.type=="triangle"){
      return this.createTriangle();
    }
    else if (this.type=="lineSegment"){
      return this.createLineSegment();
    }
    else{
      return this.createFreeDrawing();
    }
  }

  createCircle(){
    
    console.log("circle called");
    let xx:number=-10;
    let yy:number=-10;
    if (this.is_cloned){
      xx=Math.random() * (400 -   150 +1) + 150;
      yy=Math.random() * (250 - 150 + 1) + 150;
    }
    else if (this.is_sent){
      xx=this.x;
      yy=this.y;
    }
    this.konva_shape = new Konva.Circle({
    x: xx,
    y: yy,
    radius: this.radius,
    
    stroke: this.strokeColor,
    strokeScaleEnabled: false,
    strokeWidth: 2,
    draggable: true,
    scaleY: this.scaleY,
    scaleX: this.scaleX,
    name:String(this.id),
    fill:this.colour,
    
    });
    if (!this.is_cloned && !this.is_sent){
      this.konva_shape.radius(1);}
    
    return this.konva_shape;
  }
  
  createRectangle(){
    console.log("rectangle called");
    let xx:number=-10;
    let yy:number=-10;
    if (this.is_cloned){
      xx=Math.random() * (600 - 150 + 1) + 150;
      yy=Math.random() * (500 - 150 + 1) + 150;
    }
    else if (this.is_sent){
      xx=this.x;
      yy=this.y;
    }
    this.konva_shape = new Konva.Rect({
    x: xx , 
    y: yy, 
    width:this.width,
    height: this.height,
    scaleY: this.scaleY,
    scaleX: this.scaleX,
    stroke: this.strokeColor,
    strokeWidth: 2,
    keepRation : false,
    draggable: true,
    strokeScaleEnabled: false,
    name:String(this.id),
    rotation:this.rotation,
    fill:this.colour

    });
    if (!this.is_cloned && !this.is_sent){
    this.konva_shape.width(1);
    this.konva_shape.height(1);}
    
    return this.konva_shape;
  }
  createEllipse(){
    console.log("ellipse called");
    let xx:number=-10;
    let yy:number=-10;
    if (this.is_cloned){
      xx=Math.random() * (600 - 150 + 1) + 150;
      yy=Math.random() * (500 - 150 + 1) + 150;
    }
    else if (this.is_sent){
      xx=this.x;
      yy=this.y;
    }
    this.konva_shape = new Konva.Ellipse({
    x: xx,
    y: yy,
    radiusX: this.radiusX,
    radiusY:this.radiusY,
    height:this.height,
    width:this.width,
    stroke:this.strokeColor,
    strokeWidth: 2,
    scaleY: this.scaleY,
    scaleX: this.scaleX,
    draggable: true,
    strokeScaleEnabled: false,
    rotation:this.rotation,
    name:String(this.id),
    fill:this.colour

    });
    if (!this.is_cloned && !this.is_sent){
    this.konva_shape.radiusX(1);
    this.konva_shape.radiusY(1);
  }
  
    return this.konva_shape;
  }
  createSquare(){
    console.log("square called");
    let xx:number=-10;
    let yy:number=-10;
    if (this.is_cloned){
      xx=Math.random() * (600 - 150 + 1) + 150;
      yy=Math.random() * (500 - 150 + 1) + 150;
    }
    else if (this.is_sent){
      xx=this.x;
      yy=this.y;
    }
    this.konva_shape = new Konva.Rect({
    x: xx,
    y: yy, 
    width: this.height,
    height: this.height,
    stroke: this.strokeColor,
    strokeWidth: 2,
    strokeScaleEnabled: false,
    scaleY: this.scaleY,
    scaleX: this.scaleX,
    draggable: true,
    rotation:this.rotation,
    name:String(this.id),
    fill:this.colour
    });
    if (!this.is_cloned && !this.is_sent){
    this.konva_shape.width(1);
    this.konva_shape.height(1);}
   
    return this.konva_shape;
  }
  createTriangle(){
    console.log("triangle called");
    let xx:number=-10;
    let yy:number=-10;
    if (this.is_cloned){
      xx=Math.random() * (600 - 150 + 1) + 150;
      yy=Math.random() * (500 - 150 + 1) + 150;
    }
    else if (this.is_sent){
      xx=this.x;
      yy=this.y;
    }
    this.konva_shape = new Konva.RegularPolygon({
      x: xx,
      y: yy, 
      sides: 3,
      radius: this.radius,
      scaleY: this.scaleY,
      scaleX: this.scaleX,
      strokeScaleEnabled: false,
      stroke: this.strokeColor,
      draggable: true,
      fill:this.colour,
      rotation:this.rotation,
      name:String(this.id),
    });
    if (!this.is_cloned && !this.is_sent)
      this.konva_shape.height(1);
    
    return this.konva_shape;
  }
  createLineSegment(){
    console.log("linesegment called");
    let pp:number[]=[];
    let xx:number=0;
    let yy:number=0;
    if (this.is_cloned){
      for (let i of this.points)
        pp.push(i);
      xx=Math.random() * (300 - 10 + 1) + 10;
      yy=Math.random() * (150 - 10 + 1) + 10;
    }
    else if (this.is_sent){
      for (let i of this.points)
        pp.push(i);
    }
    this.konva_shape = new  Konva.Line({
      x: xx,
      y: yy,
      stroke: this.strokeColor,
      strokeWidth: 3,
      points: pp,
      strokeScaleEnabled: false,
      scaleY: this.scaleY,
      scaleX: this.scaleX,
      draggable: true,
      name:String(this.id),
      rotation:this.rotation,
      
    });
    this.x=this.konva_shape.x();
    this.y=this.konva_shape.y();
    return this.konva_shape;
  }
  createFreeDrawing(){

 
    let pp:number[]=[];
    let d:number=Math.random() * (20 - 2 + 1) + 2;
    if (this.is_cloned){
      for (let i of this.points)
        pp.push(i+d);
      }
    else if (this.is_sent){
      for (let i of this.points)
        pp.push(i);
      }
    
    this.konva_shape=new Konva.Line({
      x: 0,
      y: 0,
      stroke:this.strokeColor,
      strokeWidth: 3,
      points: pp,
      draggable: true,
      strokeScaleEnabled: false,
      lineCap: 'round',
      lineJoin: 'round',
      name: String(this.id),
      tension: 1
    });
    
    return this.konva_shape;
  }
  
  fill_colour(colour:any){
    this.colour=colour;
    this.konva_shape.fill(colour);
  }
  stroke_colour(colour:any){
    this.strokeColor=colour;
    this.konva_shape.stroke(colour);
  }
  update(){
    this.x=this.konva_shape.x();
    this.y=this.konva_shape.y();
    this.scaleX=this.konva_shape.scaleX();
    this.scaleY=this.konva_shape.scaleY();
    this.rotation=this.konva_shape.rotation();
    this.strokeColor=this.konva_shape.stroke();
    //triangle or square or rectangle
    if (this.type=="triangle"|| this.type=="square" || this.type=="rectangle" ||this.type=="ellipse" ){
    this.width=this.konva_shape.width();
    this.height=this.konva_shape.height();
    }
    //triangle or circle
    if (this.type=="triangle"|| this.type=="circle"){
      this.radius=this.konva_shape.radius();  
    }
    //ellipse
    if (this.type=="ellipse")
    {
      this.radiusX=this.konva_shape.radiusX();
      this.radiusY=this.konva_shape.radiusY();
    }
    //line segment
    if (this.type=="lineSegment" ||this.type=="freeDrawing"){
    this.points=[];
    for (let i of this.konva_shape.points())
      this.points.push(i);
    }
  }
 
clone(id:any=this.id){
  this.update();
  let cloneObj= new Shape(id,this.strokeColor,this.type,this.points,this.x,this.y,this.width,this.height,this.colour,this.rotation,this.radius,this.radiusX,this.radiusY,this.scaleX,this.scaleY,true);
  
    return cloneObj;
}}

  
  
