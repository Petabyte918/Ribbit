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
		this.load.image('ttongue', 'assets/ttongue.png');
		//this.load.image('path_marker', 'assets/path_marker.png');
		//this.load.image('trace_marker', 'assets/trace_marker.png');
		
		this.load.image('background', 'Ribbit/background.png');
		this.load.image('help', 'Ribbit/Help.png');
		this.load.image('menu','Ribbit/menuButton.png');
		this.load.image('popup', 'Ribbit/plainMenu.png');
		this.load.image('restart', 'Ribbit/restart.png');
		this.load.image('resume', 'Ribbit/resumeButton.png');
		this.load.image('volumeOff', 'Ribbit/volume.png');
		this.load.image('volumeOn', 'Ribbit/volumeOn.png');
		this.load.image('logo', 'Ribbit/logo.png');
		this.load.image('home', 'Ribbit/home.png');
		this.load.image('controls', 'Ribbit/controls.png');
		this.load.image('greenHelp', 'Ribbit/greenHelp.png');
		this.load.image('greenOn', 'Ribbit/greenVolumeOn.png');
		this.load.image('greenOff', 'Ribbit/greenVolumeOff.png');
		this.load.image('playGame', 'Ribbit/playGame.png');
		this.load.image('helpScreen', 'Ribbit/helpMenu.png');
		this.load.image('controlScreen', 'Ribbit/controlMenu.png');
		this.load.image('levelSelect', 'Ribbit/levelSelect.png');
		this.load.image('lock', 'Ribbit/locked.png');
		this.load.image('lvlone', 'Ribbit/levelOne.png');
		
		//sounds:
		this.load.audio('complete', 'Sounds/complete.mp3');
		this.load.audio('fire', 'Sounds/fire.mp3');
		this.load.audio('hitwall', 'Sounds/hitwall.mp3');
		this.load.audio('release', 'Sounds/release.mp3');
		this.load.audio('select', 'Sounds/select.mp3');
		this.load.audio('tongueSound', 'Sounds/tongue.mp3');
		this.load.audio('music', 'Sounds/backgroundMusic.mp3');
		
		
	},
	
	create: function(){
        
		this.state.start('Game');
	}
}