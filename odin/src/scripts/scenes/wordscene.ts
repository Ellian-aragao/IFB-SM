import Player from '../objects/player';

export default class WorldScene extends Phaser.Scene {
  static readonly key = 'WorldScene';

  player: Player;
  spawns: Phaser.Physics.Arcade.Group;

  constructor() {
    super(WorldScene.key);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    const botLayer = map.createLayer('bot', tiles, 0, 0);
    const topLayer = map.createLayer('top', tiles, 0, 0);

    const grass = map.createLayer('bot', tiles, 0, 0);
    const obstacles = map.createLayer('top', tiles, 0, 0);

    // topLayer.setCollisionByExclusion([-1]);
    this.physics.add.staticGroup(obstacles);

    this.player = new Player(this, 40, 40);
    this.player.create();

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.physics.add.collider(this.player, topLayer);
    this.physics.add.collider(this.player, obstacles);
    
    this.cameras.main.setBounds(0, 0, 100, 60);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    // this.spawns = this.physics.add.group({
    //   classType: Phaser.GameObjects.Zone,
    // });
    // for (let i = 0; i < 30; i++) {
    //   const x = Phaser.Math.RND.between(60, this.physics.world.bounds.width);
    //   const y = Phaser.Math.RND.between(60, this.physics.world.bounds.height);
    //   this.spawns.create(x, y, undefined, 20);
    // }

    // Enemy collider / colisor de inimigos
    // this.physics.add.overlap(
    //   this.player,
    //   this.spawns,
    //   this.overlapEnemy,
    //   undefined,
    //   this,
    // );

  }

  // overlapEnemy(player: any, zone: { x: number; y: number }) {
  //   // we move the zone to some other location
  //   zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
  //   zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

  //   // start battle / iniciar batalha

  //   this.cameras.main.shake(300);

  //   // switch to BattleScene / ir para a Cena de Batalha (BattleScene)
  //   this.scene.switch('BattleScene');
  // }

  update() {
    this.player.update();
  }
}
