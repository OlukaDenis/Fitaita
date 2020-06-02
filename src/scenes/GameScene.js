/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

let score = 0;
let platforms;
let player;
let coins;
let cursors;
let bombs;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    platforms = this.platforms;
    player = this.player;
    bombs = this.bombs;
    coins = this.coins;
    cursors = this.cursors;
    this.gameOver = false;
  }

  createSwimmingFish() {
    const image1 = this.add.image(0, 80, 'color_fish');

    this.tweens.add({
      targets: image1,
      props: {
        x: { value: 1600, duration: 4000, flipX: true },
        y: { value: 990, duration: 8000 },
      },
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    const image2 = this.add.image(400, 80, 'blue_fish');

    this.tweens.add({
      targets: image2,
      props: {
        x: { value: 1000, duration: 2000, flipX: true },
        y: { value: 1000, duration: 10000 },
      },
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    const image3 = this.add.image(800, 200, 'red_fish').setFlipX(true);

    this.tweens.add({
      targets: image3,
      props: {
        x: { value: 1000, flipX: true },
        y: { value: 900 },
      },
      duration: 3000,
      ease: 'Power1',
      yoyo: true,
      repeat: -1,
    });

    const image4 = this.add.image(100, 550, 'green_fish');

    this.tweens.add({
      targets: image4,
      props: {
        x: { value: 1600, duration: 5000, flipX: true },
        y: { value: 600, duration: 30000 },
      },
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  }

  createPlatforms() {
    platforms = this.physics.add.staticGroup();

    //level 1
    platforms.create(1600, 900, 'ground');
    platforms.create(1200, 900, 'ground');
    platforms.create(800, 900, 'ground');
    platforms.create(400, 900, 'ground');
    platforms.create(150, 900, 'ground');

    //level 2
    platforms.create(1500, 600, 'ground');
    platforms.create(950, 750, 'ground');
    platforms.create(420, 600, 'ground');
    platforms.create(-100, 760, 'ground');

    platforms.create(1600, 390, 'ground');
    platforms.create(700, 400, 'ground');

    platforms.create(-10, 400, 'ground');

    platforms.create(900, 200, 'ground');
  }

  createBottomPlants () {
    this.add.image(1700, 960, 'water_ground');
    this.add.image(950, 960, 'water_ground');
    this.add.image(200, 960, 'water_ground');
    this.add.image(500, 950, 'palmtree').setScale(0.1);
    this.add.image(150, 590, 'plant2');
    this.add.image(700, 550, 'plant4');
  }

  createCoins() {
    const vertical = Phaser.Math.RND.between(100, 500);
    coins = this.physics.add.group({
      key: 'coin',
      repeat: 50,
      setXY: { x: 20, y: vertical, stepX: 30 },
    });

    coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));
    });
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    score += 10;
    this.scoreText.setText(`SCORE: ${score}`);

    if (coins.countActive(true) === 5) {
      coins.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = (player.x < 400) 
      ? Phaser.Math.Between(400, 1000) 
      : Phaser.Math.Between(200, 1600);

      const xdistance = Phaser.Math.Between(400, 1600);
      const ydistance = Phaser.Math.Between(200, 900);
      const bomb1 = bombs.create(800, 200, 'red_fish').setFlipX(true);
      const bomb2 = bombs.create(0, 80, 'green_fish');

      this.tweens.add({
        targets: bomb1,
        props: {
          x: { value: xdistance, flipX: true },
          y: { value: ydistance },
        },
        duration: 3000,
        ease: 'Power1',
        yoyo: true,
        repeat: -1,
      });

      this.tweens.add({
        targets: bomb2,
        props: {
          x: { value: xdistance, duration: 4000, flipX: true },
          y: { value: ydistance, duration: 8000 },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }

  create() {
    this.bg = this.add.image(400, 300, 'bg');
    this.createPlatforms();
    this.createBottomPlants();
    // this.createSwimmingFish();
    
    player = this.physics.add.sprite(70, 700, 'dude');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Set the limits of the world where we play
    this.physics.world.bounds.width = this.bg.width / 2 - 200;
    this.physics.world.bounds.height = this.bg.height / 2;
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.createCoins();
    bombs = this.physics.add.group();

    // Score display
    this.scoreDisplay = this.add.image(100, 30, 'orange_btn');
    this.scoreText = this.add.text(0, 0, `SCORE: ${score}`, {
      fontSize: '32px',
      fill: '#fff',
    });
    Phaser.Display.Align.In.Center(this.scoreText, this.scoreDisplay);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    this.cameras.main.setBounds(
      0,
      0,
      this.bg.width / 2 - 200,
      this.bg.height / 2,
    );
    this.cameras.main.startFollow(player);
    this.cameras.main.roundPixels = true;
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-360);
    }
  }

  hitBomb(player) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    // gameOver = true;
    score = 0;
    this.scene.start('GameOver');
  }
}
