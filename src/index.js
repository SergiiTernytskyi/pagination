import Pagination from 'tui-pagination';

function page() {
  const data = fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=86c51b00b5bb8cfadb7d5efaffb91bf1'
  )
    .then(response => response.json())
    .then(data => {
      return data.results;
    })
    .then(data => {
      createImagesMarkup(data);
    })
    .catch(error => {
      console.log(error);
    });

  console.log(data);
}

page();

function createImagesMarkup(data) {
  console.log(data);
  const imagesMarkup = data
    .map(({ poster_path, popularity, title }) => {
      return `
      <img class="gallery-img" width="300" height="auto" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" loading="lazy"/>
      <div class="info"><p class="info-item"><b>Likes:</b> ${popularity}</p>
      `;
    })
    .join('');
  console.log(imagesMarkup);
  document
    .querySelector('.gallery')
    .insertAdjacentHTML('beforeend', imagesMarkup);
  //   return imagesMarkup;
}

const options = {
  // below default value of options
  totalItems: 10,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,

  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const container = document.getElementById('pagination');

const pagination = new Pagination(container, options);
const paginationPage = pagination.getCurrentPage();

pagination.on('afterMove', event => {
  const currentPage = event.page;
  trendingFilms.page = currentPage;
});
