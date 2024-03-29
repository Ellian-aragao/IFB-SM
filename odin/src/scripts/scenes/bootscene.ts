import Enemy from "../objects/enemy";
import Player from "../objects/player";
import WorldScene from "./wordscene";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('tiles', 'assets/map/spritesheet.png');

    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    this.load.spritesheet(Player.key, Player.texture, Player.frames);
    this.load.spritesheet(Enemy.key, Enemy.texture, Enemy.frames);

    this.load.image('background', 'assets/ground.png');
  }

  create() {
    this.scene.start(WorldScene.key);
  }
}
