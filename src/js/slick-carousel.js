import 'slick-carousel/slick/slick.min';
require('jquery');
import $ from 'jquery';
window.$ = window.jQuery = $;

function slider1() {
  $(document).width(function () {
    $('.five-days-weather-list').slick({
      arrows: true,
      appendArrows: $('five-days-weather-btns'),
      prevArrow: $('.five-days-weather-btns__prev'),
      nextArrow: $('.five-days-weather-btns__next'),
      infinite: false,
      disabled: true,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 2 } },
        { breakpoint: 2800, settings: { slidesToShow: 6, slidesToScroll: 1 } },
      ],
    });
  });
}

function slider2() {
  $(document).width(function () {
    // начало .progressbar
    const $slider = $('.hourly-weather-list');
    const $progressBar = $('.progressbar');
    const $progressBarLabel = $('.progressbar__label');
    let calc = 25;
    $slider.on('beforeChange', function (
      event,
      slick,
      currentSlide,
      nextSlide,
    ) {
      calc = (nextSlide / (slick.slideCount - 2)) * 100;
      if (nextSlide === 0) {
        $progressBar
          .css('background-size', calc + 25 + '% 100%')
          .attr('aria-valuenow', calc + 25);
        $progressBarLabel.text(calc + 25 + '% completed');
      } else {
        $progressBar
          .css('background-size', calc + '% 100%')
          .attr('aria-valuenow', calc);
        $progressBarLabel.text(calc + '% completed');
      }
    });
// конец .progressbar
    $('.hourly-weather-list').slick({
      arrows: true,
      draggable: true,
      infinite: false,
      appendArrows: $('hourly-weather-btns'),
      prevArrow: $('.hourly-weather-btns__prev'),
      nextArrow: $('.hourly-weather-btns__next'),
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 2 } },
        { breakpoint: 2800, settings: { slidesToShow: 8, slidesToScroll: 2 } },
      ],
    });
  });
}
export { slider1, slider2 };
