import "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, "logo");

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    // remove progress bar when complete
    this.load.on(
      "complete",
      function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image("bg", "assets/graphics/bg.png");
    this.load.image("buttons", "assets/graphics/buttons.png");
    this.load.image("back", "assets/graphics/back.png");
    this.load.image("orange_btn", "assets/graphics/orange_button.png");
    this.load.image("blueButton1", "assets/blue_button02.png");
    this.load.image("blueButton2", "assets/blue_button03.png");
    this.load.image("phaserLogo", "assets/logo.png");
    this.load.image("box", "assets/grey_box.png");
    this.load.image("checkedBox", "assets/blue_boxCheckmark.png");
    this.load.audio("bgMusic", ["assets/TownTheme.mp3"]);

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/graphics/platform.png');
    this.load.image('coin', 'assets/graphics/coin.png');
    this.load.image('palmtree', 'assets/graphics/palmtree.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('fish', 'assets/graphics/color_fish.png');
  }

  ready() {
    this.scene.start("Title");
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start("Title");
    }
  }
}
