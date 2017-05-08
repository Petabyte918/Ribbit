//SPAWNING MIST AND ASS TO MISTGROUP IN CREATE FUNCTION
// NEEDS TO BE CALLED AFTER BACKGROUND AND BEFORE THE TWIG CREATION/PLACEMENT 

function spawnMist(){
    spawnMistHelper(1);    
    spawnMistHelper(1);
    spawnMistHelper(2);
    spawnMistHelper(2);
    spawnMistHelper(2);
    spawnMistHelper(3);
    spawnMistHelper(3);

}

function spawnMistHelper(section){
    var mistSprite= top_down.game.rnd.integerInRange(1,3);

    if (mistSprite==1){
        var mistType="mist1";
    }
    else if (mistSprite==2){
        var mistType='mist2';
    }
    else if (mistSprite==3){
        var misType = 'mist3';
    }
    
    if (section==1){
        var randx = top_down.game.rnd.integerInRange(0,mapWidth/2);
        var randy = top_down.game.rnd.integerInRange(0,mapHeight/2);
    }
    if (section==2){
        var randx = top_down.game.rnd.integerInRange(mapWidth/2,mapWidth);
        var randy = top_down.game.rnd.integerInRange(0,mapHeight/2);
    }
    if (section==3){
        var randx = top_down.game.rnd.integerInRange(0,mapWidth/2);
        var randy = top_down.game.rnd.integerInRange(mapHeight/2,mapHeight);
    }
    if (section==4){
        var randx = top_down.game.rnd.integerInRange(mapWidth/2,mapWidth);
        var randy = top_down.game.rnd.integerInRange(mapHeight/2,mapHeight);
    }    
    
    
    moveVal = top_down.game.rnd.integerInRange(1, 5);  
    var tempMist = top_down.game.add.sprite(randx, randy, mistType);
    tempMist.enableBody=true;
    top_down.game.physics.arcade.enable(tempMist);
    tempMist.body.velocity.x=moveVal;
    mistGroup.add(tempMist);
    
}

function checkMist(){
    if (mistGroup!=undefined){
    for (var i=0; i<mistGroup.children.length; i++){
        if (mistGroup.children[i].x>mapWidth){
            mistGroup.children[i].x=0;
            }
        }
    }
}
