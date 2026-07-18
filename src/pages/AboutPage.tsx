import mokletsMascot from '../assets/bombi.png'
import mokletersLogo from '../assets/Mokleters logo.png'
import nabilPhoto from '../assets/nabil.jpg'
import elzidanePhoto from '../assets/elzidane.jpg'
import mascotPhoto from '../assets/mascot.png'

/* =============================================
   LUCIDE-STYLE SVG ICONS
   ============================================= */

export default function AboutPage() {
  const IconAward = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
      <circle cx="12" cy="8" r="7" /><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
    </svg>
  )

  const IconCaptainPlaceholder = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )

  const capos = [
    {
      period: '2024 - 2025',
      name: 'Capo Utama Mokleters',
      legacy: 'Mengorkestrasi koreografi kertas 3D raksasa dan memimpin gerakan bendera besar (giant flag) di sepanjang tribun olahraga.',
      achievement: 'Suporter Terbaik Kompetisi DBL',
      image: mascotPhoto
    },
    {
      period: '2022 - 2023',
      name: 'Capo Utama Mokleters',
      legacy: 'Memperkenalkan aransemen perkusi tribun terkoordinasi dan menyatukan suara korsa lintas angkatan.',
      achievement: 'Solidaritas Korsa Terbesar',
      image: nabilPhoto
    },
    {
      period: '2020 - 2021',
      name: 'Capo Utama Mokleters',
      legacy: 'Menduniakan nyala korsa digital dan merancang aransemen chant modern di masa pembatasan fisik.',
      achievement: 'Inovasi Chant Era Baru',
      image: elzidanePhoto
    },
    {
      period: '2018 - 2019',
      name: 'Capo Utama Mokleters',
      legacy: 'Memprakarsai aksi koreografi mosaik penuh warna pertama dan memperluas chant kebanggaan almamater.',
      achievement: 'Pelopor Mosaik Warna',
      image: mokletsMascot
    }
  ]



  return (
    <div className="about-page" id="about-page">
      <style>{`
        .captains-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-top: 32px;
          text-align: left;
        }

        .captain-card {
          position: relative !important;
          background: #0d0e12 !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 20px !important;
          padding: 24px !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          min-height: 360px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          justify-content: flex-end !important;
        }

        .captain-card:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(161, 15, 18, 0.35) !important;
          box-shadow: 0 12px 30px rgba(161, 15, 18, 0.12) !important;
        }

        .captain-bg-wrap {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 1 !important;
          overflow: hidden !important;
        }

        .captain-bg-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }

        .captain-card:hover .captain-bg-image {
          transform: scale(1.06) !important;
        }

        .captain-bg-placeholder {
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          color: rgba(255, 255, 255, 0.15) !important;
          background: radial-gradient(circle, rgba(161, 15, 18, 0.04) 0%, rgba(10, 10, 12, 0.98) 100%) !important;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }

        .captain-card:hover .captain-bg-placeholder {
          transform: scale(1.06) !important;
        }

        .captain-bg-placeholder svg {
          opacity: 0.25 !important;
          color: var(--color-primary-bright) !important;
        }

        .placeholder-text {
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          opacity: 0.35 !important;
        }

        .captain-bg-overlay {
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(180deg, rgba(10, 10, 12, 0.1) 0%, rgba(10, 10, 12, 0.6) 45%, rgba(6, 6, 8, 0.96) 100%) !important;
          z-index: 2 !important;
        }

        .captain-card-content {
          position: relative !important;
          z-index: 3 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          width: 100% !important;
        }

        .captain-period {
          font-family: var(--font-display);
          font-size: 10.5px !important;
          font-weight: 800 !important;
          color: var(--color-primary-bright) !important;
          letter-spacing: 0.1em !important;
          background: rgba(161, 15, 18, 0.25) !important;
          padding: 4px 12px !important;
          border-radius: 6px !important;
          align-self: flex-start !important;
          border: 1px solid rgba(161, 15, 18, 0.4) !important;
          backdrop-filter: blur(4px) !important;
          -webkit-backdrop-filter: blur(4px) !important;
        }

        .captain-name {
          font-size: 18px !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          margin: 0 !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
        }

        .captain-legacy {
          font-size: 13px !important;
          line-height: 1.6 !important;
          color: rgba(255, 255, 255, 0.7) !important;
          margin: 0 !important;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important;
        }

        .captain-achievement {
          font-size: 11.5px !important;
          font-weight: 700 !important;
          color: var(--color-primary-bright) !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          margin-top: 4px !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding-top: 12px !important;
        }
      `}</style>
      {/* ── HEADER BANNER ── */}
      <div className="about-header">
        <div className="about-header-bg" aria-hidden="true" />
        <div className="container about-header-content">
          <img src={mokletersLogo} alt="Mokleters Logo" className="about-logo-large" />
          <h1 className="about-title">Tentang Mokleters</h1>
          <p className="about-subtitle">
            Suara Gemuruh Tribun Utara, Penjaga Kebanggaan SMK Telkom Malang.
          </p>
        </div>
      </div>

      <div className="container about-content-layout">
        
        {/* ── PROFILE SECTION ── */}
        <section className="about-profile-section glass-1" aria-label="Profil Komunitas">
          <div className="about-profile-grid">
            <div className="about-profile-visual" style={{ justifyContent: 'center' }}>
              <div className="about-mascot-visual-container">
                <img src={mokletsMascot} alt="Maskot Mokleters Bombi" className="about-mascot-page-img" />
              </div>
            </div>
            <div className="about-profile-text">
              <span className="about-mascot-badge" style={{ fontSize: '11px', display: 'inline-block', marginBottom: '8px' }}>Maskot Resmi Mokleters</span>
              <h2 className="about-section-title" style={{ marginTop: '4px', marginBottom: '16px' }}>Makna Bombi</h2>
              <p className="about-paragraph" style={{ fontWeight: 500, color: '#ffffff', fontSize: '16px' }}>
                Bombi merupakan logo yang terbentuk berlandaskan kearifan lokal dengan menyiratkan perangai tokoh Gatotkaca sewaktu kecil bernama Tetuko.
              </p>
              <p className="about-paragraph">
                Tetuko adalah kesatria yang memiliki kesaktian paling sempurna, hebat di segala medan baik di darat maupun di udara. Karakter ini dicirikan dengan sifat yang tangkas, lincah, kuat, dan trengginas.
              </p>
              <p className="about-paragraph" style={{ marginBottom: 0 }}>
                Harapannya, dengan filosofi tersebut semua anak Moklet dapat memiliki karakter Tetuko. Tidak hanya memiliki kemampuan akademis di atas rata-rata melainkan juga memiliki softskill dan hardskill agar berdaya saing, disegani oleh sesama, dan mampu mengharumkan nama MOKLET tercinta.
              </p>
            </div>
          </div>
          
          <div style={{ margin: '40px 0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)' }} />
          
          <div className="about-who-we-are" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="about-section-title" style={{ justifyContent: 'center', marginBottom: '20px' }}>Siapa Kami?</h2>
            <p className="about-paragraph" style={{ fontSize: '15.5px', lineHeight: '1.85' }}>
              Mokleters adalah komunitas pendukung resmi (supporter) dari SMK Telkom Malang. Lahir dari rasa cinta yang mendalam terhadap almamater dan tim olahraga sekolah (Wikusama), kami menjadi motor penggerak kreativitas di tribun penonton.
            </p>
            <p className="about-paragraph" style={{ fontSize: '15.5px', lineHeight: '1.85', marginBottom: 0 }}>
              Bukan sekadar tentang bernyanyi lantang selama pertandingan, Mokleters adalah wadah pemersatu korsa, melatih kepemimpinan, dan mengekspresikan seni koreografi visual di setiap pertandingan kejuaraan.
            </p>
          </div>
        </section>

        {/* ── CAPTAINS SECTION ── */}
        <section className="about-captains-section" aria-label="Sejarah Kapten Suporter" style={{ marginTop: '64px', width: '100%' }}>
          <h2 className="about-section-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>Sejarah &amp; Mantan Kapten Tribun (Capo)</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-outline)', fontSize: '14px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Para ksatria pemandu sorak yang memimpin komando yel-yel, menjaga tertib barisan, dan membakar semangat korsa Mokleters dari masa ke masa.
          </p>
          <div className="captains-grid">
            {capos.map((capo, i) => (
              <div key={i} className="captain-card glass-1">
                {/* Background Image / Placeholder */}
                <div className="captain-bg-wrap">
                  {capo.image ? (
                    <img src={capo.image} alt={capo.name} className="captain-bg-image" />
                  ) : (
                    <div className="captain-bg-placeholder">
                      <IconCaptainPlaceholder />
                      <span className="placeholder-text">Foto Belum Tersedia</span>
                    </div>
                  )}
                  {/* Gradient Overlay for text readability */}
                  <div className="captain-bg-overlay" />
                </div>

                {/* Content Overlay */}
                <div className="captain-card-content">
                  <span className="captain-period">{capo.period}</span>
                  <h3 className="captain-name">{capo.name}</h3>
                  <p className="captain-legacy">{capo.legacy}</p>
                  <div className="captain-achievement">
                    <IconAward />
                    {capo.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HISTORY / STATS ── */}
        <section className="about-history-section glass-1" aria-label="Statistik Komunitas">
          <h2 className="about-section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>Mokleters Dalam Angka</h2>
          <div className="about-stats-grid">
            <div className="about-stat-box">
              <span className="about-stat-number">1992</span>
              <span className="about-stat-label">Tahun Berdiri</span>
            </div>
            <div className="about-stat-box">
              <span className="about-stat-number">11+</span>
              <span className="about-stat-label">Chant Resmi</span>
            </div>
            <div className="about-stat-box">
              <span className="about-stat-number">1.5K+</span>
              <span className="about-stat-label">Anggota Aktif</span>
            </div>
            <div className="about-stat-box">
              <span className="about-stat-number">100%</span>
              <span className="about-stat-label">Jiwa Korsa</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
