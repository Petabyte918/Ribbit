var bird;
var hit = false;
function createBird(){
	bird = ribbit.game.add.sprite(frogSpawnX, frogSpawnY - 100, 'bat');
	ribbit.game.physics.p2.enable(bird);
	bird.enableBody = true;
	bird.body.velocity.x = 10;
	bird.body.velocity.y = 10;
	bird.animations.add('fly', [0, 1, 2, 3, 4, 5], 30, true);
}

function updateBird(){
	bird.body.velocity.x = (frog.body.x - bird.body.x)/2;
	bird.body.velocity.y = (frog.body.y - bird.body.y);
	
	if(bird.body.velocity.x < 10 && bird.body.velocity.x > 0)
		bird.body.velocity.x = 10;
	if(bird.body.velocity.x > -10 && bird.body.velocity.x < 0)
		bird.body.velocity.x = -10;

	
	if(bird.body.velocity.y < 10 && bird.body.velocity.y > 0)
		bird.body.velocity.y = 10;
	if(bird.body.velocity.y > -10 && bird.body.velocity.y < 0)
		bird.body.velocity.y = -10;
	
	bird.animations.play('fly');
	if(ribbit.game.physics.arcade.intersects(frog, bird)){
	if(!hit)
	escapeTime();
	}
}

function escapeTime(){
 shootMarker(0, 0);
 tongueBeingRetracted = true;
 curRock = null;
 hit = true;
 setTimeout(hitFlag, 3000);
}


function hitFlag(){
	hit = false;
}