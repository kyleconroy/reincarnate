

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

Crafty.c('Trail', {
  init: function() {
    this.requires('Actor, Color')
      .color('rgb(39, 40, 34)')
  }
});


Crafty.c('Worm', {
  slime: function(x, y) {
    var trail = this.trail;

    if (!trail[x][y]) {

      Crafty.e('Trail')
        .attr({
          y: y * Game.map_grid.tile.height,
          x: x * Game.map_grid.tile.width,
          w: 16,
          h: 16,
        })
        .timeout(function() {
          this.destroy();
          trail[x][y] = false;
        }, 2500);
  
      trail[x][y] = true;
    }
  },
  init: function() {
    this.trail = new Array(Game.map_grid.width);
    for (var i = 0; i < Game.map_grid.width; i++) {
      this.trail[i] = new Array(Game.map_grid.height);
      for (var y = 0; y < Game.map_grid.height; y++) {
        this.trail[i][y] = false;
      }
    }

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


	  this.bind('Move', function(data) {
      var x = Math.floor(data._x / Game.map_grid.tile.width);
      var y1 = Math.floor((data._y) / Game.map_grid.tile.height);
      var y2 = Math.floor((data._y + 16) / Game.map_grid.tile.height);
      this.slime(x, y1);
      this.slime(x, y2);
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
