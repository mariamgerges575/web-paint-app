# Web-based paint application
Designed object-oriented model was used with some design patterns to create paint web application (using angular for frontend and java with spring boot framework for backend).
#### features:
 - Free drawing
 - Drawing shapes
    - Circle
    - Ellipse
    - Square
    - Rectangle
    - Triangle
    - Line segment
 - Edit drawn shapes
    - Moving shapes by dragging
    - Resizing
    - Changing shapes’ fill color
    - Changing shapes’ border color
  - Delete shapes
  - Copy/paste
  - clear
  - Undo/Redo
  - Save and load with chosen path in XML or JSON files.


  
 ## UML class diagram
 **link:** https://lucid.app/lucidchart/9c6e402e-bc59-4972-8756-7ff3818c1744/edit?beaconFlowId=BF177FC49D370BB1&invitationId=inv_e7bfe271-259c-4741-8004-7b96e58a2d0d&page=HWEp-vi-RSFO#
 
 ![This is an image](https://user-images.githubusercontent.com/96488115/216956638-124abe59-42f1-4b8b-94b3-629e9f27a2c9.png)
 
 ## Design patterns applied: 
  - ###### Factory design pattern:
   We made a factory class to be responsible for creating the suitable shape using different 
   classes of shapes which inherit from an abstract class (Shapes). There is another class 
   (Controller) which is the client that has all information about the classes that will be 
   created, this class uses the factory class.
  - ###### Prototype design pattern:
   We used this pattern in undo/redo functions where we needed to clone shapes from redo
   stack to undo stack, or vice versa ,to allow making changes in some flags in one without 
   affecting the other, so we implemented clone functions in each class that override the
   clone function in the abstract parent class (Shapes). 
   
   
## List of steps required to run our code: 
- Open any IDE for java (IntelliJ, Eclipse, etc.).
- Open backend folder from file>>open folder.
- If you don’t have JDK 19, Download it or the IDE will ask you to if you want to download.
- Run the main class
- Download Node.js
- From the terminal, install the Angular CLI globally with this command
 ```
npm install -g @angular/cli.
```
- Open VS Code or any id that can open angular.
- Open frontend folder from file>>open folder.
- Open terminal from terminal>>new terminal then write 
```
ng serve –open.
```
 **note:**  you night need this command  
 ```
 npm install konva --save
```
## Screenshot of UI: 
![image](https://user-images.githubusercontent.com/96488115/216964230-e52d3faf-8955-4d7e-98c4-0a11bf898ee2.png)
![image](https://user-images.githubusercontent.com/96488115/216964367-f3fc0d4c-2c8b-4baa-b56e-8f638f388369.png)
![image](https://user-images.githubusercontent.com/96488115/216964674-86db7d81-5d8a-46ab-9f3e-7ee29d0655d1.png)

