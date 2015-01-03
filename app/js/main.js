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
  Bubbles.prototype.defaultOptions = {
    maxSize: 200,
    minSize: 10,
    amount: 12,
    delay: 1,
    strokeWid: 2,
    color1: 255,
    color2: 25,
    color3: 255,
    strokeOpac: 0,
    centerOpac: 1,
    sideOpac: 0.1
  };

  Bubbles.prototype.ctx = null;

  Bubbles.prototype.runtime = {
    strokeCol: '',
    centerCol: '',
    sideCol: '',
    refreshInt: 35,
    height: 0,
    width: 0,
    children: []
  };

  function Bubbles(canvasId, options) {
    var el;
    el = document.getElementById(canvasId);
    if (!el || !el.getContext || !el.getContext('2d')) {
      console.log('ERR: no 2d context');
      return;
    }
    this.ctx = el.getContext('2d');
    this.overrideOptions(options);
    this.init();
    return;
  }

  Bubbles.prototype.overrideOptions = function(options) {
    console.log('@todo overrideOptions');
  };

  Bubbles.prototype.init = function() {
    console.log('@todo init');
  };

  return Bubbles;

})();

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
