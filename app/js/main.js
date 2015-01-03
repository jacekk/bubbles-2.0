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
    return;
  }

  Bubble.prototype.randomize = function() {
    var opts;
    opts = this.parent.options;
    this.radius = Math.round(Math.random() * (opts.maxSize - opts.minSize) + opts.minSize);
    this.x = Math.round(Math.random() * this.parent.width);
    this.speed = Math.round(Math.random() * 5 + 4) / opts.delay;
    this.radians = Math.random() * Math.PI;
    if (Math.random() > 0.5) {
      this.radians *= -1;
    }
    this.radiansInt = (Math.random() * 4 - 1) / 100;
    this.y = this.parent.height + this.radius + Math.random() * this.parent.height / 4;
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
    var gradient, grdX, grdY;
    grdX = this.x - this.radius / 3;
    grdY = this.y - this.radius / 3;
    gradient = this.parent.ctx.createRadialGradient(grdX, grdY, this.radius / 2, grdX, grdY, this.radius * 1.5);
    gradient.addColorStop(0, this.parent.cache.centerColor);
    gradient.addColorStop(1, this.parent.cache.sideColor);
    return gradient;
  };

  return Bubble;

})();

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
    r: 0,
    g: 144,
    b: 255,
    strokeWidth: 2,
    strokeOpacity: 0.4,
    centerOpacity: 0.08,
    sideOpacity: 0.2
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
    setInterval(this.addChildrenIntv, 100);
    setInterval(this.removeChildrenIntv, 2000);
  };

  Bubbles.prototype.resetCache = function() {
    var color;
    color = "rgba(" + this.options.r + ", " + this.options.g + ", " + this.options.b + ", {0})";
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
    this.ctx.lineWidth = this.options.strokeWidth;
    this.ctx.strokeStyle = this.cache.strokeColor;
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
    this.ctx.stroke();
  };

  return Bubbles;

})();

angular.module('ngApp', []).filter('fixed', [
  '$filter', function($filter) {
    return function(input, precision) {
      if (precision == null) {
        precision = 1;
      }
      return input.toFixed(precision);
    };
  }
]).controller('OptionsController', [
  '$scope', function($scope) {
    var i;
    $scope.strokeWidths = [0, 1, 2, 3, 4];
    $scope.zeroToOneRange = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; _i <= 10; i = ++_i) {
        _results.push(i / 10);
      }
      return _results;
    })();
    $scope.colorRange = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 3; _i <= 16; i = ++_i) {
        _results.push(i * 16);
      }
      return _results;
    })();
  }
]);

(function($, window) {
  var adjustLayout;
  adjustLayout = function() {
    var canvasEl, topBarHei, topBarPaddAndBorder;
    canvasEl = $('#display-area')[0];
    canvasEl.width = window.innerWidth;
    topBarPaddAndBorder = 9;
    topBarHei = $('#display-options').height() + topBarPaddAndBorder;
    canvasEl.height = window.innerHeight - topBarHei;
  };
  $(window).load(function() {
    $('#display-options select').selectBoxIt();
    adjustLayout();
    new Bubbles('display-area', {});
  });
})(jQuery, window);
