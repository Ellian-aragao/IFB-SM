import { Scene } from 'phaser';

export default class Sprite extends Phaser.GameObjects.Sprite {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  spawns: Phaser.Physics.Arcade.Group;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    type: string,
    private hp: number,
  ) {
    super(scene, x, y, texture);
    this.setTexture(texture);
    this.setPosition(x, y);
  }
}
