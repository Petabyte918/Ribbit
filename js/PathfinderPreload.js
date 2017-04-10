var top_down = top_down || {};

top_down.Preload = function(){};

top_down.Preload.prototype = {
	preload: function(){
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.center + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		
		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.tilemap('test_map', 'assets/tilemaps/test_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.spritesheet('frog', 'assets/frog.png', 48, 48);
		this.load.image('tiles2', 'assets/spritesheet2.png');
		this.load.image('rock1', 'assets/rock1.png');
		this.load.image('tongue', 'assets/tongue.png');

	},
	
	create: function(){
        
		this.state.start('Game');
	}
}