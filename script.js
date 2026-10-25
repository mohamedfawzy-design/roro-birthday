// ===============================================
// إعدادات سهلة التعديل — RORO BIRTHDAY WEBSITE
// ===============================================

// اكتبي رسالتك السرية بين علامتي التنصيص الخلفيتين ` `.
// تقدري تكتبي أكتر من سطر عادي.
const SECRET_MESSAGE = `اكتبي رسالتك السرية هنا يا حمو ❤️
امسحي الكلام ده واكتبي رسالتك لرورو.`;

// لتشغيل الموسيقى: ضعي ملف MP3 باسم music.mp3 بجوار index.html.
// ===============================================

const intro = document.getElementById('intro');
const story = document.getElementById('story');
const heartButton = document.getElementById('openHeart');
const openLetter = document.getElementById('openLetter');
const secretMessage = document.getElementById('secretMessage');
const secretText = document.getElementById('secretText');
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
let musicOn = false;

secretText.textContent = SECRET_MESSAGE;

heartButton.addEventListener('click', () => {
  heartButton.classList.add('burst');
  document.body.classList.remove('locked');
  setTimeout(() => {
    intro.classList.add('hidden');
    story.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
    observeSections();
    burstHearts();
  }, 500);
  // المتصفح يسمح بتشغيل الصوت بعد تفاعل المستخدم فقط.
  if (music.querySelector('source').getAttribute('src') !== 'music.mp3') return;
  music.play().then(() => { musicOn = true; musicToggle.classList.add('playing'); }).catch(() => {});
});

function observeSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

openLetter.addEventListener('click', () => {
  const opened = openLetter.classList.toggle('open');
  if (opened) {
    openLetter.setAttribute('aria-label', 'الرسالة السرية مفتوحة');
    setTimeout(() => secretMessage.classList.add('show'), 300);
    burstHearts(18);
  } else {
    secretMessage.classList.remove('show');
    openLetter.setAttribute('aria-label', 'افتحي الرسالة السرية');
  }
});

document.getElementById('replay').addEventListener('click', () => {
  secretMessage.classList.remove('show');
  openLetter.classList.remove('open');
  story.classList.add('hidden');
  intro.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

musicToggle.addEventListener('click', async () => {
  if (musicOn) {
    music.pause();
    musicOn = false;
    musicToggle.classList.remove('playing');
  } else {
    try {
      await music.play();
      musicOn = true;
      musicToggle.classList.add('playing');
    } catch {
      alert('ضيفي ملف موسيقى باسم music.mp3 في نفس مجلد الموقع، وبعدها جربي تاني.');
    }
  }
});

// خلفية نجوم وجزيئات متحركة خفيفة.
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let width = 0, height = 0, dpr = 1;
function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth; height = window.innerHeight;
  canvas.width = width * dpr; canvas.height = height * dpr;
  canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  particles = Array.from({ length: Math.min(90, Math.floor(width / 14)) }, () => ({
    x: Math.random() * width, y: Math.random() * height,
    r: Math.random() * 1.5 + .3, speed: Math.random() * .28 + .08,
    alpha: Math.random() * .55 + .15, drift: (Math.random() - .5) * .18
  }));
}
function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.y -= p.speed; p.x += p.drift;
    if (p.y < -5) { p.y = height + 5; p.x = Math.random() * width; }
    if (p.x < -5) p.x = width + 5;
    if (p.x > width + 5) p.x = -5;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 207, 184, ${p.alpha})`; ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
function burstHearts(count = 30) {
  const symbols = ['♥', '✦', '♡', '✧'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.className = 'burst-particle';
    el.style.left = (35 + Math.random() * 30) + 'vw';
    el.style.top = (40 + Math.random() * 20) + 'vh';
    el.style.setProperty('--dx', (Math.random() * 360 - 180) + 'px');
    el.style.setProperty('--dy', (-100 - Math.random() * 360) + 'px');
    el.style.setProperty('--rot', (Math.random() * 160 - 80) + 'deg');
    el.style.fontSize = (12 + Math.random() * 22) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}
const burstStyle = document.createElement('style');
burstStyle.textContent = `.burst-particle{position:fixed;z-index:99;pointer-events:none;color:#ff7694;text-shadow:0 0 15px #ff4066;animation:heartBurst 1.45s cubic-bezier(.12,.65,.3,1) forwards}@keyframes heartBurst{0%{opacity:0;transform:translate(0,0) scale(.2) rotate(0)}15%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.15) rotate(var(--rot))}}.icon-button.playing{box-shadow:0 0 18px #e8c78a44}`;
document.head.appendChild(burstStyle);
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); drawParticles();


