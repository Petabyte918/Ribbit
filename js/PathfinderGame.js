/// <reference path="phaser.js" />
var top_down = top_down || {};

top_down.Game = function(){};


var homeMenu;
var playGame;
var controls;
var greenVolume;
var greenHelp;

var level;
var locked = [12];

var gameMenu;
var menuButton;
var resumeButton;
var helpButton;
var volumeButton;
var restartButton;
var levelSelect;
var helpMenu;
var background;
var popup;
var logo;
var home;

var wKey;
var aKey;
var sKey;
var dKey;

var frog;
var tongue;
var tongueMarker;


var rockGroup;
var tongueArray = [];

var anchorX = -1;
var anchorY = -1;

var tongueAnchored;
var tongueBeingRetracted;
var constraints = [];

var frogCG;
var blockedCG;
var markerCG;
var rockCG;

var marker;
var markerGroup;
var distanceBetweenFrogAndRock;
var wallAnchor;

var markerX;
var markerY;

var rockPlacement = [200, 1400, 600, 1400, 400, 1200, 500, 1100];


function tongueRetracted(){
	if(tongueBeingRetracted){
		tongueMarker.body.velocity.x = 0;
		tongueMarker.body.velocity.y = 0;
		tongueMarker.body.x = frog.body.x + 42;
		tongueMarker.body.y = frog.body.y + 32;
	}
	tongueBeingRetracted = false;
}

function tongueHitSomethingElse(){
	tongueMarker.body.velocity.x = 0;
	tongueMarker.body.velocity.y = 0;
	//retract tongue
	top_down.game.physics.arcade.moveToXY(tongueMarker, frog.body.x, frog.body.y, 800);
	tongueBeingRetracted = true;
}

function tongueHitRock(){
	tongueAnchored = true;
	//tongueMarker.visibility = false;
	//top_down.game.physics.arcade.moveToXY(tongueMarker, frog.body.x, frog.body.y, 1);
	tongueMarker.body.x = frog.x + 42;
	tongueMarker.body.y = frog.y + 32;
	tongueMarker.body.velocity.x = 0;
	tongueMarker.body.velocity.y = 0;

	
}

function updateTonguePoints(){
	
	var startX = frog.x + 42;
	var startY = frog.y + 32;
	var dx;
	var dy;
	if(tongueAnchored){
		dx = (startX - wallAnchor.x);
		dy = (startY - wallAnchor.y);
	} else {
		dx = (startX - markerX);
		dy = (startY - markerY);
	}

	console.log(dx, dy);
	
	tongue.reset(frog.x + 42, frog.y + 32);
	tongueArray[0].x = -20;
	tongueArray[0].y = -20;
	tongueArray[1].x = -dx;
	tongueArray[1].y = -dy;
}	

function extendTongue(destX, destY){
	tongueMarker.visibility = true;
	tongueArray[1].x = 0;
	tongueArray[1].y = 0;
	anchorX = destX;
	anchorY = destY;
	tongueAnchored = false;
	tongueMarker.x = frog.x + 42;
	tongueMarker.y = frog.y + 22;
	top_down.game.physics.arcade.moveToXY(tongueMarker, anchorX, anchorY, 800);
}





function screenClicked(){
	var clickedWorldX = getClickedWorldX();
	var clickedWorldY = getClickedWorldY();
	console.log("x:" + clickedWorldX + ", y:" + clickedWorldY);
}

function getClickedWorldX(){return top_down.game.input.x + top_down.game.camera.x;}

function getClickedWorldY(){return top_down.game.input.y + top_down.game.camera.y;}


function clearConstraints(){
	for(var i = 0; i < constraints.length; i++){
		top_down.game.physics.p2.removeConstraint(constraints[i]);
	}
	constraints = [];
}


function markerHitRock(marker, rock){
	markerX = rock.x;
	markerY = rock.y;
	marker.sprite.kill();
	wallAnchor = markerGroup.create(markerX, markerY, 'tongue');
	top_down.game.physics.p2.enable(wallAnchor);
	wallAnchor.body.static = true;
	console.log("marker hit rock");
	tongueAnchored = true;
	distanceBetweenFrogAndRock = Math.sqrt(((rock.x - frog.x)*(rock.x - frog.x)) + ((rock.y - frog.y)*(rock.y - frog.y)));
	//constraints.push(top_down.game.physics.p2.createDistanceConstraint(frog, wallAnchor, distanceBetweenFrogAndRock, 100000));
}


