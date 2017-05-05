var tb1;
//var testTrigger;
//var turtorialTween;
//var fromTween;
var arrow = [10];


var tb1;
var ca1 = 0;
var tt1;
var ft1;

var tb2;
var ca2 = 0;
var tt2;
var ft2;


var tb3;
var ca3 = 0;
var tt3;
var ft3;

var tb4;
var ca4 = 0;
var tt4;
var ft4;

var tb5;
var ca5 = 0;
var tt5;
var ft5;

var tb6;
var ca6 = 0;
var tt6;
var ft6;

var tb7;
var ca7 = 0;
var tt7;
var ft7;

var tb8;
var ca8 = 0;
var tt8;
var ft8;

var tb9;
var ca9 = 0;
var tt9;
var ft9;




/*texts will be implemented after arrows
var text1;
var text2;
var text3;
var text4;
var text5;
*/


function checkTriggers(){
	for(var i = 0; i < 10; i++){ //when i add 10th arrow it will be success
	if (top_down.game.physics.arcade.intersects(frog,arrow[i].tb))
				arrow[i].enterBox();
				
		if(!(top_down.game.physics.arcade.intersects(frog, arrow[i].tb)))
			arrow[i].exitBox();
		
		
			arrow[i].ca = arrow[i].arrow.alpha;
	}
			

}



function addTrigger(){
	switch(currentLevel){
	case 1:
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
	case 2:
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
	default:
		//nothing yet...
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