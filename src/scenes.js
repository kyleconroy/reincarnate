Crafty.scene('Loading', function(){

  // Load our sprite map image
  Crafty.load(['assets/sprites/worm.png'], function(){

    Crafty.sprite(16, 'assets/sprites/worm.png', {
      spr_player: [0, 2],
    }, 0, 2);

    Crafty.scene('Game');
  })
});
