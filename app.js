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
var platforms;
var food;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/images/underwater tileable.png');
  this.load.image('ground', 'assets/images/beach_sand.png');
  this.load.image('seaweed', 'assets/images/waterplant.png');
  this.load.image('fish', 'assets/images/fishies.png');
  this.load.image('whale', 'assets/images/whale.png');
  this.load.spritesheet('penguin1', 'assets/images/penguin.png', {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 655, 'ground').setScale(2).refreshBody();
  this.add.image(400, 300, 'background');

  blocks = this.physics.add.staticGroup();

  blocks.create(470, 490, 'seaweed').setScale(5).refreshBody();
  //left blocks
  blocks.create(250, 520, 'seaweed').setScale(4).refreshBody();

  // create sprite
  player = this.physics.add.sprite(100, 250, 'penguin1');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('penguin1', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'penguin1', frame: 4 }],
    frameRate: 20,
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('penguin1', { start: 5, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  food = this.physics.add.group({
    key: 'fish',
    repeat: 3,
    setXY: { x: 4, y: 0, stepX: 70 },
  });

  food.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
  // location of text, default score...
  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000',
  });

  this.physics.add.collider(player, blocks);
  this.physics.add.collider(player, platforms);

  // does this work?
  this.physics.add.collider(food, blocks);
  this.physics.add.collider(food, platforms);

  //checks if there was an overlap between any food and the player, if there is then use the collectFood func
  this.physics.add.overlap(player, food, collectFood, null, this);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-320);
  }
  if (cursors.down.isDown) {
    player.setVelocityY(220);
  }
}
function collectFood(player, fish) {
  fish.disableBody(true, true);

  score += 1;
  scoreText.setText('Score: ' + score);
}
