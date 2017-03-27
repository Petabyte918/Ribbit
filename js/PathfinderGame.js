/// <reference path="phaser.js" />
var top_down = top_down || {};

top_down.Game = function(){};

var wKey;
var aKey;
var sKey;
var dKey;
var mKey;
var nKey;
var lKey;

var backgroundLayer;
var player;
var playerSpeed;
var onPath;
var flag;

var dest_x;
var dest_y;

var nodeList = [];
var blockedNodes = [];
var travelPath = [];

var openMarkers;
var pathMarkers;
var markerText;

var showPath;

/*returns block coordinates of the player */
function world2block(worldX, worldY){
	return new blockVec((worldX - (worldX % 32))/32, (worldY - (worldY % 32))/32);
}

function player2block(){
	return new blockVec((player.x - (player.x % 32))/32, (player.y - (player.y % 32))/32);
}

function distanceBetween(blockVector1, blockVector2){
	var a = blockVector2.x - blockVector1.x;
	var b = blockVector2.y - blockVector1.y;
	return c = Math.sqrt((a*a) + (b*b));
}

/*All node coordinates must be in block form*/
function node(blockX, blockY, status){
	this.x = blockX;
	this.y = blockY;
	this.status = status;
	this.parent = null;
	if(status != "blocked"){
		this.g = distanceBetween(player2block(), new blockVec(blockX, blockY));
		this.h = distanceBetween(world2block(dest_x, dest_y), new blockVec(blockX, blockY));
		this.f = this.g + this.h;
	}
}

/*there might be a mistake in this function, node[i] */
function getNode(blockX, blockY){
	for(var i = 0; i < nodeList.length; i++){
		if((nodeList[i].x === blockX) && (nodeList[i].y === blockY)){
			return node[i];
		}
	}
	return null;
}

function getNodeFromBlocked(blockX, blockY){
	for(var i = 0; i < blockedNodes.length; i++){
		if((blockedNodes[i].x === blockX) && (blockedNodes.y === blockY)){
			return blockedNodes[i];
		}
	}
	return null;
}

function openNode(blockX, blockY, parent){
	var currentNode = getNode(blockX, blockY);
	if(currentNode === null){
		var tempNode = new node(blockX, blockY, "opened");
		tempNode.parent = parent;
		nodeList.push(tempNode);
		//openMarkers.create(blockX * 32, blockY * 32, "open_marker");
	}
}

function blockNode(blockX, blockY){
	blockedNodes.push(new node(blockX, blockY, "blocked"));
}

function openSurroundingNodes(blockVector){
	openNode(blockVector.x, blockVector.y - 1, blockVector);
	openNode(blockVector.x - 1, blockVector.y, blockVector);
	openNode(blockVector.x + 1, blockVector.y, blockVector);
	openNode(blockVector.x, blockVector.y + 1, blockVector);

	var tempNode1 = getNode(blockVector.x + 1, blockVector.y);
	var tempNode2 = getNode(blockVector.x, blockVector.y + 1);

	openNode(blockVector.x + 1, blockVector.y + 1, blockVector); //bottom right
	openNode(blockVector.x - 1, blockVector.y + 1, blockVector); //bottom left
	openNode(blockVector.x - 1, blockVector.y - 1, blockVector); //top left
	openNode(blockVector.x + 1, blockVector.y - 1, blockVector); //top right
}

