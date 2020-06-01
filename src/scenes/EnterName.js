import config from '../config/config';

export default class EnterName extends Phaser.Scene {
  constructor() {
    super("EnterName");
  }

  preload() {

  }

  create() {
    this.add.image(400, 300, 'bg');

    //player name
    
    this.overDisplay = this.add.image( config.width / 2, config.height / 2 - 100, 'orange_btn');
    this.scoreText = this.add.text(0, 0, 'LEADER BOARDS', {
     fontSize: "32px",
     fill: "#fff",
   });
  }

}