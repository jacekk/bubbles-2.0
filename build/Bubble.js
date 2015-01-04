var Bubble;

Bubble = (function() {
  Bubble.prototype.x = 0;

  Bubble.prototype.y = 0;

  Bubble.prototype.speed = 0;

  Bubble.prototype.radius = 0;

  Bubble.prototype.radians = 0;

  Bubble.prototype.radiansInt = 0;

  function Bubble(parent) {
    this.parent = parent;
    this.randomize();
    this.initProperties();
    return;
  }

  Bubble.prototype.initProperties = function() {
    var cache;
    cache = this.parent.cache;
    this.strokeWidth = this.parent.options.strokeWidth;
    this.strokeColor = cache.strokeColor;
    this.centerColor = cache.centerColor;
    this.sideColor = cache.sideColor;
  };

  Bubble.prototype.randomize = function() {
    var opts;
    opts = this.parent.options;
    this.radius = Math.round(Math.random() * (opts.maxSize - opts.minSize) + opts.minSize);
    this.speed = Math.round(Math.random() * 5 + 4) / opts.delay;
    this.radians = Math.random() * Math.PI;
    if (Math.random() > 0.5) {
      this.radians *= -1;
    }
    this.radiansInt = (Math.random() * 4 - 1) / 100;
    this.x = Math.round(Math.random() * this.parent.width);
    this.y = this.parent.height + this.radius;
  };

  Bubble.prototype.move = function() {
    this.y -= this.speed;
    this.radians += this.radiansInt;
    this.x -= Math.sin(this.radians);
  };

  Bubble.prototype.reachedTop = function() {
    return this.y < -this.radius;
  };

  Bubble.prototype.generateGradient = function() {
    var gradient, x, y;
    x = this.x - this.radius / 3;
    y = this.y - this.radius / 3;
    gradient = this.parent.ctx.createRadialGradient(x, y, this.radius / 2, x, y, this.radius * 1.5);
    gradient.addColorStop(0, this.centerColor);
    gradient.addColorStop(1, this.sideColor);
    return gradient;
  };

  return Bubble;

})();
