var ribbit = ribbit || {};

ribbit.Preload = function(){};


function loadStart(){
	this.loading = this.add.sprite(0, 0, 'loading');
}

ribbit.Preload.prototype = {
	preload: function(){
		this.load.onLoadStart.add(loadStart, this);
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
		this.load.image('rockA0', 'assets/rockA0.png');
		this.load.image('rockA1', 'assets/rockA1.png');
		this.load.image('rockA2', 'assets/rockA2.png');
		this.load.image('rockA3', 'assets/rockA3.png');
        this.load.image('rockB1', 'assets/rockB1.png');
		this.load.image('rockB2', 'assets/rockB2.png');
		this.load.image('rockB3', 'assets/rockB3.png');
        this.load.image('rockC1', 'assets/rockC1.png');
		this.load.image('rockC2', 'assets/rockC2.png');
		this.load.image('rockC3', 'assets/rockC3.png');
		this.load.image('tongue', 'assets/tongue.png');
		this.load.image('ttongue', 'assets/ttongue.png');
		//this.load.image('path_marker', 'assets/path_marker.png');
		//this.load.image('trace_marker', 'assets/trace_marker.png');
        
        //Loading fly
        this.load.spritesheet('fly','assets/Fly1.png',16,16);
        
        //Loading castle sprite
        this.load.spritesheet('castle',"assets/castle.png",96,96);
        
		this.load.image('background', 'assets/background.png');
		this.load.image('help', 'assets/Help.png');
		this.load.image('menu','assets/menuButton.png');
		this.load.image('popup', 'assets/plainMenu.png');
		this.load.image('restart', 'assets/restart.png');
		this.load.image('resume', 'assets/resumeButton.png');
		this.load.image('volumeOff', 'assets/volume.png');
		this.load.image('volumeOn', 'assets/volumeOn.png');
		this.load.image('logo', 'assets/logo.png');
		this.load.image('home', 'assets/home.png');
		this.load.image('controls', 'assets/controls.png');
		this.load.image('greenHelp', 'assets/greenHelp.png');
		this.load.image('greenOn', 'assets/greenVolumeOn.png');
		this.load.image('greenOff', 'assets/greenVolumeOff.png');
		this.load.image('playGame', 'assets/playGame.png');
		this.load.image('helpScreen', 'assets/helpMenu.png');
		this.load.image('controlScreen', 'assets/controlMenu.png');
		this.load.image('levelSelect', 'assets/levelSelect.png');
		this.load.image('lock', 'assets/locked.png');
		this.load.image('lvlone', 'assets/levelOne.png');
		this.load.image('lvl1', 'assets/level1.png');
		this.load.image('lvl2', 'assets/level2.png');
		this.load.image('lvl3', 'assets/level3.png');
		this.load.image('lvl4', 'assets/level4.png');
		this.load.image('lvl5', 'assets/level5.png');
		this.load.image('lvl6', 'assets/level6.png');
		this.load.image('lvl7', 'assets/level7.png');
		this.load.image('lvl8', 'assets/level8.png');
		this.load.image('lvl9', 'assets/level9.png');
		this.load.image('lvl10', 'assets/level10.png');
		this.load.image('lvl11', 'assets/level11.png');
		this.load.image('lvl12', 'assets/level12.png');
		
		//sounds
		this.load.audio('complete', 'Sounds/complete.mp3');
		this.load.audio('fire', 'Sounds/fire.mp3');
		this.load.audio('hitwall', 'Sounds/hitwall.mp3');
		this.load.audio('release', 'Sounds/release.mp3');
		this.load.audio('select', 'Sounds/select.mp3');
		this.load.audio('tongueSound', 'Sounds/tongue.mp3');
		this.load.audio('music', 'Sounds/backgroundMusic.mp3');
		
		//trigger and turtorial images
		//this.load.image('testTrigger', 'assets/testTrigger.png');		
		this.load.image('triggerbox', 'assets/triggerbox.png');
		
		//arrows
		this.load.image('up', 'assets/uparrow.png');
		this.load.image('upright', 'assets/upright.png');
		this.load.image('right', 'assets/right.png');
		this.load.image('downright', 'assets/downright.png');
		this.load.image('down', 'assets/down.png');
		this.load.image('downleft', 'assets/downleft.png');
		this.load.image('left', 'assets/left.png');
		this.load.image('upleft', 'assets/upleft.png');
		
		//texts for level 1
		this.load.image('t0', 'assets/clickonrock.png'); //upright "clock on rock"
		this.load.image('t1', 'assets/detach.png');		 //no arrow, double click to let go
		this.load.image('t2', 'assets/avoidFire.png');	 //downleft	  "avoid the fire"
		this.load.image('t3', 'assets/reachCastle.png');
		this.load.image('t4', 'assets/landAt.png');      //downright  "land at castle"
		
		//level 2 turtorial
		this.load.image('follow', 'assets/followArrow.png');
		this.load.image('throw', 'assets/ThrowArrow.png');
		this.load.image('goUp', 'assets/keepSwingingUp.png');
		this.load.image('fall', 'assets/fall.png');

		
		this.load.image('gameControls', 'assets/controlsLevelOne.png');
		this.load.image('winmenu', 'assets/youwin.png');
		this.load.image('next', 'assets/NextLevel.png');
		this.load.image('losemenu', 'assets/youlose.png');
        
        
        // KEVINS CODE LOADS MIST
        this.load.image('mist1','assets/mist1.png');
        this.load.image('mist2','assets/mist2.png');
        this.load.image('mist3','assets/mist3.png');

        
	},
	
	create: function(){
		this.state.start('MainMenu');
	}
}