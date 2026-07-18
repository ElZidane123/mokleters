import mokletsMascot from '../assets/bombi.png'
import mokletersLogo from '../assets/Mokleters logo.png'

/* =============================================
   LUCIDE-STYLE SVG ICONS
   ============================================= */
const IconUsers = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: 'var(--color-primary-bright)' }}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconFlame = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: 'var(--color-primary-bright)' }}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
)

const IconPalette = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: 'var(--color-primary-bright)' }}
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03457 19.176 5.0977 19.4357 5.01804 19.675C4.84687 20.1884 4.75 20.7334 4.75 21.3C4.75 21.6866 5.0634 22 5.45 22H12Z" />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
  </svg>
)

export default function AboutPage() {
  const values = [
    {
      title: 'Solidaritas Korsa',
      desc: 'Satu suara, satu jiwa. Kebersamaan di tribun utara maupun luar lapangan yang mengakar erat di sanubari setiap siswa SMK Telkom Malang.',
      icon: <IconUsers />
    },
    {
      title: 'Loyalitas Tanpa Batas',
      desc: 'Mendukung Wikusama berjuang hingga detik terakhir pertandingan. Kemenangan disambut, kekalahan tetap dikawal.',
      icon: <IconFlame />
    },
    {
      title: 'Kreativitas Tribun',
      desc: 'Melodi chant baru, koreografi kertas, hingga bendera raksasa (giant flag) digarap mandiri demi menghidupkan stadion.',
      icon: <IconPalette />
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
                  <span className="about-mascot-badge">Maskot Resmi</span>
                  <h3 className="about-mascot-name">Bombi</h3>
                  <p className="about-mascot-desc">
                    Bombi merupakan logo yang terbentuk berlandaskan kearifan lokal. Ia menyiratkan perangai tokoh Gatotkaca sewaktu kecil bernama Tetuko — kesatria yang memiliki kesaktian paling sempurna, hebat di segala medan baik di darat maupun di udara.
                  </p>
                  <p className="about-mascot-desc">
                    Karakter Bombi mengajarkan tangkas, lincah, kuat, dan trengginas. Harapannya, semua anak Moklet dapat memiliki kualitas akademis dan softskill yang komplet, sehingga kelak mampu berdaya saing, disegani, dan mengharumkan nama MOKLET tercinta.
                  </p>
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
