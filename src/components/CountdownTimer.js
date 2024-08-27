import { GameObjects } from "phaser";

/**
 * Represents a countdown timer.
 *
 * @class
 * @extends GameObjects.Text
 */
export default class CountdownTimer extends GameObjects.Text {
    // fields
    startTime;
    _timeleft;
    tlSeconds;
    timeUp;
    timerEvent;
    timeUpCallback;

    constructor(scene, x, y, startTime = { minutes: 2, seconds: 0 }) {
        super(scene, x, y, "", {
            fontFamily: "font_RobotoMono_ItalicBold",
            fontSize: "33px",
            color: "#FF4500",
            stroke: "#FF4500",
            strokeThickness: 0.4,
        });

        this.startTime = startTime;

        this.#init();
    }

    /**
     * Initializes the Timer component.
     */
    #init() {
        this.timeleft = this.startTime;
        this.tlSeconds = this.#formatTimeLeftSeconds(this.timeleft);

        this.text = this.#formatString(this.timeleft);

        this.setOrigin(0.5);
        // Add to the scene
        this.scene.add.existing(this);
    }

    /**
     * Returns the time left.
     *
     * @returns {number} The time left.
     */
    get timeleft() {
        return this._timeleft;
    }

    /**
     * Setter for the timeleft property.
     *
     * @param {number} time - The new value for the timeleft property.
     */
    set timeleft(time) {
        this._timeleft = time;
        this.startTime = time;
        this.tlSeconds = this.#formatTimeLeftSeconds(time);
    }

    /**
     * Updates the timer by decreasing the remaining time by 1 second.
     * If the remaining time reaches 0, sets the 'timeUp' property to true.
     * Updates the text of the timer with the formatted time.
     * If the time is up and a timer event is registered, removes the timer event.
     */
    #update() {
        this.tlSeconds -= this.tlSeconds > 0 ? 1 : 0;
        this.timeUp = this.tlSeconds === 0;

        const formatedTime = this.#formatTime(this.tlSeconds);
        const formatTimeString = this.#formatString(formatedTime);

        this.setText(formatTimeString);

        if (this.tlSeconds <= 10)
            this.style
                .setColor("#ff0036")
                .setFontSize("39px")
                .setStroke("#ff0011");

        if (this.timeUp && this.timerEvent) {
            this.timerEvent.remove();

            if (this.timeUpCallback) this.timeUpCallback();
        }
    }

    /**
     * Starts the timer.
     *
     * @returns {this} The Timer instance.
     */
    start() {
        this.timerEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.#update,
            callbackScope: this,
            loop: true,
        });

        return this;
    }

    /**
     * Sets the callback function to be executed when the timer reaches zero.
     *
     * @param {Function} callback - The function to be called when the timer reaches zero.
     */
    onTimeUp(callback) {
        this.timeUpCallback = callback;
    }

    /**
     * Formats the given time in seconds into an object with seconds and minutes.
     *
     * @param {number} tlSeconds - The time in seconds.
     * @returns {{ seconds: number, minutes: number }} - The formatted time object.
     */
    #formatTime(tlSeconds) {
        const seconds = tlSeconds % 60;
        const minutes = Phaser.Math.FloorTo(tlSeconds / 60);

        return { seconds, minutes };
    }

    /**
     * Formats the given time object into a string representation.
     *
     * @param {Object} time - The time object to be formatted.
     * @param {number} time.minutes - The minutes value of the time.
     * @param {number} time.seconds - The seconds value of the time.
     * @returns {string} The formatted time string.
     */
    #formatString(time) {
        return `${time.minutes.toString().padStart(2, "0")}:${time.seconds
            .toString()
            .padStart(2, "0")}`;
    }

    /**
     * Converts the given time object into seconds.
     *
     * @param {Object} time - The time object containing minutes and seconds.
     * @param {number} time.minutes - The number of minutes.
     * @param {number} time.seconds - The number of seconds.
     * @returns {number} The total time in seconds.
     */
    #formatTimeLeftSeconds(time) {
        return time.minutes * 60 + time.seconds;
    }
}
