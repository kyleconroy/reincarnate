Game = {
  // Initialize and start our game
   // This defines our grid's size and the size of each of its tiles
   map_grid: {
    height: Math.ceil(screen.availHeight / 16),
    width: Math.ceil(screen.availWidth / 16),
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
    Crafty.pixelart(true);
    Crafty.scene('Loading');
  }
}

window.onresize = function() { // responsible game borders
  Crafty.viewport.reload();
};
