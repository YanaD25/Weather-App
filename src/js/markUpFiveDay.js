import fetchWeater from './fetch-weather';
import refs from './refs';
import fiveDaysWeatherList from '../template/fiveDays-template.hbs';
import hourlyWeatherList from '../template/hourlyDay-template.hbs';
import {
  slider2
} from './slick-carousel';
import {
  each
} from 'jquery';

let isActiveBtnOneDay = true;
let isActiveBtnFiveDay = false;

const onBtnOneDayClick = function () {

  if (!isActiveBtnOneDay) {
    return;
  }
  isActiveBtnOneDay = false;
  refs.onClickBtnFiveDay.classList.remove('weather-button-active');
  refs.onClickBtnFiveDay.classList.add('weather-button-unactive');
  refs.onClickBtnOneDay.classList.remove('weather-button-unactive');
  refs.onClickBtnOneDay.classList.add('weather-button-active');
  refs.containerWeatherToday.style.display = 'flex';
  refs.weatherContainer.style.display = 'none';
  refs.timerContainer.style.display = 'flex';
  refs.blickQuote.style.display = 'block';
  refs.weatherContainer.innerHTML = '';
  isActiveBtnFiveDay = false;
  refs.positionForBtn.classList.remove('position-for-btn');
  return;
};

const onBtnFiveDayClick = function (data) {
  refs.positionForBtn.classList.add('position-for-btn');
  if (isActiveBtnFiveDay) {
    return;
  }
  isActiveBtnFiveDay = true;
  refs.onClickBtnFiveDay.classList.remove('weather-button-unactive');
  refs.onClickBtnFiveDay.classList.add('weather-button-active');
  refs.onClickBtnOneDay.classList.remove('weather-button-active');
  refs.onClickBtnOneDay.classList.add('weather-button-unactive');
  refs.timerContainer.style.display = 'none';
  refs.containerWeatherToday.style.display = 'none';
  refs.weatherContainer.style.display = 'block';
  refs.blickQuote.style.display = 'none';
  isActiveBtnOneDay = true;
  const markUp = fiveDaysWeatherList(data);
  refs.weatherContainer.insertAdjacentHTML('beforeend', markUp);
  const cityTitle = document.querySelector('.five-days-city-title');
  cityTitle.textContent = refs.cityName.textContent;
  const onClickMoreInfo = document.querySelector('.five-days-weather-list');

  onClickMoreInfo.addEventListener(`click`, e => {
    if (!e.target.dataset.id) return;
    if (e.target.dataset.id) {
      const li = document.querySelectorAll('.five-days-weather-list__day');
      const btn = document.querySelectorAll(
        '.five-days-weather-list__item--btn',
      );
      const id = e.target.dataset.id;
      const currentActiveLi = e.currentTarget.querySelector('.active-day');
      const currentActiveBtn = e.currentTarget.querySelector('.active-btn');
      if (currentActiveLi && currentActiveBtn) {
        currentActiveLi.classList.remove('active-day');
        currentActiveBtn.classList.remove('active-btn');
      }
      li.forEach(item => {
        if (item.dataset.id === id) {
          const nextActiveLi = item;
          nextActiveLi.classList.add('active-day');
        }
      });
      btn.forEach(item => {
        if (item.dataset.id === id) {
          item.classList.add('active-btn');
        }
      });
    }
    const contWeatherHourl = document.querySelector(
      '.five-days-weather__hourly',
    );
    contWeatherHourl.innerHTML = '';
    const markUpHourly = hourlyWeatherList(data[e.target.dataset.id]);
    contWeatherHourl.insertAdjacentHTML('beforeend', markUpHourly);
    slider2();
  });
};
export {
  onBtnOneDayClick,
  onBtnFiveDayClick
};
