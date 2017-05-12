var ribbit = ribbit || {};

var gameState = null;

var backgroundImage;

var homeMenu;
var playGame;
var controls;
var greenVolume;
var greenHelp;

var level;

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

var currentlyDoubleClicked;

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
var gameIsPaused = false;

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
		if(tongueAnchored && frog.body != undefined){
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
			constraints.push(ribbit.game.physics.p2.createDistanceConstraint(frog, wallAnchor, distanceBetweenFrogAndRock));
        } else {
			if(frog != null){
				if(frog.body != null){
					frog.body.damping = .1;
				}
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
		ribbit.game.physics.p2.removeConstraint(constraints[i]);
	}
	constraints = [];	
}

function markerHitBlock(marker, block){
	tongueBeingRetracted = true;
	curRock = null;
}

function makeRockDisappear(){
	if(curRock != null){
		var typeOfRock = curRock.key.substring(4, 5);
		if(typeOfRock == "C"){
			curRock.destroy();
			curRock = null;
			releaseFrogFromRock();
		}
	}
	ribbit.game.time.reset();
}


function markerHitRock(marker, rock){
	rock.clearCollision();	
	markerX = rock.x;
	markerY = rock.y;
	marker.clearCollision();
	marker.sprite.kill();
	wallAnchor = markerGroup.create(markerX, markerY, 'ttongue');
	//console.log("A creating sprite for the marker group");
	ribbit.game.physics.p2.enable(wallAnchor);
	wallAnchor.body.static = true;
	tongueAnchored = true;
	distanceBetweenFrogAndRock = Math.sqrt(((rock.x - frog.x)*(rock.x - frog.x)) + ((rock.y - frog.y)*(rock.y - frog.y)));
	markerGroup.removeAll(); 
	var typeOfRock;
	if(curRock != null){
		typeOfRock = curRock.key.substring(4, 5);
	}
	if(typeOfRock == "C"){
		ribbit.game.time.events.add(Phaser.Timer.SECOND *2, makeRockDisappear, this);

	}
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
	marker = markerGroup.create(frog.x, frog.y, 'ttongue');
	//console.log("B creating sprite for the marker group");
	ribbit.game.physics.p2.enable(marker);
	var markerAngle = Math.atan2(ribbit.game.camera.y + destY - frog.y, ribbit.game.camera.x + destX - frog.x);
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
    if (ribbit.game.physics.p2.paused==false){
	if(!currentlyDoubleClicked){
		console.log("rock clicked");
		if((curRock != rock) || (curRock == null)){		
			if(curRock != null){
				var typeOfRock = curRock.key.substring(4, 5);
				if(typeOfRock == "B"){
						curRock.destroy();
						curRock = null;
				} else if(typeOfRock == "C"){
					makeRockDisappear();
					/*
					if(rockTimer.events != undefined){
						rockTimer.events.destroy();
					}
					curRock.destroy();
					curRock = null;
					*/
				}
			}
			if(ribbit.music.isPlaying)
				//console.log("tongue sound");
				ribbit.tongueSound.play();
			rock.body.setCollisionGroup(rockCG);
			rock.body.collides([markerCG])
			shootMarker(rock.x, rock.y);
			curRock = rock;
			slowDownFrog();
		} else {
		}
	} else {
		removeCollisionFromAllRocks();
	}
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
		if(curRock != null){
			var typeOfRock = curRock.key.substring(4, 5);
			if(typeOfRock == "B"){
				curRock.destroy();
				curRock = null;
			} else if(typeOfRock == "C"){
				makeRockDisappear();
			}
		}
		markerGroup.removeAll();
		if(ribbit.music.isPlaying){
            if (frogDying==false && frogWinning==false){
                console.log("release sound");
                ribbit.releaseSound.play();
            }
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
		
		//var a = ribbit.game.add.sprite(p0.x , p0.y, 'rock1');
		//var b = ribbit.game.add.sprite(p1.x , p1.y, 'rock1');
		
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
		//ret += rectangle[bot][0];
		ret += rectangle[bot][1];
	} else if((horizontal < 0) && (vertical > 0)){
		//facing top left
		ret += rectangle[bot-1][right];
		ret += rectangle[bot-1][right-1];
		ret += rectangle[bot][right-1];
		//ret += rectangle[bot][right];
	} else if((horizontal > 0) && (vertical < 0)){
		//facing bottom right
		//ret += rectangle[0][0];
		ret += rectangle[1][0];
		ret += rectangle[0][1];
		ret += rectangle[1][1];
	} else if((horizontal < 0) && (vertical < 0)){
		//facing bottom left
		//ret += rectangle[0][right];
		ret += rectangle[1][right];
		ret += rectangle[0][right + 1];
		ret += rectangle[1][right + 1];
	} else if((horizontal > 0) && (vertical == 0)){
		//facing right
		//ret += rectangle[0][0];
		ret += rectangle[0][1];
	} else if((horizontal < 0) && (vertical == 0)){
		//facing left
		//ret += rectangle[0][right];
		ret += rectangle[0][right - 1];
	} else if((horizontal == 0) && (vertical > 0)){
		///facing up
		//ret += rectangle[bot][0];
		ret += rectangle[bot-1][0];
	} else if((horizontal == 0) && (vertical < 0)){
		//facing down
		//ret += rectangle[0][0];
		ret += rectangle[1][0];
	}
	if(ret > 0){
		return true;
	}
	return false;
}

function queryBlockedLayer(tiledX, tiledY){
	var blockedData;
	for(var i = 0; i < ribbit.game.cache.getTilemapData("level_" + currentLevel).data.layers.length; i++){
		var name = ribbit.game.cache.getTilemapData("level_" + currentLevel).data.layers[i].name;
		if(name === "twig_c"){
			blockedData = ribbit.game.cache.getTilemapData("level_" + currentLevel).data.layers[i];
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
    if (ribbit.game.physics.p2.paused==false){
	var clickedWorldX = getClickedWorldX();
	var clickedWorldY = getClickedWorldY();
	//console.log("Screen clicked\nx:" + clickedWorldX + ", y:" + clickedWorldY);
	var currentTime = new Date();
	if(currentTime.getTime() - lastClickTime < ribbit.game.input.doubleTapRate){
		currentlyDoubleClicked = true;
		doubleClicked();
	} else {
		currentlyDoubleClicked = false;
	}
	lastClickTime = currentTime;
    }
}

function getClickedWorldX(){return ribbit.game.input.x + ribbit.game.camera.x;}

function getClickedWorldY(){return ribbit.game.input.y + ribbit.game.camera.y;}

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
	releaseFrogFromRock();
	endMenu = ribbit.game.add.sprite(512 - (495/2), 312 - (377/2), 'winmenu');
	var homeButton = ribbit.game.add.sprite(512 - 80, 312 + 60, 'home');
	var nextButton = ribbit.game.add.sprite(512 + 16, 312 + 60, 'next');
	endMenu.fixedToCamera = true;
	homeButton.inputEnabled = true;
	homeButton.events.onInputDown.add(function(){ribbit.game.state.start('MainMenu');}, this);
	homeButton.fixedToCamera = true;
	nextButton.inputEnabled = true;
	if(currentLevel != 4){
		nextButton.events.onInputDown.add(function(){ribbit.game.state.start('LevelSelect', true, false, (parseInt(currentLevel) + 1));}, this);
	}
	nextButton.fixedToCamera = true;
}

function frogDies(){
    killPopupMenu();
	endMenu = ribbit.game.add.sprite(512 - (495/2), 312 - (377/2), 'losemenu');
	var homeButton = ribbit.game.add.sprite(512 - 80, 312 + 60, 'home');
	var restartGame = ribbit.game.add.sprite(512 + 16, 312 + 60, 'restart');

	endMenu.fixedToCamera = true;
	
	homeButton.inputEnabled = true;
	homeButton.events.onInputDown.add(function(){ribbit.game.state.start('MainMenu');}, this);
	homeButton.fixedToCamera = true;
	
	restartGame.inputEnabled = true;
	restartGame.events.onInputDown.add(function(){ribbit.game.state.start('LevelSelect', true, false, currentLevel);}, this);
	restartGame.fixedToCamera = true;

}

function initRocks(rockLayerData){
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
				if(rockLayerData.data[i] == 5){
					rockPlacement.push((i%rockLayerData.width) * 16);
					rockPlacement.push((Math.floor(i/rockLayerData.width)) * 16);
                    rockPlacement.push(2); //rock type - 0, only can click once
				}
            }
	}
	rockGroup = ribbit.game.add.group();
	var tempRock;		
	for(var i = 0; i < rockPlacement.length; i += 3){
		var rockType = '0';
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
		ribbit.game.physics.p2.enable(tempRock);
		tempRock.inputEnabled = true;
		tempRock.enableBody = true;
		tempRock.body.static = true;
		tempRock.events.onInputDown.add(rockClicked, this);
	}
}

