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
  const IconAward = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
      <circle cx="12" cy="8" r="7" /><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
    </svg>
  )

  const capos = [
    {
      period: '2024 - 2025',
      name: 'Capo Utama Mokleters',
      legacy: 'Mengorkestrasi koreografi kertas 3D raksasa dan memimpin gerakan bendera besar (giant flag) di sepanjang tribun olahraga.',
      achievement: 'Suporter Terbaik Kompetisi DBL'
    },
    {
      period: '2022 - 2023',
      name: 'Capo Utama Mokleters',
      legacy: 'Memperkenalkan aransemen perkusi tribun terkoordinasi dan menyatukan suara korsa lintas angkatan.',
      achievement: 'Solidaritas Korsa Terbesar'
    },
    {
      period: '2020 - 2021',
      name: 'Capo Utama Mokleters',
      legacy: 'Menduniakan nyala korsa digital dan merancang aransemen chant modern di masa pembatasan fisik.',
      achievement: 'Inovasi Chant Era Baru'
    },
    {
      period: '2018 - 2019',
      name: 'Capo Utama Mokleters',
      legacy: 'Memprakarsai aksi koreografi mosaik penuh warna pertama dan memperluas chant kebanggaan almamater.',
      achievement: 'Pelopor Mosaik Warna'
    }
  ]

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
      <style>{`
        .captains-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-top: 32px;
          text-align: left;
        }

        .captain-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.01) 0%, rgba(161, 15, 18, 0.02) 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 20px !important;
          padding: 24px !important;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }

        .captain-card:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(161, 15, 18, 0.3) !important;
          box-shadow: 0 12px 30px rgba(161, 15, 18, 0.08) !important;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.02) 0%, rgba(161, 15, 18, 0.05) 100%) !important;
        }

        .captain-period {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          color: var(--color-primary-bright) !important;
          letter-spacing: 0.1em;
          background: rgba(161, 15, 18, 0.12) !important;
          padding: 4px 12px !important;
          border-radius: 6px;
          align-self: flex-start;
          border: 1px solid rgba(161, 15, 18, 0.25);
        }

        .captain-name {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .captain-legacy {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-outline);
          margin: 0;
        }

        .captain-achievement {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--color-primary-bright);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 14px;
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

        {/* ── CAPTAINS SECTION ── */}
        <section className="about-captains-section" aria-label="Sejarah Kapten Suporter" style={{ marginTop: '64px', width: '100%' }}>
          <h2 className="about-section-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>Sejarah &amp; Mantan Kapten Tribun (Capo)</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-outline)', fontSize: '14px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Para ksatria pemandu sorak yang memimpin komando yel-yel, menjaga tertib barisan, dan membakar semangat korsa Mokleters dari masa ke masa.
          </p>
          <div className="captains-grid">
            {capos.map((capo, i) => (
              <div key={i} className="captain-card glass-1">
                <span className="captain-period">{capo.period}</span>
                <h3 className="captain-name">{capo.name}</h3>
                <p className="captain-legacy">{capo.legacy}</p>
                <div className="captain-achievement">
                  <IconAward />
                  {capo.achievement}
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
