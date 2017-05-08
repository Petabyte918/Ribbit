/// <reference path="phaser.js" />
var top_down = top_down || {};

top_down.Game = function(){};

var gameState = null;

var backgroundImage;

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

var lastClickTime = 0;

var wKey;
var aKey;
var sKey;
var dKey;
var eKey;
var spaceKey;

var curRock = null;

var frogCurrentlyHittingWall = 0;

var frogSpawnX = null;
var frogSpawnY = null;
var frog;
var tongue;
var tongueMarker;

var flag = true;


var rockGroup;
var tongueArray = [];

var anchorX = -1;
var anchorY = -1;

var mute;

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

var mapWidth;
var mapHeight;

var volNum = 0;
var greenNum = 0

var tongueOut;

var fly1;
var fly2;

var currentLevel;

var blockedLayerTiles = null;

var fire;
var fireGroup;
var mistGroup;
var gamePreviouslyInit = false;

//castle Kevin
var castle;

//////////////////////////////////
//			FROG	STUFF		//
//////////////////////////////////

function updateFrog(){
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
			if(distanceBetweenFrogAndRock <= 160){
				frog.body.damping = .5;
				/*
				if(frog.body.velocity.x > 40){
					frog.body.velocity.x -= 6;
				} else if(frog.body.velocity.x < -40){
					frog.body.velocity.x += 6;
				}
				if(frog.body.velocity.y > 40){
					frog.body.velocity.y -= 6;
				} else if(frog.body.velocity.y < -40){
					frog.body.velocity.y += 6;
				}
				*/
			} else {
				frog.body.damping = .1;
			}
			constraints.push(top_down.game.physics.p2.createDistanceConstraint(frog, wallAnchor, distanceBetweenFrogAndRock));
        } else {
			if(frog != null){
				frog.body.damping = .1;
			}
		}
}

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
	rock.clearCollision();	
	markerX = rock.x;
	markerY = rock.y;
	marker.clearCollision();
	marker.sprite.kill();
	wallAnchor = markerGroup.create(markerX, markerY, 'ttongue');
	top_down.game.physics.p2.enable(wallAnchor);
	wallAnchor.body.static = true;
	tongueAnchored = true;
	distanceBetweenFrogAndRock = Math.sqrt(((rock.x - frog.x)*(rock.x - frog.x)) + ((rock.y - frog.y)*(rock.y - frog.y)));
	markerGroup.removeAll();
}

function removeCollisionFromAllRocks(){
	if(rockGroup != undefined){
		for(var i = 0; i < rockGroup.children.length; i++){
			rockGroup.children[i].body.clearCollision();
		}
	}
}

