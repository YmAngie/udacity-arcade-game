var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -120;
    this.y = [60, 140, 220][Math.floor(Math.random() * 3)];
    this.speed = Math.random() * (310 - 120) + 120;
};

Enemy.prototype.update = function(dt) {
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

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.reset();
    this.xStep = 505 / 5;
    this.yStep = (535 - 40) / 6
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


var player = new Player();
var allEnemies = [];

var userEnemyCount = prompt('How many Enemies will you prefer?', 'Insert a number from 1 to 7');
var enemyCount;

if (!isNaN(userEnemyCount) && userEnemyCount !== '') {
    enemyCount = parseInt(userEnemyCount, 10);
} else {
    enemyCount = 3;
}

for (i = 1; i <= enemyCount; i++) {
    allEnemies.push(new Enemy());
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
