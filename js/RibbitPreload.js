var top_down = top_down || {};

top_down.Preload = function(){};

top_down.Preload.prototype = {
	preload: function(){
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.center + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		
		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.tilemap('test_map', 'assets/tilemaps/test_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_1', 'assets/tilemaps/level_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_2', 'assets/tilemaps/level_2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_3', 'assets/tilemaps/level_3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_4', 'assets/tilemaps/level_4.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_5', 'assets/tilemaps/level_5.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_6', 'assets/tilemaps/level_6.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_7', 'assets/tilemaps/level_7.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_8', 'assets/tilemaps/level_8.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_9', 'assets/tilemaps/level_9.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_10', 'assets/tilemaps/level_10.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_11', 'assets/tilemaps/level_11.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level_12', 'assets/tilemaps/level_12.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.spritesheet('frog', 'assets/frog.png', 48, 48);
		this.load.spritesheet('fire', 'assets/fire.png', 32, 32);
		this.load.image('tiles2', 'assets/spritesheet2.png');
		this.load.image('levelBackground1', 'assets/levelBackground1.png');
		this.load.image('rock1', 'assets/rock1.png');
		this.load.image('tongue', 'assets/tongue.png');
		this.load.image('ttongue', 'assets/ttongue.png');
		//this.load.image('path_marker', 'assets/path_marker.png');
		//this.load.image('trace_marker', 'assets/trace_marker.png');
        
        //Loading fly
        this.load.spritesheet('fly','assets/Fly1.png',16,16);
        
        //Loading castle sprite
        this.load.spritesheet('castle',"assets/castle.png",32,32);
        
		
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
		this.load.image('lvl1', 'Ribbit/level1.png');
		this.load.image('lvl2', 'Ribbit/level2.png');
		this.load.image('lvl3', 'Ribbit/level3.png');
		this.load.image('lvl4', 'Ribbit/level4.png');
		this.load.image('lvl5', 'Ribbit/level5.png');
		this.load.image('lvl6', 'Ribbit/level6.png');
		this.load.image('lvl7', 'Ribbit/level7.png');
		this.load.image('lvl8', 'Ribbit/level8.png');
		this.load.image('lvl9', 'Ribbit/level9.png');
		this.load.image('lvl10', 'Ribbit/level10.png');
		this.load.image('lvl11', 'Ribbit/level11.png');
		this.load.image('lvl12', 'Ribbit/level12.png');
		
		//sounds:
		this.load.audio('complete', 'Sounds/complete.mp3');
		this.load.audio('fire', 'Sounds/fire.mp3');
		this.load.audio('hitwall', 'Sounds/hitwall.mp3');
		this.load.audio('release', 'Sounds/release.mp3');
		this.load.audio('select', 'Sounds/select.mp3');
		this.load.audio('tongueSound', 'Sounds/tongue.mp3');
		this.load.audio('music', 'Sounds/backgroundMusic.mp3');
		
		//trigger and turtorial images
		this.load.image('testTrigger', 'Ribbit/testTrigger.png');		
		this.load.image('triggerbox', 'Ribbit/triggerbox.png');
		
		//arrows
		this.load.image('up', 'Ribbit/uparrow.png');
		this.load.image('upright', 'Ribbit/upright.png');
		this.load.image('right', 'Ribbit/right.png');
		this.load.image('downright', 'Ribbit/downright.png');
		this.load.image('down', 'Ribbit/down.png');
		this.load.image('downleft', 'Ribbit/downleft.png');
		this.load.image('left', 'Ribbit/left.png');
		this.load.image('upleft', 'Ribbit/upleft.png');
		
	},
	
	create: function(){
        
		this.state.start('Game');
	}
}