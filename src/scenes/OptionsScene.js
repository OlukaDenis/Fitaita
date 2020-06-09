/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  preload() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });

    this.musicButton = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on(
      'pointerdown',
      () => {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      },
    );

    this.soundButton.on(
      'pointerdown',
      () => {
        this.model.soundOn = !this.model.soundOn;
        this.updateAudio();
      },
    );

    this.updateAudio();
  }

  create() {
    this.backbtn = this.add.sprite(400, 500, 'back').setInteractive().setScale(0.5);
    this.backbtn.on(
      'pointerdown',
      () => {
        this.scene.start('Title');
      },
    );

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}
