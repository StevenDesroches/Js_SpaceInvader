export function getEquallySpacedPointsOnlenght(len, nbrs) {
    if (!len)
        return;
    if (!nbrs)
        return;
    let result = [];
    let spaceLen = len / nbrs;
    for (let i = 1; i <= nbrs; i++) {
        result.push(spaceLen * i);
    }
    return result;
}

export function getRandomItemInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}