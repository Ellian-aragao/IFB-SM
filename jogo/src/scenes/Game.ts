import Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  bandit: any;
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("logo", "assets/sample1.png");
    this.bandit = this.load.spritesheet("bandit", "assets/axe_bandit_run.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.cursorKeysPressed = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 250, "logo");
    this.bandit = this.add.sprite(450, 400, "bandit");

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("bandit", {
        frames: [0, 1, 2, 3, 4, 5, 6],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.bandit.play('run');
  }
}
