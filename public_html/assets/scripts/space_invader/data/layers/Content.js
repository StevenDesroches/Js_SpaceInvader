import {Layer} from "./Layer.js";
import {BoundingBox, Cooldown} from "../components/index.js";
import {Player, Projectile, Enemy} from "../entities/index.js";
import * as GeneralUtil from "../../utils/GeneralUtil.js";

/**
 * TODO: refactor this whole file, i shouldnt handle all the animation here
 * 
 */
export class Content extends Layer {

    _enemiesBoundingBox;
    _shieldBoundingBox;
    _playerBoundingBox;
    _enemiesEntities;
    _shieldEntities;
    //_playerEntities;
    _player;
    _playerProjectiles;
    _enemyProjectiles;
    _enemyCooldown;

    _layerBoundingBox;

    _enemeyVelocity;

    constructor(canvas) {
        super(canvas);

        this._enemyCooldown = new Cooldown(1000, true);
        this._enemyProjectiles = [];
        this._playerProjectiles = [];
        this._enemeyVelocity = {x: 2.5, y: 0};

        this._enemiesEntities = [];
        this._shieldEntities = [];
        this._playerEntities = [];
        let margin = 0.025;
        let boundingBoxX = Math.round(this.width * margin);
        let boundingBoxWidth = this.width - (boundingBoxX * 2);
        let ennemiesHeight = Math.round(this.height * 0.70) - boundingBoxX;
        let shieldHeight = Math.round(this.height * 0.13);
        let playerHeight = Math.round(this.height * 0.17) - boundingBoxX;
        this._enemiesBoundingBox = new BoundingBox(boundingBoxX, boundingBoxX, boundingBoxWidth, ennemiesHeight);
        this._shieldBoundingBox = new BoundingBox(boundingBoxX, (ennemiesHeight + boundingBoxX), boundingBoxWidth, shieldHeight);
        this._playerBoundingBox = new BoundingBox(boundingBoxX, (ennemiesHeight + boundingBoxX + shieldHeight), boundingBoxWidth, playerHeight);

        this._layerBoundingBox = new BoundingBox(0, 0, this.width, this.height);

        this._player = new Player(boundingBoxWidth / 2, (playerHeight + shieldHeight + ennemiesHeight), 50, 20, "green", {x: 0, y: 0});
        this._player.animate(this.context);

//boundingBoxWidth
//ennemiesHeight


        let widthPoints = GeneralUtil.getEquallySpacedPointsOnlenght(boundingBoxWidth, 11);
        widthPoints.pop();
        widthPoints.pop();

        for (let widthPoint of widthPoints) {
            let currentLine = [];
            let heightPoints = GeneralUtil.getEquallySpacedPointsOnlenght(ennemiesHeight, 7);
//            heightPoints.shift();
            heightPoints.pop();
            heightPoints.pop();
            for (let point of heightPoints) {
                let enemy = new Enemy(widthPoint - 50, point - 50, 50, 50, {x: 0, y: 0});
                currentLine.push(enemy);
            }
            this._enemiesEntities.push(currentLine);
        }



//        let heightPoints = GeneralUtil.getEquallySpacedPointsOnlenght(ennemiesHeight, 7);
//        //heightPoints.shift();
//        heightPoints.pop();
//        heightPoints.pop();
//
//        for (let heightPoint of heightPoints) {
//            let currentLine = [];
//            let widthPoints = GeneralUtil.getEquallySpacedPointsOnlenght(boundingBoxWidth, 11);
//            widthPoints.shift();
//            widthPoints.pop();
//            for (let point of widthPoints) {
//                let enemy = new Enemy(point - 50, heightPoint - 50, 50, 50, {x: 0, y: 0});
//                currentLine.push(enemy);
//            }
//            this._enemiesEntities.push(currentLine);
//        }

        //this._enemiesEntities.push();
    }

    getPlayer() {
        return this._player;
    }

    animate() {
        //this._draw();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        if (this._player.isShooting()) {
            let center = this._player.getBoundingBox().getCenter();
            let proj = new Projectile(center.x, center.y, 5, 10, 'orange', {y: -5});
            this._playerProjectiles.push(proj);
        }

