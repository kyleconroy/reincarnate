

function Stack() {
  this.stac=new Array();
  this.pop=function() {
    return this.stac.pop();
  }
  this.push=function(item){
    this.stac.push(item);
    if (this.stac.length==10) {
      this.stac.pop().destroy();
      // alert(this.stac.pop());
    }
  }
}


var trailStack = new Stack();


Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas');
  },
});

Crafty.c('Earth', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision')
    .color('rgb(39, 40, 34)')
    .onHit('Worm', this.leaveTrace);    
  },
  leaveTrace: function(data) {
    this.color('rgb(58,58,56)')
    trailStack.push(this);
  },
});


Crafty.c('Worm', {
  init: function() {
    this.requires('Actor, Fourway, Collision, SpriteAnimation, WormSprite')
      .fourway(2)
      .reel('WormWriggle', 700, [[0,1], [0,0], [0,1], [0,2]])
      .reel('WormMoveLeft', 700, [[0,1], [0,3], [0,4], [0,3]])
      .reel('WormMoveRight', 700, [[0,1], [0,5], [0,6], [0,5]])
      .animate('WormWriggle', -1)
      .onHit('Surface', this.visitSurface)
      .onHit('Solid', this.stopMovement);

	  this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('WormMoveRight', -1);
      } else if (data.x < 0) {
        this.animate('WormMoveLeft', -1);
      } else {
        this.animate('WormWriggle', -1);
      }
    });
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
