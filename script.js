const heroVideo = document.getElementById('heroVideo');
const soundToggle = document.getElementById('soundToggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const modal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const modalClose = document.getElementById('modalClose');

if (soundToggle && heroVideo) {
  soundToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    soundToggle.textContent = heroVideo.muted ? 'Sound On' : 'Sound Off';
    if (heroVideo.paused) heroVideo.play().catch(() => {});
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
  });
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'MENU';
    });
  });
}

function openVideo(videoId) {
  videoFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeVideo() {
  videoFrame.src = '';
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.trailer-btn').forEach(button => {
  button.addEventListener('click', () => openVideo(button.dataset.video));
});

if (modalClose) modalClose.addEventListener('click', closeVideo);
if (modal) modal.addEventListener('click', (event) => {
  if (event.target === modal) closeVideo();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeVideo();
});

document.getElementById('year').textContent = new Date().getFullYear();
