var top_down = top_down || {};

top_down.Preload = function(){};

top_down.Preload.prototype = {
	preload: function(){
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.center + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		
		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.tilemap('test_map', 'assets/tilemaps/test_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('frog', 'assets/frog.png');
		this.load.image('tiles2', 'assets/spritesheet2.png');
		//this.load.spritesheet('player', 'assets/player_spritesheet.png', 16, 16, 5);	
		this.load.image('rock1', 'assets/rock1.png');
		this.load.image('tongue', 'assets/tongue.png');
		//this.load.image('open_marker', 'assets/open_marker.png');
		//this.load.image('path_marker', 'assets/path_marker.png');
		//this.load.image('trace_marker', 'assets/trace_marker.png');
	},
	
	create: function(){
		this.state.start('Game');
	}
}