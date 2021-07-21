import Phaser from "phaser";
import Bandit from "../objects/Bandit";

export default class Demo extends Phaser.Scene {
  bandit: Phaser.GameObjects.Sprite;
  banditId: string;
  cursorKeysPressed: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("logo", "assets/sample1.png");
    this.banditId = Bandit.preload(this);
    this.cursorKeysPressed = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 250, "logo");
    this.bandit = this.add.sprite(450, 400, this.banditId);
    this.bandit.play("run");
  }
}
