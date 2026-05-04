module.exports = function handler(req, res) {
  const id = req.query.id || 'demo';

  const host = req.headers.host || 'sude-hediye.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const giftUrl = `https://sudenzkrsvrnn-max.github.io/sude-hediye/sude-hediye-main/lovebombing.html?id=${id}`;
  const ogImageUrl = `${baseUrl}/api/og-image?id=${id}`;

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sana Özel Bir Hediye Var! 💝</title>
  <meta name="description" content="Senin için özel hazırlanmış sürpriz hediyeni görmek için tıkla!">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/api/preview?id=${id}">
  <meta property="og:title" content="Sana Özel Bir Hediye Var! 💝">
  <meta property="og:description" content="Senin için özel hazırlanmış sürpriz hediyeni görmek için tıkla!">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${ogImageUrl}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; color: #fff; font-family: system-ui, sans-serif;
           min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .loader { text-align: center; }
    .loader p { color: #aaa; margin-top: 10px; font-size: 16px; }
  </style>
  <script>window.location.replace("${giftUrl}");</script>
</head>
<body>
  <div class="loader">
    <div style="font-size:60px">💝</div>
    <p>Hediyene yönlendiriliyorsun...</p>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).send(html);
};
