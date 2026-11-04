import { ImageResponse } from 'next/og';

export const alt = 'Nicole Chen — Digital Garden';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: '#f4f1e9', color: '#293d33', borderLeft: '20px solid #293d33' }}>
      <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5 }}>NICOLE'S GARDEN</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', fontSize: 92, fontFamily: 'serif' }}>Nicole Chen</div>
        <div style={{ display: 'flex', fontSize: 30 }}>Product · Building · AI · Writing</div>
      </div>
      <div style={{ display: 'flex', fontSize: 23 }}>www.nicoles.garden</div>
    </div>, size,
  );
}
