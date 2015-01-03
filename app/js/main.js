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
    this.x = Math.round(Math.random() * this.parent.width * 0.5 + this.parent.width * 0.25);
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

  return Bubble;

})();

var Bubbles;

Bubbles = (function() {
  Bubbles.prototype.ctx = null;

  Bubbles.prototype.height = 0;

  Bubbles.prototype.width = 0;

  Bubbles.prototype.refreshInt = 35;

  Bubbles.prototype.children = [];

  Bubbles.prototype.options = {};

  Bubbles.prototype.defaultOptions = {
    maxSize: 150,
    minSize: 20,
    amount: 100,
    delay: 2,
    r: 255,
    g: 25,
    b: 255,
    strokeWidth: 2,
    strokeOpacity: 0,
    centerOpacity: 1,
    sideOpacity: 0.1
  };

  Bubbles.prototype.cache = {
    strokeColor: 'rgba(0, 255, 0, 0.7)',
    centerColor: 'rgba(0, 255, 0, 0.1)',
    sideColor: 'rgba(0, 255, 0, 0.3)'
  };

  function Bubbles(canvasId, options) {
    var el;
    el = document.getElementById(canvasId);
    if (!el || !el.getContext || !el.getContext('2d')) {
      console.log('ERR: no 2d context');
      return;
    }
    this.initProperties(el, options);
    this.initChildren();
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

  Bubbles.prototype.initChildren = function() {
    var _;
    _ = this;
    setInterval(function() {
      var item;
      _.children = (function() {
        var _i, _len, _ref, _results;
        _ref = _.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (!item.reachedTop()) {
            _results.push(item);
          }
        }
        return _results;
      })();
      if (_.children.length < _.options.amount) {
        _.children.push(new Bubble(_));
      }
    }, 250);
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
    }, this.refreshInt);
  };

  Bubbles.prototype.addCtxChild = function(item) {
    var grd, grdX, grdY;
    this.ctx.beginPath();
    this.ctx.moveTo(item.x + item.radius, item.y);
    this.ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2, true);
    grdX = item.x - item.radius / 3;
    grdY = item.y - item.radius / 3;
    grd = this.ctx.createRadialGradient(grdX, grdY, item.radius / 2, grdX, grdY, item.radius * 1.5);
    grd.addColorStop(0, this.cache.centerColor);
    grd.addColorStop(1, this.cache.sideColor);
    this.ctx.fillStyle = grd;
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
  }
]);

(function($, window) {
  var adjustLayout;
  adjustLayout = function() {
    var canvasEl, topBarHei;
    topBarHei = 50;
    canvasEl = $('#display-area')[0];
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight - topBarHei;
  };
  $(window).load(function() {
    $('#display-options select').selectBoxIt();
    adjustLayout();
    new Bubbles('display-area', {});
  });
})(jQuery, window);
