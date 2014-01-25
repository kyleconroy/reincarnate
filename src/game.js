Game = {
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init();
    Crafty.background('green');

    var x = (Crafty.viewport.width / 2);
    var y = (Crafty.viewport.height / 2);
    var ent = Crafty.e('PlayerCharacter').at(x, y);

    Crafty.viewport.follow(ent, 0, 0);
  }

}

window.onresize = function() { // responsible game borders
  Crafty.viewport.reload();
};
