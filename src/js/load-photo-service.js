class LoadPhotoService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    const url = `https://pixabay.com/api/?key=31919812-408775081e2c7a787d06e9cb3&q=${this.searchQuery}s&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        // console.log(data);
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { LoadPhotoService };