function observeSurroundingNodes(blockVector, array){
	if(blockVector == null){
		return null;
	}
	var ret = [];
	var temp; 
	temp = getNodeFromArray(blockVector.x - 1, blockVector.y - 1, array);
	if(temp != null){ret.push(temp)}
	temp = getNodeFromArray(blockVector.x, blockVector.y - 1, array);
	if(temp != null){ret.push(temp)}
	temp = getNodeFromArray(blockVector.x + 1, blockVector.y - 1, array);
	if(temp != null){ret.push(temp)}
	temp = getNodeFromArray(blockVector.x - 1, blockVector.y, array);
	if(temp != null){ret.push(temp)}
	temp = getNodeFromArray(blockVector.x + 1, blockVector.y, array);
	if(temp != null){ret.push(temp)}
	temp = getNodeFromArray(blockVector.x - 1, blockVector.y + 1, array);
	if(temp != null){ret.push(temp)}
	temp = getNodeFromArray(blockVector.x, blockVector.y + 1, array);
	if(temp != null){ret.push(temp)}
	temp = getNodeFromArray(blockVector.x + 1, blockVector.y + 1, array);
	if(temp != null){ret.push(temp)}
	return ret;
}

function findMinH(array){
	var min = null;
	var minSet = [];
	for(var i = 0; i < array.length; i++){
		if(minSet.length == 0){
				minSet.push(array[i]);
		} else if(array[i].h < minSet[0].h){
			minSet = [];
			minSet.push(array[i]);
		} else if(array[i].h == minSet[0].h){
			minSet.push(array[i]);
		}
	}
	min = minSet[0];
	for(var i = 0; i < minSet.length; i++){
		if(minSet[i].f < min.f){
			min = minSet[i];
		}
	}
	return min;
}

function getNodeFromArray(blockX, blockY, array){
	for(var i = 0; i < array.length; i++){
		if((array[i].x === blockX) && (array[i].y === blockY)){
			return array[i];
		}
	}
	return null;
}

function clearNodeList(){
	nodeList = [];
	openMarkers.removeAll();
	pathMarkers.removeAll();
	markerText.removeAll();
}

function numberOfElementsContained(element, array){
	var count = 0;
	for(var i = 0; i < array.length; i++){
		if((element.x == array[i].x) && (element.y == array[i].y)){
			count++;
		}
	}
	return count;
}

function arrayContainsElement(element, array){
	for(var i = 0; i < array.length; i++){
		if((element.x == array[i].x) && (element.y == array[i].y)){
			return true;
		}
	}
	return false;
}

function removeElementFromArray(element, array){
	var indexToRemove = 0;
	for(var i = 0; i < array.length; i++){
		if((element.x == array[i].x) && (element.y == array[i].y)){
			indexToRemove = i;
		}
	}
	array.splice(indexToRemove, 1);
}


function trace(element, greylist){
	console.log("trace_algorithm begins");
	removeElementFromArray(element, greylist);
	var adjacentNodes = [];
	var adjacentTraces = [];
	adjacentNodes = observeSurroundingNodes(element, greylist);
	/*first lets check if an adjacent node is our target */
	for(var i = 0; i < adjacentNodes.length; i++){
		if((adjacentNodes[i].x == world2block(dest_x, dest_y).x) && (adjacentNodes[i].y == world2block(dest_x, dest_y).y)){
			return [adjacentNodes[i]]; /*if adjacent node is our target, return it */
		}
	}
	/*now lets trace adjacent nodes */
	for(var i = 0; i < adjacentNodes.length; i++){
		adjacentTraces[i] = trace(adjacentNodes[i], greylist);
	}
	/*find the minimum adjacent node */
	var minValue = null;
	var minIndex = 0;
	for(var i = 0; i < adjacentTraces; i++){
		if(minValue == null){
			minValue = adjacentTraces[i];
			minIndex = i;
		} else if (adjacentTraces[i] < minValue){
			minValue = adjacentTraces[i];
			minIndex = i;
		}
	}
	if(adjacentTraces.length == 0){
		return [element];
	} else {
		return adjacentTraces[minIndex].push(element);
	}
}

