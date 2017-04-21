// jQuery Counter Plugin - v1.0.0 - 8/26/2016
// -------------------------
// COUNTER
// -------------------------


$.fn.counter = function(options) {
  // merge the default plugin settings with the custom options
  options = $.extend({}, $.fn.counter.defaults, options || {});

  var easings = {
    linear: function(t, b, c, d) {
    	return c*t/d + b;
    },

    easeIn: function (t, b, c, d) {
  	  return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
    },

    easeOut: function (t, b, c, d) {
  	  return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
    },

    easeInOut: function (t, b, c, d) {
  	  t /= d/2;
  	  if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
  	  t--;
  	  return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
    },
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return $(this).each(function() {
    var _this = this,
        // how many times to update the value, and how much to increment the value on each update
        totalFrames = Math.ceil(options.duration / 33),
        currentFrame = 0,
        interval = setInterval(updateTimer, 33);

    function updateTimer() {
      var value;

      if (!easings[options.ease]) throw new Error('Easing method does not exist!');

      value = easings[options.ease](currentFrame, options.from, options.to, totalFrames);

      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        value = options.to;

        if (typeof(options.onComplete) == 'function') {
            options.onComplete.call(_this, value);
        }
      }

      if(options.comma) {
        $(_this).html(numberWithCommas(value.toFixed(options.decimals)));
      } else {
          $(_this).html(value.toFixed(options.decimals));
      }

      if (typeof(options.onUpdate) == 'function') {
        options.onUpdate.call(_this, value);
      }

      currentFrame++;
    }
  });
};

$.fn.counter.defaults = {
  from: 0,  // the number the element should start at
  to: 100,  // the number the element should end at
  ease: 'linear', // add easing functionality to counter
  duration: 1000,  // how long it should take to count between the target numbers
  decimals: 0,  // the number of decimal places to show
  comma: true, //add comma separator
  onUpdate: null,  // callback method for every time the element is updated,
  onComplete: null,  // callback method for when the element finishes updating
};
