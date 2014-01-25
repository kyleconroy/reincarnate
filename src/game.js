Game = {
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init();
    Crafty.background('green');

    Crafty.e('2D, Canvas, Color')
      .attr({
        y: Crafty.viewport.height / 2,
        x: Crafty.viewport.width / 2,
        w: 10,
        h: 10
      })
    .color('rgb(0, 0, 100)');
  }
}

/*
window.onresize = function() { // responsible game borders
  var stage = Crafty.stage.elem;
  canvas = stage.getElementsByTagName("canvas")[0];
  stage.style.width = Game.width() + "px";
  stage.style.height = Game.height() + "px";
  canvas.width = Game.width();
  canvas.height = Game.height();
  Crafty.viewport.reload();
};
*/