function moveObjToXY(obj, x, y, speed){
	var angle = Math.atan2(y - obj.body.y, x - obj.body.x)
	obj.body.velocity.x = Math.cos(angle) * speed;
	obj.body.velocity.y = Math.sin(angle) * speed;
}

function shootMarker(destX, destY){
	marker = markerGroup.create(frog.x, frog.y, 'tongue', 3);
	top_down.game.physics.p2.enable(marker);
	var markerAngle = Math.atan2(top_down.game.camera.y + destY - frog.y, top_down.game.camera.x + destX - frog.x);
	console.log(markerAngle);
	marker.body.angle = markerAngle;
	marker.body.setCollisionGroup(markerCG);
	marker.body.collides([rockCG]);
	marker.body.createGroupCallback(rockCG, markerHitRock, this);
	marker.body.data.gravityScale = 0;
	moveObjToXY(marker, destX, destY, 800);
}

function rockClicked(){
	/**
	extendTongue(getClickedWorldX(), getClickedWorldY());
	**/
	console.log("rock clicked");
	shootMarker(getClickedWorldX(), getClickedWorldY());
}


function initRocks(){
	rockGroup = top_down.game.add.group();
	var tempRock;		
	for(var i = 0; i < rockPlacement.length; i += 2){
		tempRock = rockGroup.create(rockPlacement[i], rockPlacement[i+1], 'rock1')
		top_down.game.physics.p2.enable(tempRock);
		tempRock.inputEnabled = true;
		tempRock.enableBody = true;
		tempRock.body.static = true;
		tempRock.events.onInputDown.add(rockClicked, this);
		top_down.game.physics.p2.enable(tempRock);
		tempRock.body.setCollisionGroup(rockCG);
		tempRock.body.collides([markerCG]);
	}
}

function initControls(){
	wKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.W);
	aKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.A);
	sKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.D);
}

/*called by update function to check/handle any controls being pressed*/
function checkControls(){
		if(wKey.isDown){
			top_down.game.camera.y -= 10;
		}
		if(aKey.isDown){
			top_down.game.camera.x -= 10;
			frog.body.velocity.x = 0
		}
		if(sKey.isDown){
			top_down.game.camera.y += 10;
			frog.body.velocity.x = 100;
		}
		if(dKey.isDown){
			top_down.game.camera.x += 10;
		}	
}

var flag = true;
top_down.Game.prototype = {
	
	create: function(){		
		
		homeCreate();
		
		/*
			if(flag){
		logo.alpha = 0;
		homeMenu.alpha = 0;
		playGame.alpha = 0;

		controls.alpha = 0;

		greenVolume.alpha = 0;

		greenHelp.alpha = 0;
		flag = false;
		this.add.tween(logo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, -1, false);
		this.add.tween(homeMenu).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 2000, -1, false);
		this.add.tween(playGame).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 2000, -1, false);
		this.add.tween(controls).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 2000, -1, false);
		this.add.tween(greenVolume).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 2000, -1, false);
		this.add.tween(greenHelp).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 2000, -1, false);
		}
		*/
				initControls();
		
	},
	
	update: function(){
		checkControls(); //checks if controls have been pressed
		clearConstraints();
		if(tongueAnchored){
			console.log(distanceBetweenFrogAndRock);
			if(distanceBetweenFrogAndRock >= 40){
				distanceBetweenFrogAndRock -= 3;
			}
			console.log(distanceBetweenFrogAndRock);
			constraints.push(this.game.physics.p2.createDistanceConstraint(frog, wallAnchor, distanceBetweenFrogAndRock));
			console.log(constraints);
		} else {
			
		}
	
		if (menuButton != null){
			console.log("Menu Button: " + menuButton);
			menuButton.x = top_down.game.camera.x + 768 - 58;
			menuButton.y = top_down.game.camera.y + 512  - 58;

		}
	}
}

