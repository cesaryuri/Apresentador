// ── Estado ──
let slides = [];   // array de object URLs dos arquivos carregados
let current = 0;
const HIDE_DELAY = 2000;

// ── Elementos ──
const dropzone   = document.getElementById('dropzone');
const container  = document.getElementById('container');
const frame      = document.getElementById('slideFrame');
const prevBtn    = document.getElementById('prevBtn');
const nextBtn    = document.getElementById('nextBtn');
const counter    = document.getElementById('currentSlide');
const totalEl    = document.getElementById('totalSlides');
const overlay    = document.getElementById('overlay');
const fileInput  = document.getElementById('fileInput');
const resetBtn   = document.getElementById('resetBtn');

// ── Escala responsiva ──
function fitSlide() {
    const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    container.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', fitSlide);

// ── Navegação ──
function updateSlide() {
    frame.src = slides[current];
    counter.innerText = current + 1;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
}

function nextSlide() {
    if (current < slides.length - 1) { current++; updateSlide(); }
}

function prevSlide() {
    if (current > 0) { current--; updateSlide(); }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft')  prevSlide();
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// ── Overlay ──
let hideTimer;
function showOverlay() {
    overlay.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => overlay.classList.remove('visible'), HIDE_DELAY);
}
document.addEventListener('mousemove', showOverlay);
overlay.addEventListener('mouseenter', () => clearTimeout(hideTimer));
overlay.addEventListener('mouseleave', showOverlay);

// ── Carregar arquivos ──
function loadFiles(files) {
    // Ordena pelo nome do arquivo (p1.html, p2.html, ...)
    const sorted = Array.from(files).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    // Libera URLs antigas
    slides.forEach(url => URL.revokeObjectURL(url));

    slides = sorted.map(file => URL.createObjectURL(file));
    current = 0;
    totalEl.innerText = slides.length;

    dropzone.classList.add('hidden');
    container.classList.remove('hidden');
    fitSlide();
    updateSlide();
}

// ── Input de arquivo ──
fileInput.addEventListener('change', (e) => loadFiles(e.target.files));

// ── Drag and Drop ──
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
});
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    loadFiles(e.dataTransfer.files);
});

// ── Reset ──
resetBtn.addEventListener('click', () => {
    slides.forEach(url => URL.revokeObjectURL(url));
    slides = [];
    frame.src = '';
    container.classList.add('hidden');
    dropzone.classList.remove('hidden');
});