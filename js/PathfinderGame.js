/// <reference path="phaser.js" />
var top_down = top_down || {};

top_down.Game = function(){};

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

var currentMarker;

var marker;
var markerGroup;
var distanceBetweenFrogAndRock;
var wallAnchor;

var markerX;
var markerY;

var tongueOut;

var rockPlacement = [200, 1400, 600, 1400, 400, 1200, 500, 1100];

function updateTonguePoints(){
	var startX = frog.x + 42;
	var startY = frog.y + 32;
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
	
	tongue.reset(frog.x + 42, frog.y + 32);
	tongueArray[0].x = -20;
	tongueArray[0].y = -20;
	tongueArray[1].x = -dx;
	tongueArray[1].y = -dy;
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
	console.log("marker  hit block");
	tongueBeingRetracted = true;
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

function moveObjToObj(obj1, obj2, speed){
	console.log(obj2.x, obj2.y)
	var angle = Math.atan2(obj2.y - obj1.body.y, obj2.x - obj1.body.x)
	obj1.body.velocity.x = Math.cos(angle) * speed;
	obj1.body.velocity.y = Math.sin(angle) * speed;
	console.log(obj1)
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
	console.log(markerGroup.length);
	for(var i = 0; i < markerGroup.length; i++){
		markerGroup.remove(markerGroup.getAt(i));
	}
	marker = markerGroup.create(frog.x, frog.y, 'tongue', 1);
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

function tongueGone(){
	marker.x = frog.x;
	marker.y = frog.y;
	tongueOut = false;
	tongueArray[1].x = -20;
	tongueArray[1].y = -20;
	for(var i = 0; i < markerGroup.length; i++){
		markerGroup.remove(markerGroup.getAt(i));
	}
	console.log("STEVE");
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


top_down.Game.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.P2JS); //start physics system
		this.physics.p2.setImpactEvents(true);
		this.physics.p2.gravity.y = 1400; //set up world gravity
		
		//set up tilemap and layers
		this.map = this.game.add.tilemap('test_map');
		this.map.addTilesetImage('spritesheet2','tiles2');
		this.backgroundLayer = this.map.createLayer('background_nc');
		this.blockedLayer = this.map.createLayer('twig_c');
		this.map.setCollisionBetween(0, 1000, true, 'twig_c');
	
		this.input.onDown.add(screenClicked, this); //listen for the screen to be be clicked
		
		//set up collision groups
		frogCG = this.physics.p2.createCollisionGroup();
		blockedCG = this.physics.p2.createCollisionGroup();
		markerCG = this.physics.p2.createCollisionGroup();
		rockCG = this.physics.p2.createCollisionGroup();
		
		initRocks(); //spawn rock objects
		initControls(); //tell Phaser to look for key presses
		
		//make all tiles in the blocked layer impassable
		var blockedLayerTiles = this.physics.p2.convertTilemap(this.map, this.blockedLayer);
		for(var i = 0; i < blockedLayerTiles.length; i++){
			blockedLayerTiles[i].setCollisionGroup(blockedCG);
			blockedLayerTiles[i].collides([frogCG]);
			blockedLayerTiles[i].collides([markerCG]);
		}
		
		//set up frog and frog physics
		frog = this.add.sprite(160, 1400, 'frog'); //add frog to game
		this.physics.p2.enable(frog); //give the frog physics
		frog.enableBody = true;
		frog.body.mass = 4;
		frog.body.setCollisionGroup(frogCG);
		frog.body.collides([blockedCG]);
		
		tongueArray.push(new Phaser.Point(0, 0));
		tongueArray.push(new Phaser.Point(0, 0));
		tongue = this.game.add.rope(frog.x, frog.y, 'tongue', null, tongueArray);
		tongue.updateAnimation = function(){
			updateTonguePoints();
		};
		
		tongueAnchored = false;
		tongueBeingRetracted = false;
		tongueOut = false;
		
		
		markerGroup = this.add.group(); //sets up a group for our tongue markers
		
		this.backgroundLayer.resizeWorld(); //make world the size of background tile map

		//adjust starting camera position
		this.camera.x = 0;
		this.camera.y = 1200;
	},
	update: function(){
		checkControls(); //checks if controls have been pressed
		clearConstraints();
		
		if(tongueBeingRetracted && tongueOut){
			if(moveObjToObj(marker, frog, 800)){
				tongueBeingRetracted = false;
				marker.body.velocity.x = 0;
				marker.body.velocity.y = 0;
				tongueGone();
			}
		}
		
		
		
		if(tongueAnchored){
			tongueOut = true;
			//console.log(distanceBetweenFrogAndRock);
			if(distanceBetweenFrogAndRock >= 40){
				distanceBetweenFrogAndRock -= 4.5;
			}
			//console.log(distanceBetweenFrogAndRock);
			constraints.push(this.game.physics.p2.createDistanceConstraint(frog, wallAnchor, distanceBetweenFrogAndRock));
			///console.log(constraints);
		} else {
			
		}
	}
}