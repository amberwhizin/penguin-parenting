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

var game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/images/underwater tileable.png');
  this.load.image('block', 'assets/images/waterplant.png');
  this.load.image('penguin', 'assets/images/lr_penguin2.png');
  this.load.image('whale', 'assets/images/whale.png');
}

var block;
var penguin;

function create() {
  this.add.image(400, 300, 'background');

  block = this.physics.add.staticGroup();

  //middle block
  block.create(470, 490, 'seaweed').setScale(6).refreshBody();
  //left block
  block.create(250, 520, 'seaweed').setScale(4).refreshBody();
  block.create(90, 420, 'penguin').setScale(2).refreshBody();
  this.add.image(700, 300, 'whale').setScale(2).refreshBody();
}
function update() {}
