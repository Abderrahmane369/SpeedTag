import { Scene } from "phaser";

export class GameOver extends Scene {
    loserPlayer;
    winnerPlayer;

    constructor() {
        super({ key: "GameOver" });
    }

    preload() {
        // fonts
        this.load.setPath("assets/fonts");
        this.load.font("font_RobotoMono", "Roboto_Mono/RobotoMono-Bold.ttf");
    }

    create() {
        const winner = this.scene.get("Main").winnerPlayer;
        const winnerName = winner.name;
        const winnerColor = `${winner.color.toString(16)}`;


        this.add
            .image(0, 0, "__WHITE")
            .setScale(0.5, 0.5)
            .setDisplaySize(this.scale.width, 230)
            .setPosition(this.scale.width / 2, 227)
            .setTint(winner.color, winner.color, winner.color, winner.color)
            .setAlpha(0.99, 1, 0, 0.011);

        this.add
            .text(this.scale.width / 2, 160, `${winnerName} WINS`, {
                fontFamily: "font_RobotoMono",
                fontSize: "100px",
                color: `#${"cecece"}`,
                stroke: `#${"cbcbcb"}`,
                strokeThickness: 2,
            })
            .setOrigin(0.5, 0.5);
    }

    update() {}
}
