/*
*/


function spawnCastle(x,y){   
    castle=top_down.game.add.sprite(x,y,'castle');
    castle.enableBody = true;
    top_down.game.physics.p2.enable(castle);
    castle.body.setCollisionGroup(castleCG);
    castle.body.collides([blockedCG]);
    return castle;
}


function checkifWin(){
    if (castle!= undefined){
    distanceBetweenFrogAndCastle = Math.sqrt(((castle.body.x-frog.body.x)*(castle.body.x-frog.body.x))+((castle.body.y-frog.body.y)*(castle.body.y-frog.body.y)));
    if (distanceBetweenFrogAndCastle <=32){
        frogWins();
        }
    }
}