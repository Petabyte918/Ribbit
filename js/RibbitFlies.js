

// (flyName, [x, y])

function spawnFlies(flyID,array){

    flyID = top_down.game.add.sprite(array[0], array[1], 'fly'); //add fly
    flyID.animations.add('right', [0,1], 15, true);
    flyID.animations.add('left', [2,3], 15, true);
    flyID.enableBody = true;
    top_down.game.physics.p2.enable(flyID)
    flyID.body.setCollisionGroup(flyCG);
    flyID.body.collides([blockedCG]);
    
    return flyID;

}

function moveFlies(flyID,type){  

    //console.log(moveVal);
    //console.log(flyID);
   
    if (flyID!=undefined){
            flyID.body.fixedRotation = true;
            moveVal = top_down.game.rnd.integerInRange(1, 50);  

            flyID.body.data.gravityScale=0;
        if (type==1){

            if (moveVal==1){
                flyID.animations.play("right");
                flyID.body.velocity.x=100;
            }
            else if (moveVal==2){
                flyID.animations.play("left");
                flyID.body.velocity.x=-100;
            }
        }
        else if (type==2){
                
            }

            if (moveVal==1){
                flyID.animations.play("right");
                flyID.body.velocity.x=100;
            }
            else if (moveVal==2){
                flyID.animations.play("left");
                flyID.body.velocity.x=-100;
            }
            else if (moveVal==3 || moveVal==34){
                flyID.body.velocity.y=-50;
            }
            else if (moveVal==4 || moveVal==20){
                flyID.body.velocity.y=50;
            }  
        }
        
    }

