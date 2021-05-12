/**
 * 
 * @type type
 */
export class EventsHandler {
    constructor(backgroundLayer, contentLayer, userInterfaceLayer) {
        this.prepareKeyboardEvent(contentLayer);
        this.prepareMouseEvent(contentLayer, userInterfaceLayer);
    }

    prepareKeyboardEvent(contentLayer) {
        const contentCanvas = contentLayer.context.canvas;
        const player = contentLayer.getPlayer();

        contentCanvas.addEventListener('keydown', function (event) {
            player.control.update(event);
            //contentLayer.updatePlayerMovementState(event);
        });
        contentCanvas.addEventListener('keyup', function (event) {
            player.control.update(event);
            //contentLayer.updatePlayerMovementState(event);
        });
    }

    prepareMouseEvent(contentLayer, userInterfaceLayer) {
        const contentCanvas = contentLayer.context.canvas;
        const uiCanvas = userInterfaceLayer.context.canvas;

        uiCanvas.addEventListener('click', function (event) {
            contentCanvas.focus();
        })
    }
}