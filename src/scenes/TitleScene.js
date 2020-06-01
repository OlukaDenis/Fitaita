import "phaser";
import config from "../config/config";
import Button from "../objects/Button";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  preload() {
    
  }

  create() {
    this.add.image(400, 300, 'bg');

    const image1 = this.add.image(0, 80, 'color_fish');

    this.tweens.add({
        targets: image1,
        props: {
            x: { value: 700, duration: 4000, flipX: true },
            y: { value: 500, duration: 8000,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    const image2 = this.add.image(400, 80, 'blue_fish');

    this.tweens.add({
        targets: image2,
        props: {
            x: { value: 500, duration: 2000, flipX: true },
            y: { value: 500, duration: 10000,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    const image3 = this.add.image(800, 200, 'red_fish').setFlipX(true);

    this.tweens.add({
        targets: image3,
        props: {
            x: { value: 70, flipX: true },
            y: { value: 250 },
        },
        duration: 3000,
        ease: 'Power1',
        yoyo: true,
        repeat: -1
    });

    const image4 = this.add.image(100, 550, 'green_fish');

    this.tweens.add({
        targets: image4,
        props: {
            x: { value: 700, duration: 2000, flipX: true },
            y: { value: 50, duration: 15000,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      "orange_btn",
      "orange_btn",
      "Play",
      "Game"
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      "orange_btn",
      "orange_btn",
      "Options",
      "Options"
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      "orange_btn",
      "orange_btn",
      "Credits",
      "Credits"
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add("bgMusic", { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
