
// === ERROR HANDLING (console only - no blocking alerts) ===
window.addEventListener('error', (e) => console.error('HATA:', e.message));
window.addEventListener('unhandledrejection', (e) => console.warn('BAĞLANTI:', e.reason));

// === CONFIG & SUPABASE ===
const SUPABASE_URL = "https://ymkfyaurdgfvdhkkpqam.supabase.co";
const SUPABASE_KEY = "sb_publishable_y2Txq9nCopsoNAR8aSKL3g_hjuCT8n_";

let supabase = null;
const isLocal = window.location.protocol === 'file:';

if (!isLocal) {
  try {
    if (window.supabase) {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: false } 
      });
    }
  } catch (err) {
    console.warn("Supabase başlatılamadı:", err);
  }
}

let CONFIG = {
  matrixMessage: "YÜKLENİYOR...", 
  phase2File: "https://ymkfyaurdgfvdhkkpqam.supabase.co/storage/v1/object/public/assets/lovebombing.mp4", 
  pages: []
};

// === DATA LOADING ===
let dataLoaded = false;
let experienceStarted = false;

async function loadGiftData() {
  const urlParams = new URLSearchParams(window.location.search);
  const giftId = urlParams.get('id');

  if (giftId && supabase) {
    try {
      const { data, error } = await Promise.race([
        supabase.from('submissions').select('*').eq('id_custom', giftId).single(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2500))
      ]);

      if (error) throw error;

      if (data) {
        CONFIG.matrixMessage = data.matrix_message ? String(data.matrix_message) : "MUTLU YILLAR";
        CONFIG.phase2File = data.gif_url || CONFIG.phase2File;
        if (data.memories && Array.isArray(data.memories)) {
          CONFIG.pages = data.memories.map((m, idx) => ({
            photoFront: m.photo,
            photoBack: m.photo,
            message: m.note || `Anı #${idx + 1}`
          }));
        }
      }
    } catch (err) {
      console.warn("Veri yüklenemedi, varsayılan değerler kullanılacak:", err);
    }
  }
  dataLoaded = true;
}

// === EXPERIENCE LOGIC ===
let matrixChars = "GÜLÜMSEDİYE".split(''); 

function startExperience() {
  if (experienceStarted) return;
  experienceStarted = true;
  
  try {
    matrixChars = String(CONFIG.matrixMessage || "MUTLU YILLAR").split('');
    startMatrix();
    startCountdown();
  } catch(e) {
    alert("BAŞLATMA HATASI: " + e.message);
  }
}

// === MATRIX ===
let matrixInt;
function initMatrix() {
  const mc = document.getElementById('matrixCanvas');
  if(!mc) return null;
  mc.width = window.innerWidth; 
  mc.height = window.innerHeight;
  const fontSize = 16;
  const matrixCols = Math.floor(mc.width / fontSize);
  const matrixDrops = Array(matrixCols).fill(1);
  return {mc, fontSize, matrixCols, matrixDrops};
}

function startMatrix() {
  const mData = initMatrix();
  if(!mData) return;
  const {mc, fontSize, matrixDrops} = mData;
  const mctx = mc.getContext('2d');
  
  if(matrixInt) clearInterval(matrixInt);
  matrixInt = setInterval(() => {
    mctx.fillStyle = 'rgba(10,10,26,0.1)';
    mctx.fillRect(0,0,mc.width,mc.height);
    mctx.font = `900 ${fontSize}px Rajdhani`;
    for(let i=0; i<matrixDrops.length; i++){
      const ch = matrixChars[Math.floor(Math.random()*matrixChars.length)] || '*';
      mctx.fillStyle = Math.random() > 0.8 ? '#fff' : '#ff1493';
      mctx.fillText(ch, i*fontSize, matrixDrops[i]*fontSize);
      if(matrixDrops[i]*fontSize > mc.height && Math.random() > 0.975) matrixDrops[i] = 0;
      matrixDrops[i]++;
    }
  }, 50);
}

