var ribbit = ribbit || {};
ribbit.game = new Phaser.Game(1024, 624, Phaser.AUTO, 'phaser-game');


ribbit.game.state.add('Boot', ribbit.Boot);
ribbit.game.state.add('Preload', ribbit.Preload);
ribbit.game.state.add('MainMenu', ribbit.MainMenu);
ribbit.game.state.add('LevelSelect', ribbit.LevelSelect);
ribbit.game.state.add('PlayGame', ribbit.PlayGame);
ribbit.game.state.start('Boot');