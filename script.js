const lightbox = document.querySelector('.lightbox');
const preview = lightbox.querySelector('img');
const grid = document.querySelector('#poster-grid');
const categories = [
  { id: 'football', folder: 'football', label: 'Football', count: 41 },
  { id: 'anime', folder: 'anime', label: 'Anime', count: 41 },
  { id: 'culture', folder: 'art-culture', label: 'Art & Culture', count: 41 },
  { id: 'cars', folder: 'cars', label: 'Cars', count: 42 },
  { id: 'barber', folder: 'barber', label: 'Barber', count: 26 },
  { id: 'rappers', folder: 'rappers', label: 'Rappers', count: 35 }
];
const posters = categories.flatMap(category =>
  Array.from({ length: category.count }, (_, index) => ({
    category: category.id,
    categoryLabel: category.label,
    src: `thumbs/${category.folder}/${index + 1}.jpg`,
    thumb: `thumbs/${category.folder}/${index + 1}.jpg`
  }))
);
let cards = [];
let visiblePosters = posters;
let activeIndex = 0;

function renderPosters(filter = 'all') {
  visiblePosters = filter === 'all' ? posters : posters.filter(poster => poster.category === filter);
  grid.innerHTML = visiblePosters.map((poster, index) => `
    <button class="poster-card" type="button" data-full="${poster.src}" aria-label="View ${poster.categoryLabel} poster ${index + 1}" style="animation-delay:${Math.min(index, 12) * 30}ms">
      <img src="${poster.thumb}" alt="${poster.categoryLabel} poster" loading="${index < 8 ? 'eager' : 'lazy'}">
    </button>
  `).join('');
  cards = [...grid.querySelectorAll('.poster-card')];
  const catalogueCards = cards;
  catalogueCards.forEach((card, index) => card.addEventListener('click', () => {
    cards = catalogueCards;
    showPoster(index);
  }));
}

function showPoster(index) {
  activeIndex = (index + cards.length) % cards.length;
  preview.src = cards[activeIndex].dataset.full;
  preview.alt = cards[activeIndex].querySelector('img').alt;
  lightbox.hidden = false;
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  lightbox.hidden = true;
  preview.src = '';
  document.body.classList.remove('no-scroll');
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active');
  button.classList.add('active');
  renderPosters(button.dataset.filter);
}));
renderPosters();
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPoster(activeIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPoster(activeIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showPoster(activeIndex - 1);
  if (event.key === 'ArrowRight') showPoster(activeIndex + 1);
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});
