import refs from './refs';

export default (data) => {
  refs.cityName.innerHTML = `${data.name}, ${data.country}`;
  refs.currentWeatherIcon.src = `https://openweathermap.org/img/w/${data.icon}.png`;
  refs.tempToday.innerHTML = `${data.currentTemp}`;
  refs.tempTodayMin.innerHTML = `${data.tempMin}`;
  refs.tempTodayMax.innerHTML = `${data.tempMax}`;
  refs.sunrise.innerHTML = `${data.sunrise}`;
  refs.sunset.innerHTML = `${data.sunset}`
}
