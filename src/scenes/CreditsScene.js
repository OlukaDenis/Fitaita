/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(300, 300, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.openGameText = this.add.text(300, 340, 'opengameart.org', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.microverseText = this.add.text(300, 370, 'Microverse Inc.', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.madeByText = this.add.text(300, 100, 'Created By:', {
      fontSize: '26px',
      fill: '#fff',
    });

    this.madeByText = this.add.text(300, 140, 'DENIS OLUKA', {
      fontSize: '26px',
      fill: '#fff',
    });


    this.backbtn = this.add.sprite(400, 500, 'back').setInteractive().setScale(0.5);
    this.backbtn.on(
      'pointerdown',
      () => {
        this.scene.start('Title');
      },
    );
  }
}
