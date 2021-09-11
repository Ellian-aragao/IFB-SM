import 'phaser';
import BattleScene from './scenes/battlescene';
import BootScene from './scenes/bootscene';
import WorldScene from './scenes/wordscene';

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
  scene: [BootScene, WorldScene, BattleScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
