import { useState } from 'react'
import './index.css'
import ChantLibrary from './ChantLibrary'
import PlaylistPage from './PlaylistPage'

/* =============================================
   ICON COMPONENTS (inline SVG)
   ============================================= */
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)

const IconPlay = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
)

const IconPause = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
)

const IconSkipBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19,20 9,12 19,4"/><line x1="5" y1="19" x2="5" y2="5"/>
  </svg>
)

const IconSkipForward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5,4 15,12 5,20"/><line x1="19" y1="5" x2="19" y2="19"/>
  </svg>
)

const IconShuffle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,3 21,3 21,8"/><line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21,16 21,21 16,21"/><line x1="15" y1="15" x2="21" y2="21"/>
    <line x1="4" y1="4" x2="9" y2="9"/>
  </svg>
)

const IconRepeat = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17,1 21,5 17,9"/><path d="M3,11V9a4,4,0,0,1,4-4h14"/>
    <polyline points="7,23 3,19 7,15"/><path d="M21,13v2a4,4,0,0,1-4,4H3"/>
  </svg>
)

const IconHeart = ({ filled = false }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const IconVolume = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10,10,0,0,1,0,14.14"/><path d="M15.54 8.46a5,5,0,0,1,0,7.07"/>
  </svg>
)

const IconMic = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)

const IconList = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
)

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
  </svg>
)

const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
)

const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconTrophy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8,21 12,17 16,21"/><line x1="12" y1="17" x2="12" y2="11"/>
    <path d="M7 4H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h3"/><path d="M17 4h3a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-3"/>
    <path d="M7 4a5 5 0 0 0 10 0"/>
  </svg>
)

const IconMaximize = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
  </svg>
)

const IconQueue = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
)

/* =============================================
   DATA
   ============================================= */
const anthemData = [
  { id: 1, title: 'Merah Putih Kebanggaan', tag: 'classic', tagLabel: 'Classic', plays: '1.5M', desc: 'The ultimate anthem of SMK Telkom Malang. Sung with pride before every match begins.', img: '/anthem1.png' },
  { id: 2, title: 'Sabit Utara', tag: 'anthem', tagLabel: 'Anthem', plays: '892K', desc: 'Rising chant from the North Stand.', img: '/anthem2.png' },
  { id: 3, title: 'Ritme Telkom', tag: 'top10', tagLabel: 'Top 10', plays: '740K', desc: 'Percussion-led rhythm anthem.', img: '/anthem3.png' },
  { id: 4, title: 'Braket Gelora', tag: 'anthem', tagLabel: 'Anthem', plays: '612K', desc: 'A devoted tune — a classic melody for the new generation.', img: '/anthem1.png' },
]

const leaderboardData = [
  { rank: 1, title: 'Merah Putih Kebanggaan', artist: 'SMK Telkom Malang — Official', plays: '1.5M plays', img: '/anthem1.png' },
  { rank: 2, title: 'Sabit Utara', artist: 'North Stand Choir', plays: '892K plays', img: '/anthem2.png' },
  { rank: 3, title: 'Ritme Telkom', artist: 'Percussion Unit', plays: '740K plays', img: '/anthem3.png' },
  { rank: 4, title: 'Braket Gelora', artist: 'Vocal Ensemble 2025', plays: '612K plays', img: '/anthem1.png' },
  { rank: 5, title: 'Api Kami Takkan Padam', artist: 'SMK Malang Ultras', plays: '541K plays', img: '/anthem2.png' },
]

const tagClass: Record<string, string> = { classic: 'tag-classic', anthem: 'tag-anthem', top10: 'tag-top10' }

/* =============================================
   PLAYER STATE (shared across pages)
   ============================================= */
export interface PlayerTrack {
  title: string
  artist: string
  img: string
  duration: string
  currentTime: string
  progress: number
}

const defaultTrack: PlayerTrack = {
  title: 'Mokleters Pride',
  artist: 'Opening Anthem • Mokleters Fans',
  img: '/chant-art.png',
  duration: '3:45',
  currentTime: '1:24',
  progress: 38,
}

/* =============================================
   PLAYER BAR COMPONENT
   ============================================= */