// === STARS ===
let stars = [];
function initStars() {
  const sc = document.getElementById('starsCanvas');
  if(!sc) return;
  sc.width = window.innerWidth; sc.height = window.innerHeight;
  stars = Array.from({length:150}, ()=>({
    x:Math.random()*sc.width, y:Math.random()*sc.height, 
    r:Math.random()*2, a:Math.random(), s:Math.random()*0.01 + 0.005
  }));
}

function drawStars() {
  const sc = document.getElementById('starsCanvas');
  if(!sc) return;
  const sctx = sc.getContext('2d');
  sctx.clearRect(0,0,sc.width,sc.height);
  stars.forEach(s=>{
    s.a += s.s; if(s.a>1||s.a<0) s.s*=-1;
    sctx.beginPath(); sctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    sctx.fillStyle=`rgba(255,255,255,${Math.abs(s.a)})`; sctx.fill();
  });
  requestAnimationFrame(drawStars);
}

// === FLOW ===
let count = 3;
function startCountdown() {
  const cd = document.getElementById('countdown');
  if (!cd) {
    alert('HATA: Sayıcı elementi bulunamadı!');
    return;
  }
  
  function tick() {
    count--;
    if (count > 0) {
      cd.textContent = count;
      setTimeout(tick, 1000);
    } else {
      goPhase2();
    }
  }
  setTimeout(tick, 1000);
}

function goPhase2() {
  const p1 = document.getElementById('phase1');
  const p2 = document.getElementById('phase2');
  if (p1) p1.classList.add('hidden');
  if (p2) p2.classList.remove('hidden');
  
  const msg = document.getElementById('bigMessage');
  const heart = document.getElementById('bigHeart');
  const btn = document.querySelector('#phase2 .continue-btn');
  const words = CONFIG.matrixMessage.split(' ');
  let wordIdx = 0;

  function showNextWord() {
    if (wordIdx < words.length) {
      msg.textContent = words[wordIdx];
      msg.style.opacity = '1';
      msg.style.transform = 'scale(1)';
      setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'scale(1.5)';
        wordIdx++;
        setTimeout(showNextWord, 600);
      }, 1200);
    } else {
      heart.classList.add('heart-active');
      setTimeout(() => {
        heart.classList.remove('heart-active');
        heart.style.display = 'none';
        
        const video = document.getElementById('phase2Video');
        const gif = document.getElementById('phase2Gif');
        if (CONFIG.phase2File.endsWith('.mp4')) {
          video.src = CONFIG.phase2File;
          video.style.display = 'block';
          video.style.opacity = '1';
        } else {
          gif.src = CONFIG.phase2File;
          gif.style.display = 'block';
          gif.style.opacity = '1';
        }
        setTimeout(() => { if(btn) btn.style.display = 'block'; }, 2000);
      }, 2500);
    }
  }
  showNextWord();
}

function goPhase4() {
  document.getElementById('phase2').classList.add('hidden');
  if(matrixInt) clearInterval(matrixInt);
  const mc = document.getElementById('matrixCanvas');
  const sc = document.getElementById('starsCanvas');
  if(mc) mc.style.display = 'none';
  if(sc) sc.style.display = 'block';
  initStars(); drawStars();
  document.getElementById('phase4').classList.remove('hidden');
  buildBook();
  launchConfetti();
}

function goPhase5() {
  document.getElementById('phase4').classList.add('hidden');
  document.getElementById('phase5').classList.remove('hidden');
  buildHeartWall();
}