function createGame(){
		top_down.game.physics.startSystem(Phaser.Physics.P2JS); //start physics system
		top_down.game.physics.p2.setImpactEvents(true);
		top_down.game.physics.p2.gravity.y = 1400; //set up world gravity
		
		//set up tilemap and layers
		top_down.game.map = top_down.game.add.tilemap('test_map');
		top_down.game.map.addTilesetImage('spritesheet2','tiles2');
		top_down.game.backgroundLayer = top_down.game.map.createLayer('background_nc');
		top_down.game.blockedLayer = top_down.game.map.createLayer('twig_c');
		top_down.game.map.setCollisionBetween(0, 1000, true, 'twig_c');
	
		top_down.game.input.onDown.add(screenClicked, top_down.game); //listen for the screen to be be clicked
		
		//set up collision groups
		frogCG = top_down.game.physics.p2.createCollisionGroup();
		blockedCG = top_down.game.physics.p2.createCollisionGroup();
		markerCG = top_down.game.physics.p2.createCollisionGroup();
		rockCG = top_down.game.physics.p2.createCollisionGroup();
		
		initRocks(); //spawn rock objects
		initControls(); //tell Phaser to look for key presses
		
		//make all tiles in the blocked layer impassable
		var blockedLayerTiles = top_down.game.physics.p2.convertTilemap(top_down.game.map, top_down.game.blockedLayer);
		for(var i = 0; i < blockedLayerTiles.length; i++){
			blockedLayerTiles[i].setCollisionGroup(blockedCG);
			blockedLayerTiles[i].collides([frogCG]);
		}
		
		//set up frog and frog physics
		frog = top_down.game.add.sprite(160, 1400, 'frog'); //add frog to game
		top_down.game.physics.p2.enable(frog); //give the frog physics
		frog.enableBody = true;
		frog.body.mass = 4;
		frog.body.setCollisionGroup(frogCG);
		frog.body.collides([blockedCG]);
		
		
		
		tongueArray.push(new Phaser.Point(0, 0));
		tongueArray.push(new Phaser.Point(0, 0));
		tongue = top_down.game.add.rope(frog.x, frog.y, 'tongue', null, tongueArray);
		tongue.updateAnimation = function(){
			updateTonguePoints();
		};
		
		tongueAnchored = false;
		tongueBeingRetracted = true;
		
		markerGroup = top_down.game.add.group(); //sets up a group for our tongue markers
		
		top_down.game.backgroundLayer.resizeWorld(); //make world the size of background tile map

		//adjust starting camera position
			
		top_down.game.camera.x = 0;
		top_down.game.camera.y = 1200;
		
		menuButton = top_down.game.add.sprite(top_down.game.camera.x - 58, top_down.game.camera.y - 58, 'menu');
		menuButton.inputEnabled = true;
		menuButton.events.onInputDown.add(menuCreate, this);
		
		
	}

function newGame(){
	kill();

}

function menuCreate(){
	homeMenu = top_down.game.add.sprite(top_down.game.camera.x + 380 - (332/2), top_down.game.camera.y + 256 - 128, 'popup');
	resumeButton = top_down.game.add.sprite(top_down.game.camera.x + 380 - 29, top_down.game.camera.y + 256 - 24, 'resume');
	restartButton = top_down.game.add.sprite(top_down.game.camera.x + 380 + 29, top_down.game.camera.y + 256 - 24, 'restart');
	volumeButton = top_down.game.add.sprite(top_down.game.camera.x + 380 - 29, top_down.game.camera.y + 256 + 48, 'volumeOn');
	home = top_down.game.add.sprite(top_down.game.camera.x + 380 + 29, top_down.game.camera.y + 256 + 48, 'home');
	resumeButton.inputEnabled = true;
	resumeButton.events.onInputDown.add(menuKill, this);
	homeMenu.inputEnabled = true;
	homeMenu.events.onInputDown.add(goHome, this);
	volumeButton.inputEnabled = true;
	volumeButton.events.onInputDown.add(swapVolume, this);
	restartButton.inputEnabled = true;
	restartButton.events.onInputDown.add(restartLevel, this);
}

function homeCreate(){
	top_down.game.camera.x = 0;
	top_down.game.camera.y = 0;
	
	background = top_down.game.add.sprite(0, 0, 'background');
	homeMenu = top_down.game.add.sprite(380 - (332/2), 256 - (128/2), 'popup');
	playGame = top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91, 'playGame');
	controls = top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91 + 41, 'controls');
	greenVolume = top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91 + 82, 'greenOn');
	greenHelp= top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91 + 123, 'greenHelp');
	logo = top_down.game.add.sprite(380 - (500/8), 256 - (500/2), 'logo');
	logo.scale.setTo(logo.scale.x/3, logo.scale.y/3);
	
	playGame.inputEnabled = true;
	controls.inputEnabled = true;
	greenVolume.inputEnabled = true;
	greenHelp.inputEnabled = true;
	playGame.events.onInputDown.add(levelStage, this);
	controls.events.onInputDown.add(showControl, this);
	greenVolume.events.onInputDown.add(swapGreenVolume, this);
	greenHelp.events.onInputDown.add(showHelp, this);
}

