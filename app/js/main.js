var Bubble;

Bubble = (function() {
  function Bubble(parent) {
    console.log('@todo constructor');
    return;
  }

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
    maxSize: 200,
    minSize: 10,
    amount: 12,
    delay: 1,
    r: 255,
    g: 25,
    b: 255,
    strokeWidth: 2,
    strokeOpacity: 0,
    centerOpacity: 1,
    sideOpacity: 0.1
  };

  Bubbles.prototype.cache = {
    strokeCol: '',
    centerCol: '',
    sideCol: ''
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

  Bubbles.prototype.initChildren = function() {};

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
    new Bubbles('display-area', {
      amount: 24,
      delay: 2
    });
  });
})(jQuery, window);
