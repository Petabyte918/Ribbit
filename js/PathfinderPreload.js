var top_down = top_down || {};

top_down.Preload = function(){};

top_down.Preload.prototype = {
	preload: function(){
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.center + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		
		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.tilemap('southplot1', 'assets/tilemaps/southplot1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/ss2.png');
		//this.load.image('player', 'assets/player.png');
		this.load.spritesheet('player', 'assets/player_spritesheet.png', 16, 16, 5);	
		this.load.image('flag', 'assets/flag.png');
		this.load.image('open_marker', 'assets/open_marker.png');
		this.load.image('path_marker', 'assets/path_marker.png');
		this.load.image('trace_marker', 'assets/trace_marker.png');
	},
	
	create: function(){
		this.state.start('Game');
	}
}