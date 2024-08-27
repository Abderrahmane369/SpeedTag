import { Scene } from "phaser";
import GroundManager from "../managers/GroundManager";
import SceneManager from "../managers/SceneManager";
import EventBus from "../systems/EventBus";
import GameStateMachine from "../systems/GameStateMachine";
import PlayerManager from "../managers/PlayerManager";
import CameraManager from "../managers/CameraManager";
import CollisionManager from "../managers/CollisionManager";

export class Main extends Scene {
    constructor() {
        super({ key: "Main" });
        this.sceneManager = new SceneManager(this);
        this.eventBus = new EventBus();
        this.stateMachine = new GameStateMachine(this);
    }

    init() {
        this.initializeWorldBounds();
        this.initializeRoundTimer();
        this.groundManager = new GroundManager(this);
        this.playerManager = new PlayerManager(this);
        this.cameraManager = new CameraManager(this);
        this.collisionManager = new CollisionManager(this);
    }

    preload() {
        this.loadAssets();
        this.load.atlas(
            "flares",
            "https://labs.phaser.io/assets/particles/flares.png",
            "https://labs.phaser.io/assets/particles/flares.json"
        );
    }

    create() {
        this.setupWorld();
        this.playerManager.setupPlayers();
        this.cameraManager.setupCamera();
        this.collisionManager.setupCollisionHandlers();
        this.stateMachine.setState("Playing");
    }

    update() {
        this.playerManager.update();
        this.cameraManager.updateCamera();
        this.playerManager.updateCatcherStatus();
    }

    initializeWorldBounds() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;
        this.WORLD_BOUNDS = {
            x: -10000,
            y: -9000,
            width: 10000 * 2,
            height: 9000 * 2,
        };
        const { x, y, width, height } = this.WORLD_BOUNDS;
        this.matter.world.setBounds(x, y, width, height, 1000);
    }

    initializeRoundTimer() {
        this.roundTimeleft = {
            minutes: 1,
            seconds: 20,
        };
    }

    loadAssets() {
        this.load.setPath("assets");
        this.load.json("map_test", "maps/map_test12.json");
        this.load.setPath("assets/fonts");
        this.load.font(
            "font_RobotoMono_Medium",
            "Roboto_Mono/static/RobotoMono-Medium.ttf"
        );
        this.load.font(
            "font_RobotoMono_Thin",
            "Roboto_Mono/static/RobotoMono-Thin.ttf"
        );
    }

    setupWorld() {
        const groundsData = this.cache.json.get("map_test");
        this.groundManager.createFromData(groundsData);
    }

    gameOver() {
        this.stateMachine.setState("GameOver");
        const { loserPlayer, winnerPlayer } =
            this.playerManager.determineWinnerAndLoser();
        this.sceneManager.launchScene("GameOver", { winnerPlayer });
        this.cameraManager.fadeInCamera();
    }
}
