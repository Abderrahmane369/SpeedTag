import { AUTO, Scale, Game } from "phaser";
import { FontLoaderPlugin } from "./plugins/font_loader_plugin";
import { Main } from "./scenes/Main";
import { UIScene } from "./scenes/UIScene";
import { GameOver } from "./scenes/Gameover";

const GAME_CONFIG = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    backgroundColor: 0xdbdbdb,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 9.652 },
            debug: false,
        },
    },
    plugins: {
        global: [
            {
                key: "FontLoaderPlugin",
                plugin: FontLoaderPlugin,
                start: true,
            },
        ],
    },
    scene: [Main, UIScene, GameOver],
};

function createGame() {
    return new Game(GAME_CONFIG);
}

export default createGame();
