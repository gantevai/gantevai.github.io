var burgerMenuBtn = document.getElementById('burgerMenu');
var navMenuMobile = document.getElementById('navMenuMobile');

burgerMenuBtn.onclick = function() {
  if (navMenuMobile.style.display == 'block') {
    navMenuMobile.style.display = 'none';
  } else {
    navMenuMobile.style.display = 'block';
  }
};

var smallSliderLeft = document.getElementById('smallSliderLeft');
var smallSliderRight = document.getElementById('smallSliderRight');
smallSliderLeft.addEventListener('mouseenter', function() {
  smallSliderLeft.src = 'images/small-slider-left-arrow-hover.png';
  smallSliderLeft.addEventListener('mouseleave', function() {
    smallSliderLeft.src = 'images/small-slider-left-arrow.png';
  });
});

smallSliderRight.addEventListener('mouseenter', function() {
  smallSliderRight.src = 'images/small-slider-right-arrow-hover.png';
  smallSliderRight.addEventListener('mouseleave', function() {
    smallSliderRight.src = 'images/small-slider-right-arrow.png';
  });
});

var postSliderLeft = document.getElementById('postSliderLeft');
var postSliderRight = document.getElementById('postSliderRight');
postSliderLeft.addEventListener('mouseenter', function() {
  postSliderLeft.src = 'images/post-slider-left-arrow-hover.png';
  postSliderLeft.addEventListener('mouseleave', function() {
    postSliderLeft.src = 'images/post-slider-left-arrow.png';
  });
});

postSliderRight.addEventListener('mouseenter', function() {
  postSliderRight.src = 'images/post-slider-right-arrow-hover.png';
  postSliderRight.addEventListener('mouseleave', function() {
    postSliderRight.src = 'images/post-slider-right-arrow.png';
  });
});
