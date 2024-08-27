export default class SceneManager {
    constructor(scene) {
        this.scene = scene;
    }

    launchScene(key, data) {
        this.scene.scene.launch(key, data);
    }

    startScene(key, data) {
        this.scene.scene.start(key, data);
    }

    stopScene(key) {
        this.scene.scene.stop(key);
    }

    restartScene() {
        this.scene.scene.restart();
    }
}