function shootMarker(destX, destY){
	tongueOut = true;
	tongueAnchored = false;
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

function slowDownFrog(){
	frog.body.damping = .8;
}

function rockClicked(rock){
	if((curRock != rock) || (curRock == null)){		
		if(!mute)
			tongueSound.play();
		rock.body.setCollisionGroup(rockCG);
		rock.body.collides([markerCG])
		shootMarker(rock.x, rock.y);
		curRock = rock;
		slowDownFrog();
	} else {
	}
}

function tongueGone(){
	marker.x = frog.x;
	marker.y = frog.y;
	marker.body.velocity.x = 0;
	marker.body.velocity.y = 0;
	tongueOut = false;
	tongueBeingRetracted = false;
	tongueArray[1].x = 20;
	tongueArray[1].y = 20;
	markerGroup.removeAll();
}

function releaseFrogFromRock(){
		if(!mute){
			releaseSound.play();
		}
		curRock = null;
		removeCollisionFromAllRocks();
		shootMarker(frog.x + 1000, frog.y + 1000);
		tongueGone();
}

function frogCoordinatesToWorld(point){
	var tempPoint = new Phaser.Point();
	tempPoint.x = frog.body.x + point.x;
	tempPoint.y = frog.body.y + point.y;	
	return tempPoint;
}

function frogHitWall(){
	if(tongueOut){
		wallSound();
		
		var p0 = frogCoordinatesToWorld(tongueArray[0]);
		var p1 = frogCoordinatesToWorld(tongueArray[1]);
		
		//var a = top_down.game.add.sprite(p0.x , p0.y, 'rock1');
		//var b = top_down.game.add.sprite(p1.x , p1.y, 'rock1');
		
		var lowestX;
		var highestX;
		if(p0.x < p1.x){
			lowestX = p0.x;
			highestX = p1.x;
		} else {
			lowestX = p1.x;
			highestX = p0.x;
		}
		
		var lowestY;
		var highestY;
		if(p0.y < p1.y){
			lowestY = p0.y;
			highestY = p1.y;
		} else {
			lowestY = p1.y;
			highestY = p0.y;
		}
		
		var wp2tLowest = wp2t(new Phaser.Point(lowestX, lowestY));
		var wp2tHighest = wp2t(new Phaser.Point(highestX, highestY));
		var wp2tFrog = wp2t(new Phaser.Point(p0.x, p0.y));
		var wp2tRock = wp2t(new Phaser.Point(p1.x, p1.y));
		
		var tongueRectangle = new Phaser.Rectangle(wp2tLowest.x, wp2tLowest.y, (wp2tHighest.x - wp2tLowest.x), (wp2tHighest.y - wp2tLowest.y));
		
		var collisionRectangle = [];
		
		for(var i = 0; i < (wp2tHighest.y - wp2tLowest.y); i++){
			var rc = [];
			for(var j = 0; j < (wp2tHighest.x - wp2tLowest.x); j++){
				if(queryBlockedLayer(wp2tLowest.x + j, wp2tLowest.y + i)){
					rc.push(1);
				} else {
					rc.push(0);
				}
			}
			collisionRectangle.push(rc);
		}
		if(collisionRectangle != undefined){
			if(checkCollisionRectangle(wp2tFrog, wp2tRock, collisionRectangle)){
				releaseFrogFromRock();
			}
		}
	}
}

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

function checkCollisionRectangle(start, end, rectangle){
	var slope = ((end.x - start.x)/((end.y - start.y)));
	var horizontal = 0;
	var vertical = 0;
	if(start.x < end.x){
		//right
		horizontal = 1;
	} else if (start.x == end.x){
		//nothing
		horizontal = 0;
	} else if(start.x > end.x) {
		//left
		horizontal = -1;
	}
	if(start.y < end.y){
		//up
		vertical = -1;
	} else if (start.y == end.y){
		//nothing
		vertical = 0;
	} else if(start.y > end.y) {
		//down
		vertical = 1;
	}
	if((horizontal == 0) && (vertical == 0)){
		return false;
	}
	var width;
	if(rectangle[0] != undefined){
		width = rectangle[0].length;
	} else {
		//alert("Game would be crashing here");
		return false;
	}
	var height = rectangle.length;
	var bot = height - 1;
	var right = width - 1;
	var ret = 0;
	if(width == 1){
		horizontal = 0;		
	}
	if(height == 1){
		vertical = 0;
	}
	//rectangle[y][x]
	if((horizontal > 0) && (vertical > 0)){
		//facing top right
		ret += rectangle[bot-1][0];
		ret += rectangle[bot-1][1];	
		ret += rectangle[bot][0];
		ret += rectangle[bot][1];
	} else if((horizontal < 0) && (vertical > 0)){
		//facing top left
		ret += rectangle[bot-1][right];
		ret += rectangle[bot-1][right-1];
		ret += rectangle[bot][right-1];
		ret += rectangle[bot][right];
	} else if((horizontal > 0) && (vertical < 0)){
		//facing bottom right
		ret += rectangle[0][0];
		ret += rectangle[1][0];
		ret += rectangle[0][1];
		ret += rectangle[1][1];
	} else if((horizontal < 0) && (vertical < 0)){
		//facing bottom left
		ret += rectangle[0][right];
		ret += rectangle[1][right];
		ret += rectangle[0][right + 1];
		ret += rectangle[1][right + 1];
	} else if((horizontal > 0) && (vertical == 0)){
		//facing right
		ret += rectangle[0][0];
		ret += rectangle[0][1];
	} else if((horizontal < 0) && (vertical == 0)){
		//facing left
		ret += rectangle[0][right];
		ret += rectangle[0][right - 1];
	} else if((horizontal == 0) && (vertical > 0)){
		///facing up
		ret += rectangle[bot][0];
		ret += rectangle[bot-1][0];
	} else if((horizontal == 0) && (vertical < 0)){
		//facing down
		ret += rectangle[0][0];
		ret += rectangle[1][0];
	}
	if(ret > 0){
		return true;
	}
	return false;
}

function queryBlockedLayer(tiledX, tiledY){
	var blockedData;
	for(var i = 0; i < top_down.game.cache.getTilemapData("level_" + currentLevel).data.layers.length; i++){
		var name = top_down.game.cache.getTilemapData("level_" + currentLevel).data.layers[i].name;
		if(name === "twig_c"){
			blockedData = top_down.game.cache.getTilemapData("level_" + currentLevel).data.layers[i];
		}
	}
	if(blockedData.data[(tiledX) + (tiledY * blockedData.width)] == 0){
		return false;
	}
	return true;
}


//translates a world point to a point tiled point
function wp2t(point){
	return new Phaser.Point(Math.floor(point.x/16), Math.floor(point.y/16));
}

function screenClicked(){
	var clickedWorldX = getClickedWorldX();
	var clickedWorldY = getClickedWorldY();
	console.log("Screen clicked\nx:" + clickedWorldX + ", y:" + clickedWorldY);
	var currentTime = new Date();
	if(currentTime.getTime() - lastClickTime < top_down.game.input.doubleTapRate){
		doubleClicked();
	}
	lastClickTime = currentTime;
}

function getClickedWorldX(){return top_down.game.input.x + top_down.game.camera.x;}

function getClickedWorldY(){return top_down.game.input.y + top_down.game.camera.y;}

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

function frogWins(){
	endLevel();
}

function frogDies(){
	lostLevel();
}

function initRocks(rockLayerData){
	console.log("init rocks");
	var rockPlacement = [];
	for(var i = 0; i < rockLayerData.data.length; i++){
			if(rockLayerData.data[i] != 0){
				if(rockLayerData.data[i] == 21){
					frogSpawnX = (i%rockLayerData.width) * 16;
					frogSpawnY = (Math.floor(i/rockLayerData.width)) * 16;
				}
				if(rockLayerData.data[i] == 22){
					spawnFire((i%rockLayerData.width) * 16, (Math.floor(i/rockLayerData.width)) * 16, "fire");
				}
				if(rockLayerData.data[i] == 10){
                    castle= spawnCastle((i%rockLayerData.width) * 16,(Math.floor(i/rockLayerData.width)) * 16);
				}
				if(rockLayerData.data[i] == 3){
					rockPlacement.push((i%rockLayerData.width) * 16); //x position
					rockPlacement.push((Math.floor(i/rockLayerData.width)) * 16); //y position
                    rockPlacement.push(0); //rock type - 0, normal rock
				}
                if(rockLayerData.data[i] == 4){
					rockPlacement.push((i%rockLayerData.width) * 16);
					rockPlacement.push((Math.floor(i/rockLayerData.width)) * 16);
                    rockPlacement.push(1); //rock type - 0, only can click once
				}
            }
	}
	rockGroup = top_down.game.add.group();
	var tempRock;		
	for(var i = 0; i < rockPlacement.length; i += 3){
		var rockType = '0';
		console.log("rockPlaced");
		rockType = Math.floor(Math.random() * 3) + 1;
        rockStyle = "A"; //A = normal, B = click once, C = timed
        if(rockPlacement[i+2] === 0){
            rockStyle = 'A';
        } else if (rockPlacement[i+2] === 1){
            rockStyle = 'B';
        } else if (rockPlacement[i+2] === 2){
            rockStyle = 'C';
        }
		tempRock = rockGroup.create(rockPlacement[i], rockPlacement[i+1], 'rock' + rockStyle + rockType);
		top_down.game.physics.p2.enable(tempRock);
		tempRock.inputEnabled = true;
		tempRock.enableBody = true;
		tempRock.body.static = true;
		tempRock.events.onInputDown.add(rockClicked, this);
		top_down.game.physics.p2.enable(tempRock);
	}
}

function initControls(){
	wKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.W);
	aKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.A);
	sKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.D);
    spaceKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    xKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.X);
	eKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.E);
}

