// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = -120;
    }

    if (player.y + 50 > this.y && player.y < this.y + 5) {
        if (player.x + 50 > this.x && player.x < this.x + 5) {
            alert('Wasted');
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.xStep = 505 / 5;
    this.yStep = (535 - 40) / 6
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left' && !(this.x < 50)) {
        this.x -= this.xStep;
    } else if (keyCode === 'up' && !(this.y < 50)) {
        this.y -= this.yStep;
    } else if (keyCode === 'right' && !(this.x > 400)) {
        this.x += this.xStep;
    } else if (keyCode === 'down' && !(this.y > 350)) {
        this.y += this.yStep;
    }
    
    if (this.y < 50) {
        alert('You win');
        player.reset();
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Enemy1 = new Enemy(-120, 140, 250);
var Enemy2 = new Enemy(-120, 220, 130);
var Enemy3 = new Enemy(-120, 60, 180);
var allEnemies = [Enemy1, Enemy2, Enemy3];
var player = new Player(200, 380);


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
