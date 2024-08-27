import { GameObjects } from "phaser";

export default class CatchingSystem {
    _currentCatcher;

    constructor(scene, players, catcher, arrow) {
        this.scene = scene;

        this.players = players;
        this.arrow = arrow;
        this.catcher
    }

    get currentCatcher() {
        return this._currentCatcher;
    }

    set currentCatcher(catcher) {
        this._currentCatcher = catcher;
    }

    start() {
        this.scene.matter.world.on(
            "collisionstart",
            (event) => {
                const { bodyA, bodyB } = event.pairs[0];

                const isPlayersInvolved =
                    (bodyA.gameObject === this.players[0] &&
                        bodyB.gameObject === this.players[1]) ||
                    (bodyA.gameObject === this.players[1] &&
                        bodyB.gameObject === this.players[0]);

                if (isPlayersInvolved) {
                    this.currentCatcher =
                        this.currentCatcher === this.players[0]
                            ? this.players[1]
                            : this.players[0];
                }

                this.arrow.catcher = this.currentCatcher;
            },
            this
        );
    }
}
