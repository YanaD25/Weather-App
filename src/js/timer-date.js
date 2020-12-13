import refs from './refs';
import moment from 'moment';
moment().format();

export default timezone => {

  function updateTime() {
    const deltaTimezone = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000 - timezone * 1000,
    );

    const dayIsToday = moment().format('ddd');
    refs.dayOfWeek.innerHTML = dayIsToday;

    const dayOfTheMonth = moment().format('DD');
    refs.dayOfMonth.innerHTML = dayOfTheMonth;

    const currentMounth = moment().format('MMMM');
    refs.monthSpan.innerHTML = currentMounth;
    const currentTime = moment(deltaTimezone).format('HH:mm:ss');
    refs.timeSpan.textContent = currentTime;
  }
  updateTime();
  return setInterval(updateTime, 1000);

};
