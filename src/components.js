Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas');
  },
});

Crafty.c('Worm', {
  init: function() {
    this.requires('Actor, Fourway, Color')
      .fourway(4)
      .color('black');
  }
});
