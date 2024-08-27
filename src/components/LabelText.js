import { GameObjects } from "phaser";

export default class LabelText extends GameObjects.Text {
    text;
    object;

    constructor(scene, object, text) {
        super(scene, 0, 100, text, {
            fontFamily: "font_RobotoMono_Medium",
            fontSize: "16px",
            color: "#89a6a8",
        });

        this.object = object;
        this.text = text;

        this.#init();
    }

    #init() {
        this.setOrigin(0.5);
        this.scene.add.existing(this);
    }

    update() {
        const mainCamZoom = this.scene.cameras.main.zoom;
        const space = Phaser.Math.Clamp(1 / mainCamZoom, 5, 13) * 10;

        this.setPosition(this.object.x, this.object.y - space).setFontSize(
            (1 / mainCamZoom) * 15
        );
    }
}