function initControls(){
	ribbit.game.input.onDown.add(screenClicked, ribbit.game); //listen for the screen to be be clicked
	wKey = ribbit.game.input.keyboard.addKey(Phaser.Keyboard.W);
	aKey = ribbit.game.input.keyboard.addKey(Phaser.Keyboard.A);
	sKey = ribbit.game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = ribbit.game.input.keyboard.addKey(Phaser.Keyboard.D);
    spaceKey = ribbit.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    xKey = ribbit.game.input.keyboard.addKey(Phaser.Keyboard.X);
	eKey = ribbit.game.input.keyboard.addKey(Phaser.Keyboard.E);
}

/*called by update function to check/handle any controls being pressed*/
var singlePress = true;
var singlePressLevel = true;
function checkControls(){
		if(spaceKey.isDown){
			if(singlePress){
				//console.log("SPACE");
				//console.log(ribbit.game.physics.p2.total);
				//console.log(markerGroup.length);
				console.log(ribbit.game.time.events);
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
	var length = ribbit.game.cache.getTilemapData(tilemapName).data.layers.length;
	for(var i = 0; i < length; i++){
		var name = ribbit.game.cache.getTilemapData(tilemapName).data.layers[i].name;
		if(name === layerName){
			mapWidth = ribbit.game.cache.getTilemapData(tilemapName).data.layers[i].width * 16;
			mapHeight = ribbit.game.cache.getTilemapData(tilemapName).data.layers[i].height * 16;
			return ribbit.game.cache.getTilemapData(tilemapName).data.layers[i];
		}
	}
}

function killPopupMenu(){
    if (gameIsPaused==true){
    console.log("killing popupmenu");
    ribbit.game.physics.p2.paused=false;
	homeMenu.destroy();
	resumeButton.destroy();
	restartButton.destroy();
	volumeButton.destroy();
	home.destroy();
    }
}

function createPopupMenu(){
    ribbit.game.physics.p2.paused=true;
    gameIsPaused=true;
    menuButton.visible = false;
	if(ribbit.music.isPlaying)
		ribbit.selectSound.play();
	
	homeMenu = ribbit.game.add.sprite(512 - (495/2), 120, 'popup');
	resumeButton = ribbit.game.add.sprite(512 - 68, 312 - 29, 'resume');
	restartButton = ribbit.game.add.sprite(512 + 10, 312 - 29, 'restart');
	
	if(ribbit.music.isPlaying){
		volumeButton = ribbit.game.add.sprite(512 - 68, 312 + 59, 'volumeOn');
	} else {
		volumeButton = ribbit.game.add.sprite(512 - 68, 312 + 59, 'volumeOff');
	}
	home = ribbit.game.add.sprite(512 + 10, 312 + 59, 'home');
	
	homeMenu.fixedToCamera = true;
    
	
	/*optimized*/
	resumeButton.inputEnabled = true;
	resumeButton.events.onInputDown.add(function(){killPopupMenu(); menuButton.visible = true;}, this);
	resumeButton.fixedToCamera = true;
	
	/*optimized*/
	restartButton.inputEnabled = true;
	restartButton.events.onInputDown.add(function(){ribbit.game.state.start('LevelSelect', true, false, currentLevel);}, this);
	restartButton.fixedToCamera = true;
	
	/*optimized*/
	volumeButton.inputEnabled = true;
	volumeButton.events.onInputDown.add(function(){
		if(ribbit.music.isPlaying){ribbit.music.stop();} else{ribbit.music.play();}
		killPopupMenu(); createPopupMenu();}, this);
	volumeButton.fixedToCamera = true;
	
	/*optimized*/
	home.inputEnabled = true;
	home.events.onInputDown.add(function(){ribbit.game.state.start('MainMenu');}, this);
	home.fixedToCamera = true;
}

function doubleClicked(){
	console.log("DOUBLE CLICKED");
	releaseFrogFromRock();
}

function wallSound(){
	if(ribbit.music.isPlaying)
		ribbit.hitWallSound.play();
}

function updateBackground(){
	if(backgroundImage != undefined){
		backgroundImage.x = ((ribbit.game.camera.x)/((mapWidth) - ribbit.game.camera.width)) * ((mapWidth) - (backgroundImage.width));
		backgroundImage.y = ((ribbit.game.camera.y)/((mapHeight) - ribbit.game.camera.height)) * ((mapHeight) - (backgroundImage.height));
	}
}

function updateGame(){
        checkifLose();
        checkifWin();
		checkControls(); //checks if controls have been pressed
        //Kevin's code
        animateFire();
		if (tongueOut == true && frog.body != undefined){
			frog.animations.play("openMouthRight");     
			if(marker != undefined){
				var tempAngle = (Math.atan2(marker.y-(frog.y),marker.x-(frog.x)))*(180/Math.PI);
				frog.body.angle = tempAngle;                    
			}
			if(frog.x<marker.x && frog.body.velocity.y>0){}
			if (frog.x>marker.x && frog.body.velocity.y>0){}
        } else {
			if(tongueBeingRetracted){
				tongueBeingRetracted = false;
			}
            if ((tongueOut==false)&&(frogDying==false) && frog != null){
                frog.animations.play('idle');
            }
		}
		updateFrog();
		updateBackground();
		checkTriggers();
		updateBird();
		/*
		if(gameState == 'gameStart'){
			checkTriggers();
		}
		*/
		
		
		//working
		/*
		if(complete)
			endLevel();
		*/
		checkMist();
	}

function setUpPhysics(){
	ribbit.game.physics.startSystem(Phaser.Physics.P2JS); //start physics system
	ribbit.game.physics.p2.setImpactEvents(true);
	ribbit.game.physics.p2.gravity.y = 1400; //set up world gravity
	
	//set up collision groups
	frogCG = ribbit.game.physics.p2.createCollisionGroup();
	blockedCG = ribbit.game.physics.p2.createCollisionGroup();
	markerCG = ribbit.game.physics.p2.createCollisionGroup();
	rockCG = ribbit.game.physics.p2.createCollisionGroup();
    flyCG = ribbit.game.physics.p2.createCollisionGroup();
	castleCG = ribbit.game.physics.p2.createCollisionGroup();
}

function setUpBlockedTileCollision(){
	for(var i = 0; i < blockedLayerTiles.length; i++){
		blockedLayerTiles[i].setCollisionGroup(blockedCG);
		blockedLayerTiles[i].collides([frogCG]);
		blockedLayerTiles[i].collides([markerCG]);
        blockedLayerTiles[i].collides([flyCG]);
        blockedLayerTiles[i].collides([castleCG]);
	}
}

function setUpCamera(){
	ribbit.game.camera.follow(frog, Phaser.Camera.FOLLOW_TOPDOWN);
	ribbit.game.camera.x = 0;
	ribbit.game.camera.y = 1800;
}

function setUpMenuButton(){
	menuButton = ribbit.game.add.sprite(966, 566, 'menu');
	menuButton.inputEnabled = true;
	menuButton.events.onInputDown.add(createPopupMenu, this);
	menuButton.fixedToCamera = true;
	ribbit.game.world.bringToTop(menuButton);	 
}

function setUpFrog(){
	markerGroup = ribbit.game.add.group(); //sets up a group for our tongue markers
	//set up frog and frog physics
	if(frogSpawnX < 0 | frogSpawnY < 0){
		alert("Frog not found");
		frogSpawnX = 100;
		frogSpawnY = 100;
	}
	frog = ribbit.game.add.sprite(frogSpawnX, frogSpawnY, 'frog'); //add frog to game
	ribbit.game.physics.p2.enable(frog); //give the frog physics
    ribbit.game.physics.p2.paused=false;
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
	tongue = ribbit.game.add.rope(frog.x, frog.y, 'tongue', null, tongueArray);
	ribbit.game.physics.p2.enable(tongue);
	tongue.updateAnimation = function(){
		updateTonguePoints();
	};
	ribbit.game.world.bringToTop(frog);
}

function setUpLayerMap(){
	ribbit.game.backgroundLayer = ribbit.game.map.createLayer('background_nc');
    ribbit.game.blockedLayer = ribbit.game.map.createLayer('twig_c');
	ribbit.game.map.setCollisionBetween(0, 1000, true, 'twig_c');
    ribbit.game.backgroundLayer.resizeWorld(); //make world the size of background tile map
	initRocks(getDataLayerFromTilemap("level_" + currentLevel, 'rock_ci')); //spawn rock objects
	blockedLayerTiles = ribbit.game.physics.p2.convertTilemap(ribbit.game.map, ribbit.game.blockedLayer);
}

function initLevel(level){
	
	
	//find state of mute 
	complete = false;
	curRock = null;
	frog = null;
	currentlyDoubleClicked = false;
	tongueAnchored = false;
	tongueBeingRetracted = false;	
	tongueOut = false;
	currentLevel = level;
	menuClicked = false;
	gameState = "gameStart";

	setUpPhysics();
	initControls(); //tell Phaser to look for key presses
	
	backgroundImage = ribbit.game.add.sprite(0, 0, 'levelBackground1');
	ribbit.game.map = ribbit.game.add.tilemap('level_' + currentLevel);
	ribbit.game.map.addTilesetImage('spritesheet2','tiles2');

	//KEVIN's Code
    mistGroup=ribbit.game.add.group();
	fireGroup=ribbit.game.add.group();        
	
	setUpLayerMap();
    spawnMist();
	addTrigger(); // trigger system has to be rendered before frog
	setUpBlockedTileCollision();
	setUpFrog();
	clearConstraints();
	setUpCamera();
	setUpMenuButton();  
	createBird();
}

ribbit.PlayGame = function(){
	createGame = function(level){
		initLevel(level);
	}	
};

ribbit.PlayGame.prototype = {
	init: function(level) {
		this.level = level;
	},
	preload: function() {

	},
	create: function(){
		createGame(this.level);
	},
	update: function(){
		updateGame();
	}
}
