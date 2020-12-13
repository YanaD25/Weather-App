import refs from './refs';
import fetchWeather from './fetch-weather';
import fetchImage from './fetch-bg-image';
import renderingCurrentWeather from './renderingCurrentWeather';
import preloader from './preloader';
import {
  onBtnOneDayClick,
  onBtnFiveDayClick
} from './markUpFiveDay';
import 'slick-carousel/slick/slick.min';
require('jquery');
import $ from 'jquery';
window.$ = window.jQuery = $;

let cityArray = localStorage.getItem('town') ? JSON.parse(localStorage.getItem('town')) : [];
localStorage.setItem('town', JSON.stringify(cityArray))
const data = JSON.parse(localStorage.getItem('town'));

$('.add-remove').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  disabled: true,
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  }, ],
});

const createCityItem = (item, index) => {
  return `<li class="favorite-list__item">
          <p class="favorite-list__item-link">${item}</p>
          <button class="favorite-list__item-close js-remove-slide">&#10006;</button>
        </li>`;
};
const removeFavoriteItem = (index) => {
  const favoriteListItem = document.querySelectorAll('.favorite-list__item');
  favoriteListItem[index].addEventListener('click', (e) => {
    console.log(e.target.localName)
    if (e.target.localName === 'button') {
      const slickTrack = document.querySelector('.slick-track');
      slickTrack.removeChild(favoriteListItem[index]);
      cityArray.forEach((item, i) => {
        if (item === favoriteListItem[index].childNodes[1].textContent) {
          cityArray.splice(i, 1);
          localStorage.setItem('town', JSON.stringify(cityArray))
        }
      })
    }
  })
}
refs.favoriteCityList.addEventListener('click', (e) => {
  if (e.target.classList.contains('favorite-list__item-link')) {
    preloader.search();
    refs.searchFormInput.value = e.target.textContent;
    onBtnOneDayClick();
    fetchWeather.currentWeather(refs.searchFormInput.value).then(data => {
      renderingCurrentWeather(data);

    });
    fetchImage.fetchImage(refs.searchFormInput.value).then(data => {
      refs.backgroundRef.setAttribute("style", `background-image: url("${data.largeImg}")`);
    });
  }
})
data.forEach((item, index) => {
  $('.add-remove').slick(
    'slickAdd',
    createCityItem(item),
  );
  $('.js-remove-slide').on('click', function () {
    $('.add-remove').slick('slickRemove', removeFavoriteItem(index));
  });
});

const setInputValue = (e) => {
  e.preventDefault();
  if (cityArray.indexOf(refs.searchFormInput.value.toLowerCase()) != -1) {
    return;
  }
  cityArray.push(refs.searchFormInput.value.toLowerCase());
  localStorage.setItem('town', JSON.stringify(cityArray));
  refs.favoriteCityStar.removeEventListener('click', setInputValue);
  $('.add-remove').slick(
    'slickAdd',
    createCityItem(refs.searchFormInput.value),
  );
  cityArray.forEach((item, i) => {
    $('.js-remove-slide').on('click', function () {
      $('.add-remove').slick('slickRemove', removeFavoriteItem(i));
    });
  })
};

export default () => {
  refs.favoriteCityStar.addEventListener('click', setInputValue);
}
