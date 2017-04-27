var tb1;
//var testTrigger;
//var turtorialTween;
//var fromTween;
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



/*texts will be implemented after arrows
var text1;
var text2;
var text3;
var text4;
var text5;
*/

function addTrigger(){
	//turtorial part1 --has text
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
	tb2 = top_down.game.add.sprite(736, 2032, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb2.alpha = 0;
	tb2.scale.setTo(368, 256);
	top_down.game.physics.arcade.enable(tb2); 
	arrow2 = top_down.game.add.sprite(880, 2016, 'downright');
	arrow2.anchor.setTo(1, 1);
	arrow2.alpha = 0;
	tt2 = top_down.game.add.tween(arrow2).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft2 = top_down.game.add.tween(arrow2).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);	
	//turtorial part3
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
  	tb5 = top_down.game.add.sprite(1392, 1648, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb5.alpha = 0;
	tb5.scale.setTo(272, 400);
	top_down.game.physics.arcade.enable(tb5); 
	arrow5 = top_down.game.add.sprite(1376, 1776, 'upleft');
	arrow5.anchor.setTo(0, 0);
	arrow5.alpha = 0;
	tt5 = top_down.game.add.tween(arrow5).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft5 = top_down.game.add.tween(arrow5).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);		
   //turorial part 6 --has text
  	tb6 = top_down.game.add.sprite(944, 1376, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb6.alpha = 0;
	tb6.scale.setTo(416, 512);
	top_down.game.physics.arcade.enable(tb6); 
	arrow6 = top_down.game.add.sprite(1152, 1872, 'downleft');
	arrow6.anchor.setTo(0, 1);
	arrow6.alpha = 0;
	tt6 = top_down.game.add.tween(arrow6).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft6 = top_down.game.add.tween(arrow6).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
   //turorial part 7
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
  	tb8 = top_down.game.add.sprite(208, 928, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb8.alpha = 0;
	tb8.scale.setTo(416, 384);
	top_down.game.physics.arcade.enable(tb8); 
	arrow8 = top_down.game.add.sprite(592, 1104, 'up');
	arrow8.anchor.setTo(.5, .5);
	arrow8.alpha = 0;
	tt8 = top_down.game.add.tween(arrow8).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft8 = top_down.game.add.tween(arrow8).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	
	//turorial part 9
  	tb8 = top_down.game.add.sprite(752, 512, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	tb8.alpha = 0;
	tb8.scale.setTo(416, 480);
	top_down.game.physics.arcade.enable(tb8); 
	arrow8 = top_down.game.add.sprite(1088, 624, 'downright');
	arrow8.anchor.setTo(.5, .5);
	arrow8.alpha = 0;
	tt8 = top_down.game.add.tween(arrow8).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	ft8 = top_down.game.add.tween(arrow8).from( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	
	//10 will be added after text is added.
	
	   //turtorialTween = top_down.game.add.tween(testTrigger).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	   //fromTween = top_down.game.add.tween(testTrigger).from( { alpha: currentAlpha }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
}

function enterBox(trig, tt, ft, ca){
	ft.stop();
	ft = top_down.game.add.tween(trig).from( { alpha: ca }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	tt.start();
}

function exitBox(trig, tt, ft, ca){
	tt.stop();
	tt = top_down.game.add.tween(trig).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	trig.alpha = 0;
	ft.start();
}
/*
function checkOverlap(A, B){
	var x = A.getBounds();
	var y = B.getBounds();
	return phaser.p
	
}
*/