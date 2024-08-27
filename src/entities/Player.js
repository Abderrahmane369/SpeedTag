import { Physics } from "phaser";

export default class Player extends Physics.Matter.Sprite {
    static DEFAULTS = {
        NAME: "player",
        WIDTH: 58,
        HEIGHT: 68,
        INITIAL_SPEED: 50,
        JUMP_FORCE: 49,
        IS_JUMPING: false,
        JUMP_FORCE_MULTIPLIER: 1.2,
        JUMP_FORCE_MULTIPLIER_CATCHER: 1.5,
        MAX_STICK: 1,
        MAX_JUMPS: 2, // Add this line
    };

    name = Player.DEFAULTS.NAME;
    width = Player.DEFAULTS.WIDTH;
    height = Player.DEFAULTS.HEIGHT;
    jumpForce = Player.DEFAULTS.JUMP_FORCE;
    isJumping = Player.DEFAULTS.IS_JUMPING;
    sticks = 0;
    jumps = 0;
    _speed = Player.DEFAULTS.INITIAL_SPEED;
    isOnGround = false;
    isCatcher = false;
    maxJumps = Player.DEFAULTS.MAX_JUMPS;
    jumpsLeft = this.maxJumps;

    constructor(scene, x, y, color) {
        super(scene.matter.world, x, y);
        this.scene.add.existing(this);

        this.color = color;
        this.textureKey = `playerTexture_${color.toString(16)}`;

        this.initPhysics();
        this.initGraphics();
        this.initControls();
    }

    initPhysics() {
        this.setBody({
            type: "rectangle",
            width: this.width,
            height: this.height,
        });
        this.setFixedRotation();
        this.setupCollisionHandlers();
    }

    setupCollisionHandlers() {
        this.setOnCollide((data) => {
            const { bodyA, bodyB } = data;
            if (bodyA.isStatic || bodyB.isStatic) {
                this.isOnGround = true;
                this.jumpsLeft = this.maxJumps; // Reset jumps when landing
            }
        });

        this.setOnCollideEnd((data) => {
            if (data.bodyA.isStatic || data.bodyB.isStatic) {
                this.isOnGround = false;

                console.log("jumps", this.jumps);
            }
        });
    }

    initGraphics() {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(this.color, 1);
        graphics.fillRect(0, 0, this.width, this.height);
        this.drawBorders(graphics);
        graphics.generateTexture(this.textureKey, this.width, this.height);
        graphics.destroy();
        this.setTexture(this.textureKey);
    }

    drawBorders(graphics) {
        graphics.lineStyle(4, 0x00, 0.251);
        graphics.lineBetween(0, 0, this.width, 0);
        graphics.lineBetween(this.width, 0, this.width, this.height);
        graphics.lineStyle(4, 0x00, 0.051);
        graphics.lineBetween(this.width, this.height, 0, this.height);
        graphics.lineStyle(4, 0x00, 0.251);
        graphics.lineBetween(0, this.height, 0, 0);
    }

    initControls() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.controller = {
            MOVE_LEFT: null,
            MOVE_RIGHT: null,
            JUMP: null,
        };
    }

    update() {
        const { velocityX, velocityY } = this.calculateVelocity();
        this.setVelocity(velocityX, velocityY);
        this.updateSpeed();
    }

    calculateVelocity() {
        let velocityX = this.body.velocity.x;
        let velocityY = this.body.velocity.y;

        if (this.controller.MOVE_LEFT.isDown) {
            velocityX = -this.speed;
        } else if (this.controller.MOVE_RIGHT.isDown) {
            velocityX = this.speed;
        }

        if (this.controller.JUMP.isDown && this.isOnGround) {
            velocityY = -this.jumpForce;
        }

        if (
            Phaser.Input.Keyboard.JustDown(this.controller.JUMP) &&
            this.jumpsLeft > 0
        ) {
            this.isJumping = true;
            velocityY = -this.jumpForce;
            this.jumpsLeft--;
            this.isOnGround = false; // Set to false immediately after jumping
        }

        return { velocityX, velocityY };
    }

    updateSpeed() {
        this.speed = this.isCatcher
            ? Player.DEFAULTS.INITIAL_SPEED *
              Player.DEFAULTS.JUMP_FORCE_MULTIPLIER_CATCHER
            : Player.DEFAULTS.INITIAL_SPEED;

        this.speed = this.isJumping
            ? this.speed * Player.DEFAULTS.JUMP_FORCE_MULTIPLIER
            : this.speed;
    }

    setController(controller) {
        this.controller = controller;
        return this;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
}
