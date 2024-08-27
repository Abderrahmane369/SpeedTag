import { Scene } from "phaser";
import CountDownTimer from "../components/CountdownTimer";

export class UIScene extends Scene {
    WIDTH;
    HEIGHT;
    WIDTH_CENTER;
    HEIGHT_CENTER;

    // UI Components
    countdownTimer;

    constructor() {
        super({ key: "UIScene", active: true });
    }

    init() {
        this.WIDTH = this.scale.width;
        this.HEIGHT = this.scale.height;
        this.WIDTH_CENTER = this.WIDTH / 2;
        this.HEIGHT_CENTER = this.HEIGHT / 2;
        // Listen for the updateTimeLeft event
    }

    preload() {
        // fonts
        this.load.setPath("assets/fonts");
        this.load.font("font_RobotoMono", "Roboto_Mono/RobotoMono-Bold.ttf");
        this.load.font(
            "font_RobotoMono_ItalicBold",
            "Roboto_Mono/static/RobotoMono-BoldItalic.ttf"
        );
    }

    create() {
        const MainScene = this.scene.get("Main");

        this.countDownTimer = new CountDownTimer(
            this,
            this.WIDTH_CENTER,
            30,
            MainScene.roundTimeleft
        ).start();

        this.countDownTimer.onTimeUp(() => {
            this.scene.get("Main").gameOver();
        });

        const uiScene = this.scene.get("UIScene");

        uiScene.events.emit("test");

        this.cameras.main.flash(2100, 255, 27, 0)
    }

    update() {}
}
