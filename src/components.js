Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas');
  },
});

Crafty.c('Worm', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision')
      .fourway(4)
      .color('rgb(255, 109, 188)')
      .stopOnSolids()
      .stopOnSolids()
      // Whenever the PC touches a village, respond to the event
      .onHit('Surface', this.visitSurface);
  },
 
  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
 
    return this;
  },
 
  // Stops the movement
  stopMovement: function() {
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
      .color('rgb(89,89,89)');
  },
});
Crafty.c('Surface', {
  init: function() {
    this.requires('Actor, Color')
      .color('rgb(0, 125, 250)');
  },
 
  collect: function() {
    this.destroy();
    Crafty.trigger('SurfaceVisited', this);
  }
});