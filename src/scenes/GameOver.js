import config from '../config/config';
import Button from '../objects/Button';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload() {

  }

  create() {
    this.add.image(400, 300, 'bg');
    
     //Score display
     this.overDisplay = this.add.image( config.width / 2, config.height / 2 - 100, 'orange_btn');
     this.scoreText = this.add.text(0, 0, 'GAME OVER', {
      fontSize: "32px",
      fill: "#fff",
    });
    Phaser.Display.Align.In.Center(this.scoreText, this.overDisplay);

     // LeaderBoards
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 10,
      "orange_btn",
      "orange_btn",
      "LEADERBOARDS",
      "LeaderBoards"
    );

    this.homebtn = this.add.sprite(300, 500, "home").setInteractive().setScale(0.5);
    this.homebtn.on(
      "pointerdown",
      function () {
        this.scene.start("Title");
      }.bind(this)
    );

    this.playAgainBtn = this.add.sprite(500, 500, "play_again").setInteractive().setScale(0.5);
    this.playAgainBtn.on(
      "pointerdown",
      function () {
        this.scene.start("Game");
      }.bind(this)
    );
  }


}