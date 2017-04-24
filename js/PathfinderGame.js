/// <reference path="phaser.js" />
var top_down = top_down || {};

top_down.Game = function(){};

var gameState = null;

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
var eKey;

var frog;
var tongue;
var tongueMarker;

var flag = true;


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

var currentMarker;

var marker;
var markerGroup;
var distanceBetweenFrogAndRock;
var wallAnchor;

var markerX;
var markerY;

var tongueOut;

var rockPlacement = [200, 1400, 600, 1400, 400, 1200, 500, 1100, 944, 1236, 886, 981, 553, 750, 1325, 660, 1107, 462, 1436, 280, 870, 1149];

//sounds
var hitWallSound = null;
var fireSound; //not implemented yet
var completeSounds; //not in yet
var selectSound;
var releaseSound;
var tongueSound;
var music;


function updateTonguePoints(){
	var startX = frog.x + 20;
	var startY = frog.y + 20;
	var dx;
	var dy;
	if(tongueAnchored && tongueOut){
		dx = (startX - wallAnchor.x);
		dy = (startY - wallAnchor.y);
	} else {
		if(marker != undefined){
			dx = (startX - marker.x);
			dy = (startY - marker.y);
		} else {
			dx = 20;
			dy = 20;
		}
	}
	
	if(!tongueOut){
		dx = 20;
		dy = 20;
	}
	
	tongue.reset(frog.x + 20, frog.y + 20);
	tongueArray[0].x = -20;
	tongueArray[0].y = -20;
	tongueArray[1].x = -dx;
	tongueArray[1].y = -dy;
}

function screenReleased(){
	tongueBeingRetracted = true;
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

function markerHitBlock(marker, block){
	tongueBeingRetracted = true;
}

function markerHitRock(marker, rock){
	markerX = rock.x;
	markerY = rock.y;
	marker.sprite.kill();
	wallAnchor = markerGroup.create(markerX, markerY, 'ttongue');
	top_down.game.physics.p2.enable(wallAnchor);
	wallAnchor.body.static = true;
	tongueAnchored = true;
	distanceBetweenFrogAndRock = Math.sqrt(((rock.x - frog.x)*(rock.x - frog.x)) + ((rock.y - frog.y)*(rock.y - frog.y)));
}

function moveObjToObj(obj1, obj2, speed){
	var angle = Math.atan2(obj2.y - obj1.body.y, obj2.x - obj1.body.x)
	obj1.body.velocity.x = Math.cos(angle) * speed;
	obj1.body.velocity.y = Math.sin(angle) * speed;
	if(obj1.overlap(obj2)){
		return true;
	}
	return false;
}

function moveObjToXY(obj, x, y, speed){
	var angle = Math.atan2(y - obj.body.y, x - obj.body.x)
	obj.body.velocity.x = Math.cos(angle) * speed;
	obj.body.velocity.y = Math.sin(angle) * speed;
}

function shootMarker(destX, destY){
	tongueOut = true;
	tongueAnchored = false;
	for(var i = 0; i < markerGroup.length; i++){
		markerGroup.remove(markerGroup.getAt(i));
	}
	marker = markerGroup.create(frog.x, frog.y, 'ttongue', 1);
	top_down.game.physics.p2.enable(marker);
	var markerAngle = Math.atan2(top_down.game.camera.y + destY - frog.y, top_down.game.camera.x + destX - frog.x);
	marker.body.angle = markerAngle;
	marker.body.setCollisionGroup(markerCG);
	
	marker.body.collides([rockCG]);
	marker.body.collides([blockedCG]);
	marker.body.createGroupCallback(rockCG, markerHitRock, this);
	marker.body.createGroupCallback(blockedCG, markerHitBlock, this);
	marker.body.data.gravityScale = 0;
	moveObjToXY(marker, destX, destY, 800);
}
var curRock = null;

function rockClicked(rock){
	if((curRock != rock) || (curRock == null)){
		if(!mute)
		tongueSound.play();
		top_down.game.physics.p2.collisionGroups.pop()
		rockCG = top_down.game.physics.p2.createCollisionGroup();
		rock.body.setCollisionGroup(rockCG);
		rock.body.collides([markerCG]);
		shootMarker(getClickedWorldX(), getClickedWorldY());
		curRock = rock;
	} else {
		if(!mute)
		releaseSound.play();
		shootMarker(getClickedWorldX(), getClickedWorldY());
		tongueBeingRetracted = true;
		curRock = null;
	}
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
		//tempRock.body.setCollisionGroup(rockCG);
		//tempRock.body.collides([markerCG]);
	}
}

function tongueGone(){
	marker.x = frog.x;
	marker.y = frog.y;
	tongueOut = false;
	tongueArray[1].x = 20;
	tongueArray[1].y = 20;
}

