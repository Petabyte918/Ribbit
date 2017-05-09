var arrow = [10];
var endMenu = null;
var homeButton;
var nextButton;
var restartGame;

function checkTriggers(){
	if(currentLevel == 1 || currentLevel == 2) //needs to be removed or changed when trigger system is added to other levels.
	var i = 0
	while(arrow[i] != null && i < 10){ //when i add 10th arrow it will be success
		if (top_down.game.physics.arcade.intersects(frog, arrow[i].tb))
				arrow[i].enterBox();
				
		if(!(top_down.game.physics.arcade.intersects(frog, arrow[i].tb)))
			arrow[i].exitBox();
					
		arrow[i].ca = arrow[i].arrow.alpha;
		i++;
	}
}

var complete = false;
function endLevel(){
	if(!complete){
	endMenu = top_down.game.add.sprite(top_down.game.camera.x + 512 - (495/2), top_down.game.camera.y + 312 - (377/2), 'winmenu');
	homeButton = top_down.game.add.sprite(top_down.game.camera.x + 512 - 80, top_down.game.camera.y + 312 + 60, 'home');
	nextButton = top_down.game.add.sprite(top_down.game.camera.x + 512 + 16, top_down.game.camera.y + 312 + 6, 'next');
	homeButton.inputEnabled = true;
	homeButton.events.onInputDown.add(goHome, this);
	nextButton.inputEnabled = true;
	nextButton.events.onInputDown.add(nextLevel, this);
	complete = true;
	}else{
		endMenu.x = top_down.game.camera.x + 512 - (495/2);
		endMenu.y = top_down.game.camera.y + 312 - (377/2);
		homeButton.x = top_down.game.camera.x + 512 - 80;
		homeButton.y = top_down.game.camera.y + 312 + 60;
		nextButton.x = top_down.game.camera.x + 512 + 16;
		nextButton.y = top_down.game.camera.y + 312 + 60;

	}
}

function nextLevel(){
	complete = false;
	createGame(currentLevel + 1);
}

var lost = false;
function lostLevel(){
	if(frogDying){ //prevents endMenu from popping after restart
	if(!lost){
	endMenu = top_down.game.add.sprite(top_down.game.camera.x + 512 - (495/2), top_down.game.camera.y + 312 - (377/2), 'losemenu');
	homeButton = top_down.game.add.sprite(top_down.game.camera.x + 512 - 80, top_down.game.camera.y + 312 + 60, 'home');
	restartGame = top_down.game.add.sprite(top_down.game.camera.x + 512 + 16, top_down.game.camera.y + 312 + 60, 'restart');
	homeButton.inputEnabled = true;
	homeButton.events.onInputDown.add(goHome, this);
	restartGame.inputEnabled = true;
	restartGame.events.onInputDown.add(lostLevel2, this);
	lost = true;
	}else{
		endMenu.x = top_down.game.camera.x + 512 - (495/2);
		endMenu.y = top_down.game.camera.y + 312 - (377/2);
		homeButton.x = top_down.game.camera.x + 512 - 80;
		homeButton.y = top_down.game.camera.y + 312 + 60;
		restartGame.x = top_down.game.camera.x + 512 + 16;
		restartGame.y = top_down.game.camera.y + 312 + 60;
		
	}
	}
}

function lostLevel2(){
	frogDying = false;
	frog.reset(frogSpawnX, frogSpawnY);
	restartLevel();
}

function addTrigger(){
	switch(currentLevel){
	case 1:
		var controls = top_down.game.add.sprite(352, 2552, 'gameControls');
		controls.anchor.setTo(.5, 0);
		//scalex and scaley was done wrong here, but it works fine in level 1 so didnt change.
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 2, 2, 1, 1, 944, 2208, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		
		arrow[8] = new Arrow(368, 448, 2.473, 1.2, .5, .5, 800, 736, 't3');
		
		arrow[9] = new Arrow(752, 512, 416, 480, .5, .5, 1248, 624, 't4');
		break;
	case 2:
		arrow[0] = new Arrow(2640, 1584, 1.75, .59, .5, .5, 2960, 1760, 'follow');
		arrow[1] = new Arrow(1712, 2752, 1, 1.23, .5, .5, 2032, 2880, 'throw');
		arrow[2] = new Arrow(1024, 3200, 1.39, 2, .5, .5, 1296, 3712, 'goUp');
		arrow[3] = new Arrow(64, 2560, 1.07, 1.32, .5, .5, 144, 3040, 'fall');
		arrow[4] = null;
		arrow[5] = null
		arrow[6] = null;
		arrow[7] = null;
		arrow[8] = null;
		arrow[9] = null;
		break;
	/*
	case 3:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 4:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 5:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 6:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 7:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 8:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 9:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 10:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 11:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
	case 12:
		arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');
		arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
		arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
		arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
		arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
		arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
		arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
		arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
		arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
		arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
		break;
		*/
		default:
	}
}

class Arrow{
	/*
	* tbx = trigger box x location
	* tby = trigger box y location
	* scalex = scale of trigger box on x axis
	* scaley = scale of trigger box on y axis
	* ax = anchor x
	* ay = anchor y
	* arrowx = x location of arrow
	* arrowy = y location of arrow
	* direction = which arrow to use
	*/
	constructor(tbx, tby, scalex, scaley, ax, ay, arrowx, arrowy, direction){
	this.tb = top_down.game.add.sprite(tbx, tby, 'triggerbox'); 
	this.tb.alpha = 0;
	this.tb.scale.setTo(scalex, scaley);
	this.arrow = top_down.game.add.sprite(arrowx, arrowy, direction);
	this.arrow.alpha = 0;
	this.arrow.anchor.setTo(ax, ay);
	this.tt = top_down.game.add.tween(this.arrow).to( { alpha: .6 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false)
	this.ft = top_down.game.add.tween(this.arrow).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	}
	
	enterBox(){
	this.ft.stop();
	this.ft = top_down.game.add.tween(this.arrow).from( { alpha: this.ca }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	this.tt.start();
	}
	exitBox(){
	this.tt.stop();
	this.tt = top_down.game.add.tween(this.arrow).to( { alpha: .6 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	this.arrow.alpha = 0;
	this.ft.start();
	}
	
	
}