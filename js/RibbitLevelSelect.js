var ribbit = ribbit || {};

ribbit.LevelSelect = function(){
	var levelIntent = -1;
	setLevelIntent = function(level){
		if(level != undefined){
			levelIntent = level;
		}
	}
	getLevelIntent = function(){
		return levelIntent;
	}
	loadLevel = function(level){
		ribbit.game.state.start('PlayGame', true, false, level.key.substr(3,4));
	}
};

ribbit.LevelSelect.prototype = {
	init: function(level) {
		setLevelIntent(level);
	},
	preload: function() {
		
	},
	create: function(){
		var loadingScreen = ribbit.game.add.sprite(0, 0, 'loading');
		var levelIntent = getLevelIntent();
		if(levelIntent > 0){
			setLevelIntent(-1);
			ribbit.game.state.start('PlayGame', true, false, levelIntent);
		} else {
			var levelName = "";
			ribbit.game.add.sprite(0, 0, 'levelSelect');
			for(var row = 0; row < 3; row++){
				for(var col = 0; col < 4; col++){
						levelNum = ((4 * row) + col) + 1;
						levelName = "lvl" + levelNum;
						level = ribbit.game.add.sprite(214*col + 94, 116 + (row * 148), levelName);
						level.inputEnabled = true;
						level.events.onInputDown.add(loadLevel, this);
				}
			}
			loadingScreen.destroy();
		}
	}
}
