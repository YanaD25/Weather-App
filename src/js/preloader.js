import refs from './refs';


export default {
  start() {
    refs.preloader.classList.add('display-block');

    setTimeout(() => {
      refs.preloader.classList.remove('display-block')
    }, 2000)

  },
  search() {
    refs.preloader.classList.add('display-block');
    refs.preloader.classList.add('preloader-con-search');
    setTimeout(() => {
      refs.preloader.classList.remove('display-block')
      refs.preloader.classList.remove('preloader-con-search');
    }, 1000)

  }
};
