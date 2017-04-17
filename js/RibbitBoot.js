var top_down = top_down || {};

top_down.Boot = function(){};

top_down.Boot.prototype = {
	preload: function() {
		this.load.image('preloadbar', 'assets/health_bar.png');
	},
	create: function(){
		this.game.state.backgroundColor = '#eee';
		this.game.state.start('Preload');
	}
}
