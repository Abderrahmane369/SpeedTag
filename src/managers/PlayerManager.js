import Player from "../entities/Player";
import CurrentCatcherArrow from "../components/CurrentCatcherArrow";
import Trail from "../entities/Trail";
import { BlendModes } from "phaser";

export default class PlayerManager {
    CurrentCatcherArrow;
    players = [];
    playerTrails = [];

    trailLayer;
    playerLayer;

    constructor(scene) {
        this.scene = scene;
        // Create layers
        this.trailLayer = this.scene.add.layer();
        this.playerLayer = this.scene.add.layer();

        // Set layer depths
        this.trailLayer.setDepth(5);
        this.playerLayer.setDepth(10);
    }

    setupPlayers() {
        this.players.push(
            new Player(this.scene, 400, -100, 0x0ea364).setName("BLUE"),
            new Player(this.scene, -400, -100, 0xe30022).setName("RED")
        );

        // Add players to player layer
        this.players.forEach((player) => this.playerLayer.add(player));

        this.playerTrails.push(
            new Trail(this.scene, this.players[1], {
                speed: 10,
                lifespan: 1200,
                quantity: 100,
                scale: { start: 1, end: 0 },
                alpha: { start: 0.5, end: -1 },
                blendMode: "ADD",
            })
        );

        // Add trail to trail layer
        this.trailLayer.add(this.playerTrails[0]);

        this.setPlayerControllers();
        this.currentCatcherArrow = new CurrentCatcherArrow(
            this.scene,
            this.players[0]
        );
    }

    setPlayerControllers() {
        const { Input } = Phaser;
        this.players[0].setController({
            MOVE_LEFT: this.scene.input.keyboard.addKey(
                Input.Keyboard.KeyCodes.LEFT
            ),
            MOVE_RIGHT: this.scene.input.keyboard.addKey(
                Input.Keyboard.KeyCodes.RIGHT
            ),
            JUMP: this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.UP),
        });

        this.players[1].setController({
            MOVE_LEFT: this.scene.input.keyboard.addKey(
                Input.Keyboard.KeyCodes.Q
            ),
            MOVE_RIGHT: this.scene.input.keyboard.addKey(
                Input.Keyboard.KeyCodes.D
            ),
            JUMP: this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.Z),
        });
    }

    update() {
        this.players.forEach((player) => player.update());
        this.currentCatcherArrow.update();
    }

    updateCatcherStatus() {
        this.players.forEach((player) => {
            player.isCatcher =
                this.currentCatcherArrow.currentCatcher === player;
        });
    }

    determineWinnerAndLoser() {
        const loserPlayer = this.currentCatcherArrow.currentCatcher;
        const winnerPlayer = this.players.find(
            (player) => player !== loserPlayer
        );
        return { loserPlayer, winnerPlayer };
    }
}
