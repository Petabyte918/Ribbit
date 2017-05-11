var ribbit = ribbit || {};

ribbit.Boot = function(){};

ribbit.Boot.prototype = {
	preload: function() {
		this.load.image('preloadbar', 'assets/health_bar.png');
		this.load.image('loading', 'assets/loading.png');
	},
	create: function(){
		this.state.backgroundColor = '#eee';
		this.state.start('Preload');
	}
}
