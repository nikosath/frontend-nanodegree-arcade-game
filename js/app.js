// Enemies our player must avoid
var Enemy = function(start_col, start_row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = start_col * X_STEP;
    this.y = start_row * Y_STEP + Y_START_OFFSET;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // this.x += X_STEP * dt;
    // this.x = (this.x > (NUM_COLS*X_STEP)) ? -X_STEP : this.x + (X_STEP * dt);

    // if the enemy gets completely out of canvas
    if (this.x > (NUM_COLS*X_STEP)) {
      // move him out of sight, on the left side of canvas
      this.x = -X_STEP;
    } else {
      // move him to the right of his position
      this.x += X_STEP * dt;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var NUM_COLS = 5;
var NUM_ROWS = 6;
var X_STEP = 101;
var Y_STEP = 83;
var Y_START_OFFSET = -30;
// var PLAYER_START_COL = 2;
// var PLAYER_START_ROW = 5;
// var ENEMY_START_COL = 2;
// var ENEMY_START_ROW = 5;
var player_start_position = {'col': 2, 'row': 5};
var enemies_start_positions = [
  {'col': 0, 'row': 1},
  {'col': 1, 'row': 1},
  {'col': 2, 'row': 1}
];
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(start_col, start_row) {
  this.sprite = 'images/char-boy.png';
  this.x = start_col * X_STEP;
  this.y = start_row * Y_STEP + Y_START_OFFSET;
};

Player.prototype.handleInput = function(movement) {
  if (movement === undefined) {
    return false;
  }
  this.update(movement);
  return true;
};

Player.prototype.update = function(movement) {
  switch (movement) {
    case 'up':
      this.y -= Y_STEP;
      break;
    case 'down':
      this.y += Y_STEP;
      break;
    case 'left':
      this.x -= X_STEP;
      break;
    case 'right':
      this.x += X_STEP;
      break;
    default:
      // do nothing
  }

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var NUM_ENEMIES = enemies_start_positions.length;
var allEnemies = [];
var e;
for (e = 0; e < NUM_ENEMIES; e++) {
  allEnemies[e] = new Enemy(
    enemies_start_positions[e]['col'],
    enemies_start_positions[e]['row']
  );
}
var player = new Player(
  player_start_position['col'],
  player_start_position['row']
);

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
