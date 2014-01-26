Crafty.c("Multioneway", {
    _speed: 3,

    _keydown: function (e) {
        if (this._keys[e.key]) {
            var key = this._keys[e.key];
            var mx = Math.round((this._movement.x + key.x) * 1000) / 1000;
            var my = Math.round((this._movement.y + key.y) * 1000) / 1000;

            if (key.x !== 0) {
              if (this._movement.y == 0) {
                if ((this._movement.x == 0) || (key.x < 0 && this._movement.x < 0) || (key.x > 0 && this._movement.x > 0)) {
                  this._movement.x = mx;
                  this.trigger('NewDirection', this._movement);
                }
              }
            } else {
              if (this._movement.x == 0) {
                if ((this._movement.y == 0) || (key.y < 0 && this._movement.y < 0) || (key.y > 0 && this._movement.y > 0)) {
                  this._movement.y = my;
                  this.trigger('NewDirection', this._movement);
                }
              }
            }

        }
    },

    _keyup: function (e) {
      if (this._keys[e.key]) {
        var key = this._keys[e.key];
        var mx = Math.round((this._movement.x - key.x) * 1000) / 1000;
        var my = Math.round((this._movement.y - key.y) * 1000) / 1000;

        if (key.y !== 0) {
          if ((key.y < 0 && this._movement.y < 0) || (key.y > 0 && this._movement.y > 0)) {
            this._movement.y = 0
            this.trigger('NewDirection', this._movement);
          }
        } else if (key.x !== 0) {
          if ((key.x < 0 && this._movement.x < 0) || (key.x > 0 && this._movement.x > 0)) {
            this._movement.x = 0
            this.trigger('NewDirection', this._movement);
          }
        }
      }
    },

    _enterframe: function () {
        if (this.disableControls) return;

        if (this._movement.x !== 0) {
            this.x += this._movement.x;
            this.trigger('Moved', {
                x: this.x - this._movement.x,
                y: this.y
            });
        } 
        if (this._movement.y !== 0) {
            this.y += this._movement.y;
            this.trigger('Moved', {
                x: this.x,
                y: this.y - this._movement.y
            });
        }
    },

    _initializeControl: function () {
        return this.unbind("KeyDown", this._keydown)
            .unbind("KeyUp", this._keyup)
            .unbind("EnterFrame", this._enterframe)
            .bind("KeyDown", this._keydown)
            .bind("KeyUp", this._keyup)
            .bind("EnterFrame", this._enterframe);
    },

    multioneway: function (speed, keys) {
        this._keyDirection = {};
        this._keys = {};
        this._movement = {
            x: 0,
            y: 0
        };
        this._speed = {
            x: 3,
            y: 3
        };

        if (keys) {
            if (speed.x !== undefined && speed.y !== undefined) {
                this._speed.x = speed.x;
                this._speed.y = speed.y;
            } else {
                this._speed.x = speed;
                this._speed.y = speed;
            }
        } else {
            keys = speed;
        }

        this._keyDirection = keys;
        this.speed(this._speed);

        this._initializeControl();

        //Apply movement if key is down when created
        for (var k in keys) {
            if (Crafty.keydown[Crafty.keys[k]]) {
                this.trigger("KeyDown", {
                    key: Crafty.keys[k]
                });
            }
        }

        return this;
    },

    enableControl: function () {
        this.disableControls = false;
        return this;
    },

    disableControl: function () {
        this.disableControls = true;
        return this;
    },

    speed: function (speed) {
        for (var k in this._keyDirection) {
            var keyCode = Crafty.keys[k] || k;
            this._keys[keyCode] = {
                x: Math.round(Math.cos(this._keyDirection[k] * (Math.PI / 180)) * 1000 * speed.x) / 1000,
                y: Math.round(Math.sin(this._keyDirection[k] * (Math.PI / 180)) * 1000 * speed.y) / 1000
            };
        }
        return this;
    }
});


Crafty.c("Fouroneway", {

    init: function () {
        this.requires("Multioneway");
    },

    fouroneway: function (speed) {
        this.multioneway(speed, {
            UP_ARROW: -90,
            DOWN_ARROW: 90,
            RIGHT_ARROW: 0,
            LEFT_ARROW: 180,
            W: -90,
            S: 90,
            D: 0,
            A: 180,
            Z: -90,
            Q: 180
        });

        return this;
    }
});

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
  init: function() {
    this.trail = new Array(Game.map_grid.width);
    for (var i = 0; i < Game.map_grid.width; i++) {
      this.trail[i] = new Array(Game.map_grid.height);
      for (var y = 0; y < Game.map_grid.height; y++) {
        this.trail[i][y] = false;
      }
    }

    this.requires('Actor, Fouroneway, Collision, SpriteAnimation, WormSprite')
      .reel('WormWriggle', 700, [[0,1], [0,0], [0,1], [0,2]])
      .reel('WormMoveLeft', 700, [[0,1], [0,3], [0,4], [0,3]])
      .reel('WormMoveRight', 700, [[0,1], [0,5], [0,6], [0,5]])
      .fouroneway(2)
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
    this.requires('Actor, Color, Collision')
    .color('blue');
  },

  collect: function() {
    this.destroy();
    Crafty.trigger('SurfaceVisited', this);
  }
});