function initControls(){
	wKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.W);
	aKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.A);
	sKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // To test opening mouth
    xKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.X);
	eKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.E);
}

/*called by update function to check/handle any controls being pressed*/
var singlePress = true;
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
        // testng open mouth
        if(xKey.isDown){
            frog.animations.play('openMouth');
        }    
    
        else{
            //plays idle animation if nothing is pressed
            if (tongueAnchored==false){
                frog.animations.play('idle');
            }
        }
		if(eKey.isDown){
			if(singlePress){
				console.log(frog);
			}
			singlePress = false;
		} else {
			singlePress = true;
		}
}

function createGame(){
	killAll();
	top_down.game.physics.startSystem(Phaser.Physics.P2JS); //start physics system
	top_down.game.physics.p2.setImpactEvents(true);
	top_down.game.physics.p2.gravity.y = 1400; //set up world gravity
	
	//set up tilemap and layers
	top_down.game.map = top_down.game.add.tilemap('test_map');
	top_down.game.map.addTilesetImage('spritesheet2','tiles2');
	top_down.game.backgroundLayer = top_down.game.map.createLayer('background_nc');
	top_down.game.blockedLayer = top_down.game.map.createLayer('twig_c');
	collideLayer = top_down.game.blockedLayer;
	top_down.game.map.setCollisionBetween(0, 1000, true, 'twig_c');
	
	top_down.game.input.onDown.add(screenClicked, top_down.game); //listen for the screen to be be clicked
	
	
	//this.input.onDown.add(screenClicked, this); //listen for the screen to be be clicked
	//this.input.onUp.add(screenReleased, this);
	
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
		blockedLayerTiles[i].collides([markerCG]);
	}
	
	//set up frog and frog physics
	frog = top_down.game.add.sprite(160, 1400, 'frog'); //add frog to game
	top_down.game.physics.p2.enable(frog); //give the frog physics
	frog.enableBody = true;
	frog.body.mass = 4;
	frog.body.setCollisionGroup(frogCG);
	frog.body.collides([blockedCG], wallSound);
    frog.anchor.setTo(.39, .60);
    //frog.body.fixedRotation = true;
	//adding frog animations
    frog.animations.add('idle', [0,0,0,0,0,0,1,1,1,1], 5, true);
    frog.animations.add('openMouthRight', [2], 1, true);
    frog.animations.add('openMouthLeft',[4],1, true);
    tongueArray.push(new Phaser.Point(0, 0));
	tongueArray.push(new Phaser.Point(0, 0));
		
	tongue = top_down.game.add.rope(frog.x, frog.y, 'tongue', null, tongueArray);

	tongue.updateAnimation = function(){
		updateTonguePoints();
	};
		
	tongueBeingRetracted = false;
	tongueOut = false;
	
	markerGroup = top_down.game.add.group(); //sets up a group for our tongue markers
	
	top_down.game.world.bringToTop(frog);
	
	top_down.game.backgroundLayer.resizeWorld(); //make world the size of background tile map
	//adjust starting camera position
	top_down.game.camera.x = 0;
	top_down.game.camera.y = 1200;
	top_down.game.camera.follow(frog, Phaser.Camera.FOLLOW_TOPDOWN);
	var helper = Math.max(top_down.game.width, top_down.game.height) / 4;
	//top_down.game.camera.deadzone = new Phaser.Rectangle((top_down.game.width - helper) / 2, (top_down.game.height - helper) / 2, helper, helper);
	//top_down.game.camera.deadzone = new Phaser.Rectangle(100,100,top_down.game.width-200, top_down.game.height-200);
       
	//checkControls(); //checks if controls have been pressed
	clearConstraints();
			
	top_down.game.camera.x = 0;
	top_down.game.camera.y = 1200;
		
	menuButton = top_down.game.add.sprite(top_down.game.camera.x - 58, top_down.game.camera.y - 58, 'menu');
	menuButton.inputEnabled = true;
	menuButton.events.onInputDown.add(createPopupMenu, this);
	top_down.game.world.bringToTop(menuButton);
	}

function newGame(){
	killAll();
}
var menuClicked = false;
function createPopupMenu(){
	if(menuClicked){
		menuKill();
		return;
	}
	if(!mute)
	selectSound.play();
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
	menuClicked = true;
}

function createHomeScreen(){
	gameState = "homeScreen";
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
	playGame.events.onInputDown.add(createLevelStage, this);
	controls.events.onInputDown.add(showControl, this);
	greenVolume.events.onInputDown.add(swapGreenVolume, this);
	greenHelp.events.onInputDown.add(showHelp, this);
}

function goHome(){
	if(resumeButton != null)
	restartLevel();
	resumeButton = null;
	killAll();
	createHomeScreen();
}

