import { useState } from 'react'
import type { PlayerTrack } from './App'

/* =============================================
   ICONS
   ============================================= */
const IconTrendUp = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
  </svg>
)
const IconTrendDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" /><polyline points="17,18 23,18 23,12" />
  </svg>
)
const IconMinus = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const IconChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,18 9,12 15,6" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,18 15,12 9,6" />
  </svg>
)
const IconPlay = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)
const IconMegaphone = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
)
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
  </svg>
)
const IconArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7,7 17,7 17,17" />
  </svg>
)
const IconMusic = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
)

/* =============================================
   DATA
   ============================================= */
const TOP_CHANTS = [
  { rank: 1, initial: 'M', color: '#a10f12', name: 'Moklets Juara', sub: 'Angkatan 2023', plays: '12.4k', trend: 'up' },
  { rank: 2, initial: 'W', color: '#6b2525', name: 'Wani Moklets', sub: 'Anthem Klasik', plays: '8.1k', trend: 'flat' },
  { rank: 3, initial: 'S', color: '#4a3030', name: 'Semangat Telkom', sub: 'Marching Band', plays: '7.2k', trend: 'up' },
]

const BAR_DATA = [
  { label: 'Pembuka', value: 72, color: '#a10f12' },
  { label: 'Pertandingan',   value: 95, color: '#c01215' },
  { label: 'Kemenangan', value: 58, color: '#7d0c0f' },
  { label: 'Penutup', value: 80, color: '#8b1818' },
]

const PLAYLISTS = [
  { id: 1, title: 'Chant Pembuka', desc: 'Panggilan perjuangan. Siapkan tribun untuk bertarung.', img: '/anthem1.png', tag: 'CHANT PEMBUKA' },
  { id: 2, title: 'Chant Pertandingan',   desc: 'Intensitas ritmis. 90 menit semangat sekolah murni.', img: '/anthem2.png', tag: 'CHANT PERTANDINGAN' },
  { id: 3, title: 'Lagu Kemenangan',  desc: 'Untuk momen kejayaan. Biarkan dunia tahu.', img: '/anthem3.png', tag: 'LAGU KEMENANGAN' },
  { id: 4, title: 'Lagu Penutup',  desc: 'Penghormatan terakhir. Hormati permainan dan sekolah.', img: '/anthem1.png', tag: 'LAGU PENUTUP' },
]

const RECENT = [
  { id: 1, name: 'Spirit of Arjosari', meta: 'Ditambahkan 2 jam lalu • Diciptakan oleh Kelas XII R2', duration: '04:12' },
  { id: 2, name: 'Red Pride 2.0',       meta: 'Ditambahkan Kemarin • Remix Anthem Asli',  duration: '03:45' },
  { id: 3, name: 'Thunder of Moklets',  meta: 'Ditambahkan 3 hari lalu • Ensembel Drum',           duration: '05:20' },
]

/* =============================================
   LEADERBOARD PAGE
   ============================================= */
