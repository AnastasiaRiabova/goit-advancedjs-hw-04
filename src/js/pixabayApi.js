import axios from 'axios';
import { showError } from './helpers.js';

const URL = 'https://pixabay.com/api/';

export const getImage = async (query, page) => {
  try {
    return await axios.get(URL, {
      params: {
        key: '40865499-984f6d4bf951e94a81d50a698',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40',
        page: page,
      },
    });
  } catch (error) {
    showError();
    console.log(error);
  }
};