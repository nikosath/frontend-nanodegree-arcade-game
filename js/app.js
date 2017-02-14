var NUM_COLS = 5;
var NUM_ROWS = 6;
var X_STEP = 101;
var Y_STEP = 83;
var Y_START_OFFSET = -30;

// abstract parent class for Player and Enemy
// e.g. start_position = {'col': 0, 'row': 3}
var Creature = function(start_position) {
    this.start_position = start_position;
    this.moveStart();
};

// initial/reset placement of the creature on the game level
Creature.prototype.moveStart = function() {
  this.x1 = this.start_position.col * X_STEP;
  this.y1 = this.start_position.row * Y_STEP;
  this.x2 = this.x1 + X_STEP;
  this.y2 = this.y1 + Y_STEP;
};

// Draw the Creature on the screen, required method for game
Creature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x1, this.y1 + Y_START_OFFSET);
};

// Enemies our player must avoid
var Enemy = function(start_position) {
  Creature.call(this, start_position);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Creature.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if the enemy gets completely out of canvas
    if (this.x1 > edgeBounds.right) {
      // move him to his start_position
      this.moveStart();
    } else {
      // move him to the right of his position
      this.x1 += X_STEP * dt;
      this.x2 = this.x1 + X_STEP;
    }

};

var player_start_position = {'col': 2, 'row': 5};
var enemies_start_positions = [
  {'col': -2, 'row': 1},
  {'col': -5, 'row': 1},
  {'col': -1, 'row': 2},
  {'col': -4, 'row': 2},
  {'col': -3, 'row': 3},
  {'col': -1, 'row': 3}
];

var Player = function(start_position) {
  Creature.call(this, start_position);
    // The image/sprite for our players, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Creature.prototype);
Player.prototype.constructor = Player;

// Passes any valid movement (product of an acceptable keypress) to update()
Player.prototype.handleInput = function(movement) {
  if (movement === undefined) {
    return false;
  }
  this.update(movement);
  return true;
};

// stores the edge coordinates for the game level
var edgeBounds = {
  'up': 0,
  'down': NUM_ROWS * Y_STEP,
  'left': 0,
  'right': NUM_COLS * X_STEP
};

// updates Player's coordinates according to the specified movement
Player.prototype.update = function(movement) {
  switch (movement) {
    case 'up':
      if (this.y1 > edgeBounds.up) {
        this.y1 -= Y_STEP;
        this.y2 -= Y_STEP;
      }
      break;
    case 'down':
      if (this.y2 < edgeBounds.down) {
        this.y1 += Y_STEP;
        this.y2 += Y_STEP;
      }
      break;
    case 'left':
      if (this.x1 > edgeBounds.left) {
        this.x1 -= X_STEP;
        this.x2 -= X_STEP;
      }
      break;
    case 'right':
      if (this.x2 < edgeBounds.right) {
        this.x1 += X_STEP;
        this.x2 += X_STEP;
      }
      break;
    default:
      // do nothing
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var num_enemies = enemies_start_positions.length;
var allEnemies = [];
var enm;
for (enm = 0; enm < num_enemies; enm += 1) {
  allEnemies[enm] = new Enemy(enemies_start_positions[enm]);
}
var player = new Player(player_start_position);

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
