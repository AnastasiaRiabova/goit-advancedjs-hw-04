import iziToast from 'izitoast';

export const scrollPage = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

export const showElement = (element, isVisible) => element.classList.toggle('hidden', !isVisible);


export const showError = () => iziToast.error({
  title: 'Oops!',
  message: 'Something went wrong try again',
  position: 'topRight',
});