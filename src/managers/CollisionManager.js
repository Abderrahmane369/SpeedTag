export default class CollisionManager {
    constructor(scene) {
        this.scene = scene;
    }

    setupCollisionHandlers() {
        this.scene.matter.world.on("collisionstart", this.handleCollision, this);
    }

    handleCollision(event) {
        const { bodyA, bodyB } = event.pairs[0];
        const players = this.scene.playerManager.players;
        const ground = this.scene.playerManager.ground;

        // Check if both colliding bodies are players
        const collidingPlayers = players.filter(player => 
            bodyA.gameObject === player || bodyB.gameObject === player
        );

        if (collidingPlayers.length === 2) {
            const currentCatcher = this.scene.playerManager.currentCatcherArrow.currentCatcher;
            const newCatcher = collidingPlayers.find(player => player !== currentCatcher);
            this.scene.playerManager.currentCatcherArrow.currentCatcher = newCatcher;
        }
    }
}