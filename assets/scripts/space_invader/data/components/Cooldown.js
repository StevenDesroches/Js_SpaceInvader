/**
 * 
 * @type type
 */
export class Cooldown {
    _array;
    millis;
    random;
    constructor(millis = 500, random = false) {
        this._array = [];
        this.millis = millis;
        this.random = random;
    }

    isReady(key) {
        if (this._array[key] <= Date.now() || !this._array[key]) {
            this._applyCooldown(key);
            return true;
        }
        return false;
    }

    _applyCooldown(key) {
        let time = (this.random) ? Math.random() * this.millis : this.millis;
        this._array[key] = Date.now() + time;
    }

}