export default function LeaderboardPage({ onPlay }: { onPlay: (t: Partial<PlayerTrack>) => void }) {
  const [carouselStart, setCarouselStart] = useState(0)
  const visibleCount = 4

  const prevCarousel = () => setCarouselStart(s => Math.max(0, s - 1))
  const nextCarousel = () => setCarouselStart(s => Math.min(PLAYLISTS.length - visibleCount, s + 1))

  const maxBar = Math.max(...BAR_DATA.map(d => d.value))

  return (
    <div className="lb-page" id="leaderboard-page">
      {/* Latar belakang cahaya atmosferik */}
      <div className="lb-bg" aria-hidden="true" />

      <div className="container">

        {/* ── HEADER HALAMAN ── */}
        <header className="lb-header">
          <h1 className="lb-title">Papan Peringkat &amp; Playlist</h1>
          <p className="lb-subtitle">
            Detak jantung ritmis SMK Telkom Malang. Mulai dari chant pembuka bersejarah<br className="br-desktop" />
            hingga anthem kemenangan yang mengguncang stadion.
          </p>
        </header>

        {/* ── BARIS ATAS: Paling Banyak Diputar + Grafik Tren ── */}
        <div className="lb-top-row">

          {/* Chant Paling Sering Diputar */}
          <section className="lb-most-played" aria-label="Chant paling sering diputar">
            <div className="lb-section-label">
              <h2 className="lb-section-title">Chant Paling Sering Diputar</h2>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-container)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
              </svg>
            </div>

            <ol className="lb-top-list" aria-label="Chant teratas diurutkan berdasarkan putaran">
              {TOP_CHANTS.map(chant => (
                <li
                  key={chant.rank}
                  className={`lb-top-item${chant.rank === 1 ? ' lb-top-item--first' : ''}`}
                  id={`lb-top-item-${chant.rank}`}
                >
                  <span className="lb-top-rank" aria-label={`Peringkat ${chant.rank}`}>
                    {String(chant.rank).padStart(2, '0')}
                  </span>

                  <div
                    className="lb-top-avatar"
                    style={{ background: chant.color }}
                    aria-hidden="true"
                  >
                    {chant.initial}
                  </div>

                  <div className="lb-top-info">
                    <p className="lb-top-name">{chant.name}</p>
                    <p className="lb-top-sub">{chant.sub}</p>
                  </div>

                  <div className="lb-top-right">
                    <span className="lb-top-plays">{chant.plays} Putaran</span>
                    <span
                      className={`lb-trend lb-trend--${chant.trend}`}
                      aria-label={chant.trend === 'up' ? 'Tren naik' : chant.trend === 'down' ? 'Tren turun' : 'Stabil'}
                    >
                      {chant.trend === 'up' ? <IconTrendUp /> : chant.trend === 'down' ? <IconTrendDown /> : <IconMinus />}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Grafik Sedang Tren Minggu Ini */}
          <section className="lb-trending" aria-label="Grafik tren minggu ini">
            <div className="lb-section-label">
              <div>
                <h2 className="lb-section-title">Sedang Tren Minggu Ini</h2>
                <p className="lb-trending-sub">Kecepatan semangat sekolah di semua kelas.</p>
              </div>
              <button id="lb-view-all-btn" className="btn btn-primary" type="button" style={{ padding: '8px 18px', fontSize: 12, borderRadius: 'var(--radius-full)' }}>
                LIHAT SEMUA
              </button>
            </div>

            {/* Grafik batang */}
            <div className="lb-chart" role="img" aria-label="Grafik batang tren chant berdasarkan kategori">
              {BAR_DATA.map(bar => (
                <div key={bar.label} className="lb-chart-col">
                  <div className="lb-chart-bar-wrap">
                    <div
                      className="lb-chart-bar"
                      style={{
                        height: `${(bar.value / maxBar) * 100}%`,
                        background: `linear-gradient(to top, ${bar.color}, #d7262e)`,
                      }}
                      aria-label={`${bar.label}: ${bar.value}`}
                    >
                      <div className="lb-chart-bar-glow" style={{ background: bar.color }} aria-hidden="true" />
                    </div>
                  </div>
                  <span className="lb-chart-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── PLAYLIST ATMOSFERIK ── */}
        <section className="lb-playlists-section" aria-label="Playlist atmosferik">
          <div className="lb-section-label lb-section-label--spaced">
            <div>
              <h2 className="lb-section-title">Playlist Atmosferik</h2>
              <p className="lb-playlists-sub">Koleksi kurasi untuk setiap fase pengalaman hari pertandingan.</p>
            </div>
            <div className="lb-carousel-nav" role="group" aria-label="Navigasi komidi putar">
              <button
                id="lb-carousel-prev"
                className="lb-carousel-btn"
                type="button"
                aria-label="Playlist sebelumnya"
                onClick={prevCarousel}
                disabled={carouselStart === 0}
              >
                <IconChevronLeft />
              </button>
              <button
                id="lb-carousel-next"
                className="lb-carousel-btn"
                type="button"
                aria-label="Playlist berikutnya"
                onClick={nextCarousel}
                disabled={carouselStart >= PLAYLISTS.length - visibleCount}
              >
                <IconChevronRight />
              </button>
            </div>
          </div>

          <div className="lb-playlist-grid" role="list">
            {PLAYLISTS.slice(carouselStart, carouselStart + visibleCount).map(pl => (
              <article
                key={pl.id}
                className="lb-playlist-card"
                id={`lb-playlist-${pl.id}`}
                role="listitem"
                aria-label={pl.title}
              >
                <div className="lb-playlist-img-wrap">
                  <img src={pl.img} alt={pl.title} className="lb-playlist-img" loading="lazy" />
                  <div className="lb-playlist-vignette" aria-hidden="true" />
                  <button
                    className="lb-playlist-play-btn"
                    type="button"
                    aria-label={`Putar ${pl.title}`}
                    id={`lb-play-${pl.id}`}
                    onClick={() => onPlay({ title: pl.title, img: pl.img, artist: pl.tag })}
                  >
                    <IconPlay size={16} />
                  </button>
                </div>
                <div className="lb-playlist-info">
                  <p className="lb-playlist-tag">{pl.tag}</p>
                  <p className="lb-playlist-desc">{pl.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── BARU DITAMBAHKAN + KIRIM CTA ── */}
        <div className="lb-bottom-row">

          {/* Baru Saja Ditambahkan */}
          <section className="lb-recent" aria-label="Chant baru saja ditambahkan">
            <h2 className="lb-section-title lb-section-title--spaced">Baru Saja Ditambahkan</h2>

            <ul className="lb-recent-list" aria-label="Daftar chant baru saja ditambahkan">
              {RECENT.map(item => (
                <li
                  key={item.id}
                  className="lb-recent-item"
                  id={`lb-recent-${item.id}`}
                  onClick={() => onPlay({ title: item.name })}
                  role="button"
                  tabIndex={0}
                  aria-label={`Putar ${item.name}`}
                >
                  <div className="lb-recent-icon" aria-hidden="true">
                    <IconMusic />
                  </div>
                  <div className="lb-recent-info">
                    <p className="lb-recent-name">{item.name}</p>
                    <p className="lb-recent-meta">
                      <IconClock />
                      {item.meta}
                    </p>
                  </div>
                  <span className="lb-recent-duration">{item.duration}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Kartu Kirim CTA */}
          <aside className="lb-submit-card glass-1" aria-label="Kirim chant baru">
            <div className="lb-submit-icon" aria-hidden="true">
              <IconMegaphone />
            </div>
            <h3 className="lb-submit-title">Chant Favoritmu Belum Ada?</h3>
            <p className="lb-submit-desc">
              Unggah rekaman Anda sendiri atau sarankan chant baru untuk ditambahkan ke
              papan peringkat resmi Mokleters.
            </p>
            <button
              id="lb-submit-chant-btn"
              className="btn btn-primary"
              type="button"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--radius)' }}
            >
              Kirim Chant Baru <IconArrowUpRight />
            </button>
          </aside>
        </div>

      </div>

      {/* ── MINI FOOTER ── */}
      <footer className="lb-footer" role="contentinfo">
        <div className="container lb-footer-inner">
          <div className="lb-footer-brand">
            <p className="lb-footer-name">MOKLETERS</p>
            <p className="lb-footer-copy">© 2024 SMK Telkom Malang. Untuk Merah Putih. Memberdayakan siswa melalui ritme kebanggaan kita.</p>
          </div>
          <div className="lb-footer-col">
            <p className="lb-footer-col-title">Sekolah</p>
            <ul>
              <li><a href="#" className="lb-footer-link">Situs Sekolah</a></li>
              <li><a href="#" className="lb-footer-link">Hubungi Dukungan</a></li>
            </ul>
          </div>
          <div className="lb-footer-col">
            <p className="lb-footer-col-title">Legal</p>
            <ul>
              <li><a href="#" className="lb-footer-link">Kebijakan Privasi</a></li>
              <li><a href="#" className="lb-footer-link">Ketentuan Layanan</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