function PlayerBar({
  track,
  isPlaying,
  isLiked,
  onPlayPause,
  onLike,
}: {
  track: PlayerTrack
  isPlaying: boolean
  isLiked: boolean
  onPlayPause: () => void
  onLike: () => void
}) {
  return (
    <div className="player-bar" role="region" aria-label="Music player" id="player-bar">
      {/* Track info */}
      <div className="player-track-info">
        <img src={track.img} alt={track.title} className="player-thumb" />
        <div>
          <p className="player-track-name">{track.title}</p>
          <p className="player-track-artist">{track.artist}</p>
        </div>
        <button
          id="player-like-btn"
          className={`player-track-like${isLiked ? ' liked' : ''}`}
          type="button"
          aria-label={isLiked ? 'Unlike this track' : 'Like this track'}
          aria-pressed={isLiked}
          onClick={onLike}
        >
          <IconHeart filled={isLiked} />
        </button>
      </div>

      {/* Center: controls + progress */}
      <div className="player-controls-col">
        <div className="player-control-btns" role="group" aria-label="Playback controls">
          <button id="player-shuffle-btn" className="ctrl-btn" type="button" aria-label="Shuffle"><IconShuffle /></button>
          <button id="player-prev-btn" className="ctrl-btn" type="button" aria-label="Previous"><IconSkipBack /></button>
          <button
            id="player-play-btn"
            className="ctrl-btn ctrl-btn-play"
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            aria-pressed={isPlaying}
            onClick={onPlayPause}
          >
            {isPlaying ? <IconPause size={20} /> : <IconPlay size={20} />}
          </button>
          <button id="player-next-btn" className="ctrl-btn" type="button" aria-label="Next"><IconSkipForward /></button>
          <button id="player-repeat-btn" className="ctrl-btn" type="button" aria-label="Repeat"><IconRepeat /></button>
        </div>
        <div className="player-progress" role="group" aria-label="Track progress">
          <span className="player-time" aria-label="Current time">{track.currentTime}</span>
          <div
            className="player-progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={track.progress}
            id="player-progress-bar"
          >
            <div className="player-progress-fill" style={{ width: `${track.progress}%` }}>
              <div className="player-progress-thumb" aria-hidden="true" />
            </div>
          </div>
          <span className="player-time" aria-label="Total duration">{track.duration}</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="player-right-controls">
        <button id="player-crowd-mode-btn" className="player-crowd-mode" type="button" aria-label="Crowd Mode lyrics">
          <IconMic />
          Crowd Mode
        </button>
        <button id="player-queue-btn" className="ctrl-btn" type="button" aria-label="Queue"><IconQueue /></button>
        <button id="player-playlist-btn" className="ctrl-btn" type="button" aria-label="Playlist"><IconList /></button>
        <div className="volume-slider" role="group" aria-label="Volume">
          <button id="player-volume-btn" className="ctrl-btn" type="button" aria-label="Volume"><IconVolume /></button>
          <div className="volume-track" role="slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={75} id="player-volume-slider">
            <div className="volume-fill" />
          </div>
        </div>
        <button id="player-fullscreen-btn" className="ctrl-btn" type="button" aria-label="Fullscreen"><IconMaximize /></button>
      </div>
    </div>
  )
}

/* =============================================
   HOME PAGE
   ============================================= */
