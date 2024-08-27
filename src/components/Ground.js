import { GameObjects } from "phaser";

export default class Ground extends GameObjects.Rectangle {
    name = "Ground";
    constructor(scene, x, y, width, height, color = 0x2f3645) {
        super(scene, x, y, width, height, color);

        this.init();
    }

    init() {}
}
