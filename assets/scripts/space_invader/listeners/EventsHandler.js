/**
 * 
 * @type type
 */
export class EventsHandler {
    constructor(backgroundLayer, contentLayer, userInterfaceLayer) {
        this.prepareKeyboardEvents(contentLayer);
        this.prepareMouseEvents(contentLayer, userInterfaceLayer);
    }

    prepareKeyboardEvents(contentLayer) {
        const contentCanvas = contentLayer.context.canvas;
        const player = contentLayer.getPlayer();
        contentCanvas.addEventListener('keydown', function (event) {
            player.control.update(event);
            contentLayer.gameState.update(event);
            //contentLayer.updatePlayerMovementState(event);
        });
        contentCanvas.addEventListener('keyup', function (event) {
            player.control.update(event);
            //contentLayer.updatePlayerMovementState(event);
        });

    }

    prepareMouseEvents(contentLayer, userInterfaceLayer) {
        const contentCanvas = contentLayer.context.canvas;
        const uiCanvas = userInterfaceLayer.context.canvas;

        uiCanvas.addEventListener('click', function (event) {
            contentCanvas.focus();
            contentLayer.gameState.unPause();
        })
    }

    prepareCanvasEvents(contentLayer) {
        const contentCanvas = contentLayer.context.canvas;
        contentCanvas.addEventListener('focusout', function (event) {
            contentLayer.gameState.pause();
        });
    }
}