/*called by update function to check/handle any controls being pressed*/
var singlePress = true;
var singlePressLevel = true;
function checkControls(){
	/*
		if(wKey.isDown){
			top_down.game.camera.y -= 10;
		}
		if(aKey.isDown){
			top_down.game.camera.x -= 10;
		}
		if(sKey.isDown){
			top_down.game.camera.y += 10;
		}
		if(dKey.isDown){
			top_down.game.camera.x += 10;
		}
        // testng open mouth
        if(xKey.isDown){
            frog.animations.play('openMouth');
        }
	*/
		if(spaceKey.isDown){
			if(singlePress){
				console.log("SPACE");
				//console.log(top_down.game.physics.p2.total);
				console.log(markerGroup.length);
			}
			singlePress = false;
		} else {
			singlePress = true;
		}
}

/*
* getDataLayerFromTilemap returns map data, but also sets mapWidth and mapHeight
*/
function getDataLayerFromTilemap(tilemapName, layerName){
	var length = top_down.game.cache.getTilemapData(tilemapName).data.layers.length;
	for(var i = 0; i < length; i++){
		var name = top_down.game.cache.getTilemapData(tilemapName).data.layers[i].name;
		if(name === layerName){
			mapWidth = top_down.game.cache.getTilemapData(tilemapName).data.layers[i].width * 16;
			mapHeight = top_down.game.cache.getTilemapData(tilemapName).data.layers[i].height * 16;
			return top_down.game.cache.getTilemapData(tilemapName).data.layers[i];
		}
	}
}

