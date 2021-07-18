export default class Bandit extends Phaser.GameObjects.Sprite {
  static readonly bandit = 'Bandit';

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Bandit.bandit);
    this.setTexture(Bandit.bandit);
    this.setPosition(x, y);
  }

  public static loadImage(scene: Phaser.Scene): void {
    scene.load.image('Bandit', 'assets/Axe_Bandit.png');
  }
}
