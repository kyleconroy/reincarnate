Crafty.scene('Loading', function(){

  // Load our sprite map image
  Crafty.load(['assets/sprites/worm.png'], function(){

    Crafty.sprite(16, 'assets/sprites/worm.png', {
      spr_player: [0, 2],
    }, 0, 2);

    Crafty.scene('Game');
  })
});

Crafty.scene('Game', function(){
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {

        // Place a rock entity at the current tile
        Crafty.e('Rock')
          .attr({
            x: x * Game.map_grid.tile.width,
            y: y * Game.map_grid.tile.height,
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
          })
      } else {
        if(Math.random() > 0.06) {
          Crafty.e('Earth')
            .attr({
              x: x * Game.map_grid.tile.width,
              y: y * Game.map_grid.tile.height,
              w: Game.map_grid.tile.width,
              h: Game.map_grid.tile.height
            })
        }
        if (Math.random() < 0.06) {
          // Place a larger rock at the current tile
          Crafty.e('Rock')
            .attr({
              x: x * Game.map_grid.tile.width,
              y: y * Game.map_grid.tile.height,
              w: Game.map_grid.tile.width,
              h: Game.map_grid.tile.height
            })
        }
      }
    }
  }

  e = Crafty.e('Worm')
    .attr({
      x: (Crafty.viewport.width / 2) - 5,
      y: (Crafty.viewport.height / 2) - 5,
      w: 10,
      h: 20,
    })

  Crafty.e('Surface')
    .attr({
      x: (Crafty.viewport.width - 20),
      y: 0,
      w: 20,
      h: (Crafty.viewport.height),
    })
});

