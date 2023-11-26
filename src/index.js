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
    showElement(refs.loadBtn, false);
    const { totalHits, hits } = await getImage(currentQuery, page);


    if (totalHits === 0) {
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

    refs.gallery.insertAdjacentHTML('afterbegin', createMarkup(hits));

    iziToast.show({
      title: 'Hooray!',
      message: `We found ${totalHits} images.`,
      position: 'topRight',
    });
    onImages.refresh();

    if (Math.ceil(totalHits / 40) === page) {
      showElement(refs.loadBtn, false);
      iziToast.show({
        title: 'Ops!',
        message: 'We\'re sorry, but you\'ve reached the end of search results.',
        position: 'topRight',
      });
      return;
    }

    showElement(refs.loadBtn, true);

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
    const { hits, totalHits } = await getImage(currentQuery, page);

    if (Math.ceil(totalHits / 40) === page) {
      showElement(refs.loadBtn, false);
      iziToast.show({
        title: 'Ops!',
        message: 'We\'re sorry, but you\'ve reached the end of search results.',
        position: 'topRight',
      });
    }

    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
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




