import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || 'demo';

    const giftUrl = `https://sudenzkrsvrnn-max.github.io/sude-hediye/sude-hediye-main/lovebombing.html?id=${id}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&color=cc0000&bgcolor=000000&data=${encodeURIComponent(giftUrl)}&margin=15&format=png`;

    return new ImageResponse(
      (
        <div
          style={{
            background: '#000000',
            width: '1200px',
            height: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '3px solid #cc0000',
          }}
        >
          {/* Horizontal ribbon */}
          <div style={{
            position: 'absolute', left: 0, top: '38%',
            width: '100%', height: '55px',
            background: 'linear-gradient(to right, #880000, #ff2200, #880000)',
            display: 'flex',
          }} />
          {/* Vertical ribbon */}
          <div style={{
            position: 'absolute', top: 0, left: '47%',
            width: '55px', height: '100%',
            background: 'linear-gradient(to bottom, #880000, #ff2200, #880000)',
            display: 'flex',
          }} />
          {/* Bow circle */}
          <div style={{
            position: 'absolute', top: '10%', left: '42%',
            width: '170px', height: '170px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ff4400, #880000)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 20,
            boxShadow: '0 0 30px rgba(255,0,0,0.6)',
          }}>
            <div style={{ color: 'white', fontSize: '60px', display: 'flex' }}>🎀</div>
          </div>
          {/* QR Code */}
          <img
            src={qrUrl}
            style={{
              width: '350px',
              height: '350px',
              position: 'relative',
              zIndex: 10,
              borderRadius: '12px',
              marginTop: '80px',
            }}
          />
          {/* Gift label */}
          <div style={{
            position: 'absolute', bottom: '28px', left: '50px',
            color: 'white', fontSize: '52px', fontStyle: 'italic',
            display: 'flex', gap: '10px', alignItems: 'center',
          }}>
            Gift<span style={{ color: '#ff2200', display: 'flex' }}>♥</span>
          </div>
          {/* Right side text */}
          <div style={{
            position: 'absolute', right: '50px', top: '50%',
            color: 'rgba(255,255,255,0.7)', fontSize: '22px',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
            gap: '8px',
          }}>
            <div style={{ display: 'flex' }}>💝 Sana Özel Hediye</div>
            <div style={{ color: '#ff6666', fontSize: '16px', display: 'flex' }}>QR kodu tara veya tıkla</div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
