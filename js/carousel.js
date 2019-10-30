(function() {
  function Carousel(containerClass, visibleImageCountAtATime, hasIndicator) {
    // properties
    this.container = containerClass;
    var SLIDE_MOVE_SPEED = 5;
    var IMAGE_HOLD_TIME = 1500;
    var AUTOMATE_DIRECTION = 'right';
    this.hasIndicator = hasIndicator;
    this.wrapper = null;
    this.image = null;
    this.imageHeight = null;
    this.imageWidth = null;
    this.totalImage = null;
    this.wrapperWidth = null;
    this.leftValue = null;
    this.leftBtn = null;
    this.rightBtn = null;
    this.imageIndex = null;
    this.clicked = null;
    this.sliderTopics = [
      '01.LIFESTYLE',
      '02.FASHIONABLE SNAP',
      '03.GIRL FASHION',
      '04.FASHIONABLE SNAP'
    ];
    this.sliders = null;

    var that = this;
    // function to initialize all the required parameters

    this.visibleImageCountAtATime = visibleImageCountAtATime;
    // function to initialize all the required parameters
    this.init = function() {
      this.initializeDOMCommunication();
      this.initializeDOMStyling();
      this.automateSlide;
      this.initializeIndexes();
      this.assignSliderTopics();

      this.rightBtn.onclick = function() {
        that.rightBtnClick();
      };
      this.leftBtn.onclick = function() {
        that.leftBtnClick();
      };

      window.onresize = function() {
        that.rightBtnClick();
      };
    };

    this.initializeDOMCommunication = function() {
      this.wrapper = this.container.getElementsByClassName('wrapper')[0];
      this.image = this.container.getElementsByClassName('slider-image');
      this.leftBtn = this.container.parentNode.getElementsByClassName('left-arrow')[0];
      this.rightBtn = this.container.parentNode.getElementsByClassName('right-arrow')[0];
      this.totalImage = this.wrapper.children.length;
      this.wrapper.style.left = 0;
    };

    this.initializeDOMStyling = function() {
      const temp = this.container.parentNode.getElementsByClassName('left-arrow')[0];
      this.imageHeight = temp.getElementsByTagName('img')[0].offsetHeight;
      this.imageWidth = this.container.offsetWidth / this.visibleImageCountAtATime;
      for (var i = 0; i < this.totalImage; i++) {
        this.image[i].style.height = this.imageHeight + 'px';
        this.image[i].style.width = this.imageWidth + 'px';
      }
      this.wrapperWidth = this.totalImage * this.imageWidth;
      this.wrapper.style.width = this.imageWidth * this.totalImage + 'px';
      this.wrapper.style.height = this.imageHeight + 'px';
      this.container.style.height = this.imageHeight + 'px';
    };
    this.assignSliderTopics = function() {
      if (this.hasIndicator) {
        var parentDiv = this.container.parentNode.parentNode;
        this.sliders = parentDiv.getElementsByClassName('slider-index');
        this.sliders[0].innerHTML = this.sliderTopics[3];
        this.sliders[1].innerHTML = this.sliderTopics[0];
        this.sliders[2].innerHTML = this.sliderTopics[1];
        this.sliders[0].onclick = function() {
          that.leftBtnClick();
        };
        this.sliders[2].onclick = function() {
          that.rightBtnClick();
        };
      }
    };

    this.initializeIndexes = function() {
      this.imageIndex = 1; //(default)
      this.clicked = false;
      this.leftValue = 0; //parseInt(this.wrapper.style.left);
    };

    this.createIndicator = function() {
      this.indicatorList = this.container.createElement('DIV');
      this.indicatorList.className = 'indicator-list';

      for (var i = 0; i < this.totalImage; i++) {
        this.dotIndicator[i] = this.container.createElement('DIV');
        this.dotIndicator[i].className = 'dot-indicator';
        this.indicatorList.appendChild(this.dotIndicator[i]);
        this.dotIndicator[i].onclick = function() {
          var index = Array.prototype.slice.call(that.indicatorList.children).indexOf(this);
          that.indicatorFunctionality(index);
        };
      }
      this.container.appendChild(this.indicatorList);

      this.activateIndicator(this.dotIndicator[this.imageIndex - 1]); // to make first index activated
    };

    this.moveWrapper = function(element, value) {
      that.wrapper.style.left = value + 'px';
    };

    this.rightBtnClick = function() {
      if (!that.clicked) {
        that.clicked = true;
        that.initializeDOMStyling();
        if (that.imageIndex != that.totalImage) {
          var initialLeftValue = that.leftValue;
          var moveSlideLeft = setInterval(function() {
            that.leftValue -= SLIDE_MOVE_SPEED;
            if (Math.abs(that.leftValue - initialLeftValue) >= that.imageWidth) {
              clearInterval(moveSlideLeft);
              that.clicked = false;
              that.imageIndex++;
              that.leftValue += Math.abs(that.leftValue - initialLeftValue) - that.imageWidth; //Shifting the extrapixels back to right.
            }
            that.moveWrapper(that.wrapper, that.leftValue);
          });
        } else {
          var slideReset = setInterval(function() {
            that.leftValue += 5 * SLIDE_MOVE_SPEED;
            if (that.leftValue >= 0) {
              clearInterval(slideReset);
              that.imageIndex = 1;
              that.clicked = false;
              that.leftValue = 0;
            }
            that.moveWrapper(that.wrapper, that.leftValue);
          });
        }
        //Indicator of slider
        if (this.hasIndicator) {
          var temp = that.sliderTopics.shift();
          that.sliderTopics.push(temp);
          that.assignSliderTopics();
        }
        clearInterval(that.automateSlide); //stopped the automated slider
        that.automateSlide = setInterval(function() {
          if (AUTOMATE_DIRECTION == 'right') {
            that.rightBtnClick();
          } else {
            that.leftBtnClick();
          }
        }, IMAGE_HOLD_TIME); //Restarted the automated slider
      }
    };

    this.leftBtnClick = function() {
      if (!that.clicked) {
        that.clicked = true;
        that.initializeDOMStyling();
        if (that.imageIndex != 1) {
          var initialLeftValue = this.leftValue;
          var moveSlideRight = setInterval(function() {
            that.leftValue += SLIDE_MOVE_SPEED;
            if (Math.abs(that.leftValue - initialLeftValue) >= that.imageWidth) {
              clearInterval(moveSlideRight);
              that.clicked = false;
              that.imageIndex--;
              that.leftValue -= Math.abs(that.leftValue - initialLeftValue) - that.imageWidth; //Shifting the extrapixels back to left.
            }
            that.moveWrapper(that.wrapper, that.leftValue);
          });
        } else {
          var slideReset = setInterval(function() {
            that.leftValue -= 5 * SLIDE_MOVE_SPEED;
            if (that.leftValue <= that.imageWidth - that.wrapperWidth) {
              clearInterval(slideReset);
              that.imageIndex = that.totalImage;
              that.clicked = false;
              that.leftValue -= that.leftValue - (that.imageWidth - that.wrapperWidth);
            }
            that.moveWrapper(that.wrapper, that.leftValue);
          });
        }
        //Indicator of slider
        if (this.hasIndicator) {
          var temp = that.sliderTopics.pop();
          that.sliderTopics.unshift(temp);
          that.assignSliderTopics();
        }
        clearInterval(that.automateSlide); //stopped the automated slider
        that.automateSlide = setInterval(function() {
          if (AUTOMATE_DIRECTION == 'right') {
            that.rightBtnClick();
          } else {
            that.leftBtnClick();
          }
        }, IMAGE_HOLD_TIME); //Restarted the automated slider
      }
    };

    this.automateSlide = setInterval(function() {
      if (AUTOMATE_DIRECTION == 'right') {
        that.rightBtnClick();
      } else {
        that.leftBtnClick();
      }
    }, IMAGE_HOLD_TIME);
    this.init();
  }
  var container1 = document.getElementsByClassName('container')[0];
  new Carousel(container1, 1, true);
  var container2 = document.getElementsByClassName('container')[1];
  new Carousel(container2, 4);
  var container3 = document.getElementsByClassName('container')[2];
  new Carousel(container3, 1);
})();
