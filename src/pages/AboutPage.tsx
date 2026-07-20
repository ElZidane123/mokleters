import mokletsMascot from '../assets/bombi_optimized.webp'
import mokletersLogo from '../assets/Mokleters logo.png'
import attaPhoto from '../assets/atta_optimized.webp'
// import nabilPhoto from '../assets/nabil_optimized.webp'
// import elzidanePhoto from '../assets/elzidane_optimized.webp'


/* =============================================
   LUCIDE-STYLE SVG ICONS
   ============================================= */

const IconGraduation = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
)

const IconCaptainPlaceholder = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export default function AboutPage() {


  const currentCaptain = {
    period: '2026 - 2027',
    name: 'Muhammad Al Fathir Attaullah',
    angkatan: 'Angkatan 33',
    image: attaPhoto
  }

  /*
  const previousCaptains = [
    {
      period: '2022 - 2023',
      name: 'Capo Utama Mokleters',
      angkatan: 'Angkatan 31',
      image: nabilPhoto
    },
    {
      period: '2020 - 2021',
      name: 'Capo Utama Mokleters',
      angkatan: 'Angkatan 29',
      image: elzidanePhoto
    },
    {
      period: '2018 - 2019',
      name: 'Capo Utama Mokleters',
      angkatan: 'Angkatan 27',
      image: mokletsMascot
    }
  ]
  */



  return (
    <div className="about-page" id="about-page">
      <style>{`
        /* Single Captain Card Styling */
        .captain-single-container {
          display: flex !important;
          justify-content: center !important;
          margin-top: 32px !important;
          width: 100% !important;
        }

        .captain-single-card {
          position: relative !important;
          display: flex !important;
          flex-direction: row !important;
          background: linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(10, 10, 12, 0.98) 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 24px !important;
          overflow: hidden !important;
          max-width: 850px !important;
          width: 100% !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(161, 15, 18, 0.05) !important;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }

        .captain-single-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(161, 15, 18, 0.3) !important;
          box-shadow: 0 30px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(161, 15, 18, 0.15) !important;
        }

        .captain-single-image-sec {
          flex: 1 !important;
          position: relative !important;
          min-height: 380px !important;
          overflow: hidden !important;
          background: radial-gradient(circle, rgba(161, 15, 18, 0.04) 0%, rgba(10, 10, 12, 0.98) 100%) !important;
        }

        .captain-single-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }

        .captain-single-card:hover .captain-single-img {
          transform: scale(1.05) !important;
        }

        .captain-single-overlay {
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(90deg, rgba(10, 10, 12, 0) 50%, rgba(10, 10, 12, 0.98) 100%),
                      linear-gradient(0deg, rgba(10, 10, 12, 0.8) 0%, rgba(10, 10, 12, 0) 50%) !important;
          z-index: 2 !important;
        }

        .captain-single-content {
          flex: 1.2 !important;
          padding: 40px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          gap: 16px !important;
          z-index: 3 !important;
          position: relative !important;
          text-align: left !important;
        }

        .captain-single-badge-row {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 10px !important;
          align-items: center !important;
        }

        .captain-single-status {
          font-family: var(--font-display);
          font-size: 10px !important;
          font-weight: 800 !important;
          color: #2ed573 !important;
          letter-spacing: 0.1em !important;
          background: rgba(46, 213, 115, 0.1) !important;
          padding: 4px 10px !important;
          border-radius: 6px !important;
          border: 1px solid rgba(46, 213, 115, 0.3) !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
        }

        .captain-status-dot {
          width: 6px;
          height: 6px;
          background-color: #2ed573;
          border-radius: 50%;
          box-shadow: 0 0 8px #2ed573;
          animation: status-pulse 1.8s infinite;
        }

        @keyframes status-pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }

        .captain-single-period {
          font-family: var(--font-display);
          font-size: 10px !important;
          font-weight: 800 !important;
          color: var(--color-primary-bright) !important;
          letter-spacing: 0.1em !important;
          background: rgba(161, 15, 18, 0.15) !important;
          padding: 4px 10px !important;
          border-radius: 6px !important;
          border: 1px solid rgba(161, 15, 18, 0.3) !important;
        }

        .captain-single-name {
          font-size: 26px !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          margin: 0 !important;
          line-height: 1.2 !important;
          background: linear-gradient(135deg, #ffffff 0%, #a1a1a5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .captain-single-tagline {
          font-size: 13px !important;
          font-weight: 600 !important;
          color: var(--color-primary-bright) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          margin-top: -4px !important;
        }

        .captain-single-legacy {
          font-size: 14.5px !important;
          line-height: 1.6 !important;
          color: rgba(255, 255, 255, 0.75) !important;
          margin: 0 !important;
        }

        .captain-single-info-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 16px !important;
          margin-top: 8px !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding-top: 16px !important;
        }

        .captain-single-info-item {
          display: flex !important;
          flex-direction: column !important;
          gap: 4px !important;
        }

        .captain-single-info-label {
          font-size: 11px !important;
          font-weight: 700 !important;
          color: rgba(255, 255, 255, 0.4) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }

        .captain-single-info-value {
          font-size: 13.5px !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        @media (max-width: 768px) {
          .captain-single-card {
            flex-direction: column !important;
          }
          .captain-single-image-sec {
            min-height: 280px !important;
          }
          .captain-single-overlay {
            background: linear-gradient(0deg, rgba(10, 10, 12, 0.98) 15%, rgba(10, 10, 12, 0) 100%) !important;
          }
          .captain-single-content {
            padding: 24px !important;
            gap: 14px !important;
          }
          .captain-single-name {
            font-size: 22px !important;
          }
        }

        /* Previous Captains Section Styles */
        .previous-captains-title {
          font-size: 20px !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          text-align: center !important;
          margin-top: 48px !important;
          margin-bottom: 24px !important;
          letter-spacing: 0.05em !important;
        }

        .previous-captains-list {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 32px !important;
          margin-top: 24px !important;
        }

        .prev-captain-item {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          width: 160px !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }

        .prev-captain-item:hover {
          transform: translateY(-4px) !important;
        }

        .prev-captain-avatar-wrap {
          width: 100px !important;
          height: 100px !important;
          border-radius: 50% !important;
          overflow: hidden !important;
          border: 2px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
          transition: all 0.3s ease !important;
          margin-bottom: 12px !important;
          background: radial-gradient(circle, rgba(161, 15, 18, 0.04) 0%, rgba(10, 10, 12, 0.98) 100%) !important;
        }

        .prev-captain-item:hover .prev-captain-avatar-wrap {
          border-color: var(--color-primary-bright) !important;
          box-shadow: 0 0 20px rgba(161, 15, 18, 0.4) !important;
        }

        .prev-captain-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.4s ease !important;
        }

        .prev-captain-item:hover .prev-captain-img {
          transform: scale(1.1) !important;
        }

        .prev-captain-period {
          font-family: var(--font-display);
          font-size: 9.5px !important;
          font-weight: 800 !important;
          color: var(--color-primary-bright) !important;
          letter-spacing: 0.05em !important;
          margin-bottom: 4px !important;
        }

        .prev-captain-name {
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          margin: 0 0 2px 0 !important;
        }

        .prev-captain-angkatan {
          font-size: 11px !important;
          color: rgba(255, 255, 255, 0.5) !important;
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
                <img src={mokletsMascot} alt="Maskot Mokleters Bombi" className="about-mascot-page-img" loading="lazy" />
              </div>
            </div>
            <div className="about-profile-text">
              <span className="about-mascot-badge" style={{ fontSize: '11px', display: 'block', width: 'fit-content', marginBottom: '12px' }}>Maskot Resmi Mokleters</span>
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
        <section className="about-captains-section" aria-label="Kapten Utama Suporter" style={{ marginTop: '64px', width: '100%' }}>
          <h2 className="about-section-title" style={{ marginBottom: '16px' }}>Kapten Mokleters Saat Ini</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-outline)', fontSize: '14px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Kapten Mokleters, pengatur barisan tribun, dan penjaga api semangat korsa Mokleters.
          </p>
          <div className="captain-single-container">
            <div className="captain-single-card glass-1">
              {/* Left Column: Image with gradient overlay */}
              <div className="captain-single-image-sec">
                {currentCaptain.image ? (
                  <img src={currentCaptain.image} alt={currentCaptain.name} className="captain-single-img" loading="lazy" />
                ) : (
                  <div className="captain-bg-placeholder">
                    <IconCaptainPlaceholder />
                    <span className="placeholder-text">Foto Belum Tersedia</span>
                  </div>
                )}
                <div className="captain-single-overlay" />
              </div>

              {/* Right Column: Content */}
              <div className="captain-single-content">
                <div className="captain-single-badge-row">
                  <span className="captain-single-period">Periode {currentCaptain.period}</span>
                </div>

                <h3 className="captain-single-name">{currentCaptain.name}</h3>
                <span className="captain-single-tagline">Mokleters Leader</span>

                {/* <p className="captain-single-legacy">{currentCaptain.legacy}</p> */}

                <div className="captain-single-info-grid">
                  <div className="captain-single-info-item">
                    <span className="captain-single-info-label">Angkatan</span>
                    <span className="captain-single-info-value">
                      <IconGraduation />
                      {currentCaptain.angkatan}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

                {/* Comment dulu sementara belum ada fotonya  */}
          {/* <h3 className="previous-captains-title">Kapten Angkatan Sebelumnya</h3>
          <div className="previous-captains-list">
            {previousCaptains.map((capo, i) => (
              <div key={i} className="prev-captain-item">
                <div className="prev-captain-avatar-wrap">
                  {capo.image ? (
                    <img src={capo.image} alt={capo.name} className="prev-captain-img" loading="lazy" />
                  ) : (
                    <div className="captain-bg-placeholder" style={{ borderRadius: '50%' }}>
                      <IconCaptainPlaceholder />
                    </div>
                  )}
                </div>
                <span className="prev-captain-period">{capo.period}</span>
                <h4 className="prev-captain-name">{capo.name}</h4>
                <span className="prev-captain-angkatan">{capo.angkatan}</span>
              </div>
            ))}
          </div> */}
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