function generatePath(worldX, worldY){
	clearNodeList();
	copyBlockedNodesToNodeList();
	dest_x = worldX;
	dest_y = worldY;
	openSurroundingNodes(player2block(), null);
	var endpoint = world2block(dest_x, dest_y);
	var currentpoint = player2block();
	var blackList = [];
	travelPath = [];
	while((endpoint.x != currentpoint.x) || (endpoint.y != currentpoint.y)){
	var minimum = null;
		for(var i = blockedNodes.length; i < nodeList.length; i++){
			if((minimum == null) || (nodeList[i].f < minimum.f)) {
				if(!(arrayContainsElement(nodeList[i], blackList))){
					minimum = nodeList[i];
				}
			}
		}
		currentpoint = new node(minimum.x, minimum.y);
		currentpoint.parent = minimum.parent;
		currentpoint.status = "marked";
		blackList.push(currentpoint);
		openSurroundingNodes(currentpoint);
	}

	/*
		for(var i = 0; i < blackList.length; i++){
			pathMarkers.create(blackList[i].x * 32, blackList[i].y * 32, "path_marker");
			var text = new Phaser.Text(top_down.game, blackList[i].x * 32, blackList[i].y * 32, blackList[i].g.toFixed(1) + "  " + blackList[i].h.toFixed(1) + "\n" + blackList[i].f.toFixed(2), 		{
			font: "7px Arial",
			fill: '#ecf0f1',
			align: "left"
		});
		markerText.add(text);
	}
	*/

	var currParent = blackList[blackList.length-1];
	
	while((currParent.x != player2block.x) || (currParent.x != player2block.x)){
		travelPath.unshift(currParent);
		//
		currParent = currParent.parent;
		if(currParent == undefined){
			break;
		}
	}

	for(var i = 0; i < travelPath.length; i++){
		pathMarkers.create(travelPath[i].x * 32, travelPath[i].y * 32, "trace_marker");
	}
	plotPath();
}

var refreshInterval = 10;
var refreshIndex = 0;

function blockVec(blockX, blockY){
	this.x = blockX;
	this.y = blockY;
}

var bPath = [];

function plotPath(){
	bPath = [];
	var x = 1/(travelPath.length * 32);

	var tPathX = [];
	var tPathY = [];

	for(var i = 0; i < travelPath.length; i++){
		tPathX.push(travelPath[i].x);
		tPathY.push(travelPath[i].y);
	}
	for(var i = 0; i <= 1; i+=x){
		var px = top_down.game.math.linearInterpolation(tPathX, i);
		var py = top_down.game.math.linearInterpolation(tPathY, i);
		if(px > 0 || py > 0){
			bPath.push({x: ((px) * 32) + 16, y: ((py) * 32) + 16});
		}
	}
	movementIndex = 1;
}

var movementChain = [];

function followPath(path){
	//console.log(movementChain);
	for(var i = 0; i < movementChain.length; i++){
		movementChain[i].stop();
	}
	movementChain = [];	
	var ms;
	for(var i = 1; i < path.length; i++){
		ms = 20000/playerSpeed;
		if((path[i-1].x == path[i].x) || (path[i-1].y == path[i].y)){
		} else {
			ms *= 1.4;
		}
		movementChain[i-1] = top_down.game.add.tween(player).to({x:(path[i].x * 32) + 16, y:(path[i].y * 32) + 16}, ms);
	}
	for(var i = 0; i < movementChain.length - 1; i++){
		movementChain[i].chain(movementChain[i+1]);
	}

	movementChain[movementChain.length-1].onComplete.add(function(){removeDestination()}, this);
	movementChain[0].start();
}

function removeDestination(){
	flag.x = -32;
	flag.y = -32;
	pathMarkers.removeAll();
	player.animations.play('idle', 10, true);
}

function addDestination(worldX, worldY){
	if(!arrayContainsElement(world2block(worldX, worldY), blockedNodes)){
		if((player2block().x != world2block(worldX, worldY).x)	 || (player2block().y != world2block(worldX, worldY).y)){
			flag.x = worldX - flag.width/2;
			flag.y = worldY - flag.height/3;
			generatePath(worldX, worldY);
			player.animations.play('walk', 10, true);
		}
	}	
}

