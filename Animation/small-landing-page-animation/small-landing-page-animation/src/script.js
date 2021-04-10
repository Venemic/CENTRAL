var presentation = {
  colors: ["88,72,50", "45,84,76", "98,96,103"],
  init: function() {
    setTimeout(function() {
      this.displayStars();
      this.displayWords(0);
    }.bind(this), 1200);
  },
  displayStars: function() {
    $stars = $('.stars');
    var that = this;
    for (var i = 0; i < 60; i++) {
      var size = this.getRandom(2, 6);
      var $star = $('<div>').addClass('star');
      $star.css({
        // opacity: this.getRandomArbitrary(0.1,0.8),
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
        width: size + 'px',
        height: size + 'px',
        background: this.getRandomColor()
      });
      $stars.append($star);
      (function($star) {
        setTimeout(function() {
          $star.css('opacity', '0.9');
        }, that.getRandom(100, 1000));
      })($star);
    }
  },
  listDisplay: [
    "<span>SEARCH</span> <span>IT</span>",
    "<span>ANALYZE</span> <span>IT</span>",
    "<span>CORRELATE</span> <span>IT</span>",
    "<span>REVEAL</span> <span>IT</span>",
    "<span>DISCOVER</span> <span>IT</span>",
    "<span>IT</span> <span>MATTERS</span>"
  ],
  displayWords: function(index) {
    var that = this;
    if (index > this.listDisplay.length - 1) {
      $('.anim').addClass('ended');
      setTimeout(function() {
        $('.anim').removeClass('step0 step1 step2 step3 step4 step5 step6 ended');
        $('.anim__word').empty().css('opacity', 0);
        setTimeout(function() {
          that.displayWords(0);
        }, 1000);

      }, 4000);
      return;
    }
    var nextStep = index > 2 ? 1000 : 1500;
    $('.anim').addClass('pulse');
    $('.anim.pulse .planet-circle:nth-child(2)').one('oanimationend animationend webkitAnimationEnd', function() {
      $('.anim').removeClass('pulse');
      setTimeout(function() {
        index++;
        that.displayWords(index);
      }, nextStep);
    });
    var timing = 500;
    if (index == 0) {
      $('.anim').addClass('step' + index);
      setTimeout(function() {
        $('.anim__word.in').html(this.listDisplay[index + 1]);
        $('.anim__word.out').html(this.listDisplay[index]);
        $('.anim__word.out').css('opacity', 1);
      }.bind(this), timing);
    }
    else {
      if (index % 2) {
        var entering = index % 2 ? 'in' : 'out';
        var exiting = index % 2 ? 'out' : 'in';
        $('.anim__word.in').html(this.listDisplay[index]);
        setTimeout(function() {
          $('.anim__word.out').css('opacity', 0);
          $('.anim__word.in').css('opacity', 1);
          setTimeout(function() {
            $('.anim').addClass('step' + index);
          }, 200);
        }, timing);
      }
      else {
        $('.anim__word.out').html(this.listDisplay[index]);
        setTimeout(function() {
          $('.anim__word.in').css('opacity', 0);
          $('.anim__word.out').css('opacity', 1);
          setTimeout(function() {
            $('.anim').addClass('step' + index);
          }, 200);
        }, timing);
      }

    }



  },
  getRandomColor: function() {
    return 'rgb(' + this.colors[~~(Math.random() * this.colors.length)] + ')';
  },
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getRandomArbitrary: function(min, max) {
    return Math.random() * (max - min) + min;
  }
};

$(document).ready(function() {
  presentation.init();
});