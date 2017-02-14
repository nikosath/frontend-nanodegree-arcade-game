

var Creature = function(start_position) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.start_position = start_position;
    this.moveStart();
};


// Enemies our player must avoid
var Enemy = function(start_position) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.start_position = start_position;
    this.moveStart();
  // };
  //
};

Enemy.prototype.moveStart = function() {
  // start_col = this.start_position['col'];
  // start_row = this.start_position['row'];
  this.x1 = this.start_position['col'] * X_STEP;
  this.y1 = this.start_position['row'] * Y_STEP;
  // this.y1 = this.start_position['row'] * Y_STEP + Y_START_OFFSET;

  this.x2 = this.x1 + X_STEP;
  this.y2 = this.y1 + Y_STEP;
};

// Enemy.prototype.moveStart = function() {
//
//   this.x1 = start_col * X_STEP;
//   this.y1 = start_row * Y_STEP;
//   this.y1 = start_row * Y_STEP + Y_START_OFFSET;
//   this.x2 = this.x1 + X_STEP;
//   this.y2 = this.y1 + Y_STEP;
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // this.x1 += X_STEP * dt;
    // this.x1 = (this.x1 > (NUM_COLS*X_STEP)) ? -X_STEP : this.x1 + (X_STEP * dt);

    // if the enemy gets completely out of canvas
    if (this.x1 > edgeBounds['right']) {
      // move him out of sight, on the left side of canvas
      // this.x1 = -X_STEP;
      // this.x2 = this.x1 + X_STEP;
      this.moveStart();
    } else {
      // move him to the right of his position
      this.x1 += X_STEP * dt;
      this.x2 = this.x1 + X_STEP;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x1, this.y1 + Y_START_OFFSET);
};

var NUM_COLS = 5;
var NUM_ROWS = 6;
// var CANVAS_WIDTH = 505;
// var CANVAS_HEIGHT = 606;
// var X_STEP = CANVAS_WIDTH / NUM_COLS;
// var Y_STEP = CANVAS_HEIGHT / NUM_ROWS;
var X_STEP = 101;
var Y_STEP = 83;
var Y_START_OFFSET = -30;
var player_start_position = {'col': 2, 'row': 5};
var enemies_start_positions = [
  {'col': -2, 'row': 1},
  {'col': -5, 'row': 1},
  {'col': -1, 'row': 2},
  {'col': -4, 'row': 2},
  {'col': -3, 'row': 3},
  {'col': -1, 'row': 3}
];
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(start_position) {
  this.sprite = 'images/char-boy.png';
  this.start_position = start_position;
  this.moveStart();
};

Player.prototype.moveStart = function() {
  // start_col = this.start_position['col'];
  // start_row = this.start_position['row'];
  this.x1 = this.start_position['col'] * X_STEP;
  this.y1 = this.start_position['row'] * Y_STEP;
  // this.y1 = this.start_position['row'] * Y_STEP + Y_START_OFFSET;

  this.x2 = this.x1 + X_STEP;
  this.y2 = this.y1 + Y_STEP;
};

Player.prototype.handleInput = function(movement) {
  if (movement === undefined) {
    return false;
  }
  this.update(movement);
  return true;
};

var edgeBounds = {
  'up': 0,
  'down': NUM_ROWS * Y_STEP,
  // 'down': ((NUM_ROWS - 1) * Y_STEP) + Y_START_OFFSET,
  'left': 0,
  'right': NUM_COLS * X_STEP
  // 'right': (NUM_COLS - 1) * X_STEP
};
Player.prototype.update = function(movement) {
  switch (movement) {
    case 'up':
      if (this.y1 > edgeBounds['up']) {
        this.y1 -= Y_STEP;
        this.y2 -= Y_STEP;
      }
      break;
    case 'down':
      if (this.y2 < edgeBounds['down']) {
        this.y1 += Y_STEP;
        this.y2 += Y_STEP;
      }
      break;
    case 'left':
      if (this.x1 > edgeBounds['left']) {
        this.x1 -= X_STEP;
        this.x2 -= X_STEP;
      }
      break;
    case 'right':
      if (this.x2 < edgeBounds['right']) {
        this.x1 += X_STEP;
        this.x2 += X_STEP;
      }
      break;
    default:
      // do nothing
  }

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x1, this.y1 + Y_START_OFFSET);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var NUM_ENEMIES = enemies_start_positions.length;
var allEnemies = [];
var e;
for (e = 0; e < NUM_ENEMIES; e += 1) {
  allEnemies[e] = new Enemy(enemies_start_positions[e]);
}
var player = new Player(player_start_position);
// player.moveStart();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