function screenClicked(){
	var clickedWorldX = top_down.game.input.x + top_down.game.camera.x;
	var clickedWorldY = top_down.game.input.y + top_down.game.camera.y;
	addDestination(clickedWorldX, clickedWorldY);
}

function getDataLayerFromTilemap(tilemapName, layerName){
	var length = top_down.game.cache.getTilemapData(tilemapName).data.layers.length;
	for(var i = 0; i < length; i++){
		var name = top_down.game.cache.getTilemapData(tilemapName).data.layers[i].name;
		if(name === layerName){
			return top_down.game.cache.getTilemapData(tilemapName).data.layers[i].data;
		}
	}
}

function copyBlockedNodesToNodeList(){
	for(var i = 0; i < blockedNodes.length; i++){
		nodeList.push(blockedNodes[i]);
	}
}

var movementIndex = 0;

function togglePath(){
	if(showPath){
			showPath = false;
			pathMarkers.visible = false;
	} else {
			showPath = true;
			pathMarkers.visible = true;
	}
}

/*Takes array of all unpassible objects from tilemap data and puts in nodelist */
function blockAllBlockedNodes(){
	var data = getDataLayerFromTilemap("southplot1", "CollisionLayer");
	for(var i = 0; i < data.length; i++){
		if(data[i] != 0){
			var bx = i%200;
			var by = Math.floor(i/200);
			blockNode(bx, by);
		}
	}
	copyBlockedNodesToNodeList();
}

top_down.Game.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.map = this.game.add.tilemap('southplot1');
		this.map.addTilesetImage('ss2', 'gameTiles');
		this.backgroundLayer = this.map.createLayer('PavementLayer');
		this.backgroundLayer = this.map.createLayer('CollisionLayer');
		bMapData = this.add.bitmapData(this.game.width, this.game.height);
		bMapData.addToWorld();
		openMarkers = this.add.group();
		pathMarkers = this.add.group();
		markerText = this.add.group();
		blockAllBlockedNodes();
		this.physics.arcade.enable(this.backgroundLayer);
		this.backgroundLayer.resizeWorld();
		showPath = false;

		pathMarkers.visible = false;
		
		player = this.add.sprite(2824 + 8, 2976 + 16, 'player');
		player.animations.add('idle', [0]);
		player.animations.add('walk', [1,2,3,4]);
		player.animations.play('idle', 10, true);
		playerSpeed = 5;
		flag = this.add.sprite(-32, -32, 'flag');

		wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
		aKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
		sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
		dKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
		mKey = this.input.keyboard.addKey(Phaser.Keyboard.M);
		nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);
		lKey = this.input.keyboard.addKey(Phaser.Keyboard.L);

		mKey.onDown.add(function(){playerSpeed+=5;});
		nKey.onDown.add(function(){if(playerSpeed > 5){playerSpeed-=5;}});
		lKey.onDown.add(togglePath);

		player.pivot.x = 8;
		player.pivot.y = 8;

		dest_x = this.camera.x = player.x - (768/2);
		dest_y = this.camera.y = player.y - (512/2);
		player_speed = 0;
		onPath = false;

		this.input.onDown.add(screenClicked, this);
	},

	update: function(){


		if(movementIndex != 0){
			player.x = bPath[Math.floor(movementIndex)].x;
			player.y = bPath[Math.floor(movementIndex)].y;
			player.rotation = this.math.angleBetweenPoints(bPath[Math.floor(movementIndex)-1], bPath[Math.floor(movementIndex)]);
			movementIndex+= playerSpeed/10;
		}
		if(Math.floor(movementIndex) >= bPath.length){
			removeDestination();
			movementIndex = 0;
		}

		if(wKey.isDown){
			this.camera.y -= 10;
		}
		if(aKey.isDown){
			this.camera.x -= 10;
		}
		if(sKey.isDown){
			this.camera.y += 10;
		}
		if(dKey.isDown){
			this.camera.x += 10;
		}
	}
}