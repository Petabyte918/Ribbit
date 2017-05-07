//SPAWNING MIST AND ASS TO MISTGROUP IN CREATE FUNCTION
// NEEDS TO BE CALLED AFTER BACKGROUND AND BEFORE THE TWIG CREATION/PLACEMENT 
function spawnMist(){
    for(){
    moveVal = top_down.game.rnd.integerInRange(1, 5);  
    var tempMist = top_down.game.add.sprite(600, 2400, 'mist1');
    tempMist.enableBody=true;
    top_down.game.physics.arcade.enable(tempMist);
    tempMist.body.velocity.x=moveVal;
    mistGroup.add(tempMist);
    }
}

function checkMist(){
    if (mistGroup!=undefined){
    for (var i=0; i<mistGroup.children.length; i++){
        if (mistGroup.children[i].x>top_down.game.map.width*16){
            mistGroup.children[i].x=0;
            }
        }
    }
}
/*
    spawnMist(600,2400);
	spawnMist(600,2000);
*/