function HomePage({ onPlay }: { onPlay: () => void }) {
  return (
    <>
      {/* HERO */}
      <section id="hero" className="hero-section" aria-label="Hero section">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow" aria-label="Live event">
            <span className="live-dot" aria-hidden="true" />
            LIVE — 12 PLAYERS ACTIVE
          </div>
          <h1 className="hero-title">
            ONE VOICE.<br />
            <span className="accent">ONE SCHOOL.</span><br />
            <span className="accent-bright">ONE SPIRIT.</span>
          </h1>
          <p className="hero-subtitle">
            The official chant library for SMK Telkom Malang supporters. Ignite the fire,
            feel the crowd, and keep the red and white flame burning bright.
          </p>
          <div className="hero-actions">
            <button id="hero-explore-btn" className="btn btn-primary" type="button">
              Explore Chants <IconArrowRight />
            </button>
            <button id="hero-rankings-btn" className="btn btn-glass" type="button">
              View Rankings
            </button>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>SCROLL TO FEEL THE RHYTHM</span>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="stats-section" aria-label="Statistics">
        <div className="container">
          <dl className="stats-grid">
            {[
              { value: '247', label: 'Chants Available' },
              { value: '12K', label: 'Active Supporters' },
              { value: '94', label: 'Matches Covered' },
              { value: '3.2M', label: 'Total Plays' },
            ].map((stat) => (
              <div key={stat.label} className="stat-item">
                <dt className="stat-number">{stat.value}</dt>
                <dd className="stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* HOTTEST ANTHEMS */}
      <section id="anthems" className="section">
        <div className="container">
          <header className="section-header">
            <div>
              <p className="section-label">Featured This Week</p>
              <h2 className="section-title">Hottest Anthems</h2>
              <p style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 4 }}>Most played chants in the stadium this week.</p>
            </div>
            <a href="#" id="view-all-anthems" className="section-view-all">View All <IconArrowRight /></a>
          </header>
          <div className="anthems-grid">
            <article className="anthem-featured" id="anthem-featured-card">
              <div className="playlist-card">
                <img src={anthemData[0].img} alt={anthemData[0].title} className="playlist-card-img" />
                <div className="playlist-card-vignette" aria-hidden="true" />
                <div className="playlist-card-content">
                  <span className={`playlist-card-tag ${tagClass[anthemData[0].tag]}`}>{anthemData[0].tagLabel}</span>
                  <h3 className="playlist-card-title">{anthemData[0].title}</h3>
                  <p className="playlist-card-meta">{anthemData[0].plays} plays</p>
                  <p style={{ fontSize: 13, color: 'rgba(229,226,225,0.60)', marginTop: 6, lineHeight: 1.5 }}>{anthemData[0].desc}</p>
                  <button id="featured-play-btn" className="playlist-card-play" type="button" aria-label={`Play ${anthemData[0].title}`} onClick={onPlay}>
                    <IconPlay size={18} />
                  </button>
                </div>
              </div>
            </article>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[1, 2].map((i) => (
                <div key={i} className="anthem-side">
                  <div className="playlist-card">
                    <img src={anthemData[i].img} alt={anthemData[i].title} className="playlist-card-img" />
                    <div className="playlist-card-vignette" aria-hidden="true" />
                    <div className="playlist-card-content">
                      <span className={`playlist-card-tag ${tagClass[anthemData[i].tag]}`}>{anthemData[i].tagLabel}</span>
                      <h3 className="playlist-card-title">{anthemData[i].title}</h3>
                      <p className="playlist-card-meta">{anthemData[i].plays} plays</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="anthem-side-inner" id="anthem-braket-row" role="article">
                <img src={anthemData[3].img} alt={anthemData[3].title} className="anthem-side-thumb" />
                <div className="anthem-side-info">
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary-container)', marginBottom: 4 }}>{anthemData[3].tagLabel}</p>
                  <p className="anthem-side-title">{anthemData[3].title}</p>
                  <p className="anthem-side-sub">{anthemData[3].desc}</p>
                </div>
                <button id="anthem-braket-play" className="anthem-side-btn" type="button" onClick={onPlay}>Listen Now <IconArrowRight /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CROWD MODE */}
      <section id="crowd-mode" className="crowd-section" aria-label="Crowd Mode feature">
        <div className="crowd-bg-glow" aria-hidden="true" />
        <div className="container">
          <div className="crowd-text-col">
            <div className="live-badge"><span className="live-dot" aria-hidden="true" />LIVE — 12 PLAYERS</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-on-surface)', lineHeight: 1.0, marginTop: 20, marginBottom: 12 }}>
              ENTER THE<br /><span style={{ color: 'var(--color-primary-bright)' }}>CROWD MODE</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-outline)', maxWidth: 400 }}>
              Turn your phone into a stadium centerpiece. High-contrast lyrics, synchronized light shows, and real-time chanting guides to lead your section with absolute precision.
            </p>
            <ul className="crowd-features">
              {[
                { icon: <IconZap />, title: 'Dynamic Display', sub: 'XL lyrics for stadium visibility' },
                { icon: <IconList />, title: 'Multi-device sync', sub: 'Synchronization for massive chants' },
                { icon: <IconMapPin />, title: 'Section Mapping', sub: 'Screen from choreography matching the beat' },
              ].map((f) => (
                <li key={f.title} className="crowd-feature-item">
                  <div className="crowd-feature-icon" aria-hidden="true">{f.icon}</div>
                  <div className="crowd-feature-text"><strong>{f.title}</strong><span>{f.sub}</span></div>
                </li>
              ))}
            </ul>
            <button id="crowd-mode-launch-btn" className="btn btn-primary" type="button">Launch Player <IconZap /></button>
          </div>
          <div className="crowd-device-col">
            <div className="crowd-device">
              <div className="crowd-device-badge" role="status"><span className="live-dot" aria-hidden="true" />LIVE SESSION</div>
              <div className="crowd-device-frame" aria-label="Lyrics display">
                <p className="crowd-lyrics-prev" aria-hidden="true">TELKOM...</p>
                <p className="crowd-lyrics-current">MALANG!</p>
                <p className="crowd-lyrics-next" aria-hidden="true">TERBAIK...</p>
                <div className="crowd-progress-bar" aria-hidden="true"><div className="crowd-progress-fill" /></div>
              </div>
              <div className="crowd-device-supporters">
                <div className="supporter-avatars" aria-hidden="true">
                  <div className="supporter-avatar">A</div>
                  <div className="supporter-avatar">R</div>
                  <div className="supporter-avatar">+</div>
                </div>
                <div className="supporter-text"><strong>12 Active</strong><span>supporters online</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" className="section">
        <div className="container">
          <header className="section-header">
            <div>
              <p className="section-label">This Season</p>
              <h2 className="section-title">Top Chants</h2>
            </div>
            <a href="#" id="view-all-leaderboard" className="section-view-all">Full Rankings <IconTrophy /></a>
          </header>
          <ol className="leaderboard-list" aria-label="Top chants leaderboard">
            {leaderboardData.map((item) => (
              <li key={item.rank} className={`leaderboard-item${item.rank <= 3 ? ' top-rank' : ''}`} id={`leaderboard-item-${item.rank}`}>
                <span className="leaderboard-rank">{item.rank}</span>
                <img src={item.img} alt="" aria-hidden="true" className="leaderboard-thumb" />
                <div className="leaderboard-info">
                  <p className="leaderboard-name">{item.title}</p>
                  <p className="leaderboard-sub">{item.artist}</p>
                </div>
                <div className="leaderboard-plays">{item.plays}<span>This week</span></div>
                <button id={`leaderboard-play-${item.rank}`} className="leaderboard-play-btn" type="button" aria-label={`Play ${item.title}`} onClick={onPlay}>
                  <IconPlay size={14} />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div>
              <p className="footer-brand-name">MOKLETERS</p>
              <p className="footer-brand-desc">The heartbeat of SMK Telkom Malang supporters. We are the voice that never silences, and the fire that never dies.</p>
            </div>
            <div>
              <p className="footer-col-title">Platform</p>
              <ul className="footer-links">{['Top Chants','School Songs','Media Gallery'].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div>
              <p className="footer-col-title">Site Index</p>
              <ul className="footer-links">{['About Us','Leaderboard','School Story','Content Support'].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div>
              <p className="footer-col-title">Newsletter</p>
              <p style={{ fontSize: 13, color: 'var(--color-outline)', lineHeight: 1.6, marginBottom: 8 }}>Get notified for new chants and matchday events.</p>
              <form id="footer-newsletter-form" className="footer-newsletter-form" onSubmit={e=>e.preventDefault()}>
                <input id="newsletter-email-input" className="footer-input" type="email" placeholder="Email address" aria-label="Email for newsletter" />
                <button id="newsletter-join-btn" className="btn btn-primary" type="submit" style={{ padding:'10px 16px', borderRadius:'var(--radius)', fontSize:13 }}>Join</button>
              </form>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <p>© 2025 SMK Telkom Malang Fan Club. All Rights Reserved.</p>
            <div style={{ display:'flex', gap:20 }}>
              {['Privacy Policy','Terms','Contact'].map(l=><a key={l} href="#" style={{ fontSize:12, color:'var(--color-outline)' }}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

/* =============================================
   MAIN APP
   ============================================= */
export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const [currentTrack, setCurrentTrack] = useState<PlayerTrack>(defaultTrack)

  const navLinks = ['Home', 'Chants', 'Playlist', 'Leaderboard', 'About']

  const handlePlay = (track?: Partial<PlayerTrack>) => {
    if (track) setCurrentTrack({ ...defaultTrack, ...track })
    setIsPlaying(true)
  }

  const renderPage = () => {
    switch (activeNav) {
      case 'Chants':
        return <ChantLibrary onPlay={handlePlay} />
      case 'Playlist':
        return (
          <PlaylistPage
            onPlay={handlePlay}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(p => !p)}
          />
        )
      default:
        return <HomePage onPlay={() => setIsPlaying(p => !p)} />
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container">
          <a href="#" className="navbar-logo" aria-label="Stadium Pulse home" onClick={e=>{e.preventDefault();setActiveNav('Home')}}>
            <span className="navbar-logo-dot" aria-hidden="true" />
            MOKLETERS
          </a>
          <ul className="navbar-nav" role="list">
            {navLinks.map(link => (
              <li key={link}>
                <a
                  href="#"
                  id={`nav-${link.toLowerCase()}`}
                  className={activeNav === link ? 'active' : ''}
                  onClick={e => { e.preventDefault(); setActiveNav(link) }}
                  aria-current={activeNav === link ? 'page' : undefined}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar-actions">
            <label className="navbar-search" htmlFor="navbar-search-input">
              <IconSearch />
              <input id="navbar-search-input" type="search" placeholder="Search all chants..." aria-label="Search chants" />
            </label>
            <div className="navbar-avatar" role="button" tabIndex={0} aria-label="User account">S</div>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main style={{ paddingTop: activeNav !== 'Home' ? '64px' : '0' }}>
        {renderPage()}
      </main>

      {/* PLAYER BAR */}
      <PlayerBar
        track={currentTrack}
        isPlaying={isPlaying}
        isLiked={isLiked}
        onPlayPause={() => setIsPlaying(p => !p)}
        onLike={() => setIsLiked(l => !l)}
      />
    </>
  )
}
