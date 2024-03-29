import { Scene } from "phaser";

export default class Bandit extends Phaser.GameObjects.Sprite {
  static readonly bandit = "Bandit";
  static readonly srcImage = "/assets/axe_bandit_run.png";
  static readonly move = 8;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, Bandit.bandit);
    this.setTexture(Bandit.bandit);
    this.setPosition(x, y);
  }

  private static animation(scene: Scene) {
    scene.anims.create({
      key: "run",
      frames: scene.anims.generateFrameNumbers(this.bandit, {
        frames: [0, 1, 2, 3, 4, 5, 6],
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  static preload(scene: Scene): string {
    scene.load.spritesheet(Bandit.bandit, Bandit.srcImage, {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.animation(scene);
    return Bandit.bandit;
  }

  move(keypressed: Phaser.Types.Input.Keyboard.CursorKeys): void {
    if (keypressed.up.isDown) {
      console.log("up");

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
    this.anims.play("walk");
    this.scene.anims.play("walk", this);
    // this.y -= Bandit.move;
  }
  keyLeft(): void {
    // this.x -= Bandit.move;
  }
  keyDown(): void {
    // this.y += Bandit.move;
  }
  keyRight(): void {
    // this.x += Bandit.move;
  }
}