// === BOOK & WALL ===
function buildBook() {
  const book = document.getElementById('book');
  book.innerHTML = '';
  const msgText = document.getElementById('msgText');
  
  const frontCover = document.createElement('div');
  frontCover.className = 'page';
  frontCover.style.zIndex = CONFIG.pages.length + 2;
  frontCover.innerHTML = `
    <div class="page-side page-front cover-front"></div>
    <div class="page-side page-back" style="background:#f9f9f9;">
      <div style="padding: 40px; text-align: center; height: 100%; display: flex; align-items: center;">
        <p style="font-family:'Playfair Display'; font-style: italic; font-size: 18px; color: #555;">Her sayfa seninle daha güzel... ❤️</p>
      </div>
    </div>
  `;
  frontCover.onclick = () => {
    const isFlipped = frontCover.classList.toggle('flipped');
    frontCover.style.zIndex = isFlipped ? 1 : CONFIG.pages.length + 2;
    msgText.textContent = isFlipped ? (CONFIG.pages[0] ? CONFIG.pages[0].message : "Anılarımız") : "Bizim Hikayemiz 💝";
  };
  book.appendChild(frontCover);
  msgText.textContent = "Bizim Hikayemiz 💝";

  CONFIG.pages.forEach((p, i) => {
    const page = document.createElement('div');
    page.className = 'page';
    page.style.zIndex = CONFIG.pages.length - i;
    page.innerHTML = `
      <div class="page-side page-front">
        <img src="${p.photoFront}" class="page-img">
        <div class="page-content" style="background:#fff; height:100%; border-top: 1px solid #eee;"><p style="font-size: 13px; color: #888;">Anı ${i + 1}</p></div>
      </div>
      <div class="page-side page-back">
        <img src="${p.photoBack}" class="page-img">
        <div class="page-content" style="background:#fff; height:100%; border-top: 1px solid #eee;"><p style="font-size: 13px; color: #888;">💕</p></div>
      </div>
    `;
    page.onclick = () => {
      const isFlipped = page.classList.toggle('flipped');
      if(isFlipped){
        page.style.zIndex = i + 2;
        msgText.textContent = CONFIG.pages[i+1] ? CONFIG.pages[i+1].message : "Son sayfa... ❤️";
      } else {
        setTimeout(() => { page.style.zIndex = CONFIG.pages.length - i; }, 300);
        msgText.textContent = p.message || "Anılarımız 💝";
      }
    };
    book.appendChild(page);
  });

  const backCover = document.createElement('div');
  backCover.className = 'page';
  backCover.style.zIndex = 0;
  backCover.innerHTML = `
    <div class="page-side page-front" style="background:#f9f9f9; display: flex; align-items: center; justify-content: center;">
       <p style="font-family:'Dancing Script'; font-size: 24px; color: #ff1493;">Seni Seviyorum!</p>
    </div>
    <div class="page-side page-back cover-back"></div>
  `;
  book.appendChild(backCover);
}

