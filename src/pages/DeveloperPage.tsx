import ProfileCard from '../components/ProfileCard'
import nabilPhoto from '../assets/nabil_optimized.webp'
import elzidanePhoto from '../assets/elzidane_optimized.webp'
import logoPatternTilted from '../assets/logo_pattern_tilted.svg'

export default function DeveloperPage() {
  const developers = [
    {
      name: 'M. Nabil Anwar K.',
      role: 'Lead Developer & UI Architect',
      team: 'Mokleters Dev Team 2026',
      handle: 'nabilkencana',
      bio: 'Merancang arsitektur antarmuka pengguna (UI), menyusun sistem tema warna dinamis, serta mengoptimalkan sinkronisasi lirik presisi tinggi untuk pengalaman tribun terbaik.',
      avatar: elzidanePhoto,
      github: 'https://github.com/nabilkencana',
      instagram: 'https://www.instagram.com/nabill.anwr',
      glow: 'rgba(161, 15, 18, 0.55)',
      gradient: 'linear-gradient(145deg, rgba(161, 15, 18, 0.4) 0%, rgba(10, 10, 10, 0.95) 100%)'
    },
    {
      name: 'Elzidane Ardyansyah',
      role: 'Fullstack & Systems Engineer',
      team: 'Mokleters Dev Team 2026',
      handle: 'elzidane',
      bio: 'Mengembangkan mesin sinkronisasi progres pemutar audio global, optimalisasi kinerja data, serta mengintegrasikan Web Audio API untuk efek suara tribun secara real-time.',
      avatar: nabilPhoto,
      github: 'https://github.com/ElZidane123',
      instagram: 'https://www.instagram.com/_elzdne',
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
            Di balik layar Website Chant Mokleters. Bertanggung jawab atas setiap baris kode, korsa, dan inovasi digital.
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
                iconUrl={logoPatternTilted}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                onContactClick={() => window.open(dev.github, '_blank')}
                instagramUrl={dev.instagram}
                behindGlowEnabled={true}
                behindGlowColor={dev.glow}
                innerGradient={dev.gradient}
              />
              <div className="dev-card-extra">
                <p className="dev-bio">
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
