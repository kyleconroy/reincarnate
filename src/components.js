Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas');
  },
});

Crafty.c('Worm', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision')
      .fourway(2)
      .color('rgb(255, 109, 188)')
      .onHit('Surface', this.visitSurface)
      .onHit('Solid', this.stopMovement);
  },

  // Stops the movement
  stopMovement: function(e) {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  visitSurface: function(data) {
    villlage = data[0].obj;
    villlage.collect();
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
