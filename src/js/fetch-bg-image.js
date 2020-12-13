import refs from './refs';

export default {
  apiKey: '17953661-fbb86eb9264530d2720389de2',
  baseUrl: `https://pixabay.com/api/`,
  fetchImage(query) {
    const params = `?image_type=photo&category=buildings&orientation=horizontal&q=${query}&key=${this.apiKey}`;
    return fetch(this.baseUrl + params)
      .then(res => res.json())
      .then(data => {
        if (data.total === 0) return null;
        const result = {
          largeImg: data.hits[0].largeImageURL,
          smallImg: data.hits[0].webformatURL,
        };

        return result;
      })
      .catch(err => err);
  },
};
