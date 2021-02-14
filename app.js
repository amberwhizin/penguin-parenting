var config = {
  type: Phaser.Auto,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var block;
var player;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/images/underwater tileable.png');
  this.load.image('block', 'assets/images/waterplant.png');
  this.load.spritesheet('penguin', 'assets/images/lr_penguin2.png', {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.image('whale', 'assets/images/whale.png');
}

function create() {
  this.add.image(400, 300, 'background');

  block = this.physics.add.staticGroup();

  block.create(470, 490, 'seaweed').setScale(6).refreshBody();
  //left block
  block.create(250, 520, 'seaweed').setScale(4).refreshBody();

  player = this.physics.add.sprite(100, 450, 'penguin');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
}
function update() {}
