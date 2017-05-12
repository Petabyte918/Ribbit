/* Contains functions to spawn castle and fire.
    Also has a checkifWin() function to detect if the frog collides with the castle to win
*/
//fire
var deadcounter=1;
var justHitFire = false;
var fireHitTime = 0;
var currentTime1 = 0;
var frogDying=false;
var frogWinning = false;
var distanceBetweenFrogAndCastle = 100;
// Spawns castke sprite and enables collision

function spawnCastle(x,y){
	frogDying = false;
    frogWinning = false;
    castle=ribbit.game.add.sprite(x,y,'castle');
    castle.enableBody = true;
    ribbit.game.physics.p2.enable(castle);
    castle.body.setCollisionGroup(castleCG);
    castle.body.collides([blockedCG]);
    return castle;
}

// gets called in update function and checks if frog collides with castle
// if collision is detected call frogWins()

function checkifWin(){
    if (castle!= undefined && castle.body != undefined && !frogDying ){
		distanceBetweenFrogAndCastle = Math.sqrt(((castle.body.x-frog.body.x)*(castle.body.x-frog.body.x))+((castle.body.y-frog.body.y)*(castle.body.y-frog.body.y)));
		if (distanceBetweenFrogAndCastle <=64){
			console.log("FrogWins");
            frogWinning = true;
			frogWins();
		}
	}
}

// spawns one fire, randomly adds fire speed, adds fire to fireGroup

function spawnFire(x,y){
    animationSpeed = ribbit.game.rnd.integerInRange(8, 12);      
    var tempFire = ribbit.game.add.sprite(x,y,"fire");
    tempFire.enableBody=true;
    tempFire.animations.add('default', [0,1,2,3,4], animationSpeed, true);
    fireGroup.add(tempFire);    
}

// tells all the fire sprites in fireGroup to play animations
function animateFire(){
    if (fireGroup!=null){
        fireGroup.callAll('animations.play', 'animations', 'default');
    }
}

//checks collision between frog and each fire sprite in fireGroup
//if collides frog dies
function checkifLose(){
    if (fireGroup != undefined){
        for (var i = 0; i<fireGroup.children.length; i++){
                fireVar = fireGroup.children[i];
                distanceBetweenFrogAndFire= Math.sqrt(((fireVar.x-frog.x)*(fireVar.x-frog.x)+(fireVar.y-frog.y)*(fireVar.y-frog.y)));
                if (distanceBetweenFrogAndFire<=25){
                    /*if (deadcounter%50==0){
                        //console.log("FROG IS ON FIRE");
                        
                        frogOnFire();
                        
                    }*/
                    //console.log(distanceBetweenFrogAndFire);
                    //frogInContactWithFire();
                    //deadcounter++;
                    //console.log(deadcounter);
                    frogOnFire();
                }
        }
    }
    
}

function frogOnFire(){
    frogDying=true;
    frog.body.velocity.x=0;
    frog.body.velocity.y=0;
    releaseFrogFromRock();
    frog.animations.play("die"); 
    if (frogDying){/*
	setInterval(function(){console.log("TIMED INTERVAL");frogDies();}, 2199);*/ 
        if (frog.animations.currentFrame.index==16){
            frog.kill();
            frogDies();
        }
    }
}


/*
function frogInContactWithFire(){
    if (justHitFire==false){
        justHitFire=true;
        var time1 = new Date();
        fireHitTime=time1.getTime();
    }
   
    if (justHitFire == true){
         var time2 = new Date();
        currentTime1=time2.getTime();
        if (currentTime1-fireHitTime > 200){
            console.log("HERE");
            frogDies();
        }
    }
}*/