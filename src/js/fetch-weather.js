import refs from "./refs";
import moment from 'moment';
moment().format();

function SortArrayForDays(data) {
  let newObj = {};
  let dateForDay = [];
  data.list.forEach(everyDay => {
    if (dateForDay[0] != everyDay.dt_txt.split(' ')[0]) {
      dateForDay = everyDay.dt_txt.split(' ');
      newObj[dateForDay[0]] = [];
      newObj[dateForDay[0]].push(everyDay);
    } else {
      newObj[dateForDay[0]].push(everyDay);
    }
  });
  const newArr = []
  for (let key in newObj) {
    newArr.push(newObj[key]);
  }

  return newArr;
}

export default {
  apiKey: 'a34e0daebedc4e667c5896b64f2b27c9',
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  weatherFor5Days(cityName) {
    const searchOptions = `/forecast?q=${cityName}&units=metric&appid=${this.apiKey}`;
    return fetch(this.baseUrl + searchOptions)
      .then(res => res.json())
      .then(data => {
        const result = [];
        let id = 0;
        data.list = SortArrayForDays(data);
        data.list.forEach((day, i) => {
          let dayOfTheWeek = moment(new Date(day[0].dt * 1000)).format('dddd');
          let dateMonth = moment(new Date(day[0].dt * 1000)).format("DD ddd");
          let min = 100;
          let max = 0;
          day.forEach(element => {
            if (element.main.temp_min < min) min = element.main.temp_min;
            if (element.main.temp_max > max) max = element.main.temp_max;

            element.time = moment(new Date(element.dt * 1000 + new Date().getTimezoneOffset() * 60000)).format('LT');

            element.icon = element.weather[0].icon;
            element.main.temp_min = Math.round(element.main.temp_min);
            element.main.temp_max = Math.round(element.main.temp_max);
            element.main.temp = Math.round(element.main.temp);
            delete element.clouds;
            delete element.pop;
            delete element.sys;
            delete element.visibility;
            delete element.dt;
            delete element.main.feels_like;
            delete element.main.grnd_level;
            delete element.main.sea_level;
            delete element.main.temp_kf;
            delete element.weather;
            delete element.dt_txt;
          })
          result.push({
            forecast: [...day]
          });
          result[i].id = id;
          id++;
          result[i].day = dayOfTheWeek;
          result[i].date = dateMonth;
          if (result[i] === result[0]) {
            result[i].icon = result[i].forecast[0].icon;
          } else {
            result[i].icon = result[i].forecast[2].icon;
          }
          result[i].minTemperature = Math.round(min);
          result[i].maxTemperature = Math.round(max);
          result[i].city = data.city.name;
        });
        return result;
      })
      .catch(err => err)
  },
  currentWeather(cityName) {
    const params = `/weather?q=${cityName}&units=metric&appid=${this.apiKey}`;
    return fetch(this.baseUrl + params)
      .then(res => res.json())
      .then(data => {
        if (data.cod === '404') return '404';
        if (data.cod === '400') return '400';
        const result = {};
        result.timezone = data.timezone;
        result.icon = data.weather[0].icon;
        result.name = data.name;
        result.country = data.sys.country;
        const timeTimezone = new Date().getTimezoneOffset() * 60 + data.timezone;
        result.sunrise = moment(new Date((data.sys.sunrise + timeTimezone) * 1000)).format('LT');
        result.sunset = moment(new Date((data.sys.sunset + timeTimezone) * 1000)).format('LT');
        result.currentTemp = Math.round(data.main.temp);
        result.tempMin = Math.round(data.main.temp_min);
        result.tempMax = Math.round(data.main.temp_max);
        return result;
      }).catch(err => err);
  },
  searchWeaherByGeoOn5Days({
    lat,
    lon
  }) {
    const params = `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return fetch(this.baseUrl + params)
      .then(res => res.json())
      .then(data => data.name)
      .then(cityName => this.weatherFor5Days(cityName));
  },
  searchWeaherByGeoOnCurrentDay({
    lat,
    lon
  }) {
    const params = `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return fetch(this.baseUrl + params)
      .then(res => res.json())
      .then(data => data.name)
      .then(cityName => this.currentWeather(cityName));
  }
}
