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


Crafty.c('Flash', {
  init: function() {
    this.requires('Actor, SpriteAnimation, FlashSprite')
      .reel('BangTop', 500, [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5],
                             [0,6], [0,7], [0,8], [0.9], [0,10], [0,11]])
      .reel('BangLeft', 500, [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5],
                             [1,6], [1,7], [1,8], [1.9], [1,10], [1,11]])
      .reel('BangRight', 500, [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5],
                             [2,6], [2,7], [2,8], [2.9], [2,10], [2,11]])
      .reel('BangBottom', 500, [[3,0], [3,1], [3,2], [3,3], [3,4], [3,5],
                             [3,6], [3,7], [3,8], [3.9], [3,10], [3,11]])
    this.bind('AnimationEnd', this.die);
  },
  
  die: function() {
    this.destroy();
  },
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

    this.requires('Actor, SpriteAnimation, WormSprite')
      .reel('WormWriggle', 700, [[0,1], [0,0], [0,1], [0,2]])
      .reel('WormMoveLeft', 700, [[0,1], [0,3], [0,4], [0,3]])
      .reel('WormMoveRight', 700, [[0,1], [0,5], [0,6], [0,5]])
      .animate('WormWriggle', -1)
      .origin(0,8)

    this.bind('Move', function(data) {
      var trail = this.trail;
      var x1 = Math.floor(data._x / Game.map_grid.tile.width);
      var y1 = Math.floor(data._y / Game.map_grid.tile.height);

      if (false && trail[x1] && !trail[x1][y1]) {
        Crafty.e('Trail')
          .attr({
            y: data._y,
            x: data._x,
            w: 16,
            h: 16,
          })
          .origin(8,8)
          .timeout(function() {
            this.destroy();
            trail[x1][y1] = false;
          }, 2500);
        trail[x1][y1] = true;
      }
    });
  },

  changeDirection: function(data) {
    if (data.x !== 0) {
      this.animate('WormMoveLeft', -1);
      if (data.x > 0) {
        this.rotation = 180;
      } else {
        this.rotation = 0;
      }
    } else if (data.y !== 0) {
      if (data.y < 0) {
        this.rotation = 90;
        this.animate('WormMoveLeft', -1);
      } else {
        this.rotation = 270;
        this.animate('WormMoveLeft', -1);
      }
    } else {
      this.animate('WormWriggle', -1);
    }
  },

  moveWorm: function(data) {
    if (this.rotation == 0) {
      this.x = data._x - 1;
      this.y = data._y - 5;
    } else if (this.rotation == 90) {
      this.x = data._x + 3;
      this.y = data._y - 10;
    } else if (this.rotation == 180) {
      this.x = data._x + 8;
      this.y = data._y - 5;
    } else if (this.rotation == 270) {
      this.x = data._x + 3;
      this.y = data._y;
    }
  },

  slime: function(x, y) {
    var trail = this.trail;

  }
})

Crafty.c('WormHitBox', {
  init: function() {
    this.requires('Actor, Fouroneway, Collision')
      .fouroneway(2)
      .onHit('Solid', this.stopMovement);

    var worm = Crafty.e('Worm').attr({z: 3});

	  this.bind('NewDirection', function(data) {
      worm.changeDirection(data);
    });

    this.bind('Move', function(data) {
      worm.moveWorm(data);
    });

  },

  stopMovement: function(e) {
    var box = e[0].obj;

      
    var flash = Crafty.e('Flash')
      .attr({
        z: 10,
        x: box._x,
        y: box._y,
        w: 16,
        h: 16,
      })

    if (this._movement.y > 0) {
      flash.animate('BangTop');
    } else if (this._movement.y < 0) {
      flash.animate('BangBottom');
    } else if (this._movement.x < 0) {
      flash.animate('BangRight');
    } else if (this._movement.x > 0) {
      flash.animate('BangLeft');
    }

    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

});

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Solid')
     //.color('gray');

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
