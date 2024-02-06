export interface data {
    type:string;
      id:string;
      x:any;
      y:any;
      width:any;
      height:any;
      colour:any;
      strokeColor:any;
      rotation:any;
      konva_shape:any;
      scaleY:number;
      scaleX:number;
      is_cloned:boolean;
      //circle triangle
      radius:any;
      //ellipse 
      radiusX:number;
      radiusY:number;
      //line segment and free drawing
      points:number[];
      deleted:boolean;
  }