var Bubbles,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Bubbles = (function() {
  Bubbles.prototype.ctx = null;

  Bubbles.prototype.height = 0;

  Bubbles.prototype.width = 0;

  Bubbles.prototype.children = [];

  Bubbles.prototype.options = {};

  Bubbles.prototype.defaultOptions = {
    maxSize: 80,
    minSize: 20,
    amount: 100,
    delay: 1,
    red: 0,
    green: 144,
    blue: 255,
    strokeWidth: 4,
    strokeOpacity: 0.4,
    centerOpacity: 0.1,
    sideOpacity: 0.5
  };

  Bubbles.prototype.cache = {
    strokeColor: '',
    centerColor: '',
    sideColor: ''
  };

  function Bubbles(canvasId, options) {
    this.removeChildrenIntv = __bind(this.removeChildrenIntv, this);
    this.addChildrenIntv = __bind(this.addChildrenIntv, this);
    this.resetCache = __bind(this.resetCache, this);
    var el;
    el = document.getElementById(canvasId);
    if (!el || !el.getContext || !el.getContext('2d')) {
      console.log('ERR: no 2d context');
      return;
    }
    this.initProperties(el, options);
    this.initIntervals();
    this.generateFrame();
    return;
  }

  Bubbles.prototype.initProperties = function(el, options) {
    var defaultValue, key, _ref;
    this.height = el.height;
    this.width = el.width;
    this.ctx = el.getContext('2d');
    _ref = this.defaultOptions;
    for (key in _ref) {
      defaultValue = _ref[key];
      this.options[key] = options[key] != null ? options[key] : defaultValue;
    }
  };

  Bubbles.prototype.initIntervals = function() {
    this.resetCache();
    setInterval(this.resetCache, 1000);
    setInterval(this.addChildrenIntv, 50);
    setInterval(this.removeChildrenIntv, 500);
  };

  Bubbles.prototype.resetCache = function() {
    var color;
    color = "rgba(" + this.options.red + ", " + this.options.green + ", " + this.options.blue + ", {0})";
    this.cache.strokeColor = color.replace('{0}', this.options.strokeOpacity);
    this.cache.centerColor = color.replace('{0}', this.options.centerOpacity);
    this.cache.sideColor = color.replace('{0}', this.options.sideOpacity);
  };

  Bubbles.prototype.addChildrenIntv = function() {
    if (this.children.length < this.options.amount) {
      this.children.push(new Bubble(this));
    }
  };

  Bubbles.prototype.removeChildrenIntv = function() {
    var item;
    this.children = (function() {
      var _i, _len, _ref, _results;
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (!item.reachedTop()) {
          _results.push(item);
        }
      }
      return _results;
    }).call(this);
  };

  Bubbles.prototype.generateFrame = function() {
    var item, _, _i, _j, _len, _len1, _ref, _ref1;
    this.ctx.clearRect(0, 0, this.width, this.height);
    _ref = this.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      this.addCtxChild(item);
    }
    _ref1 = this.children;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      item = _ref1[_j];
      item.move();
    }
    _ = this;
    setTimeout(function() {
      _.generateFrame();
    }, 35);
  };

  Bubbles.prototype.addCtxChild = function(item) {
    this.ctx.beginPath();
    this.ctx.moveTo(item.x + item.radius, item.y);
    this.ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2, true);
    this.ctx.fillStyle = item.generateGradient();
    this.ctx.fill();
    if (item.strokeWidth !== 0) {
      this.ctx.lineWidth = item.strokeWidth;
      this.ctx.strokeStyle = item.strokeColor;
      this.ctx.stroke();
    }
  };

  return Bubbles;

})();
