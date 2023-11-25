import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImage } from './js/pixabayApi.js';
import { createMarkup } from './js/markup.js';
import { refs } from './js/refs.js';
import { scrollPage, showElement, showError } from './js/helpers.js';

let currentQuery = '';
let page = 1;
const clearPage = () => {
  refs.gallery.innerHTML = '';
  page = 1;
};

const handleSearch = async (e) => {
  e.preventDefault();

  const query = refs.input.value.trim().toLowerCase();

  if (!query) {
    iziToast.warning({
      title: 'Ops!',
      message: 'Enter something to search!',
      position: 'topRight',
    });
    return;
  }

  if (currentQuery === query) {
    iziToast.warning({
      title: 'Sorry!',
      message: 'Rewrite your requests, write something different.!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;

  clearPage();

  try {
    const { data } = await getImage(currentQuery, page);

    const allCollection = data.totalHits;
    const collection = data.hits;

    if (allCollection === 0) {
      showElement(refs.loadBtn, false);
      showElement(refs.logo, true);
      iziToast.show({
        title: 'Ops!',
        message: 'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
      return;
    }

    showElement(refs.logo, false);

    refs.gallery.insertAdjacentHTML('afterbegin', createMarkup(collection));

    iziToast.show({
      title: 'Hooray!',
      message: `We found ${allCollection} images.`,
      position: 'topRight',
    });

    showElement(refs.loadBtn, true);
    onImages.refresh();
  } catch (err) {
    console.log(err);
    showError();
    clearPage();
    showElement(refs.logo, true);
  }
};

const handleLoadMore = async (e) => {
  e.preventDefault();

  page += 1;

  try {
    const { data } = await getImage(currentQuery, page);
    const collection = data.hits;
    const allCollection = data.totalHits;

    if (!(page < Math.ceil(allCollection / 40))) {
      iziToast.show({
        message: 'We\'re sorry, but you\'ve reached the end of search results.',
        position: 'topRight',
      });
      showElement(refs.loadBtn, false);
      return;
    }

    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(collection));
    scrollPage();
    onImages.refresh();
  } catch (err) {
    console.log(err);
    showError();
    clearPage();
    showElement(refs.logo, true);
  }
};


refs.form.addEventListener('submit', handleSearch);
refs.loadBtn.addEventListener('click', handleLoadMore);

showElement(refs.loadBtn, false);
showElement(refs.logo, true);

const onImages = new SimpleLightbox('.js-gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});




