/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import ScoreBoard from '../objects/ScoreBoard';
import GameStorage from '../storage/storage';
import LeaderBoard from '../objects/LeaderBoard';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.coinCount = 49;
    this.coinEarn = (this.coinCount + 1) * 5;
    this.ScoreBoard = new ScoreBoard(0, this.coinEarn, GameStorage.getCurrentPlayer());
    this.LeaderBoard = new LeaderBoard();
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    // level 1
    this.platforms.create(1600, 900, 'ground');
    this.platforms.create(1200, 900, 'ground');
    this.platforms.create(800, 900, 'ground');
    this.platforms.create(400, 900, 'ground');
    this.platforms.create(150, 900, 'ground');

    // level 2
    this.platforms.create(1500, 600, 'ground');
    this.platforms.create(950, 750, 'ground');
    this.platforms.create(420, 600, 'ground');
    this.platforms.create(-100, 760, 'ground');

    this.platforms.create(1600, 390, 'ground');
    this.platforms.create(700, 400, 'ground');

    this.platforms.create(-10, 400, 'ground');

    this.platforms.create(900, 200, 'ground');
  }

  createBottomPlants() {
    this.add.image(1700, 960, 'water_ground');
    this.add.image(950, 960, 'water_ground');
    this.add.image(200, 960, 'water_ground');
    this.add.image(500, 950, 'palmtree').setScale(0.1);
    this.add.image(150, 590, 'plant2');
    this.add.image(700, 550, 'plant4');
  }

  createCoins() {
    const vertical = Phaser.Math.RND.between(100, 500);
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: this.coinCount,
      setXY: { x: 20, y: vertical, stepX: 30 },
    });

    this.coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));
    });
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.ScoreBoard.score += 5;

    if (this.coins.countActive(true) === 0) {
      this.ScoreBoard.coins += this.coinEarn;
      this.coins.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const xdistance = Phaser.Math.Between(400, 1600);
      const ydistance = Phaser.Math.Between(200, 900);
      const enemy1 = this.fishes.create(800, 200, 'red_fish').setFlipX(true);
      const enemy2 = this.fishes.create(0, 80, 'green_fish');

      this.tweens.add({
        targets: enemy1,
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
        targets: enemy2,
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


  hitBomb() {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.LeaderBoard.setScore(GameStorage.getCurrentPlayer(), this.ScoreBoard.score);
    this.scene.start('GameOver');
    this.ScoreBoard.coins = this.coinEarn;
    this.ScoreBoard.score = 0;
    this.ScoreBoard.resetUI();
  }

  create() {
    this.ScoreBoard.displayScoreBoard();
    this.bg = this.add.image(400, 300, 'bg');
    this.createPlatforms();
    this.createBottomPlants();

    this.player = this.physics.add.sprite(70, 700, 'dude');

    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

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
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createCoins();
    this.fishes = this.physics.add.group();

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.collider(this.fishes, this.platforms);

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.collider(this.player, this.fishes, this.hitBomb, null, this);

    this.cameras.main.setBounds(
      0,
      0,
      this.bg.width / 2 - 200,
      this.bg.height / 2,
    );
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-360);
    }
  }
}
