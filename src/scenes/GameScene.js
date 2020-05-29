import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("bg", "assets/graphics/bg.png");
  }

  create() {
    this.add.image(400, 300, "bg");
  }
}
