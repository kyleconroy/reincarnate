Crafty.scene('Loading', function(){
  // Load our sprite map image
  Crafty.load(['assets/sprites/worm.png', 'assets/sprints/flash.png'], function(){
    Crafty.sprite(64, 16, 'assets/sprites/worm.png', {
      WormSprite: [0, 0],
    }, 0, 0);
    Crafty.sprite(16, 16, 'assets/sprites/flash.png', {
      FlashSprite: [0, 0],
    }, 0, 0);
    Crafty.scene('Game');
  })
});

Crafty.scene('WormTest', function(){
});


Crafty.scene('Game', function(){
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }
/*  
var topEdge = x == 0;
var bottomEdge = y == Game.map_grid.height;
var leftEdge = y == 0;
var rightEdge = x == Game.map_grid.width-1;
*/
var floorEdge = Math.floor(Math.random()*4)+1;
console.log(floorEdge);

if(floorEdge == 1){Crafty.e('Surface').attr({x:0, y:0, z:3, w:16, h:Crafty.viewport.height});}
if(floorEdge == 2){Crafty.e('Surface').attr({x:0, y:0, z:3, w:Crafty.viewport.width, h:16});}
if(floorEdge == 3){Crafty.e('Surface').attr({x:0, y:Crafty.viewport.height - 16, z:3, w:Crafty.viewport.width, h:16});}
if(floorEdge == 4){Crafty.e('Surface').attr({x:Crafty.viewport.width - 16, y:0, z:3, w:16, h:Crafty.viewport.height});}



  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (Math.random() < 0.1 && !this.occupied[x][y]) {
        Crafty.e('Rock')
          .attr({
            x: x * Game.map_grid.tile.width,
            y: y * Game.map_grid.tile.height,
            z: 2,
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
          })
        this.occupied[x][y] = true;
      }
    }
  }

  e = Crafty.e('WormHitBox')
    .attr({
      x: Math.floor(Crafty.viewport.width / 2) - 5,
      y: Math.floor(Crafty.viewport.height / 2) - 5,
      w: 6,
      h: 6,
    })
    
 var safeZone = Crafty.e('2D, Canvas, Collision')
		.attr({x:e.x, y:e.y-25, w:70, h:70})
		.onHit('Rock', function(ent){
			ent[0].obj.destroy();
	  })
});

