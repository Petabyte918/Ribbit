var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
	game.load.image('heart', 'assets/heart.png');
	game.load.image('overlay', 'assets/overlay.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	game.load.spritesheet('overlay_button', 'assets/overlay_button.png', 154, 58);
}

var aKey;
var dKey;
var wKey;

var platforms;
var player;
var cursors;
var stars;
var baddies;

var heart;

var score = 0;
var scoreText;
var maxHealth = 5;
var health = maxHealth;

var maxStars = 12;
var maxBaddies = 5;

var menuText;

var hearts;

var overlapped = false;
var alive = true;

var overlay;
var overlay_button;

var timer;


function create(){	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'sky');
	platforms = game.add.group();
	platforms.enableBody = true;
	alive = true;
	
	var ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	
	var ledge = platforms.create(400, 400, 'ground');
	
	ledge.body.immovable = true;
	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;
	
	player = game.add.sprite(32, game.world.height - 150, 'dude');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;
	
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.animations.add('dead', [9, 10, 11, 12,13, 14, 15, 16, 17], 5, false);
	
	stars = game.add.group();
	stars.enableBody = true;

	for(var i = 0; i < maxStars; i++){
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y = 6;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
	
	baddies = game.add.group();
	baddies.enableBody = true;
	for(var i = 0; i < maxBaddies; i++){
		var baddie = baddies.create(i * 50, 100, 'baddie');
		initBaddie(baddie);
	}

	hearts = game.add.group();
	hearts.enableBody = true;
	for(var i = 0; i < maxHealth; i++){
		var heart = hearts.create(17 + (i * 35), 60, 'heart');
	}
	
	scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});
	cursors = game.input.keyboard.createCursorKeys();
	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	
	overlay = game.add.sprite(267, 170, 'overlay');
	menuText = game.add.text(325, 192, '', {fontSize: '32px', fill: '#000'});
	overlay_button = game.add.button(323, 231, 'overlay_button', restartGame, this, 1, 0, 1);
	menuText.visible = false;
	overlay_button.visible = false;
	overlay.visible = false;
	
	timer = game.time.create(false);
	timer.loop(1000, baddieJump, this);
	timer.start();
}

function baddieJump(){
	var index = Math.floor(Math.random() * baddies.children.length);
	var baddie = (baddies.children[index]);
	if(baddie.body.touching.down){
		baddie.body.velocity.y = -200;
	}
}

function initBaddie(baddie){
		relocateBaddie(baddie);
		//baddie.body.onWorldBounds = new Phaser.Signal();
		baddie.animations.add('left', [0, 1], 10, true);
		baddie.animations.add('right', [2, 3], 10, true);
		if(Math.random() >=.5){
				baddieDirection(baddie, 'left')
		} else {baddieDirection(baddie, 'right')}
		baddie.body.velocity.y = (Math.random() * 100);
		if(Math.random() >=.5){baddie.body.velocity.y = -baddie.body.velocity.y}
}

function relocateBaddie(baddie){
	baddie.x = (Math.random() * 700) + 50;
	baddie.y = -50;
	baddie.body.gravity.y = 100;
	baddie.body.velocity.y = 1000;
	game.physics.arcade.overlap(baddie, platforms, relocateBaddie, null, this);
}

function baddieDirection(baddie, dir){
	if(dir === 'left'){
		baddie.animations.play('left');
		baddie.body.velocity.x = -(30 + (20 * Math.random())) ;
	} else if(dir === 'right'){
		baddie.animations.play('right');
		baddie.body.velocity.x = 30 + (20 * Math.random());
	}
}

function update(){
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(baddies, platforms);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	//game.physics.arcade.collide(, platforms);
	
	overlapped = game.physics.arcade.overlap(player, baddies, hitBaddies, null, this);
		
	player.body.velocity.x = 0;
		
	if(alive){	
		if(cursors.left.isDown || aKey.isDown){
			player.body.velocity.x = -150;
			player.animations.play('left');
		} else if(cursors.right.isDown || dKey.isDown){	
			player.body.velocity.x = 150;
			player.animations.play('right');
		}else{
			player.animations.stop();
			player.frame = 4;
		}
		
		if((cursors.up.isDown || wKey.isDown)&& player.body.touching.down){
			player.body.velocity.y = -350;
		}
	}
	
	for (var i = 0; i < baddies.children.length; i++) {
		var baddie = baddies.children[i];
		if(baddie.x < 50){
			baddieDirection(baddie, 'right');
		} else if(baddie.x > 700){
			baddieDirection(baddie, 'left');
		}
	}
}

function restartGame(){
	score = 0;
	health = maxHealth;
	player.x = 32;
	player.y = game.world.height - 150;
	alive = true;
	hearts.removeAll();
	for(var i = 0; i < maxHealth; i++){
		var heart = hearts.create(17 + (i * 35), 60, 'heart');
	}
	stars.removeAll();
	for(var i = 0; i < maxStars; i++){
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y = 6;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
	baddies.removeAll();
	for(var i = 0; i < maxBaddies; i++){
		var baddie = baddies.create(i * 50, 100, 'baddie');
		initBaddie(baddie);
	}
	menuText.visible = false;
	overlay_button.visible = false;
	overlay.visible = false;
	scoreText.text = 'Score: ' + score;
}

function showMenu(status){
	menuText.visible = true;
	overlay_button.visible = true;
	overlay.visible = true;
	if(status === 'lose'){
		menuText.text = "YOU LOSE";
	} else if(status === 'win'){
		alive = false;
		player.animations.stop();
		player.frame = 4;
		menuText.text = "YOU WIN!";
	}
}

function playerDied(){
	alive = false;
	player.animations.play('dead');
	player.animations.currentAnim.onComplete.add(function() {showMenu('lose');}, this);
}

function hitBaddies(){
	if((overlapped === false) && (alive)){
		health -= 1;
		hearts.remove(hearts.children[health]);
		overlapped = true;
		if(health == 0){
				playerDied();
		}
	}
}

function collectStar(player, star){
	star.kill();
	score += 10;
	scoreText.text = 'Score: ' + score;
	if(score >= 10 * maxStars){
		showMenu('win');
	}
}
