import Phaser from 'phaser';
import Bandit from '../objects/Bandit';

export default class Demo extends Phaser.Scene {
  private bandit: Bandit;
  private cursorKeysPressed: Phaser.Types.Input.Keyboard.CursorKeys;
  
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/sample1.png');
    Bandit.preload(this);
    this.cursorKeysPressed = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 250, 'logo');
    this.bandit = this.add.existing(new Bandit(this, 450, 400));
  }

  update(): void {
    this.bandit.move(this.cursorKeysPressed);
  }
}
