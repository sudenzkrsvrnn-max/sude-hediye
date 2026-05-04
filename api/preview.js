export const config = { runtime: 'edge' };

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || 'demo';

  // Determine base URL from request
  const host = req.headers.get('host') || 'sudenzkrsvrnn-max.vercel.app';
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

  <!-- Open Graph / WhatsApp / Instagram -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/api/preview?id=${id}">
  <meta property="og:title" content="Sana Özel Bir Hediye Var! 💝">
  <meta property="og:description" content="Senin için özel hazırlanmış sürpriz hediyeni görmek için tıkla!">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Sana Özel Bir Hediye Var! 💝">
  <meta name="twitter:description" content="Senin için özel hazırlanmış sürpriz hediyeni görmek için tıkla!">
  <meta name="twitter:image" content="${ogImageUrl}">

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      color: #fff;
      font-family: system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader {
      text-align: center;
    }
    .loader p { color: #aaa; margin-top: 10px; }
  </style>
  <script>
    // Immediately redirect to the actual gift page
    window.location.replace("${giftUrl}");
  </script>
</head>
<body>
  <div class="loader">
    <div style="font-size:60px">💝</div>
    <p>Hediyene yönlendiriliyorsun...</p>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-cache',
    },
  });
}
