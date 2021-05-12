class GeneralUtil {
    constructor() {

    }

    getEquallySpacedPointsOnlenght(len, nbrs) {
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

}
var generalUtil = new GeneralUtil();