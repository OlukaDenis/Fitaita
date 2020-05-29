import "phaser";
import config from "../config/config";
import Button from "../objects/Button";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // this.load.image("bg", "assets/graphics/bg.png");
  }

  create() {
    this.add.image(400, 300, "bg");
   
    // Game
    this.gameButton = new Button(
      this,
      config.width / 10,
      config.height / 2 - 100,
      "orange_btn",
      "orange_btn",
      "Play",
      "Game"
    );
  }
}
