let current = 1;
const total = 13;
const frame = document.getElementById('slideFrame');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
const counter = document.getElementById('currentSlide');
const container = document.getElementById('container');
const overlay = document.querySelector('.ui-overlay');

let hideTimer;

function fitSlide() {
    const scaleX = window.innerWidth / 1280;
    const scaleY = window.innerHeight / 720;
    const scale = Math.min(scaleX, scaleY);
    container.style.transform = `scale(${scale})`;
}

function updateSlide() {
    frame.src = `p${current}.html`;
    counter.innerText = current;
    prev.disabled = current === 1;
    next.disabled = current === total;
}

function nextSlide() {
    if (current < total) {
        current++;
        updateSlide();
    }
}

function prevSlide() {
    if (current > 1) {
        current--;
        updateSlide();
    }
}

function showOverlay() {
    overlay.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
        overlay.classList.remove('visible');
    }, 3000);
}

fitSlide();
window.addEventListener('resize', fitSlide);
document.addEventListener('mousemove', showOverlay);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});
overlay.addEventListener('mouseenter', () => clearTimeout(hideTimer));
overlay.addEventListener('mouseleave', showOverlay);