function buildHeartWall() {
  const wall = document.getElementById('heartWall');
  wall.innerHTML = '';

  // Stars for phase5 canvas
  const sc5 = document.getElementById('starsCanvas5');
  if (sc5) {
    sc5.width = window.innerWidth;
    sc5.height = window.innerHeight;
    const ctx5 = sc5.getContext('2d');
    const stars5 = Array.from({length: 120}, () => ({
      x: Math.random() * sc5.width, y: Math.random() * sc5.height,
      r: Math.random() * 1.8 + 0.3, a: Math.random(), s: Math.random() * 0.008 + 0.003
    }));
    function drawStars5() {
      ctx5.clearRect(0, 0, sc5.width, sc5.height);
      stars5.forEach(s => {
        s.a += s.s; if (s.a > 1 || s.a < 0) s.s *= -1;
        ctx5.beginPath(); ctx5.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx5.fillStyle = `rgba(255,255,255,${Math.abs(s.a)})`; ctx5.fill();
      });
      requestAnimationFrame(drawStars5);
    }
    drawStars5();
  }

  // Build heart positions - use Supabase storage as fallback (local files don't exist on Vercel)
  const FALLBACK_PHOTOS = [
    'https://ymkfyaurdgfvdhkkpqam.supabase.co/storage/v1/object/public/assets/foto1.jpg',
    'https://ymkfyaurdgfvdhkkpqam.supabase.co/storage/v1/object/public/assets/foto2.jpg',
    'https://ymkfyaurdgfvdhkkpqam.supabase.co/storage/v1/object/public/assets/foto3.jpg',
    'https://ymkfyaurdgfvdhkkpqam.supabase.co/storage/v1/object/public/assets/foto4.jpg',
    'https://ymkfyaurdgfvdhkkpqam.supabase.co/storage/v1/object/public/assets/kapak.jpg',
  ];
  const allPhotos = CONFIG.pages.length > 0
    ? CONFIG.pages.map(p => p.photoFront)
    : FALLBACK_PHOTOS;

  // Determine card size based on screen
  const cardSize = Math.min(window.innerWidth * 0.22, 120);
  const scale = Math.min(window.innerWidth, window.innerHeight) * 0.028;

  // Heart parametric points
  const heartPoints = [];
  const step = 0.32;
  for (let t = 0; t < Math.PI * 2; t += step) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    heartPoints.push({ x: x * scale, y: y * scale });
  }

  // Add center cluster points
  const centerPoints = [
    {x: 0, y: 0},
    {x: -scale * 3, y: -scale * 1},
    {x: scale * 3, y: -scale * 1},
    {x: 0, y: -scale * 2.5},
    {x: -scale * 1.5, y: scale * 2},
    {x: scale * 1.5, y: scale * 2},
  ];
  const allPoints = [...heartPoints, ...centerPoints];

  allPoints.forEach((p, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'mini-photo';
      const photo = allPhotos[i % allPhotos.length];
      div.style.backgroundImage = `url('${photo}')`;
      div.style.width = cardSize + 'px';
      div.style.height = cardSize + 'px';
      div.style.borderRadius = Math.round(cardSize * 0.24) + 'px';
      const rot = (Math.random() - 0.5) * 22;
      const sc = 0.92 + Math.random() * 0.16;
      div.style.left = `calc(50% + ${p.x}px - ${cardSize/2}px)`;
      div.style.top  = `calc(50% + ${p.y}px - ${cardSize/2}px)`;
      wall.appendChild(div);

      // Animate in
      requestAnimationFrame(() => {
        div.style.transform = `rotate(${rot}deg) scale(${sc})`;
        div.classList.add('visible');
      });

      if (i === allPoints.length - 1) {
        setTimeout(() => {
          const finalMsg = document.getElementById('finalMessage');
          if (finalMsg) {
            finalMsg.style.opacity = '1';
            finalMsg.style.transform = 'translateY(-8px)';
          }
          launchConfetti();
        }, 1200);
      }
    }, i * 80);
  });
}

function launchConfetti() {
  if (typeof document === 'undefined') return;
  for(let i=0; i<100; i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + 'vw';
    c.style.background = ['#ff1493','#ff69b4','#fff','#ffd700'][Math.floor(Math.random()*4)];
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    if(c.animate) {
      const fall = c.animate([
        { top: '-10px', opacity: 1 },
        { top: '100vh', opacity: 0, transform: `rotate(${Math.random()*1000}deg)` }
      ], { duration: 2000 + Math.random()*3000, easing: 'linear' });
      fall.onfinish = () => c.remove();
    } else {
      setTimeout(() => c.remove(), 4000); // Fallback for browsers without Web Animations API
    }
  }
}

// === BOOTSTRAP ===
window.addEventListener('resize', () => {
  if(typeof initMatrix === 'function') initMatrix();
  if(typeof initStars === 'function') initStars();
});

// Script sayfanın en altında olduğu için DOM zaten hazır. Hemen başlatıyoruz:
startExperience();
loadGiftData().catch(err => console.warn('Veri yüklenemedi:', err));


