import '../css/styles.css';
import { refs } from './refs.js';
import { LoadPhotoService } from './load-photo-service.js';
import makePhotoCard from '../templates/photo-card.hbs';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loadPhotoService = new LoadPhotoService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
refs.searchInput.addEventListener('input', evt => {
  if (evt.currentTarget.value === '') {
    refs.loadMoreBtn.style.visibility = 'hidden';
  }
});

function onSearch(evt) {
  evt.preventDefault();
  refs.loadMoreBtn.style.visibility = 'hidden';

  loadPhotoService.query = evt.currentTarget.elements.searchQuery.value;
  if (loadPhotoService.query === '') {
    return;
  }
  loadPhotoService.resetPage();
  loadPhotoService.fetchPhotos().then(arrayOfPhotos => {
    clearGalleryContainer();
    appendPhotosMarkup(arrayOfPhotos);
    refs.loadMoreBtn.style.visibility = 'visible';
  });
}

function onLoadMoreClick(evt) {
  loadPhotoService.fetchPhotos().then(appendPhotosMarkup);
}

function appendPhotosMarkup(arrayOfPhotos) {
  refs.galleryContainerDiv.insertAdjacentHTML(
    'beforeend',
    makePhotoCard(arrayOfPhotos)
  );
}

function clearGalleryContainer() {
  refs.galleryContainerDiv.innerHTML = '';
}
