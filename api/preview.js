module.exports = function handler(req, res) {
  const id = req.query.id || 'demo';

  const host = req.headers.host || 'sude-hediye.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const giftUrl = `https://sudenzkrsvrnn-max.github.io/sude-hediye/sude-hediye-main/lovebombing.html?id=${id}`;
  const ogImageUrl = `${baseUrl}/api/og-image?id=${id}`;
  const previewPageUrl = `${baseUrl}/api/preview?id=${id}`;

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ── Primary SEO ── -->
  <title>Sana Özel Bir Süpriz Var! 💝</title>
  <meta name="description" content="Senin için özel hazırlanmış sürpriz hediyeni görmek için tıkla!">

  <!-- ── Open Graph (WhatsApp, Facebook, Instagram, Telegram) ── -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="${previewPageUrl}">
  <meta property="og:title"       content="Sana Özel Bir Süpriz Var! 💝">
  <meta property="og:description" content="Senin için özel olarak hazırlanmış sürpriz bir hediye var. Görmek için tıkla! 🎁">
  <meta property="og:image"       content="${ogImageUrl}">
  <meta property="og:image:type"  content="image/svg+xml">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale"      content="tr_TR">
  <meta property="og:site_name"   content="Gift ♥ by Sude">

  <!-- ── Twitter / X Card ── -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="Sana Özel Bir Süpriz Var! 💝">
  <meta name="twitter:description" content="Senin için özel olarak hazırlanmış sürpriz bir hediye var. Görmek için tıkla! 🎁">
  <meta name="twitter:image"       content="${ogImageUrl}">

  <!-- ── iMessage / SMS (Apple) ── -->
  <meta name="apple-mobile-web-app-title" content="Sana Hediye! 💝">

  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #000;
      color: #fff;
      font-family: 'Outfit', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Radial glow background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(255,20,147,0.18) 0%, transparent 70%);
      pointer-events: none;
    }

    .card {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      padding: 48px 40px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 28px;
      backdrop-filter: blur(10px);
      max-width: 380px;
      width: 90vw;
    }

    /* ── Beating heart animation ── */
    .heart-wrap {
      position: relative;
      width: 110px;
      height: 110px;
    }
    .heart-wrap svg {
      width: 110px;
      height: 110px;
      animation: heartbeat 1.2s ease-in-out infinite;
      filter: drop-shadow(0 0 18px rgba(255,20,147,0.7));
    }
    @keyframes heartbeat {
      0%,100% { transform: scale(1);   }
      14%      { transform: scale(1.18); }
      28%      { transform: scale(1);   }
      42%      { transform: scale(1.12); }
      70%      { transform: scale(1);   }
    }

    /* ── Floating particles ── */
    .particles { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }
    .particle {
      position: absolute;
      font-size: 18px;
      animation: floatUp linear infinite;
      opacity: 0;
    }
    @keyframes floatUp {
      0%   { opacity: 0;   transform: translateY(0)     scale(0.6); }
      10%  { opacity: 0.9; }
      90%  { opacity: 0.7; }
      100% { opacity: 0;   transform: translateY(-90vh) scale(1.2); }
    }

    /* ── Text ── */
    .title {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 26px;
      background: linear-gradient(135deg, #fff 30%, #ff69b4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.3;
    }
    .subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.5px;
    }

    /* ── Progress bar ── */
    .progress-wrap {
      width: 100%;
      height: 3px;
      background: rgba(255,255,255,0.08);
      border-radius: 10px;
      overflow: hidden;
    }
    .progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #ff1493, #ff69b4, #ffb6c1);
      border-radius: 10px;
      animation: progressFill 2.8s ease-out forwards;
    }
    @keyframes progressFill {
      0%   { width: 0%; }
      100% { width: 100%; }
    }

    /* ── CTA button ── */
    .btn-gift {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 15px 32px;
      background: linear-gradient(135deg, #ff1493, #ff69b4);
      color: #fff;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 0.5px;
      box-shadow: 0 6px 30px rgba(255,20,147,0.45);
      transition: transform 0.25s, box-shadow 0.25s;
      animation: pulseShadow 2s ease-in-out infinite;
    }
    .btn-gift:hover {
      transform: scale(1.06);
      box-shadow: 0 10px 40px rgba(255,20,147,0.65);
    }
    @keyframes pulseShadow {
      0%,100% { box-shadow: 0 6px 30px rgba(255,20,147,0.45); }
      50%      { box-shadow: 0 6px 45px rgba(255,20,147,0.75); }
    }

    .signature {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 15px;
      color: rgba(255,255,255,0.35);
    }
    .signature strong {
      color: #ff1493;
      font-style: normal;
      font-family: 'Outfit', sans-serif;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
    }
  </style>

  <!-- Redirect after 3 s -->
  <script>setTimeout(function(){ window.location.replace("${giftUrl}"); }, 3000);</script>
</head>
<body>

  <!-- Floating hearts / sparkles -->
  <div class="particles" id="particles"></div>

  <div class="card">
    <!-- Beating heart icon -->
    <div class="heart-wrap">
      <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 85 C50 85 5 52 5 27 C5 11 17 2 30 2 C39 2 47 7 50 14 C53 7 61 2 70 2 C83 2 95 11 95 27 C95 52 50 85 50 85 Z"
              fill="#ff1493" stroke="#ff69b4" stroke-width="2"/>
        <!-- subtle inner highlight -->
        <path d="M50 78 C50 78 12 50 12 29 C12 17 22 9 32 9 C40 9 47 14 50 20"
              stroke="rgba(255,182,193,0.35)" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>
    </div>

    <h1 class="title">Sana Özel Bir<br>Süpriz Var! 💝</h1>
    <p class="subtitle">Hediyene yönlendiriliyorsun…</p>

    <!-- Progress bar -->
    <div class="progress-wrap">
      <div class="progress-bar"></div>
    </div>

    <!-- Manual CTA (in case redirect is slow) -->
    <a href="${giftUrl}" class="btn-gift">
      <span>🎁</span> Hediyeni Aç
    </a>

    <div class="signature">
      Gift <strong>by Gülümse Diye</strong>
    </div>
  </div>

  <script>
    // Generate floating particles
    const emojis = ['💝','❤️','✨','🎁','💫','🌹','💕'];
    const container = document.getElementById('particles');
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      el.className = 'particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '100vh';
      el.style.animationDuration = (4 + Math.random() * 6) + 's';
      el.style.animationDelay   = (Math.random() * 5) + 's';
      el.style.fontSize = (14 + Math.random() * 14) + 'px';
      container.appendChild(el);
    }
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.status(200).send(html);
};
