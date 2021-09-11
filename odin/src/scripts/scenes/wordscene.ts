import Enemy from '../objects/enemy';
import Player from '../objects/player';
import BattleScene from './battlescene';

export default class WorldScene extends Phaser.Scene {
  static readonly key = 'WorldScene';

  player: Player;
  enemy: Enemy;
  spawns: Phaser.Physics.Arcade.Group;
  group: Phaser.Physics.Arcade.Group;

  constructor() {
    super(WorldScene.key);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    const botLayer = map.createLayer('bot', tiles, 0, 0);
    const topLayer = map.createLayer('top', tiles, 0, 0);

    this.enemy = new Enemy(this, 70, 100);
    this.enemy.create();
    this.player = new Player(this, 40, 40);
    this.player.create();
    this.physics.add.existing(this.player);
    this.physics.add.existing(this.enemy);

    // this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

    // this.group = this.physics.add.group({
    //   collideWorldBounds: true,
    // });
    // topLayer.setCollisionByExclusion([-1]);
    // this.physics.add.staticGroup(obstacles);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    // this.group.add(this.player);
    // this.group.add(this.enemy);

    const touched = (a, b) => {
      console.log('touched');
      // console.log(a);
      // console.log(b);
    };

    // this.physics.add.collider(this.group, this.group);
    this.physics.collide(this.player, this.enemy, (a, b) => {
      console.log('touched');
      // console.log(a);
      // console.log(b);
    });

    // this.physics.add.collider(this.player, this.enemy, (a,b) => {
    //   console.log('touched')
    //   // console.log(a);
    //   // console.log(b);
    // });
    // this.physics.add.collider(this.player, obstacles);
    // this.physics.add.collider(this.player, botLayer);

    // this.cameras.main.setBounds(0, 0, 100, 60);
    // this.cameras.main.startFollow(this.player);
    // this.cameras.main.roundPixels = true;

    // this.spawns = this.physics.add.group({
    //   classType: Phaser.GameObjects.Zone,
    // });
    // for (let i = 0; i < 30; i++) {
    //   const x = Phaser.Math.RND.between(60, this.physics.world.bounds.width);
    //   const y = Phaser.Math.RND.between(60, this.physics.world.bounds.height);
    //   // console.log({ x, y });
    //   this.spawns.create(x, y, undefined, 20);
    // }

    // // Enemy collider / colisor de inimigos
    // this.physics.add.overlap(
    //   this.player,
    //   this.spawns,
    //   this.overlapEnemy,
    //   undefined,
    //   this,
    // );
    // setTimeout(
      // (() => {console.log('switch');this.scene.switch('BattleScene')})()
      // , 5000);
  }

  overlapEnemy(
    object1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    object2: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ) {
    // we move the zone to some other location
    object2.body.x = Phaser.Math.RND.between(
      0,
      this.physics.world.bounds.width,
    );
    object2.body.y = Phaser.Math.RND.between(
      0,
      this.physics.world.bounds.height,
    );
    // start battle / iniciar batalha

    this.cameras.main.shake(300);

    // switch to BattleScene / ir para a Cena de Batalha (BattleScene)
    this.scene.switch(BattleScene.key);
  }

  update() {
    this.player.update();
  }
}
