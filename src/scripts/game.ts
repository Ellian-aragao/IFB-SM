import 'phaser';

class BattleScene extends Phaser.Scene {
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

class Enemy extends Phaser.GameObjects.Sprite {
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

class Player extends Phaser.GameObjects.Sprite {
  static readonly key = 'player';
  static readonly texture = 'assets/player.png';
  static readonly frames = {
    frameWidth: 16,
    frameHeight: 16,
  };

  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  spawns: Phaser.Physics.Arcade.Group;
  private readonly animations: Phaser.Types.Animations.Animation[] = [
    {
      key: 'down',
      frames: this.anims.generateFrameNumbers(Player.key, {
        frames: [0, 1, 0, 2],
      }),
      frameRate: 10,
      repeat: -1,
    },
    {
      key: 'right',
      frames: this.anims.generateFrameNumbers(Player.key, {
        frames: [3, 4, 3, 5],
      }),
      frameRate: 10,
      repeat: -1,
    },
    {
      key: 'left',
      frames: this.anims.generateFrameNumbers(Player.key, {
        frames: [8, 7, 8, 6],
      }),
      frameRate: 10,
      repeat: -1,
    },
    {
      key: 'up',
      frames: this.anims.generateFrameNumbers(Player.key, {
        frames: [9, 10, 9, 11],
      }),
      frameRate: 10,
      repeat: -1,
    },
  ];

  constructor(public scene: Scene, x: number, y: number) {
    super(scene, x, y, Player.texture);
  }

  create() {
    this.player = this.scene.physics.add.sprite(this.x, this.y, Player.key, 0);
    this.player.setCollideWorldBounds(true);
    this.animations.forEach((anims) => this.scene.anims.create(anims));
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.body.setVelocity(0, 0);
    this.move();
  }

  private move() {
    const [minus, plus] = [-80, 80];
    const hasPressed = [
      { eixo: 'x', direction: 'left', value: minus },
      { eixo: 'x', direction: 'right', value: plus },
      { eixo: 'y', direction: 'up', value: minus },
      { eixo: 'y', direction: 'down', value: plus },
    ]
      .filter((key) => this.cursors[key.direction].isDown)
      .map((cursor) => {
        cursor.eixo === 'x'
          ? this.player.body.setVelocityX(cursor.value)
          : this.player.body.setVelocityY(cursor.value);
        this.animation(cursor.direction);
        return cursor;
      }).length;

    if (!hasPressed) this.animation();
  }

  private animation(direction?: string) {
    if (!direction) {
      this.player.anims.stop();
      return;
    }
    this.player.anims.play(direction, true);
  }
}

class WorldScene extends Phaser.Scene {
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
  }
  update() {
    this.player.update();
  }
}

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('tiles', 'assets/map/spritesheet.png');

    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    this.load.spritesheet(Player.key, Player.texture, Player.frames);
    this.load.spritesheet('enemies', 'assets/enemies.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('background', 'assets/ground.png');
  }

  create() {
    this.scene.start(WorldScene.key);
  }
}

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [BootScene, WorldScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
