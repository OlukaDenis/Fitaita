import "phaser";
import config from "../config/config";

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super("Credits");
  }

  preload() {
    
    this.creditsText = this.add.text(0, 0, "Credits", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.madeByText = this.add.text(0, 0, "Created By: Denis Oluka", {
      fontSize: "26px",
      fill: "#fff",
    });
    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(100);


    this.backbtn = this.add.sprite(400, 500, "back").setInteractive().setScale(0.5);
    this.backbtn.on(
      "pointerdown",
      function () {
        this.scene.start("Title");
      }.bind(this)
    );
  }

  create() {}
}
