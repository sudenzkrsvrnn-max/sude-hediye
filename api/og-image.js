const QRCode = require('qrcode');

module.exports = async function handler(req, res) {
  try {
    const id = req.query.id || 'demo';

    const giftUrl = `https://sudenzkrsvrnn-max.github.io/sude-hediye/sude-hediye-main/lovebombing.html?id=${id}`;

    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(giftUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#cc0000',
        light: '#000000',
      },
      errorCorrectionLevel: 'H',
    });

    // Extract base64 part
    const base64 = qrDataUrl.split(',')[1];
    const qrBuffer = Buffer.from(base64, 'base64');

    // Build a simple SVG that composes the final image
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630">
      <!-- Black background -->
      <rect width="1200" height="630" fill="#000000"/>

      <!-- Red border -->
      <rect x="3" y="3" width="1194" height="624" fill="none" stroke="#cc0000" stroke-width="3" rx="12"/>

      <!-- Horizontal ribbon -->
      <rect x="0" y="230" width="1200" height="55" fill="url(#ribbonGrad)"/>

      <!-- Vertical ribbon -->
      <rect x="555" y="0" width="55" height="630" fill="url(#ribbonGrad)"/>

      <!-- Ribbon gradient def -->
      <defs>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#880000"/>
          <stop offset="50%" style="stop-color:#ff2200"/>
          <stop offset="100%" style="stop-color:#880000"/>
        </linearGradient>
        <clipPath id="heartClip">
          <path d="M600,500 C600,500 300,360 300,220 C300,120 380,80 460,80 C520,80 570,120 600,160 C630,120 680,80 740,80 C820,80 900,120 900,220 C900,360 600,500 600,500 Z"/>
        </clipPath>
      </defs>

      <!-- Heart-clipped QR Code -->
      <image xlink:href="data:image/png;base64,${base64}" 
             x="250" y="65" width="700" height="700" 
             clip-path="url(#heartClip)"
             preserveAspectRatio="xMidYMid slice"/>

      <!-- Bow emoji area -->
      <circle cx="585" cy="75" r="55" fill="#cc0000" opacity="0.9"/>
      <text x="585" y="95" font-size="55" text-anchor="middle" dominant-baseline="middle">🎀</text>

      <!-- Gift text bottom left -->
      <text x="60" y="580" font-family="Georgia, serif" font-style="italic" font-size="50" fill="white" opacity="0.9">Gift</text>
      <text x="165" y="582" font-size="40" fill="#ff2200">♥</text>

      <!-- Right side info -->
      <text x="1150" y="290" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="end">💝 Sana Özel Hediye</text>
      <text x="1150" y="325" font-family="Arial, sans-serif" font-size="16" fill="#ff6666" text-anchor="end">QR kodu tara veya tıkla</text>
    </svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(svgContent);

  } catch (err) {
    console.error('OG Image error:', err);
    res.status(500).json({ error: err.message });
  }
};
