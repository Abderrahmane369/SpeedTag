import { GameObjects } from "phaser";

export default class CurrentCatcherArrow extends GameObjects.Graphics {
    spaceY = 55;

    constructor(scene, player) {
        super(scene);
        this.scene = scene;
        this.currentCatcher = player;

        this.#__init__();

        this.scene.add.existing(this);
    }

    // INITIALIZE
    #__init__() {
        this.fillStyle(0xff003f, 0.895)
            .fillTriangle(0, 0, -13, 18, 13, 18)
            .setRotation(Phaser.Math.DegToRad(180))
            .setAlpha(0.42);

        this.#__prototype__();
    }

    // PROTOTYPE
    #__prototype__() {
        this.float();
    }

    update() {
        this.setPosition(
            this.currentCatcher.x,
            this.currentCatcher.y - this.spaceY
        );
    }

    float() {
        this.scene.tweens.add({
            targets: this,
            spaceY: 43,
            scale: 1.01,
            alpha: 0.9,
            ease: "Sine.easeInOut",
            duration: 575,
            yoyo: true,
            repeat: -1,
        });
    }
}
