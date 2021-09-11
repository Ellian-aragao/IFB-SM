import { Scene } from 'phaser';
import SpriteUser from './SpriteUser';

export default class Player extends Phaser.GameObjects.Sprite {
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