function initGame(){
	top_down.game.physics.startSystem(Phaser.Physics.P2JS); //start physics system
	top_down.game.physics.p2.setImpactEvents(true);
	top_down.game.physics.p2.gravity.y = 1400; //set up world gravity
	
	//set up collision groups
	frogCG = top_down.game.physics.p2.createCollisionGroup();
	blockedCG = top_down.game.physics.p2.createCollisionGroup();
	markerCG = top_down.game.physics.p2.createCollisionGroup();
	rockCG = top_down.game.physics.p2.createCollisionGroup();
    flyCG = top_down.game.physics.p2.createCollisionGroup();
    castleCG = top_down.game.physics.p2.createCollisionGroup();
	initControls(); //tell Phaser to look for key presses
	top_down.game.input.onDown.add(screenClicked, top_down.game); //listen for the screen to be be clicked
	gamePreviouslyInit = true;
}

function createGame(level){
	curRock = null;
	//killAll();
	console.log("createGame");
	removeCollisionFromAllRocks();
	//var currenLevel;
	gameState = "gameStart";
	currentLevel = level;
	menuClicked = false;
	if(typeof level == "number"){
		currentLevel = level;
	} else {
		currentLevel = parseInt(level.key.substr(3,4));
	}
	if(!gamePreviouslyInit){
			initGame();
	}
	console.log("MARKER GROUP: " + markerGroup);
	markerGroup = top_down.game.add.group(); //sets up a group for our tongue markers
	//markerGroup.removeChildren();
	//set up tilemap and layers
	backgroundImage = top_down.game.add.sprite(0, 0, 'levelBackground1');
	top_down.game.map = top_down.game.add.tilemap('level_' + currentLevel);
	top_down.game.map.addTilesetImage('spritesheet2','tiles2');
	top_down.game.backgroundLayer = top_down.game.map.createLayer('background_nc');
    
     //KEVIN's Code
    mistGroup=top_down.game.add.group();

    top_down.game.blockedLayer = top_down.game.map.createLayer('twig_c');
	top_down.game.map.setCollisionBetween(0, 1000, true, 'twig_c');
    
    //creates firegroup game
	fireGroup=top_down.game.add.group();        
	initRocks(getDataLayerFromTilemap("level_" + currentLevel, 'rock_ci')); //spawn rock objects
	blockedLayerTiles = top_down.game.physics.p2.convertTilemap(top_down.game.map, top_down.game.blockedLayer);
    
    spawnMist();


	for(var i = 0; i < blockedLayerTiles.length; i++){
		blockedLayerTiles[i].setCollisionGroup(blockedCG);
		blockedLayerTiles[i].collides([frogCG]);
		blockedLayerTiles[i].collides([markerCG]);
        blockedLayerTiles[i].collides([flyCG]);
        blockedLayerTiles[i].collides([castleCG]);
	}
	
	//set up frog and frog physics
	if(frogSpawnX < 0 | frogSpawnY < 0){
		alert("Frog not found");
		frogSpawnX = 100;
		frogSpawnY = 100;
	}
    
	
	addTrigger(); // trigger system has to be rendered before frog
	frog = top_down.game.add.sprite(frogSpawnX, frogSpawnY, 'frog'); //add frog to game
	top_down.game.physics.p2.enable(frog); //give the frog physics
	frog.enableBody = true;
	frog.body.mass = 4;
	frog.body.setCollisionGroup(frogCG);
	frog.body.collides([blockedCG], frogHitWall);
	frog.anchor.setTo(.5, .5);
    frog.animations.add('idle', [0,0,0,0,0,0,1,1,1,1], 8, true);
    frog.animations.add('openMouthRight', [2], 1, true);
    frog.animations.add('openMouthLeft',[4],1, true);
    frog.animations.add('die',[6,7,8,9,10,11,12,13,14,15,16],5, false);
	
	tongueArray = [];
    tongueArray.push(new Phaser.Point(0, 0));
	tongueArray.push(new Phaser.Point(0, 0));
	tongue = top_down.game.add.rope(frog.x, frog.y, 'tongue', null, tongueArray);
	top_down.game.physics.p2.enable(tongue);
	tongue.updateAnimation = function(){
		updateTonguePoints();
	};

	//fly1 = spawnFlies(fly1,[300,2000]);
    //fly2 = spawnFlies(fly2,[300,2100]);
	
	tongueBeingRetracted = false;
	tongueOut = false;
	
	top_down.game.world.bringToTop(frog);
	top_down.game.backgroundLayer.resizeWorld(); //make world the size of background tile map
	
	//Enable this
	top_down.game.camera.follow(frog, Phaser.Camera.FOLLOW_TOPDOWN);
	clearConstraints();
	
	//adjust starting camera position
	top_down.game.camera.x = 0;
	top_down.game.camera.y = 1800;
	
	menuButton = top_down.game.add.sprite(top_down.game.camera.x  + 198, top_down.game.camera.y + 58, 'menu');
	menuButton.inputEnabled = true;
	menuButton.events.onInputDown.add(createPopupMenu, this);
	top_down.game.world.bringToTop(menuButton);	
    
    
}

