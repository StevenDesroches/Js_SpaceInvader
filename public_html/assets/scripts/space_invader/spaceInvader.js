import {SpaceInvaderCore} from "./data/SpaceInvaderCore.js";
spaceInvaderInit();
var spaceInvaderCore;
function spaceInvaderInit() {
    let initialElements = document.getElementsByClassName("space_invader_init");
    if (initialElements && initialElements.length > 0) {
        for (let initalEl of initialElements) {
            spaceInvaderPrepareLayers(initalEl);
            spaceInvaderCore = new SpaceInvaderCore(initalEl);
            animate();
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
//    let t0 = performance.now();
    spaceInvaderCore.animate();
//    let t1 = performance.now();
//    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    //console.log("animate");
}

function spaceInvaderPrepareLayers(container) {
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;

    let userInterfaceLayer = spaceInvaderUiLayer(width, height);
    let contentLayer = spaceInvaderContentLayer(width, height);
    let backgroundLayer = spaceInvaderBackgroundLayer(width, height);

    container.appendChild(backgroundLayer);
    container.appendChild(contentLayer);
    container.appendChild(userInterfaceLayer);
}

function spaceInvaderUiLayer(width, height) {
    let layer = document.createElement('canvas');
    layer.width = width;
    layer.height = height;
    layer.classList.add("space_invader_canvas_layer");
    layer.setAttribute("data-space-invader-layer-type", "ui");
    return layer;
}

function spaceInvaderContentLayer(width, height) {
    let layer = document.createElement('canvas');
    layer.width = width;
    layer.height = height;
    layer.classList.add("space_invader_canvas_layer");
    layer.setAttribute("data-space-invader-layer-type", "content");
    layer.setAttribute("tabindex", 0);
    return layer;
}

function spaceInvaderBackgroundLayer(width, height) {
    let layer = document.createElement('canvas');
    layer.width = width;
    layer.height = height;
    layer.classList.add("space_invader_canvas_layer");
    layer.setAttribute("data-space-invader-layer-type", "background");
    return layer;
}