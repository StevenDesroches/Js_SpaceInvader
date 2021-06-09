import {UserInterface, Content, Background} from "./layers/index.js";
import {EventsHandler} from "../listeners/EventsHandler.js";
/*
 * 
 */
export class SpaceInvaderCore {
    //layers
    _userInterface;
    _content;
    _background;

    constructor(container) {
        let layerElements = container.getElementsByClassName("space_invader_canvas_layer");
        for (let layerEl of layerElements) {
            let type = layerEl.getAttribute("data-space-invader-layer-type");
            switch (type) {
                case "ui":
                    this._userInterface = new UserInterface(layerEl);
                    break;
                case "content":
                    this._content = new Content(layerEl);
                    break;
                case "background":
                    this._background = new Background(layerEl);

                    break;
            }
        }
        if (this._userInterface && this._content && this._background)
            this._eventsHandler = new EventsHandler(this._background, this._content, this._userInterface);
        
         this._content.context.canvas.focus();
    }

    animate() {
        //console.log("ici");
        //console.log(this._content);
        this._background.animate();
        this._content.animate();
    }
}