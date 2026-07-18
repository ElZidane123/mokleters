import mokletsMascot from '../assets/mascot.png'
import mokletersLogo from '../assets/Mokleters logo.png'

export default function AboutPage() {
  const values = [
    {
      title: 'Solidaritas Korsa',
      desc: 'Satu suara, satu jiwa. Kebersamaan di tribun utara maupun luar lapangan yang mengakar erat di sanubari setiap siswa SMK Telkom Malang.',
      icon: '🤝'
    },
    {
      title: 'Loyalitas Tanpa Batas',
      desc: 'Mendukung Wikusama berjuang hingga detik terakhir pertandingan. Kemenangan disambut, kekalahan tetap dikawal.',
      icon: '🔥'
    },
    {
      title: 'Kreativitas Tribun',
      desc: 'Melodi chant baru, koreografi kertas, hingga bendera raksasa (giant flag) digarap mandiri demi menghidupkan stadion.',
      icon: '🎨'
    }
  ]

  return (
    <div className="about-page" id="about-page">
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
            <div className="about-profile-text">
              <h2 className="about-section-title">Siapa Kami?</h2>
              <p className="about-paragraph">
                Mokleters adalah komunitas pendukung resmi (supporter) dari SMK Telkom Malang. Lahir dari rasa cinta yang mendalam terhadap almamater dan tim olahraga sekolah (Wikusama), kami menjadi motor penggerak kreativitas di tribun penonton.
              </p>
              <p className="about-paragraph">
                Bukan sekadar tentang bernyanyi lantang selama 90 menit, Mokleters adalah wadah pemersatu korsa, melatih kepemimpinan, dan mengekspresikan seni koreografi visual di setiap pertandingan kejuaraan.
              </p>
            </div>
            <div className="about-profile-visual">
              <div className="about-mascot-card glass-2">
                <img src={mokletsMascot} alt="Maskot Mokleters" className="about-mascot-img" />
                <div className="about-mascot-info">
                  <span className="about-mascot-badge">MASKOT RESMI</span>
                  <h3 className="about-mascot-name">Si Wiku</h3>
                  <p className="about-mascot-desc">Simbol singa petarung berjiwa ksatria pembawa keberuntungan Wikusama.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES SECTION ── */}
        <section className="about-values-section" aria-label="Nilai-nilai Utama">
          <h2 className="about-section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Nilai Utama Kami</h2>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={i} className="about-value-card glass-1">
                <div className="about-value-icon">{v.icon}</div>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
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
