
/**
 * 
 * @type type
 */
export class GameState {
    _pressedKeys;
    _state;
    constructor() {
        this._pressedKeys = [];
        this._state = 'running';//running | paused;
    }

    update(event) {
        event.type == 'keydown' ? this._pressedKeys[event.keyCode] = true : this._pressedKeys[event.keyCode] = false;
        if(event.keyCode == 80){
            this._wasPauseKeyPressed();
        }
    }

//    isPaused() {
//        if (!this.isGameDone()) {
//            if (this._pressedKeys[80])
//                return true;
//        }
//        return false;
//    }

    _wasPauseKeyPressed() {
        if (!this.isGameDone()) {
            if (this._pressedKeys[80]) {//p
                if (this._state == 'paused') {
                    this._state = 'running';
                } else {
                    this._state = 'paused';
                }
            }
        }
    }

    isRunning() {
        if (this._state == 'running')
            return true;
        return false;
    }

    isGameDone() {
        if (this._state == 'done')
            return true;
        return false;
    }

    unPause() {
        if (!this.isGameDone())
            this._state = 'running';
    }

    pause() {
        if (!this.isGameDone())
            this._state = 'paused';
    }
    
    end(){
        this._state = 'done';
    }

}