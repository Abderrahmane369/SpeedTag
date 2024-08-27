import { GameObjects } from "phaser";
import Ground from "../components/Ground";

export default class GroundManager {
    // components field
    scene;
    grounds;

    constructor(scene) {
        // components
        this.scene = scene;
        this.grounds = new Phaser.GameObjects.Group(scene, {
            classType: Ground,
            runChildUpdate: true,
        });
    }

    #init() {}

    /**
     * Creates a ground object and adds it to the grounds group.
     * @param {Object} options - The options for creating the ground.
     * @param {string} [options.name="ground"] - The name of the ground.
     * @param {number} options.x - The x-coordinate of the ground.
     * @param {number} options.y - The y-coordinate of the ground.
     * @param {number} options.width - The width of the ground.
     * @param {number} options.height - The height of the ground.
     * @param {string} options.color - The color of the ground.
     * @param {number} [options.angle=0] - The angle of the ground.
     * @returns {Ground} The created ground object.
     */
    createGround({
        name = "ground",
        x,
        y,
        width,
        height,
        color,
        angle = 0,
        scaleX = 1,
        scaleY = 1,
    }) {
        var ground;

        this.scene.matter.add.gameObject(
            (ground = new Ground(this.scene, x, y, width, height, color)),
            { isStatic: true }
        );

        ground.setName(name).setScale(scaleX, scaleY).setAngle(angle);

        this.grounds.add(ground, true);

        return ground;
    }

    /**
     * Creates multiple grounds.
     *
     * @param {number} length - The number of grounds to create.
     * @param {Function} groundIteratedCallBack - The callback function to be called for each ground iteration.
     */
    createGrounds(length, groundIteratedCallBack) {
        Array(length)
            .fill(0)
            .forEach((_, i) => {
                this.createGround(groundIteratedCallBack(i));
            });
    }

    /**
     * Creates grounds from a given data array of objects
     * Mainly used with JSON data
     * @param {Object} data - The data array of grounds objects
     */
    createFromData(data) {
        data.forEach((groundData) => {
            this.createGround(groundData);
        });
    }

    /**
     * Get ground object by name
     * @param {string} name - The name of the ground object
     * @returns {Phaser.GameObjects.Rectangle} The ground object
     */
    getGroundByName(name) {} // TODO

    /**
     * Deletes a ground object from the grounds collection.
     *
     * @param {Phaser.GameObjects.Sprite} ground - The ground object to be deleted.
     */
    deleteGround(ground) {
        this.grounds.remove(ground, true, true);
    }

    update() {
        this.grounds.getChildren().forEach((ground) => {
            ground.update();
        });
    }
}