var menuClicked = false;
function createPopupMenu(){
	if(menuClicked){
		menuKill();
		return;
	}
	if(!mute)
	selectSound.play();
	homeMenu = top_down.game.add.sprite(top_down.game.camera.x + 512 - (495/2), top_down.game.camera.y + 412 - (377/2), 'popup');
	resumeButton = top_down.game.add.sprite(top_down.game.camera.x + 512 - 68, top_down.game.camera.y + 312 - 29, 'resume');
	restartButton = top_down.game.add.sprite(top_down.game.camera.x + 512 + 10, top_down.game.camera.y + 312 - 29, 'restart');
	volumeButton = top_down.game.add.sprite(top_down.game.camera.x + 512 - 68, top_down.game.camera.y + 312 + 59, 'volumeOn');
	home = top_down.game.add.sprite(top_down.game.camera.x + 512 + 10, top_down.game.camera.y + 312 + 59, 'home');
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
	background = top_down.game.add.sprite(-1, -1, 'background');
	homeMenu = top_down.game.add.sprite(512 - (495/2), 412 - (377/2), 'popup');
	playGame = top_down.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91, 'playGame');
	controls = top_down.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 41, 'controls');
	greenVolume = top_down.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 82, 'greenOn');
	greenHelp= top_down.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 123, 'greenHelp');
	logo = top_down.game.add.sprite(512 - (500/6), 262 - (500/2), 'logo');
	logo.scale.setTo(logo.scale.x/2.5, logo.scale.y/2.5);
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
	complete = false;
	if(resumeButton != null || endMenu != null)
	restartLevel();
	resumeButton = null;
	killAll();
	console.log("go_home");
	createHomeScreen();
}

