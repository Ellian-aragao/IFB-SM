import Phaser from 'phaser';
import Bandit from '../objects/Bandit';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/sample1.png');
    this.load.image('Bandit', 'assets/Axe_Bandit.png');
    // this.load.spritesheet('bandit','assets/Axe_Bandit.png', {
    //   frameWidth: 80,
    //   frameHeight: 80
    // });
  }

  create() {
    this.add.image(400, 250, 'logo');
    // this.add.image(450, 400, 'bandit');
    this.add.existing(new Bandit(this, 450, 400));
  }
}
