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
	arrow[0] = new Arrow(208, 2320, 402, 208, 1, 0, 736, 2128, 't0');

	//turtorial part1 --has text
	
	/*
	tb1 = top_down.game.add.sprite(208, 2320, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb1.alpha = 0;
	tb1.scale.setTo(402, 208);
	top_down.game.physics.arcade.enable(tb1); 
	arrow1 = top_down.game.add.sprite(736, 2128, 'upright');
	arrow1.anchor.setTo(1, 0);
	arrow1.alpha = 0;
	tt1 = top_down.game.add.tween(arrow1).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft1 = top_down.game.add.tween(arrow1).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	//turtorial part2 --has text
	*/
	arrow[1] = new Arrow(608, 2032, 1, 1, 1, 1, 1024, 2336, 't1');
	/*
	tb2 = top_down.game.add.sprite(688, 2048, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb2.alpha = 0;
	tb2.scale.setTo(224, 160);
	top_down.game.physics.arcade.enable(tb2); 
	arrow2 = top_down.game.add.sprite(1024, 2336, 'downright');
	arrow2.anchor.setTo(1, 1);
	arrow2.alpha = 0;
	tt2 = top_down.game.add.tween(arrow2).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft2 = top_down.game.add.tween(arrow2).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);	
	//turtorial part3
	*/
	arrow[2] = new Arrow(752, 2336, 416, 176, .5, .5, 1184, 2464, 'right');
	/*
	tb3 = top_down.game.add.sprite(752, 2336, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb3.alpha = 0;
	tb3.scale.setTo(416, 176);
	top_down.game.physics.arcade.enable(tb3); 
	arrow3 = top_down.game.add.sprite(1184, 2464, 'right');
	arrow3.anchor.setTo(.5, .5);
	arrow3.alpha = 0;
	tt3 = top_down.game.add.tween(arrow3).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft3 = top_down.game.add.tween(arrow3).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	//turtorial part4
	*/
	arrow[3] = new Arrow(1456, 2224, 320, 256, .5, .5, 1440, 2208, 'up');
	/*
	tb4 = top_down.game.add.sprite(1296, 2336, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb4.alpha = 0;
	tb4.scale.setTo(304, 352);
	top_down.game.physics.arcade.enable(tb4); 
	arrow4 = top_down.game.add.sprite(1440, 2208, 'up');
	arrow4.anchor.setTo(.5, .5);
	arrow4.alpha = 0;
	tt4 = top_down.game.add.tween(arrow4).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft4 = top_down.game.add.tween(arrow4).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);	
   //turorial part 5
   */
    arrow[4] = new Arrow(1392, 1408, 320, 480, 0, 0, 1376, 1776, 'upleft');
   /*
  	tb5 = top_down.game.add.sprite(1392, 1408, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb5.alpha = 0;
	tb5.scale.setTo(320, 480);
	top_down.game.physics.arcade.enable(tb5); 
	arrow5 = top_down.game.add.sprite(1376, 1776, 'upleft');
	arrow5.anchor.setTo(0, 0);
	arrow5.alpha = 0;
	tt5 = top_down.game.add.tween(arrow5).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft5 = top_down.game.add.tween(arrow5).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);		
   //turorial part 6 --has text
   */
	arrow[5] = new Arrow(944, 1376, 496, 464, 0, 1, 1152, 1872, 't2');
   /*
  	tb6 = top_down.game.add.sprite(944, 1376, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb6.alpha = 0;
	tb6.scale.setTo(496, 464);
	top_down.game.physics.arcade.enable(tb6); 
	arrow6 = top_down.game.add.sprite(1152, 1872, 'downleft');
	arrow6.anchor.setTo(0, 1);
	arrow6.alpha = 0;
	tt6 = top_down.game.add.tween(arrow6).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft6 = top_down.game.add.tween(arrow6).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
   //turorial part 7
   */
   arrow[6] = new Arrow(464, 1360, 448, 400, .5, .5, 704, 1520, 'upleft');
   /*
  	tb7 = top_down.game.add.sprite(464, 1360, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb7.alpha = 0;
	tb7.scale.setTo(448, 400);
	top_down.game.physics.arcade.enable(tb7); 
	arrow7 = top_down.game.add.sprite(704, 1520, 'upleft');
	arrow7.anchor.setTo(.5, .5);
	arrow7.alpha = 0;
	tt7 = top_down.game.add.tween(arrow7).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft7 = top_down.game.add.tween(arrow7).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	
   //turorial part 8
   
   */
    arrow[7] = new Arrow(208, 928, 416, 384, .5, .5, 592, 1104, 'up');
   
   /*
  	tb8 = top_down.game.add.sprite(208, 928, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb8.alpha = 0;
	tb8.scale.setTo(416, 384);
	top_down.game.physics.arcade.enable(tb8); 
	arrow8 = top_down.game.add.sprite(592, 1104, 'up');
	arrow8.anchor.setTo(.5, .5);
	arrow8.alpha = 0;
	tt8 = top_down.game.add.tween(arrow8).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft8 = top_down.game.add.tween(arrow8).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	
	//turorial part 9 --has text
	*/
	arrow[8] = new Arrow(752, 512, 416, 480, .5, .5, 1088, 624, 't3');
	/*
  	tb9 = top_down.game.add.sprite(752, 512, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb9.alpha = 0;
	tb9.scale.setTo(416, 480);
	top_down.game.physics.arcade.enable(tb9); 
	arrow9 = top_down.game.add.sprite(1088, 624, 'downright');
	arrow9.anchor.setTo(.5, .5);
	arrow9.alpha = 0;
	tt9 = top_down.game.add.tween(arrow9).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft9 = top_down.game.add.tween(arrow9).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	
	//10 will be added after text is added.
	
	*/
	arrow[9] = new Arrow(1552, 880, 224, 96, .5, .5, 1696, 864, 't4');
	/*
	
	   //turtorialTween = top_down.game.add.tween(testTrigger).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	   //fromTween = top_down.game.add.tween(testTrigger).from( { alpha: currentAlpha }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);

	   


*/
}
/*
function checkOverlap(A, B){
	var x = A.getBounds();
	var y = B.getBounds();
	return phaser.p
	
}
*/

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