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

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    platforms = this.platforms;
    player = this.player;
    bombs = this.bombs;
    coins = this.coins;
    cursors = this.cursors;
    gameOver = this.gameOver;
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
            x: { value: 700, duration: 5000, flipX: true },
            y: { value: 50, duration: 30000,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    platforms = this.physics.add.staticGroup();

    platforms.create(20, 250, 'ground');
    platforms.create(600, 350, 'ground');
    platforms.create(250, 500, 'ground');
    platforms.create(750, 170, 'ground');
    platforms.create(400, 580, 'water_ground');

    this.add.image(80, 550, 'palmtree').setScale(0.1);
    this.add.image(150, 590, 'plant2');
    this.add.image(700, 550, 'plant4');
   player = this.physics.add.sprite(100, 400, 'dude');

   player.setBounce(0.1);
   player.setCollideWorldBounds(true);

   this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

    cursors = this.input.keyboard.createCursorKeys();

    coins = this.physics.add.group({
        key: 'coin',
        repeat: 25,
        setXY: { x: 20, y: 0, stepX: 30 }
    });

    coins.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));
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
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else{
        player.setVelocityX(0);
        player.anims.play('turn');
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
      // gameOver = true;
      score = 0;
      this.scene.start("GameOver");
  }

}
