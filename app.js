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
var killerWhales;
var scoreText;
var score = 0;
var gameOver = false;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/images/underwater tileable.png');
  this.load.image('ground', 'assets/images/beach_sand.png');
  this.load.image('rock', 'assets/images/large_rock.png');
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

  blocks.create(670, 530, 'rock').setScale(5).refreshBody();
  this.add.image(550, 530, 'seaweed').setScale(3);
  //left blocks
  blocks.create(250, 520, 'rock').setScale(5).refreshBody();
  this.add.image(350, 540, 'seaweed').setScale(3);
  blocks.create(450, 540, 'rock').setScale(4).refreshBody();

  // var whale = this.add.group([
  //   {
  //     key: 'whale',
  //     frames: 0,
  //     repeat: 2,
  //     setXY: { x: 3, y: 190, stepX: 120 },
  //   },
  //   {
  //     key: 'whale',
  //     frames: [0, 1, 3],
  //     repeat: 1,
  //     setXY: { x: 2, y: 140, stepX: 140 + 40, stepY: 80 },
  //   }
  // ]);
  // Phaser.Actions.IncX(whale.getChildren(), 500);

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
    frameRate: 10,
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

  killerWhales = this.physics.add.group();

  // location of text, default score...
  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000',
  });

  // boundaries for penguin
  this.physics.add.collider(player, blocks);
  this.physics.add.collider(player, platforms);

  // boundaries for fish
  this.physics.add.collider(food, blocks);
  // does this work?
  this.physics.add.collider(food, platforms);

  //boundaries for enemy whales
  this.physics.add.collider(killerWhales, blocks);
  this.physics.add.collider(killerWhales, platforms);

  //checks if there was an overlap between any food and the player, if there is then use the collectFood func
  this.physics.add.overlap(player, food, collectFood, null, this);
  this.physics.add.collider(player, killerWhales, hitWhale, null, this);
}

function update() {
  if (gameOver) {
    return;
  }
  if (cursors.left.isDown) {
    player.setVelocityX(-170);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(170);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  // water effect
  if (cursors.up.isDown) {
    player.setVelocityY(-220);
  }
  if (cursors.down.isDown) {
    player.setVelocityY(150);
  }
}
function collectFood(player, fish) {
  fish.disableBody(true, true);

  score += 1;
  scoreText.setText('Score: ' + score);

  // killer whale logic...
  // release the whales

  if (food.countActive(true) === 0) {
    food.children.iterate(function (child) {
      // bring back the fish, and reset y position 0
      child.enableBody(true, child.x, 0, true, true);
    });
    // killerWhales == death
    // where, whales will apear - random x - must be opposite side of screen to player
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    // then create whale from killerWhales
    var whale = killerWhales.create(x, 16, 'whale');
    whale.setBounce(1);
    whale.setCollideWorldBounds(false);
    whale.setVelocity(Phaser.Math.Between(-200, 200), 20);
    whale.allowGravity = false;
  }
}

function hitWhale(player, whale) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');

  gameOver = true;
}
