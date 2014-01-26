var e;

Game = {
  // Initialize and start our game
   // This defines our grid's size and the size of each of its tiles
   map_grid: {
    width:  50,
    height: 32,
    tile: {
      width:  16,
      height: 16
    }
  },

  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init();
    Crafty.background('rgb(94,21,1)');
    // Crafty.scene('Game');
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
        } 
        else {
          if(Math.random() > 0.06) {
            Crafty.e('Earth')
            .attr({
              x: x * Game.map_grid.tile.width,
              y: y * Game.map_grid.tile.height,
              w: Game.map_grid.tile.width,
              h: Game.map_grid.tile.height
            })
          }
          else {
          // Place a larger rock at the current tile
          Crafty.e('Rock')
          .attr({
            x: x * Game.map_grid.tile.width,
            y: y * Game.map_grid.tile.height,
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
          })
        // }
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

}

}

window.onresize = function() { // responsible game borders
  Crafty.viewport.reload();

  e.attr({
    x: (Crafty.viewport.width / 2) - 5,
    y: (Crafty.viewport.height / 2) - 5,
  })
};
