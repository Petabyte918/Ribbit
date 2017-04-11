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

	//console.log(dx, dy);
	
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
	//console.log("marker hit rock");
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
	//console.log(markerAngle);
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
	//console.log("rock clicked");
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
    
    // To test opening mouth
    xKey = top_down.game.input.keyboard.addKey(Phaser.Keyboard.X);
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
		}
		
		//set up frog and frog physics
		frog = this.add.sprite(160, 1400, 'frog'); //add frog to game
		this.physics.p2.enable(frog); //give the frog physics
		frog.enableBody = true;
		frog.body.mass = 4;
		frog.body.setCollisionGroup(frogCG);
		frog.body.collides([blockedCG]);
        
        //adding frog animations
        frog.animations.add('idle', [0,0,0,0,0,0,1,1,1,1], 5, true);
        frog.animations.add('openMouthRight', [2], 1, true);
        frog.animations.add('openMouthLeft',[4],1, true);
    
		tongueArray.push(new Phaser.Point(0, 0));
		tongueArray.push(new Phaser.Point(0, 0));
		tongue = this.game.add.rope(frog.x, frog.y, 'tongue', null, tongueArray);
		tongue.updateAnimation = function(){
			updateTonguePoints();
		};
		
		tongueAnchored = false;
		tongueBeingRetracted = true;
		markerGroup = this.add.group(); //sets up a group for our tongue markers
		
		this.backgroundLayer.resizeWorld(); //make world the size of background tile map

		//adjust starting camera position
		this.camera.x = 0;
		this.camera.y = 1200;
        
	},
	update: function(){
		checkControls(); //checks if controls have been pressed
		clearConstraints();
		if(tongueAnchored){
			//console.log(distanceBetweenFrogAndRock);
			if(distanceBetweenFrogAndRock >= 40){
				distanceBetweenFrogAndRock -= 3;
			}
			//console.log(distanceBetweenFrogAndRock);
			constraints.push(this.game.physics.p2.createDistanceConstraint(frog, wallAnchor, distanceBetweenFrogAndRock));
			//console.log(constraints);
		} else {
			
		}
        
        if (tongueAnchored == true){
            frog.animations.play("openMouthRight");
            
            
            if(marker != undefined){
                var tempAngle = (Math.atan2(marker.y-frog.y,marker.x-frog.x))*(180/Math.PI);
                //console.log(tempAngle);
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
		


	}
}