/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import config from '../config/config';

export default class LeaderBoards extends Phaser.Scene {
  constructor() {
    super('LeaderBoards');
  }


  create() {
    // Score display
    this.overDisplay = this.add.image(config.width / 2, config.height / 2 - 100, 'orange_btn');
    this.scoreText = this.add.text(0, 0, 'LEADER BOARDS', {
      fontSize: '32px',
      fill: '#fff',
    });
  }
}