function menuKill(){
	if(!mute)
	selectSound.play();
	if(homeMenu != null){
		homeMenu.destroy();
	}
	if(resumeButton != null){
		resumeButton.destroy();
	}
	if(restartButton != null){
		restartButton.destroy();
	}
	if(volumeButton != null){
		volumeButton.destroy();
	}
	menuClicked = false;
	if(home != null){
		home.destroy();
	}
}

function killAll(){
	curRock = null;
	if(top_down.game.map!=null && top_down.game.blockedLayer!=null){
		top_down.game.physics.p2.clearTilemapLayerBodies(top_down.game.map, top_down.game.blockedLayer);
	}
	if(endMenu != null){
		endMenu.destroy();
		endMenu = null
	}
	if(!mute)
		selectSound.play();	
	top_down.game.world.removeAll();
	if(top_down.game.physics.p2 != null){
		top_down.game.physics.p2.clear();
		console.log("physics bodies cleared");
	}
	if(markerGroup != undefined){
		markerGroup.destroy();
	}
}

function swapVolume(){
	muteSounds();
	volumeButton.destroy();
	if (volNum%2 == 0){
		volumeButton = top_down.game.add.sprite(512 - 67, 312 + 59, 'volumeOff');
	}else{
		volumeButton = top_down.game.add.sprite(512 - 67, 312 + 59, 'volumeOn');
		selectSound.play();
	}
	volNum++;
	volumeButton.inputEnabled = true;
	volumeButton.events.onInputDown.add(swapVolume, this);
}

function swapGreenVolume(){
	muteSounds();
	greenVolume.destroy();
	if (greenNum%2 == 0){
	greenVolume = top_down.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 82, 'greenOff');
	}else{
	greenVolume = top_down.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 82, 'greenOn');
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
	homeMenu = top_down.game.add.sprite(512 - (495/2), 412 - (377/2), 'controlScreen');
	home = top_down.game.add.sprite(512 + 495/32, 312 + 180, 'home');
	home.inputEnabled = true;
	home.events.onInputDown.add(goHome, this);
	
}

function showHelp(){
	homeMenu.destroy();
	homeMenu = top_down.game.add.sprite(512 - (495/2), 412 - (377/2), 'helpScreen');
	home = top_down.game.add.sprite(512 + 495/32, 312 + 180, 'home');
	home.inputEnabled = true;
	home.events.onInputDown.add(goHome, this);
}

function restartLevel(){
	killAll();
	console.log("restartLevel");
	if(!lost && !complete)
	shootMarker(0, 0);
	lost = false;
	tongueBeingRetracted = true;
	curRock = null;
	createGame(currentLevel);
}

