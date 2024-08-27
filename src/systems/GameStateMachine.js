export default class GameStateMachine {
    constructor(scene) {
        this.scene = scene;
        this.states = {
            Playing: {
                enter: () => {},
                exit: () => {},
            },
            GameOver: {
                enter: () => {
                    this.scene.gameOver();
                },
                exit: () => {},
            },
        };
        this.currentState = null;
    }

    setState(newState) {
        if (this.currentState) {
            this.states[this.currentState].exit();
        }
        this.currentState = newState;
        this.states[this.currentState].enter();
    }
}
