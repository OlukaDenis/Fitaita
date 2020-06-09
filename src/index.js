/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import Model from './models/Model';
import config from './config/config';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/GameOver';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import EnterName from './scenes/EnterName';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOver);
    this.scene.add('EnterName', EnterName);
    this.scene.start('Boot');
  }
}

window.game = new Game();