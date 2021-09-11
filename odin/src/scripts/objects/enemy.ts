import { Scene } from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {
  static readonly key = 'enemies';
  static readonly texture = 'assets/enemies.png';
  static readonly frames = {
    frameWidth: 32,
    frameHeight: 32,
  };

  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  spawns: Phaser.Physics.Arcade.Group;

  constructor(public scene: Scene, x: number, y: number) {
    super(scene, x, y, Enemy.texture);
    this.setTexture(Enemy.texture);
    this.setPosition(x, y);
  }

  create() {
    this.player = this.scene.physics.add.sprite(this.x, this.y, Enemy.key, 0);
    this.player.setCollideWorldBounds(true);
  }
}
