const QRCode = require('qrcode');

module.exports = async function handler(req, res) {
  try {
    const id = req.query.id || 'demo';

    const giftUrl = `https://sudenzkrsvrnn-max.github.io/sude-hediye/sude-hediye-main/lovebombing.html?id=${id}`;

    // Generate QR code as base64 PNG
    const qrDataUrl = await QRCode.toDataURL(giftUrl, {
      width: 600,
      margin: 1,
      color: {
        dark: '#cc0000',
        light: '#000000',
      },
      errorCorrectionLevel: 'H',
    });

    const base64 = qrDataUrl.split(',')[1];

    // ── Heart path centred on 600,315 within a 1200×630 canvas ──────────────
    // The heart is drawn so it fills roughly 520×480 px around the centre.
    const hx = 600;   // heart centre X
    const hy = 315;   // heart centre Y
    const hr = 240;   // heart "radius" (half-width)

    // Standard parametric heart scaled to our canvas
    const heartPath = `
      M ${hx},${hy + hr * 0.9}
      C ${hx},${hy + hr * 0.9}
        ${hx - hr * 1.05},${hy + hr * 0.4}
        ${hx - hr * 1.05},${hy - hr * 0.3}
      C ${hx - hr * 1.05},${hy - hr * 0.85}
        ${hx - hr * 0.55},${hy - hr * 1.05}
        ${hx},${hy - hr * 0.55}
      C ${hx + hr * 0.55},${hy - hr * 1.05}
        ${hx + hr * 1.05},${hy - hr * 0.85}
        ${hx + hr * 1.05},${hy - hr * 0.3}
      C ${hx + hr * 1.05},${hy + hr * 0.4}
        ${hx},${hy + hr * 0.9}
        ${hx},${hy + hr * 0.9}
      Z
    `.replace(/\s+/g, ' ').trim();

    // QR image placed so it fills the heart area
    const qrX = hx - hr * 1.08;
    const qrY = hy - hr * 1.08;
    const qrSize = hr * 2.16;

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Ribbon gradients -->
    <linearGradient id="ribbonH" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   style="stop-color:#6b0000"/>
      <stop offset="50%"  style="stop-color:#ff2200"/>
      <stop offset="100%" style="stop-color:#6b0000"/>
    </linearGradient>
    <linearGradient id="ribbonV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   style="stop-color:#6b0000"/>
      <stop offset="50%"  style="stop-color:#ff2200"/>
      <stop offset="100%" style="stop-color:#6b0000"/>
    </linearGradient>

    <!-- Glow filter for the heart -->
    <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Clip the QR code into a heart shape -->
    <clipPath id="heartClip">
      <path d="${heartPath}"/>
    </clipPath>
  </defs>

  <!-- Black background -->
  <rect width="1200" height="630" fill="#000000"/>

  <!-- Subtle radial glow behind heart -->
  <radialGradient id="bgGlow" cx="50%" cy="50%" r="45%">
    <stop offset="0%" style="stop-color:#330000;stop-opacity:1"/>
    <stop offset="100%" style="stop-color:#000000;stop-opacity:1"/>
  </radialGradient>
  <rect width="1200" height="630" fill="url(#bgGlow)"/>

  <!-- Red outer border -->
  <rect x="4" y="4" width="1192" height="622" fill="none" stroke="#cc0000" stroke-width="2.5" rx="14" opacity="0.8"/>

  <!-- Diagonal ribbon (top-left to bottom-right) -->
  <line x1="-60" y1="0" x2="1260" y2="630" stroke="url(#ribbonH)" stroke-width="48" opacity="0.85"/>

  <!-- Diagonal ribbon (top-right to bottom-left) -->
  <line x1="1260" y1="0" x2="-60" y2="630" stroke="url(#ribbonH)" stroke-width="48" opacity="0.85"/>

  <!-- Heart glow (soft red behind the heart) -->
  <path d="${heartPath}" fill="#cc0000" opacity="0.18" filter="url(#heartGlow)"/>

  <!-- Heart outline (stroke only) -->
  <path d="${heartPath}" fill="none" stroke="#ff2200" stroke-width="3" opacity="0.7"/>

  <!-- QR Code clipped to heart shape -->
  <image xlink:href="data:image/png;base64,${base64}"
         x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}"
         clip-path="url(#heartClip)"
         preserveAspectRatio="xMidYMid slice"/>

  <!-- Bow / fiyonk in top-left corner -->
  <!-- Left loop -->
  <ellipse cx="78" cy="72" rx="58" ry="32" fill="#cc0000" transform="rotate(-35,78,72)" opacity="0.95"/>
  <ellipse cx="78" cy="72" rx="42" ry="20" fill="#aa0000" transform="rotate(-35,78,72)" opacity="0.6"/>
  <!-- Right loop -->
  <ellipse cx="148" cy="72" rx="58" ry="32" fill="#cc0000" transform="rotate(35,148,72)" opacity="0.95"/>
  <ellipse cx="148" cy="72" rx="42" ry="20" fill="#aa0000" transform="rotate(35,148,72)" opacity="0.6"/>
  <!-- Ribbon tails -->
  <path d="M113,88 L 60,155" stroke="#cc0000" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
  <path d="M113,88 L 166,155" stroke="#cc0000" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
  <!-- Knot circle -->
  <circle cx="113" cy="80" r="22" fill="#ff2200"/>
  <circle cx="113" cy="80" r="13" fill="#cc0000"/>

  <!-- Bottom-right bow (mirror) -->
  <ellipse cx="1122" cy="558" rx="58" ry="32" fill="#cc0000" transform="rotate(-35,1122,558)" opacity="0.95"/>
  <ellipse cx="1122" cy="558" rx="42" ry="20" fill="#aa0000" transform="rotate(-35,1122,558)" opacity="0.6"/>
  <ellipse cx="1192" cy="558" rx="58" ry="32" fill="#cc0000" transform="rotate(35,1192,558)" opacity="0.95"/>
  <ellipse cx="1192" cy="558" rx="42" ry="20" fill="#aa0000" transform="rotate(35,1192,558)" opacity="0.6"/>
  <path d="M1157,544 L 1104,477" stroke="#cc0000" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
  <path d="M1157,544 L 1210,477" stroke="#cc0000" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
  <circle cx="1157" cy="552" r="22" fill="#ff2200"/>
  <circle cx="1157" cy="552" r="13" fill="#cc0000"/>

  <!-- Gift ♥ signature — bottom left -->
  <text x="52" y="590" font-family="Georgia, 'Times New Roman', serif"
        font-style="italic" font-size="48" fill="white" opacity="0.9">Gift</text>
  <text x="160" y="593" font-family="Arial, sans-serif"
        font-size="38" fill="#ff2200" opacity="1">&#x2665;</text>

  <!-- Right side text -->
  <text x="1148" y="140" font-family="'Helvetica Neue', Arial, sans-serif"
        font-size="20" fill="rgba(255,255,255,0.75)" text-anchor="end" letter-spacing="1">&#x1F496; Sana &#xD6;zel Hediye</text>
  <text x="1148" y="168" font-family="'Helvetica Neue', Arial, sans-serif"
        font-size="15" fill="#ff6666" text-anchor="end">QR kodu tara veya t&#x131;kla</text>
</svg>`;

    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(svgContent);

  } catch (err) {
    console.error('OG Image error:', err);
    res.status(500).json({ error: err.message });
  }
};
