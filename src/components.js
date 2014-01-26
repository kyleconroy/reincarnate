Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas');
  },
});

Crafty.c('Earth', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision')
    .color('rgb(39, 40, 34)')
    // .color('rgb(58,58,56)')
    .onHit('Worm', this.leaveTrace);
  },
  leaveTrace: function(data) {
    this.color('rgb(58,58,56)');
  }
});

Crafty.c('Worm', {
  init: function() {
    this.requires('Actor, Fourway, Collision, SpriteAnimation, WormSprite')
    .fourway(2)
// <<<<<<< HEAD
    // .bind(this.colorGround)    
    .color('rgb(255, 109, 188)')
// =======
    .reel('WormWriggle', 700, [[0, 0], [0, 1], [0, 2], [0, 1]])
    .animate('WormWriggle', -1)
// >>>>>>> ec12c676effdb5cacd41f6bc830a35f71e9e92d4
    .onHit('Surface', this.visitSurface)
    .onHit('Solid', this.stopMovement);
  },

  // colorGround: function(e) {
  //   Crafty.background(red)
    // Crafty.e('Earth').attr({
    //   x: this.x,
    //   y: this.y,
    //   w: Game.map_grid.tile.width,
    //   h: Game.map_grid.tile.height
    // })
  // },

  // Stops the movement
  stopMovement: function(e) {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  visitSurface: function(data) {
    surface = data[0].obj;
    surface.collect();
  }
});

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Color, Solid')
    .color('gray');
  },
});

Crafty.c('Surface', {
  init: function() {
    this.requires('Actor, Color')
    .color('blue');
  },

  collect: function() {
    this.destroy();
    Crafty.trigger('SurfaceVisited', this);
  }
});
