/*
 * 
 */
export class Layer {
    //canvas;
    context;
    width;
    height;
    constructor(canvas) {
        //this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
    }
   
}