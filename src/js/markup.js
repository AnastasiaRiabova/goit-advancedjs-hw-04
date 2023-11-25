export const createMarkup = (data) => {
  return data
    .map(
      ({
         webformatURL,
         largeImageURL,
         tags,
         likes,
         views,
         comments,
         downloads,
       }) => `
    <a href='${largeImageURL}' class='card-link js-card-link'>
     <div class='photo-card'>
      <img src='${webformatURL}' class='card-img'  alt='${tags}' loading='lazy' />
       <div class='info'>
        <p class='info-item'>
            <b>Likes: ${likes}</b>
        </p>
        <p class='info-item'>
        <b>Views: ${views}</b>
        </p>
        <p class='info-item'>
            <b>Comments: ${comments}</b>
        </p>
        <p class='info-item'>
            <b>Downloads: ${downloads}</b>
        </p>
    </div>
</div>
</a>`,
    )
    .join('');
};