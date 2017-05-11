var ribbit = ribbit || {};

ribbit.MainMenu = function(){
	logo = null;
	play = null;
	controls = null;
	volume = null;
	about = null;
	controlsPopup = null;
	homeButton = null;
	aboutPopup = null;
	
	clickPlayGame = function(){
		if(ribbit.music.isPlaying){
			ribbit.selectSound.play();
		}
		ribbit.game.state.start('LevelSelect');
	}
	//ribbit.music.play('', 0, 1, true, true);
	clickControls = function(){
		if(ribbit.music.isPlaying){
			ribbit.selectSound.play();
		}
		destroyMainMenuButtons();
		controlsPopup = ribbit.game.add.sprite(512 - (495/2), 412 - (377/2), 'controlScreen');
		homeButton = ribbit.game.add.sprite(512 + 495/32, 312 + 180, 'home');
		homeButton.inputEnabled = true;
		homeButton.events.onInputDown.add(function(){
			homeButton.destroy();
			controlsPopup.destroy();
			initMainMenuButtons();
			if(ribbit.music.isPlaying){
				ribbit.selectSound.play();
			}
			}, this);
	}
	
	clickVolume = function(){
		volume.destroy();
		if(!ribbit.music.isPlaying){
			volume = ribbit.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 82, 'greenOn');
			ribbit.music.play('', 0, 1, true, true);
		} else {
			volume = ribbit.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 82, 'greenOff');
			ribbit.music.stop();
		}
		volume.inputEnabled = true;
		volume.events.onInputDown.add(clickVolume, this);
		if(ribbit.music.isPlaying){
			ribbit.selectSound.play();
		}
	}
	
	clickAbout = function(){
		if(ribbit.music.isPlaying){
			ribbit.selectSound.play();
		}
		destroyMainMenuButtons();
		aboutPopup = ribbit.game.add.sprite(512 - (495/2), 412 - (377/2), 'helpScreen');
		homeButton = ribbit.game.add.sprite(512 + 495/32, 312 + 180, 'home');
		homeButton.inputEnabled = true;
		homeButton.events.onInputDown.add(function(){
			homeButton.destroy();
			aboutPopup.destroy();
			initMainMenuButtons();
			if(ribbit.music.isPlaying){
				ribbit.selectSound.play();
			}		
			}, this);
	}
	
	destroyMainMenuButtons = function(){
		play.destroy();
		controls.destroy();
		volume.destroy();
		about.destroy();
	}
	
	initMainMenuButtons = function(){
		play = ribbit.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91, 'playGame');
		controls = ribbit.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 41, 'controls');

		if(!ribbit.music.isPlaying){
			volume = ribbit.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 82, 'greenOff');
		} else {
			volume = ribbit.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 82, 'greenOn');
		}
		about = ribbit.game.add.sprite(512 - (218/3) - 35, 312 - (35/2) + 91 + 123, 'greenHelp');
		
		play.inputEnabled = true;
		controls.inputEnabled = true;
		volume.inputEnabled = true;
		about.inputEnabled = true;
		
		play.events.onInputDown.add(clickPlayGame, this);
		controls.events.onInputDown.add(clickControls, this);
		volume.events.onInputDown.add(clickVolume, this);
		about.events.onInputDown.add(clickAbout, this);
	}
};
var initMute = true;
ribbit.MainMenu.prototype = {
	preload: function() {
		
	},
	update: function() {
		if(initMute){
			if(ribbit.music.isPlaying){
				destroyMainMenuButtons();
				initMainMenuButtons();
				initMute = false;
			}
		}
	},
	create: function(){
		ribbit.game.add.sprite(-1, -1, 'background');
		ribbit.game.add.sprite(512 - (495/2), 412 - (377/2), 'popup');
		logo = ribbit.game.add.sprite(512 - (500/6), 262 - (500/2), 'logo');
		logo.scale.setTo(logo.scale.x/2.5, logo.scale.y/2.5);
		initMainMenuButtons();
	}
}
