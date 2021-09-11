import Enemy from "../objects/enemy";

export default class BattleScene extends Phaser.Scene {
  static readonly key = 'BattleScene';

  constructor() {
    super(BattleScene.key);
  }

  preload() {
    this.load.spritesheet(Enemy.key, Enemy.texture, Enemy.frames);
    this.add.image(160,120,'background');
  }

  create() {
    
    // this.startBattle()

    // this.sys.events.on('wake', this.startBattle, this);
  }
}
