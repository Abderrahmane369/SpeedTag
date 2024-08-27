import { GameObjects, Geom } from "phaser";

export default class Trail extends GameObjects.Particles.ParticleEmitter {
    target;

    constructor(scene, target, config = {}) {
        super(scene, 0, 0, null, config);

        this.target = target;

        this.init();
        this.scene.add.existing(this);
    }

    init() {
        this.scene.add
            .graphics()
            .fillStyle(0xff0001, 0.8)
            .fillCircle(10, 10, 10)
            .generateTexture("red_circle", 20, 20)
            .destroy();

        this.setTexture("red_circle");

        const shape = new Geom.Circle(0, 0, 10);

        this.addEmitZone({
            type: "random",
            source: this.target.getBounds(),
            quantity: 10,
        });

        this.startFollow(this.target, 400, 100, true);
    }
}
