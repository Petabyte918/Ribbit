var top_down = top_down || {};
top_down.game = new Phaser.Game(768, 512, Phaser.AUTO, 'phaser-game');

top_down.game.state.add('Boot', top_down.Boot);
top_down.game.state.add('Preload', top_down.Preload);
top_down.game.state.add('Game', top_down.Game);

top_down.game.state.start('Boot');