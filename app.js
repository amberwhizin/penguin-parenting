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

var player;
var blocks;
var cursors;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/images/underwater tileable.png');

  this.load.image('blocks', 'assets/images/waterplant.png');
  this.load.spritesheet('penguin', 'assets/images/tux.png', {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.image('whale', 'assets/images/whale.png');
}

function create() {
  this.add.image(400, 300, 'background');

  blocks = this.physics.add.staticGroup();

  blocks.create(470, 490, 'seaweed').setScale(6).refreshBody();
  //left blocks
  blocks.create(250, 520, 'seaweed').setScale(4).refreshBody();

  // create sprite
  player = this.physics.add.sprite(550, 250, 'penguin');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('penguin', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'penguin', frame: 4 }],
    frameRate: 20,
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('penguin', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, blocks);

  // cursors = this.input.keyboard.createCursorKeys();

  // if (cursors.left.isDown) {
  //   player.setVelocityX(-160);
  //   player.anims.play('left', true);
  // } else if (cursors.right.isDown) {
  //   player.setVelocityX(160);
  //   player.anims.play('right', true);
  // } else {
  //   player.setVelocityX(0);
  //   player.anims.play('turn');
  // }
  // if (cursors.up.isDown && player.body.touching.down) {
  //   player.setVelocityY(-330);
  // }
}
function update() {}