function menuKill(){
	if(!mute)
	selectSound.play();
	homeMenu.destroy();
	resumeButton.destroy();
	restartButton.destroy();
	volumeButton.destroy();
	menuClicked = false;
	home.destroy();
}

function killAll(){
	if(!mute)
	selectSound.play();
	top_down.game.world.removeAll();
	
}

var volNum = 0;
function swapVolume(){
	muteSounds();
	volumeButton.destroy();
	if (volNum%2 == 0){
		volumeButton = top_down.game.add.sprite(380 - 29, 256 + 48, 'volumeOff');
	}else{
		volumeButton = top_down.game.add.sprite(380 - 29, 256 + 48, 'volumeOn');
		selectSound.play();
	}
	volNum++;
	volumeButton.inputEnabled = true;
	volumeButton.events.onInputDown.add(swapVolume, this);
}
var greenNum = 0
function swapGreenVolume(){
	muteSounds();
	greenVolume.destroy();
	if (greenNum%2 == 0){
	greenVolume = top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91 + 82, 'greenOff');
	}else{
	greenVolume = top_down.game.add.sprite(380 - (161/3) - 10, 256 - (128/2) + 91 + 82, 'greenOn');
	selectSound.play();
	}
	greenNum++;
	greenVolume.inputEnabled = true;
	greenVolume.events.onInputDown.add(swapGreenVolume, this);
}

function showControl(){
	if(!mute)
	selectSound.play();
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
	killAll();
	shootMarker(0, 0);
	tongueBeingRetracted = true;
	curRock = null;
	createGame();
}

function createLevelStage(){
	killAll();
	homeMenu = null;
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
var mute;
function muteSounds(){
	if(!mute){
	mute = true;
	music.stop();
	return;
	}
	mute = false;
	music.play();
}
function loadSounds(){
	hitWallSound = top_down.game.add.audio('hitwall');
	fireSound = top_down.game.add.audio('fire');
	completeSounds = top_down.game.add.audio('complete');
	selectSound = top_down.game.add.audio('select');
	releaseSound = top_down.game.add.audio('release');
	tongueSound = top_down.game.add.audio('tongueSound');
	music = top_down.game.add.audio('music');
}

function wallSound(){
	if(!mute)
	hitWallSound.play();
}

top_down.Game.prototype = {
	create: function(){
		loadSounds();
		music.play();
		createHomeScreen();
		initControls();
	},
	update: function(){
		checkControls(); //checks if controls have been pressed
		if (tongueOut == true){
			frog.animations.play("openMouthRight");     
			if(marker != undefined){
				var tempAngle = (Math.atan2(marker.y-(frog.y),marker.x-(frog.x)))*(180/Math.PI);
				//frog.position.rotate(fixedPoint.x, fixedPoint.y, a, true, distancePx);
				//frog.anchor.setTo(1, 1);
				frog.body.angle = tempAngle;                    
			}
			if(frog.x<marker.x && frog.body.velocity.y>0){
				// frog.animations.play("openMouthRight");
				// console.log("frog y velocity",frog.body.velocity.y);
				//console.log("Face: Right");
			}
			if (frog.x>marker.x && frog.body.velocity.y>0){
				//frog.animations.play("openMouthLeft");
				//console.log("Face: Left");
            }
        }
		if(tongueBeingRetracted && tongueOut){
			if(moveObjToObj(marker, frog, 1000)){		
				tongueBeingRetracted = false;
				marker.body.velocity.x = 0;
				marker.body.velocity.y = 0;
				tongueGone();
			}
		}
		
		clearConstraints();
		if(tongueAnchored){
			tongueOut = true;
			if(distanceBetweenFrogAndRock >= 40){
				distanceBetweenFrogAndRock -= (distanceBetweenFrogAndRock/200) * 4.5;
			}
			constraints.push(this.game.physics.p2.createDistanceConstraint(frog, wallAnchor, distanceBetweenFrogAndRock));
        }
		
		if (menuButton != null){
			menuButton.x = top_down.game.camera.x + 768 - 58;
			menuButton.y = top_down.game.camera.y + 512  - 58;
		}
		
		if(resumeButton != null){
			homeMenu.x = top_down.game.camera.x + 380 - (332/2);
			homeMenu.y = top_down.game.camera.y + 256 - 128;
			resumeButton.x = top_down.game.camera.x + 380 - 29;
			resumeButton.y = top_down.game.camera.y + 256 - 24;
			restartButton.x = top_down.game.camera.x + 380 + 29;
			restartButton.y = top_down.game.camera.y + 256 - 24;
			volumeButton.x = top_down.game.camera.x + 380 - 29;
			volumeButton.y = top_down.game.camera.y + 256 + 48;
			home.x = top_down.game.camera.x + 380 + 29;
			home.y = top_down.game.camera.y + 256 + 48;
	}
	
	}
}