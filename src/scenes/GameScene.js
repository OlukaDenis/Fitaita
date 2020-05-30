import "phaser";
import config from "../config/config";
import Button from "../objects/Button";
let score = 0;
let platforms;
let player;
let coins;
let cursors;
let bombs;
let gameOver = false;
let background;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    platforms = this.platforms;
    player = this.player;
    bombs = this.bombs;
    coins = this.coins;
    cursors = this.cursors;
    background = this.background;
  }

  preload() {
    
  }

  create() {
    background = this.add.tileSprite(0, 0, 1000, 300, "bg");
    // this.physics.arcade.enable(background);
    this.add.image(80, 500, 'palmtree').setScale(0.1);

    platforms = this.physics.add.staticGroup();

    platforms.create(600, 400, 'ground');
    platforms.create(100, 300, 'ground');
    platforms.create(750, 220, 'ground');

   player = this.physics.add.image(16, 20, 'fish').setScale(0.6);

   player.setBounce(0.1);
   player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    coins = this.physics.add.group({
        key: 'coin',
        repeat: 15,
        setXY: { x: 30, y: 0, stepX: 50 }
    });

    coins.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));

    });

    bombs = this.physics.add.group();

     //Score display
    this.scoreDisplay = this.add.image(100, 30, 'orange_btn');
    this.scoreText = this.add.text(0, 0, 'SCORE: ' + score, {
      fontSize: "32px",
      fill: "#fff",
    });
    Phaser.Display.Align.In.Center(this.scoreText, this.scoreDisplay);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
  }

  update (){
    if (this.gameOver) {
        return;
    }

    if ( cursors.right.isDown) {
      player.setVelocity(120);
    }

    if (cursors.up.isDown && player.body.touching.down){
      player.setVelocityY(-330);
  }
  }

  collectCoin (player, coin){
    coin.disableBody(true, true);
    score += 10;
    this.scoreText.setText('SCORE: ' + score);

    if (coins.countActive(true) === 0){
      coins.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
  }

  hitBomb (player, bomb){
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      this.gameOver = true;
  }

}
