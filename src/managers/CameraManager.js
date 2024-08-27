export default class CameraManager {
    constructor(scene) {
        this.scene = scene;
        this.mainCamera = scene.cameras.main;
    }

    setupCamera() {
        this.mainCamera.shake(1910, 0.015).fadeFrom(2000, 255, 27, 0, true);
    }

    updateCamera() {
        const players = this.scene.playerManager.players;
        const distance = Phaser.Math.Distance.Between(
            players[0].x,
            players[0].y,
            players[1].x,
            players[1].y
        );

        const midpoint = {
            x: (players[0].x + players[1].x) / 2,
            y: (players[0].y + players[1].y) / 2,
        };

        const targetZoom = Phaser.Math.Clamp(1 / (distance / 550), 0.05, 0.42);
        const currentZoom = this.mainCamera.zoom;
        const newZoom = Phaser.Math.Linear(currentZoom, targetZoom, 0.061);

        if (this.scene.stateMachine.currentState === "Playing") {
            // Lerp the camera position
            const lerpFactor = 0.12; // Adjust this value to control the smoothness of the camera movement
            const newX = Phaser.Math.Linear(this.mainCamera.scrollX, midpoint.x - this.mainCamera.width / 2, lerpFactor);
            const newY = Phaser.Math.Linear(this.mainCamera.scrollY, midpoint.y - this.mainCamera.height / 2, lerpFactor);

            this.mainCamera.setScroll(newX, newY).setZoom(newZoom);
        } else if (this.scene.stateMachine.currentState === "GameOver") {
            const { winnerPlayer } =
                this.scene.playerManager.determineWinnerAndLoser();
            this.mainCamera
                .startFollow(winnerPlayer, true, 0.01, 0.01)
                .setZoom(0.86);
        }
    }

    fadeInCamera() {
        this.mainCamera.fadeIn(1040, 204, 204, 255);
    }
}