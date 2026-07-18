import ProfileCard from '../components/ProfileCard'
import nabilPhoto from '../assets/nabil.jpg'
import elzidanePhoto from '../assets/elzidane.jpg'

export default function DeveloperPage() {
  const developers = [
    {
      name: 'M. Nabil A. Kencana',
      role: 'Lead Developer & UI Architect',
      team: 'Mokleters Dev Team 2025',
      handle: 'nabilkencana',
      bio: 'Merancang arsitektur antarmuka pengguna (UI), menyusun sistem tema warna dinamis, serta mengoptimalkan sinkronisasi lirik presisi tinggi untuk pengalaman tribun terbaik.',
      avatar: nabilPhoto,
      github: 'https://github.com/nabilkencana',
      glow: 'rgba(161, 15, 18, 0.55)',
      gradient: 'linear-gradient(145deg, rgba(161, 15, 18, 0.4) 0%, rgba(10, 10, 10, 0.95) 100%)'
    },
    {
      name: 'Elzidane Ardyansyah',
      role: 'Fullstack & Systems Engineer',
      team: 'Mokleters Dev Team 2025',
      handle: 'elzidane',
      bio: 'Mengembangkan mesin sinkronisasi progres pemutar audio global, optimalisasi kinerja data, serta mengintegrasikan Web Audio API untuk efek suara tribun secara real-time.',
      avatar: elzidanePhoto,
      github: 'https://github.com/ElZidane123',
      glow: 'rgba(161, 15, 18, 0.55)',
      gradient: 'linear-gradient(145deg, rgba(161, 15, 18, 0.4) 0%, rgba(10, 10, 10, 0.95) 100%)'
    }
  ]

  return (
    <div className="dev-page" id="dev-page">
      {/* ── HEADER BANNER ── */}
      <div className="dev-header">
        <div className="dev-header-bg" aria-hidden="true" />
        <div className="container dev-header-content">
          <h1 className="dev-title">Tim Pengembang</h1>
          <p className="dev-subtitle">
            Di balik layar Stadium Pulse Mokleters. Bertanggung jawab atas setiap baris kode, korsa, dan inovasi digital.
          </p>
        </div>
      </div>

      {/* ── DEVELOPERS GRID ── */}
      <div className="container dev-content-layout">
        <div className="developers-grid">
          {developers.map((dev, idx) => (
            <div key={idx} className="dev-card-wrap">
              <ProfileCard
                name={dev.name}
                title={dev.role}
                handle={dev.handle}
                status={dev.team}
                contactText="Lihat GitHub"
                avatarUrl={dev.avatar}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                onContactClick={() => window.open(dev.github, '_blank')}
                behindGlowEnabled={true}
                behindGlowColor={dev.glow}
                innerGradient={dev.gradient}
              />
              <div className="dev-card-extra glass-1" style={{ marginTop: '16px', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="dev-bio" style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--color-outline)' }}>
                  {dev.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CORE MISSION ── */}
        <section className="dev-mission-section glass-1">
          <h3 className="dev-mission-title">Semangat Kolaborasi</h3>
          <p className="dev-mission-text">
            Proyek ini dibangun secara mandiri dengan tujuan menyatukan suara seluruh warga SMK Telkom Malang. Melalui kombinasi antara kecintaan pada sepak bola dan keahlian rekayasa perangkat lunak, kami mendedikasikan platform ini sebagai wadah digital pemersatu chant kebanggaan.
          </p>
        </section>
      </div>
    </div>
  )
}