function createLevelStage(){
	killAll();
	console.log("createLevelStage");
	homeMenu = null;
	background = top_down.game.add.sprite(0, 0, 'levelSelect');
	var levelName = "lvl1";
	level = top_down.game.add.sprite(94, 116, levelName);
	level.inputEnabled = true;
	level.events.onInputDown.add(createGame, this);
	for(var i = 0; i < 3; i++){
		levelName = "lvl" + (2 + i);
		level = top_down.game.add.sprite(214*i + 41 + 268, 116 , levelName);
		level.inputEnabled = true;
		level.events.onInputDown.add(createGame, this);
	}
	for (var i = 0; i < 4; i++){
		levelName = "lvl" + (5 + i);
		//level = top_down.game.add.sprite(214*i + 94, 106 + 146 , levelName);
		level = top_down.game.add.sprite(214*i + 94, 116 + 146 , 'lock');
		//level.inputEnabled = true;
		//level.events.onInputDown.add(createGame, this);
	}
	for (var i = 0; i < 4; i++){
		levelName = "lvl" + (9 + i);
		//level = top_down.game.add.sprite(214*i + 94, 106 + 294 , levelName);
		level = top_down.game.add.sprite(214*i + 94, 116 + 294 , 'lock');
		//level.inputEnabled = true;
		//level.events.onInputDown.add(createGame, this);
	}
	home = top_down.game.add.sprite(20, 20, 'home');
	home.inputEnabled = true;
	home.events.onInputDown.add(goHome, this);
}

function muteSounds(){
	if(!mute){
	mute = true;
	music.stop();
	return;
	}
	mute = false;
	music.play('', 0, 1, true, true);
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

function doubleClicked(){
	console.log("DOUBLE CLICKED");
	releaseFrogFromRock();
}

	if(!mute)
function wallSound(){
	hitWallSound.play();
}

function updateBackground(){
	if(backgroundImage != undefined){
		backgroundImage.x = ((top_down.game.camera.x)/((mapWidth) - top_down.game.camera.width)) * ((mapWidth) - (backgroundImage.width));
		backgroundImage.y = ((top_down.game.camera.y)/((mapHeight) - top_down.game.camera.height)) * ((mapHeight) - (backgroundImage.height));
	}
}

top_down.Game.prototype = {
	create: function(){
		loadSounds();
		music.play('', 0, 1, true, true);
		createHomeScreen();
		initControls();
	},
	update: function(){
        checkifLose();
        checkifWin();
		checkControls(); //checks if controls have been pressed
        //Kevin's code
        animateFire();
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
        } else {
			if(tongueBeingRetracted){
				//console.log(marker);
				//console.log("Tongue Out: " + tongueOut + "\nTongue Anchored: " + tongueAnchored + "\nTongue Being Retracted: " + tongueBeingRetracted);	
				tongueBeingRetracted = false;
				//console.log("Something is wrong here");
			}
            
            //KEVIN
            if ((tongueOut==false)&&(frogDying==false)){
                frog.animations.play('idle');
            }
            
		}
		updateFrog();
		updateBackground();
		if (menuButton != null){
			menuButton.x = top_down.game.camera.x + 768 + 198;
			menuButton.y = top_down.game.camera.y + 512  + 58;
		}
		if(resumeButton != null){
			homeMenu.x = top_down.game.camera.x + 512 - (495/2);
			homeMenu.y = top_down.game.camera.y + 312 - (377/2);
			resumeButton.x = top_down.game.camera.x + 512 - 68;
			resumeButton.y = top_down.game.camera.y + 312 - 29;
			restartButton.x = top_down.game.camera.x + 512 + 10;
			restartButton.y = top_down.game.camera.y + 312 - 29;
			volumeButton.x = top_down.game.camera.x + 512 - 68;
			volumeButton.y = top_down.game.camera.y + 312 + 59;
			home.x = top_down.game.camera.x + 512 + 10;
			home.y = top_down.game.camera.y + 312 + 59;
		}
		if(gameState == 'gameStart'){
			checkTriggers();
		}
		if(complete)
			endLevel();
        
        checkMist();
	}
}