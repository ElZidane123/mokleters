import mokletsMascot from '../assets/mascot.png'

export default function DeveloperPage() {
  const developers = [
    {
      name: 'Mohammad Nabil Anwar Kencana',
      role: 'Lead Developer & UI Architect',
      team: 'Mokleters Dev Team 2025',
      bio: 'Merancang arsitektur antarmuka pengguna (UI), menyusun sistem tema warna dinamis, serta mengoptimalkan sinkronisasi lirik presisi tinggi untuk pengalaman tribun terbaik.',
      avatar: mokletsMascot,
      skills: ['React', 'TypeScript', 'CSS System', 'UI Architecture']
    },
    {
      name: 'Elzidane Ardyansyah',
      role: 'Fullstack Developer & Systems Engineer',
      team: 'Mokleters Dev Team 2025',
      bio: 'Mengembangkan mesin sinkronisasi progres pemutar audio global, optimalisasi kinerja data, serta mengintegrasikan Web Audio API untuk efek suara tribun secara real-time.',
      avatar: mokletsMascot,
      skills: ['Node.js', 'State Management', 'Audio Engine', 'Performance Optimization']
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
            <div key={idx} className="dev-card glass-1">
              <div className="dev-card-glow" aria-hidden="true" />
              
              <div className="dev-card-header">
                <div className="dev-avatar-wrap">
                  <img src={dev.avatar} alt={dev.name} className="dev-avatar" />
                  <div className="dev-avatar-ring" />
                </div>
                <div className="dev-meta">
                  <span className="dev-badge">{dev.team}</span>
                  <h2 className="dev-name">{dev.name}</h2>
                  <p className="dev-role">{dev.role}</p>
                </div>
              </div>

              <div className="dev-card-divider" />

              <p className="dev-bio">{dev.bio}</p>

              <div className="dev-skills-section">
                <p className="dev-skills-title">Keahlian Utama</p>
                <div className="dev-skills-list">
                  {dev.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="dev-skill-tag">{skill}</span>
                  ))}
                </div>
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