function goHome(){
	//kill();
	greenNum = 0;
	volNum = 0;
	homeCreate();
}

function menuKill(){
	homeMenu.destroy();
	resumeButton.destroy();
	restartButton.destroy();
	volumeButton.destroy();
	home.destroy();
}

function kill(){
	homeMenu = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	playGame = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	controls = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	greenVolume = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	greenHelp = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	gameMenu = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	menuButton = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	resumeButton = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	helpButton = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	volumeButton = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	restartButton = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	levelSelect = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	helpMenu = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	background = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	popup = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	logo = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');
	home = top_down.game.add.sprite(380 - (332/2), 256 - 128, 'popup');

	/*
	homeMenu.destroy();
	playGame.destroy();
	controls.destroy();
	greenVolume.destroy();
	greenHelp.destroy();

	gameMenu.destroy();
	menuButton.destroy();
	resumeButton.destroy();
	helpButton.destroy();
	volumeButton.destroy();
	restartButton.destroy();
	levelSelect.destroy();
	helpMenu.destroy();
	background.destroy();
	popup.destroy();
	logo.destroy();
	home.destroy();
	*/
}
var volNum = 0;
function swapVolume(){
	volumeButton.destroy();
	if (volNum%2 == 0){
	volumeButton = top_down.game.add.sprite(380 - 29, 256 + 48, 'volumeOff');
	}else{
	volumeButton = top_down.game.add.sprite(380 - 29, 256 + 48, 'volumeOn');
	}
	volNum++;
	volumeButton.inputEnabled = true;
	volumeButton.events.onInputDown.add(swapVolume, this);
}
var greenNum = 0
function swapGreenVolume(){
	greenVolume.destroy();
	if (greenNum%2 == 0){
	greenVolume = top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91 + 82, 'greenOff');
	}else{
	greenVolume = top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91 + 82, 'greenOn');
	}
	greenNum++;
	greenVolume.inputEnabled = true;
	greenVolume.events.onInputDown.add(swapGreenVolume, this);
}

function showControl(){
	homeMenu.destroy();
	homeMenu = top_down.game.add.sprite(380 - (332/2), 256 - (128/2), 'controlScreen');
	home = top_down.game.add.sprite(380 + 29, 256 + 135, 'home');
	home.inputEnabled = true;
	home.events.onInputDown.add(goHome, this);
	
}

function showHelp(){
	homeMenu.destroy();
	homeMenu = top_down.game.add.sprite(380 - (332/2), 256 - (128/2), 'helpScreen');
	home = top_down.game.add.sprite(380 + 29, 256 + 135, 'home');
	home.inputEnabled = true;
	home.events.onInputDown.add(goHome, this);
}

function restartLevel(){
	kill();
	createGame();
}

function levelStage(){
	kill();
	background = top_down.game.add.sprite(0, 0, 'levelSelect');
	
	level = top_down.game.add.sprite(70, 87, 'lvlone');
	
	for(var i = 0; i < 3; i++){
		locked[i] = top_down.game.add.sprite(160*i + 30 + 200, 87 , 'lock');
	}
	level[4] = top_down.game.add.sprite(70, 87 + 120, 'lock');
	
	for (var i = 0; i < 3; i++){
		locked[i + 4] = top_down.game.add.sprite(160*i + 30 + 200, 87 + 120 , 'lock');
	}
	
	level[8] = top_down.game.add.sprite(70, 87 + 240, 'lock');
	
	for (var i = 0; i < 3; i++){
		locked[i + 8] = top_down.game.add.sprite(160*i + 30 + 200, 87 + 240 , 'lock');
	}
	
	
	level.inputEnabled = true;
	level.events.onInputDown.add(createGame, this);
	
	home = top_down.game.add.sprite(20, 20, 'home');
	home.inputEnabled = true;
	home.events.onInputDown.add(goHome, this);
}