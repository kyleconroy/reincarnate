var e;

Game = {
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init();
    Crafty.background('green');

    e = Crafty.e('Worm')
      .attr({
        x: (Crafty.viewport.width / 2) - 5,
        y: (Crafty.viewport.height / 2) - 5,
        w: 10,
        h: 10,
      })

    //Crafty.viewport.follow(e, 0, 0);
  }

}

window.onresize = function() { // responsible game borders
  Crafty.viewport.reload();

  e.attr({
    x: (Crafty.viewport.width / 2) - 5,
    y: (Crafty.viewport.height / 2) - 5,
  })
};
