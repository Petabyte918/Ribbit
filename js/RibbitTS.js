var triggerbox;
var testTrigger;
var turtorialTween;
var fromTween;
var currentAlpha = 0;
function addTrigger(){
	triggerbox = top_down.game.add.sprite(416, 1680, 'triggerbox'); //use triggerbox.scale.setTo(x,y) to change dimensions for duplicate triggerboxes
	triggerbox.alpha = 0;
	top_down.game.physics.arcade.enable(triggerbox);
	//triggerbox.anchor.setTo(0.5, 0.5);
	testTrigger = top_down.game.add.sprite(416, 1830, 'testTrigger');
	
	//testTrigger.anchor.setTo(0.5, 0.5);
    testTrigger.alpha = 0;

	   turtorialTween = top_down.game.add.tween(testTrigger).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	   fromTween = top_down.game.add.tween(testTrigger).from( { alpha: currentAlpha }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
}

function testTurtorial(){
	fromTween.stop();
	fromTween = top_down.game.add.tween(testTrigger).from( { alpha: currentAlpha }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	turtorialTween.start();
}

function exitBox(){
	turtorialTween.stop();
	turtorialTween = top_down.game.add.tween(testTrigger).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
	testTrigger.alpha = 0;
	fromTween.start();
}
/*
function checkOverlap(A, B){
	var x = A.getBounds();
	var y = B.getBounds();
	return phaser.p
	
}
*/