        if (this._enemyCooldown.isReady(1)) {
            if (this._enemiesEntities) {
                let enemyCol = GeneralUtil.getRandomItemInArray(this._enemiesEntities);
                if (enemyCol) {
                    let enemy = enemyCol[enemyCol.length - 1];
                    if (enemy) {
                        let center = enemy.getBoundingBox().getCenter();
                        let proj = new Projectile(center.x, center.y, 5, 10, 'yellow', {y: +5});
                        this._enemyProjectiles.push(proj);
                    }
                }
            }
        }

        if (this._enemyProjectiles) {
            for (let i = 0; i < this._enemyProjectiles.length; i++) {
                this._enemyProjectiles[i].animate(this.context);
            }
        }

        if (this._playerProjectiles) {
            for (let i = 0; i < this._playerProjectiles.length; i++) {
                this._playerProjectiles[i].animate(this.context);
                if (this._playerProjectiles[i].getBoundingBox().isTouchingBox(this._enemiesBoundingBox)) {
                    if (this._enemiesEntities.length > 0) {
                        for (let j = 0; j < this._enemiesEntities.length; j++) {
                            if (this._enemiesEntities[j].length > 0) {
                                for (let x = 0; x < this._enemiesEntities[j].length; x++) {
                                    if (this._playerProjectiles[i].getBoundingBox().isTouchingBox(this._enemiesEntities[j][x].getBoundingBox())) {
                                        this._enemiesEntities[j].splice(x, 1);
                                        if (this._enemiesEntities[j].length <= 0) {
                                            this._enemiesEntities.splice(j, 1);
                                        }
                                        this._playerProjectiles.splice(i, 1);
                                    }
                                }
                            }
                        }
                    }
                }
                if (!this._playerProjectiles[i].getBoundingBox().isTouchingBox(this._layerBoundingBox)) {
                    this._playerProjectiles.splice(i, 1);
                }
            }
        }

        if (this._enemiesEntities.length > 0) {
            let randomEnemyFirstInCol = GeneralUtil.getRandomItemInArray(this._enemiesEntities[0]);
            let randomEnemyLastInCol = GeneralUtil.getRandomItemInArray(this._enemiesEntities[this._enemiesEntities.length - 1]);
            if (randomEnemyFirstInCol.getBoundingBox().getX() <= this._layerBoundingBox.getX()) {
                this._enemeyVelocity = {x: 2.5, y: 2.5};
            }
            if (randomEnemyLastInCol.getBoundingBox().getX2() >= this._layerBoundingBox.getX2()) {
                this._enemeyVelocity = {x: -2.5, y: 2.5};
            }
            for (let i = 0; i < this._enemiesEntities.length; i++) {
                if (this._enemiesEntities[i].length > 0) {
                    for (let j = 0; j < this._enemiesEntities[i].length; j++) {
                        //console.log(this._enemiesEntities[i][j]);
                        this._enemiesEntities[i][j].setVelocity(this._enemeyVelocity);
                        this._enemiesEntities[i][j].animate(this.context);
                    }
                }
            }
            this._enemeyVelocity.y *= 0.90;
        }

        //TODO move that bit of logic in a function (and do better)
//        if (!this._player.getBoundingBox().isInBox(this._playerBoundingBox)) {
//            console.log('ici');
        if (this._player.getBoundingBox().getX() < this._playerBoundingBox.getX()) {
            this._player.getBoundingBox().setX(this._playerBoundingBox.getX());
            this._player.setVelocity({x: 0});
        }
        if (this._player.getBoundingBox().getX2() > this._playerBoundingBox.getX2()) {
            this._player.getBoundingBox().setX((this._playerBoundingBox.getX2() - this._player.getBoundingBox().getWidth()));
            this._player.setVelocity({x: 0});
        }
//            this._player.setVelocity({x: 0});
//        }
        this._player.reduceVelocity({x: 0.95});

        this._player.animate(this.context);
    }

    _draw() {
        //this._player.setVelocity({x: 0, y: 0});
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
//        this._enemiesBoundingBox.draw(this.context);
//        this._shieldBoundingBox.draw(this.context);
//        this._playerBoundingBox.draw(this.context);
        //this._player.animate(this.context);
    }
}