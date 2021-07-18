import { Scene } from 'phaser';
import image from '/assets/Axe_Bandit.png'

export default class Bandit extends Phaser.GameObjects.Sprite {
  static readonly bandit = 'Bandit';
  static readonly srcImage = image;
  static readonly move = 8;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, Bandit.bandit);
    this.setTexture(Bandit.bandit);
    this.setPosition(x, y);
  }

  static preload(scene: Scene): void {
    scene.load.spritesheet(Bandit.bandit, Bandit.srcImage, {
      frameWidth: 80,
      frameHeight: 80,
    });
  }

  move(keypressed: Phaser.Types.Input.Keyboard.CursorKeys): void {
    if (keypressed.up.isDown) {
      this.keyUp();
    }
    if (keypressed.left.isDown) {
      this.keyLeft();
    }
    if (keypressed.down.isDown) {
      this.keyDown();
    }
    if (keypressed.right.isDown) {
      this.keyRight();
    }
  }

  keyUp(): void {
    this.y -= Bandit.move;
  }
  keyLeft(): void {
    this.x -= Bandit.move;
  }
  keyDown(): void {
    this.y += Bandit.move;
  }
  keyRight(): void {
    this.x += Bandit.move;
  }
}
