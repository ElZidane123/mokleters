import { useState, useRef, useEffect, useCallback } from 'react'
import './index.css'
import ChantLibrary from './pages/ChantLibrary'
import PlaylistPage from './pages/PlaylistPage'
import ChantDetailPage from './pages/ChantDetailPage'
import AboutPage from './pages/AboutPage'
import DeveloperPage from './pages/DeveloperPage'
import mokletersLogo from './assets/Mokleters logo.png'
import mokletsMascot from './assets/mascot.png'
import mokletersGraffiti from './assets/Group 1261154060 (1).png'
import { CHANTS } from './data/lyrics'
import type { ChantData } from './data/lyrics'

/* =============================================
   ICON COMPONENTS (inline SVG)
   ============================================= */
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)

const IconPlay = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const IconPause = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
)

const IconSkipBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19,20 9,12 19,4" /><line x1="5" y1="19" x2="5" y2="5" />
  </svg>
)

const IconSkipForward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5,4 15,12 5,20" /><line x1="19" y1="5" x2="19" y2="19" />
  </svg>
)

const IconShuffle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,3 21,3 21,8" /><line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21,16 21,21 16,21" /><line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
)

const IconRepeat = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17,1 21,5 17,9" /><path d="M3,11V9a4,4,0,0,1,4-4h14" />
    <polyline points="7,23 3,19 7,15" /><path d="M21,13v2a4,4,0,0,1-4,4H3" />
  </svg>
)

const IconHeart = ({ filled = false }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const IconVolume = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><path d="M19.07 4.93a10,10,0,0,1,0,14.14" /><path d="M15.54 8.46a5,5,0,0,1,0,7.07" />
  </svg>
)

const IconMic = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

const IconList = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
)



const IconTrophy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8,21 12,17 16,21" /><line x1="12" y1="17" x2="12" y2="11" />
    <path d="M7 4H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h3" /><path d="M17 4h3a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-3" />
    <path d="M7 4a5 5 0 0 0 10 0" />
  </svg>
)

const IconMaximize = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
)

const IconQueue = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
)

/* =============================================
   DATA
   ============================================= */
const leaderboardData = [
  { rank: 1, title: 'Kami Datang Lagi', artist: 'Chant Mokleters', plays: '1.5Jt putaran', img: '/anthem1.png' },
  { rank: 2, title: 'SMK Telkom Malang Kami Datang', artist: 'Anthem Pembuka', plays: '892Rb putaran', img: '/anthem2.png' },
  { rank: 3, title: 'Bukalah Matamu', artist: 'Tempo Pertandingan', plays: '740Rb putaran', img: '/anthem3.png' },
  { rank: 4, title: 'Mokleters Mokleters Wikusama', artist: 'Chant Kebanggaan', plays: '612Rb putaran', img: '/anthem1.png' },
  { rank: 5, title: 'Kami Pendukung Telkom Malang', artist: 'Tempo Pertandingan', plays: '541Rb putaran', img: '/anthem2.png' },
]

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
  src?: string
  chantId?: number
}

const defaultTrack: PlayerTrack = {
  title: 'Mokleters Pride',
  artist: 'Anthem Pembuka •  ',
  img: '/chant-art.png',
  duration: '3:45',
  currentTime: '0:00',
  progress: 0,
}

/* =============================================
   PLAYER BAR COMPONENT
   ============================================= */
function PlayerBar({
  track,
  isPlaying,
  isLiked,
  isShuffle,
  isRepeat,
  volume,
  onPlayPause,
  onLike,
  onPrev,
  onNext,
  onShuffle,
  onRepeat,
  onSeek,
  onVolume,
  onOpenDetail,
  onToggleCrowdMode,
  onToggleQueue,
  onOpenPlaylist,
  onClose,
}: {
  track: PlayerTrack
  isPlaying: boolean
  isLiked: boolean
  isShuffle: boolean
  isRepeat: boolean
  volume: number
  onPlayPause: () => void
  onLike: () => void
  onPrev: () => void
  onNext: () => void
  onShuffle: () => void
  onRepeat: () => void
  onSeek: (pct: number) => void
  onVolume: (v: number) => void
  onOpenDetail: () => void
  onToggleCrowdMode: () => void
  onToggleQueue: () => void
  onOpenPlaylist: () => void
  onClose: () => void
}) {
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onSeek(pct)
  }
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onVolume(Math.round(pct * 100))
  }

  return (
    <div className="player-bar" role="region" aria-label="Pemutar musik" id="player-bar">
      {/* Info lagu */}
      <div className="player-track-info" style={{ cursor: 'pointer' }} onClick={onOpenDetail} title="Lihat detail & lirik">
        <img src={track.img} alt={track.title} className="player-thumb" />
        <div>
          <p className="player-track-name">{track.title}</p>
          <p className="player-track-artist">{track.artist}</p>
        </div>
        <button
          id="player-like-btn"
          className={`player-track-like${isLiked ? ' liked' : ''}`}
          type="button"
          aria-label={isLiked ? 'Batal sukai lagu ini' : 'Sukai lagu ini'}
          aria-pressed={isLiked}
          onClick={e => { e.stopPropagation(); onLike() }}
        >
          <IconHeart filled={isLiked} />
        </button>
      </div>

      {/* Tengah: kontrol + kemajuan */}
      <div className="player-controls-col">
        <div className="player-control-btns" role="group" aria-label="Kontrol pemutaran">
          <button
            id="player-shuffle-btn"
            className={`ctrl-btn${isShuffle ? ' ctrl-btn--active' : ''}`}
            type="button"
            aria-label="Acak"
            aria-pressed={isShuffle}
            onClick={onShuffle}
          >
            <IconShuffle />
          </button>
          <button id="player-prev-btn" className="ctrl-btn" type="button" aria-label="Sebelumnya" onClick={onPrev}>
            <IconSkipBack />
          </button>
          <button
            id="player-play-btn"
            className="ctrl-btn ctrl-btn-play"
            type="button"
            aria-label={isPlaying ? 'Jeda' : 'Putar'}
            aria-pressed={isPlaying}
            onClick={onPlayPause}
          >
            {isPlaying ? <IconPause size={20} /> : <IconPlay size={20} />}
          </button>
          <button id="player-next-btn" className="ctrl-btn" type="button" aria-label="Berikutnya" onClick={onNext}>
            <IconSkipForward />
          </button>
          <button
            id="player-repeat-btn"
            className={`ctrl-btn${isRepeat ? ' ctrl-btn--active' : ''}`}
            type="button"
            aria-label="Ulangi"
            aria-pressed={isRepeat}
            onClick={onRepeat}
          >
            <IconRepeat />
          </button>
        </div>
        <div className="player-progress" role="group" aria-label="Kemajuan lagu">
          <span className="player-time" aria-label="Waktu sekarang">{track.currentTime}</span>
          <div
            className="player-progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(track.progress)}
            id="player-progress-bar"
            onClick={handleProgressClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="player-progress-fill" style={{ width: `${track.progress}%` }}>
              <div className="player-progress-thumb" aria-hidden="true" />
            </div>
          </div>
          <span className="player-time" aria-label="Total durasi">{track.duration}</span>
        </div>
      </div>

      {/* Kontrol kanan */}
      <div className="player-right-controls">
        <button
          id="player-close-btn"
          className="player-close-btn"
          type="button"
          aria-label="Tutup pemutar"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          ×
        </button>
        <button
          id="player-crowd-mode-btn"
          className="player-crowd-mode"
          type="button"
          aria-label="Lirik Mode Tribun"
          onClick={(e) => {
            e.stopPropagation()
            onToggleCrowdMode()
          }}
        >
          <IconMic />
          Mode Tribun
        </button>
        <button
          id="player-queue-btn"
          className="ctrl-btn"
          type="button"
          aria-label="Antrean"
          onClick={(e) => {
            e.stopPropagation()
            onToggleQueue()
          }}
        >
          <IconQueue />
        </button>
        <button
          id="player-playlist-btn"
          className="ctrl-btn"
          type="button"
          aria-label="Playlist"
          onClick={(e) => {
            e.stopPropagation()
            onOpenPlaylist()
          }}
        >
          <IconList />
        </button>
        <div className="volume-slider" role="group" aria-label="Volume">
          <button
            id="player-volume-btn"
            className="ctrl-btn"
            type="button"
            aria-label="Volume"
            onClick={() => onVolume(volume === 0 ? 70 : 0)}
          >
            <IconVolume />
          </button>
          <div
            className="volume-track"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={volume}
            id="player-volume-slider"
            onClick={handleVolumeClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="volume-fill" style={{ width: `${volume}%` }} />
          </div>
        </div>
        <button
          id="player-fullscreen-btn"
          className="ctrl-btn"
          type="button"
          aria-label="Layar Penuh"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {})
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen()
              }
            }
          }}
        >
          <IconMaximize />
        </button>
      </div>
    </div>
  )
}

/* =============================================
   HOME PAGE
   ============================================= */
function HomePage({
  onPlayTrack,
  onNavigate,
}: {
  onPlayTrack: (chant: any) => void
  onNavigate: (page: string) => void
}) {
  const popularChants = [
    { chant: CHANTS.find(c => c.id === 6)!, plays: '1.5Jt', tagLabel: 'Anthem Penutup', tagClass: 'tag-classic' },
    { chant: CHANTS.find(c => c.id === 1)!, plays: '892Rb', tagLabel: 'Chant Utama', tagClass: 'tag-anthem' },
    { chant: CHANTS.find(c => c.id === 2)!, plays: '740Rb', tagLabel: 'Anthem Pembuka', tagClass: 'tag-top10' },
    { chant: CHANTS.find(c => c.id === 4)!, plays: '612Rb', tagLabel: 'Chant Kebanggaan', tagClass: 'tag-anthem' },
  ].filter(item => item.chant !== undefined);

  const featured = popularChants[0];
  const sideChants = [popularChants[1], popularChants[2]];
  const bottomChant = popularChants[3];

  return (
    <>
      {/* HERO */}
      <section id="hero" className="hero-section" aria-label="Bagian hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">
            MOKLETERS<br />
            <span className="accent">FIGHT TOGETHER</span><br />
            <span className="accent-bright">NEVER SURENDER</span>
          </h1>
          <p className="hero-subtitle">
            Perpustakaan chant resmi untuk pendukung SMK Telkom Malang. Nyalakan api semangat,
            rasakan riuhnya tribun, dan jaga agar bara merah putih tetap menyala.
          </p>
          <div className="hero-actions">
            <button id="hero-explore-btn" className="btn btn-primary" type="button" onClick={() => onNavigate('Chant')}>
              Jelajahi Chant <IconArrowRight />
            </button>
            <button id="hero-rankings-btn" className="btn btn-glass" type="button" onClick={() => onNavigate('Tentang')}>
              Tentang
            </button>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section id="stats" className="stats-section" aria-label="Statistik">
        <div className="container">
          <dl className="stats-grid">
            {[
              { value: `${CHANTS.length}`, label: 'Chant Tersedia' },
              { value: '12K', label: 'Pendukung Aktif' },
              { value: '94', label: 'Pertandingan Diliput' },
              { value: '3.2Jt', label: 'Total Putaran' },
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
              <p className="section-label">Unggulan Minggu Ini</p>
              <h2 className="section-title">Anthem Terpopuler</h2>
              <p style={{ fontSize: 13, color: 'var(--color-outline)', marginTop: 4 }}>Chant yang paling sering dinyanyikan di stadion minggu ini.</p>
            </div>
            <a href="#" id="view-all-anthems" className="section-view-all" onClick={e => { e.preventDefault(); onNavigate('Chant'); }}>Lihat Semua <IconArrowRight /></a>
          </header>
          {featured && (
            <div className="anthems-grid">
              <article className="anthem-featured" id="anthem-featured-card">
                <div className="playlist-card">
                  <img src={featured.chant.img} alt={featured.chant.title} className="playlist-card-img" />
                  <div className="playlist-card-vignette" aria-hidden="true" />
                  <div className="playlist-card-content">
                    <span className={`playlist-card-tag ${featured.tagClass}`}>{featured.tagLabel}</span>
                    <h3 className="playlist-card-title">{featured.chant.title}</h3>
                    <p className="playlist-card-meta">{featured.plays} putaran</p>
                    <p style={{ fontSize: 13, color: 'rgba(229,226,225,0.60)', marginTop: 6, lineHeight: 1.5 }}>
                      Lirik: {featured.chant.lyrics.slice(0, 3).map(l => l.text).join(', ')}...
                    </p>
                    <button id="featured-play-btn" className="playlist-card-play" type="button" aria-label={`Putar ${featured.chant.title}`} onClick={() => onPlayTrack(featured.chant)}>
                      <IconPlay size={18} />
                    </button>
                  </div>
                </div>
              </article>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {sideChants.map((item, idx) => item && (
                  <div key={idx} className="anthem-side" style={{ cursor: 'pointer' }} onClick={() => onPlayTrack(item.chant)}>
                    <div className="playlist-card">
                      <img src={item.chant.img} alt={item.chant.title} className="playlist-card-img" />
                      <div className="playlist-card-vignette" aria-hidden="true" />
                      <div className="playlist-card-content">
                        <span className={`playlist-card-tag ${item.tagClass}`}>{item.tagLabel}</span>
                        <h3 className="playlist-card-title">{item.chant.title}</h3>
                        <p className="playlist-card-meta">{item.plays} putaran</p>
                      </div>
                    </div>
                  </div>
                ))}
                {bottomChant && (
                  <div className="anthem-side-inner" id="anthem-braket-row" role="article">
                    <img src={bottomChant.chant.img} alt={bottomChant.chant.title} className="anthem-side-thumb" />
                    <div className="anthem-side-info">
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary-container)', marginBottom: 4 }}>{bottomChant.tagLabel}</p>
                      <p className="anthem-side-title">{bottomChant.chant.title}</p>
                      <p className="anthem-side-sub">Lirik: {bottomChant.chant.lyrics[0]?.text}...</p>
                    </div>
                    <button id="anthem-braket-play" className="anthem-side-btn" type="button" onClick={() => onPlayTrack(bottomChant.chant)}>Dengar Sekarang <IconArrowRight /></button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MASCOT SECTION */}
      <section id="mascot-intro" className="mascot-section" aria-label="Maskot Mokleters" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="crowd-bg-glow" aria-hidden="true" />
        <div className="container" style={{ display: 'block' }}>
          <div className="mascot-grand-card">
            <div className="crowd-text-col" style={{ flex: '1 1 55%', maxWidth: '600px' }}>
              <p className="section-label" style={{ color: 'var(--color-primary-bright)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Maskot Mokleters</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--color-on-surface)', lineHeight: 1.1, margin: '8px 0 24px' }}>
                MEMPERKENALKAN<br /><span style={{ color: 'var(--color-primary-bright)', textShadow: '0 0 15px rgba(215,38,46,0.3)' }}>BOMBI</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p className="mascot-intro-primary">
                  Bombi merupakan logo yang terbentuk berlandaskan kearifan lokal dengan menyiratkan perangai tokoh Gatotkaca sewaktu kecil bernama Tetuko. Tetuko adalah kesatria yang memiliki kesaktian paling sempurna, hebat di segala medan baik di darat maupun di udara. Mempunyai karakter tangkas, lincah, kuat, dan trengginas.
                </p>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(215, 38, 46, 0.4), transparent)', width: '100%' }} />
                <p className="mascot-intro-secondary">
                  Harapannya, dengan filosofi tersebut semua anak Moklet dapat memiliki karakter Tetuko. Tidak hanya memiliki kemampuan yang komplet di atas rata-rata akademis melainkan juga memiliki softskill dan hardskill. Hal ini bertujuan agar anak-anak Moklet yang hebat dapat berdaya saing dan disegani oleh sesama, seperti Tetuko (Gatot Kaca kecil). Jagoan-jagoan Moklet kelak akan terbang tinggi menjulang cakrawala, meraih kesuksesan, dan mengharumkan nama MOKLET tercinta.
                </p>
              </div>
            </div>
            <div className="crowd-device-col" style={{ flex: '1 1 40%', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
              <div className="crowd-mascot-wrap" style={{ minHeight: 'auto' }}>
                <img src={mokletsMascot} alt="Maskot Mokleters" className="crowd-mascot-img" />
                <div className="crowd-mascot-badge" role="status">
                  <span>Mokleters Maskot</span>
                </div>
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
              <p className="section-label">Musim Ini</p>
              <h2 className="section-title">Chant Teratas</h2>
            </div>
            <a href="#" id="view-all-leaderboard" className="section-view-all" onClick={e => { e.preventDefault(); onNavigate('Chant'); }}>Peringkat Lengkap <IconTrophy /></a>
          </header>
          <ol className="leaderboard-list" aria-label="Papan peringkat chant teratas">
            {leaderboardData.map((item) => (
              <li key={item.rank} className={`leaderboard-item${item.rank <= 3 ? ' top-rank' : ''}`} id={`leaderboard-item-${item.rank}`}>
                <span className="leaderboard-rank">{item.rank}</span>
                <img src={item.img} alt="" aria-hidden="true" className="leaderboard-thumb" />
                <div className="leaderboard-info">
                  <p className="leaderboard-name">{item.title}</p>
                  <p className="leaderboard-sub">{item.artist}</p>
                </div>
                <button id={`leaderboard-play-${item.rank}`} className="leaderboard-play-btn" type="button" aria-label={`Putar ${item.title}`} onClick={() => {
                  const ch = CHANTS.find(c => c.id === item.rank);
                  if (ch) onPlayTrack(ch);
                }}>
                  <IconPlay size={14} />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="footer-graffiti-wrap" aria-hidden="true">
          <img src={mokletersGraffiti} alt="" className="footer-graffiti-img" />
        </div>
        <div className="container">
          <div className="footer-grid">
            <div>
              <img src={mokletersLogo} alt="Mokleters" className="footer-logo-img" />
              <p className="footer-brand-name">MOKLETERS</p>
              <p className="footer-brand-desc">Detak jantung pendukung SMK Telkom Malang. Kami adalah suara yang tak pernah padam, dan api yang tak pernah mati.</p>
            </div>
            <div>
              <p className="footer-col-title">Platform</p>
              <ul className="footer-links">
                <li>
                  <a href="#" onClick={e => {
                    e.preventDefault();
                    const el = document.getElementById('leaderboard');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}>Chant Teratas</a>
                </li>
                <li>
                  <a href="#" onClick={e => { e.preventDefault(); onNavigate('Chant'); }}>Lagu Sekolah</a>
                </li>
                <li>
                  <a href="#" onClick={e => { e.preventDefault(); onNavigate('Chant'); }}>Galeri Media</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-col-title">Indeks Situs</p>
              <ul className="footer-links">
                <li>
                  <a href="#" onClick={e => { e.preventDefault(); onNavigate('Tentang'); }}>Tentang Kami</a>
                </li>
                <li>
                  <a href="#" onClick={e => { e.preventDefault(); onNavigate('Tentang'); }}>Sejarah Sekolah</a>
                </li>
                <li>
                  <a href="#" onClick={e => { e.preventDefault(); onNavigate('Developer'); }}>Dukungan Konten</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-col-title">Buletin</p>
              <p style={{ fontSize: 13, color: 'var(--color-outline)', lineHeight: 1.6, marginBottom: 8 }}>Dapatkan info terbaru tentang chant baru dan acara pertandingan.</p>
              <form id="footer-newsletter-form" className="footer-newsletter-form" onSubmit={e => {
                e.preventDefault();
                const emailInput = document.getElementById('newsletter-email-input') as HTMLInputElement;
                if (emailInput && emailInput.value) {
                  alert(`Terima kasih! Email ${emailInput.value} berhasil didaftarkan ke Buletin Mokleters.`);
                  emailInput.value = '';
                }
              }}>
                <input id="newsletter-email-input" className="footer-input" type="email" placeholder="Alamat email" aria-label="Email untuk buletin" required />
                <button id="newsletter-join-btn" className="btn btn-primary" type="submit" style={{ padding: '10px 16px', borderRadius: 'var(--radius)', fontSize: 13 }}>Gabung</button>
              </form>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <p>© 2025 Klub Penggemar SMK Telkom Malang. Hak Cipta Dilindungi Undang-Undang.</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Kebijakan Privasi', 'Ketentuan', 'Kontak'].map(l => <a key={l} href="#" style={{ fontSize: 12, color: 'var(--color-outline)' }}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

/* =============================================
   GLOBAL AUDIO ENGINE HELPERS
   ============================================= */
function fmtSec(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* =============================================
   MAIN APP
   ============================================= */
export default function App() {
  // ── Navigation ──
  const [activeNav, setActiveNav] = useState('Beranda')
  const [detailChant, setDetailChant] = useState<ChantData | null>(null)

  // ── Audio engine state ──
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingChantId, setPlayingChantId] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<PlayerTrack>(defaultTrack)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCrowdMode, setIsCrowdMode] = useState(false)
  const [isQueueOpen, setIsQueueOpen] = useState(false)
  const [isPlayerVisible, setIsPlayerVisible] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // ── Derived progress ──
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0

  const navLinks = ['Beranda', 'Chant', 'Playlist', 'Tentang']

  // ── Stop & cleanup audio ──
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current.ontimeupdate = null
      audioRef.current.onended = null
      audioRef.current.onloadedmetadata = null
      audioRef.current = null
    }
    setIsPlaying(false)
    setElapsed(0)
    setDuration(0)
  }, [])

  // ── Web Audio Synth for Live Crowd Effects ──
  const playTribunSound = (type: 'genderang' | 'terompet' | 'sorakan') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      if (type === 'genderang') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        
        osc.frequency.setValueAtTime(120, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        
        gain.gain.setValueAtTime(1.2, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        
        osc.start()
        osc.stop(ctx.currentTime + 0.4)
      } else if (type === 'terompet') {
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()
        
        osc1.type = 'sawtooth'
        osc2.type = 'sawtooth'
        
        osc1.frequency.setValueAtTime(294, ctx.currentTime)
        osc2.frequency.setValueAtTime(296, ctx.currentTime)
        
        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)
        
        gain.gain.setValueAtTime(0.25, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6)
        
        osc1.start()
        osc2.start()
        osc1.stop(ctx.currentTime + 0.6)
        osc2.stop(ctx.currentTime + 0.6)
      } else if (type === 'sorakan') {
        const bufferSize = ctx.sampleRate * 1.5
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1
        }
        
        const noise = ctx.createBufferSource()
        noise.buffer = buffer
        
        const filter = ctx.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.value = 850
        filter.Q.value = 1.2
        
        const gain = ctx.createGain()
        
        noise.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        
        gain.gain.setValueAtTime(0.35, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2)
        
        noise.start()
      }
    } catch (err) {
      console.warn('AudioContext not allowed or supported', err)
    }
  }

  const handleNavClick = (link: string) => {
    setActiveNav(link)
    setMobileMenuOpen(false)
  }

  // ── Play a chant by id ──
  const playChant = useCallback((chant: ChantData) => {
    stopAudio()

    const audio = new Audio(chant.src)
    audioRef.current = audio
    audio.volume = volume / 100

    audio.onloadedmetadata = () => setDuration(audio.duration)

    audio.ontimeupdate = () => {
      setElapsed(audio.currentTime)
      setCurrentTrack(prev => ({
        ...prev,
        currentTime: fmtSec(audio.currentTime),
        progress: audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0,
      }))
    }

    audio.onended = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play().catch(() => { })
        return
      }
      // Auto-advance to next
      const idx = CHANTS.findIndex(c => c.id === chant.id)
      const nextChants = isShuffle
        ? CHANTS.filter(c => c.id !== chant.id)
        : null
      const nextChant = nextChants
        ? nextChants[Math.floor(Math.random() * nextChants.length)]
        : CHANTS[(idx + 1) % CHANTS.length]
      if (nextChant) playChant(nextChant)
      else { setIsPlaying(false); setPlayingChantId(null) }
    }

    audio.play().catch(err => console.warn('Audio play failed:', err))
    setPlayingChantId(chant.id)
    setIsPlaying(true)
    setElapsed(0)
    setIsPlayerVisible(true)

    setCurrentTrack({
      title: chant.title,
      artist: `${chant.category}`,
      img: chant.img,
      duration: chant.duration,
      currentTime: '0:00',
      progress: 0,
      src: chant.src,
      chantId: chant.id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopAudio, volume, isRepeat, isShuffle])

  // ── Toggle play/pause ──
  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => { })
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  // ── Prev ──
  const handlePrev = useCallback(() => {
    const idx = CHANTS.findIndex(c => c.id === playingChantId)
    if (idx < 0) { if (CHANTS[0]) playChant(CHANTS[0]); return }
    const prevIdx = idx === 0 ? CHANTS.length - 1 : idx - 1
    playChant(CHANTS[prevIdx])
  }, [playingChantId, playChant])

  // ── Next ──
  const handleNext = useCallback(() => {
    const idx = CHANTS.findIndex(c => c.id === playingChantId)
    if (idx < 0) { if (CHANTS[0]) playChant(CHANTS[0]); return }
    if (isShuffle) {
      const others = CHANTS.filter(c => c.id !== playingChantId)
      playChant(others[Math.floor(Math.random() * others.length)])
    } else {
      playChant(CHANTS[(idx + 1) % CHANTS.length])
    }
  }, [playingChantId, isShuffle, playChant])

  // ── Seek ──
  const handleSeek = useCallback((pct: number) => {
    if (!audioRef.current || !audioRef.current.duration) return
    audioRef.current.currentTime = pct * audioRef.current.duration
    setElapsed(audioRef.current.currentTime)
  }, [])

  // ── Volume ──
  const handleVolume = useCallback((v: number) => {
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v / 100
  }, [])

  // ── ChantLibrary onPlay (card click → start playing + go to detail) ──
  const handleLibraryPlay = useCallback((chant: ChantData) => {
    playChant(chant)
    setDetailChant(chant)
    setActiveNav('Playlist')
  }, [playChant])

  // ── Open detail of currently playing chant ──
  const handleOpenDetail = useCallback(() => {
    if (playingChantId) {
      const chant = CHANTS.find(c => c.id === playingChantId)
      if (chant) { setDetailChant(chant); setActiveNav('Playlist') }
    }
  }, [playingChantId])

  // ── Sync volume on mount ──
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
  }, [volume])

  // ── Sync detailChant with playingChantId when on detail page or playlist page ──
  useEffect(() => {
    if ((activeNav === 'ChantDetail' || activeNav === 'Playlist') && playingChantId !== null) {
      const current = CHANTS.find(c => c.id === playingChantId)
      if (current) {
        setDetailChant(current)
      }
    }
  }, [playingChantId, activeNav])

  // ── High frequency elapsed sync (bypasses slow ontimeupdate) ──
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null
    if (isPlaying && audioRef.current) {
      intervalId = setInterval(() => {
        if (audioRef.current) {
          setElapsed(audioRef.current.currentTime)
        }
      }, 100) // update every 100ms
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying])

  // ── Cleanup ──
  useEffect(() => () => stopAudio(), [stopAudio])

  // ── Render page ──
  const renderPage = () => {
    if (activeNav === 'ChantDetail' && detailChant) {
      return (
        <ChantDetailPage
          chant={detailChant}
          isPlaying={isPlaying && playingChantId === detailChant.id}
          elapsed={elapsed}
          progress={progress}
          isShuffle={isShuffle}
          isRepeat={isRepeat}
          onBack={() => setActiveNav('Chant')}
          onPlayPause={() => {
            if (playingChantId === detailChant.id) handlePlayPause()
            else playChant(detailChant)
          }}
          onPrev={handlePrev}
          onNext={handleNext}
          onSeek={handleSeek}
          onShuffle={() => setIsShuffle(s => !s)}
          onRepeat={() => setIsRepeat(r => !r)}
        />
      )
    }
    switch (activeNav) {
      case 'Chant':
      case 'Chants':
        return (
          <ChantLibrary
            playingChantId={playingChantId}
            isPlaying={isPlaying}
            onCardClick={handleLibraryPlay}
            search={searchQuery}
            setSearch={setSearchQuery}
          />
        )
      case 'Playlist':
        return (
          <PlaylistPage
            chant={detailChant}
            isPlaying={isPlaying}
            elapsed={elapsed}
            progress={progress}
            isShuffle={isShuffle}
            isRepeat={isRepeat}
            volume={volume}
            onPlayPause={handlePlayPause}
            onPrev={handlePrev}
            onNext={handleNext}
            onSeek={handleSeek}
            onShuffle={() => setIsShuffle(s => !s)}
            onRepeat={() => setIsRepeat(r => !r)}
            onVolume={handleVolume}
          />
        )
      case 'Tentang':
        return <AboutPage />
      case 'Developer':
        return <DeveloperPage />
      default:
        return (
          <HomePage
            onPlayTrack={playChant}
            onNavigate={handleNavClick}
          />
        )
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar" role="navigation" aria-label="Navigasi utama">
        <div className="container">
          <a href="#" className="navbar-logo" aria-label="Halaman Beranda Mokleters" onClick={e => { e.preventDefault(); handleNavClick('Beranda'); setDetailChant(null) }}>
            <img src={mokletersLogo} alt="Mokleters Logo" className="navbar-logo-img" style={{ height: '32px', width: 'auto', marginRight: '10px', objectFit: 'contain' }} />
            MOKLETERS
          </a>

          {/* Desktop Nav */}
          <ul className="navbar-nav" role="list">
            {navLinks.map(link => (
              <li key={link}>
                <a
                  href="#"
                  id={`nav-${link.toLowerCase().replace(' ', '-')}`}
                  className={(activeNav === link || (link === 'Chant' && activeNav === 'ChantDetail')) ? 'active' : ''}
                  onClick={e => { e.preventDefault(); handleNavClick(link); setDetailChant(null) }}
                  aria-current={(activeNav === link || (link === 'Chant' && activeNav === 'ChantDetail')) ? 'page' : undefined}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <button
              className="dev-profile-btn"
              type="button"
              onClick={() => {
                setActiveNav('Developer')
                setDetailChant(null)
              }}
            >
              Developer
            </button>
            <label className="navbar-search" htmlFor="navbar-search-input">
              <IconSearch />
              <input
                id="navbar-search-input"
                type="search"
                placeholder="Cari semua chant..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  if (activeNav !== 'Chant') setActiveNav('Chant')
                }}
                aria-label="Cari chant"
              />
            </label>
            <img src={mokletsMascot} alt="Avatar" className="navbar-avatar-img" />
            {/* Hamburger */}
            <button
              id="mobile-menu-btn"
              className={`hamburger-btn${mobileMenuOpen ? ' open' : ''}`}
              type="button"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-nav-drawer${mobileMenuOpen ? ' open' : ''}`} aria-hidden={!mobileMenuOpen}>
          <ul role="list">
            {navLinks.map(link => (
              <li key={link}>
                <a
                  href="#"
                  className={activeNav === link ? 'active' : ''}
                  onClick={e => { e.preventDefault(); handleNavClick(link) }}
                  aria-current={activeNav === link ? 'page' : undefined}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <label className="mobile-search" htmlFor="mobile-search-input">
            <IconSearch />
            <input
              id="mobile-search-input"
              type="search"
              placeholder="Cari semua chant..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                if (activeNav !== 'Chant') setActiveNav('Chant')
              }}
              aria-label="Cari chant di mobile"
            />
          </label>
        </div>
      </nav>

      {/* Overlay mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
      )}

      {/* ISI HALAMAN */}
      <main style={{ paddingTop: activeNav !== 'Beranda' ? '64px' : '0' }}>
        {renderPage()}
      </main>

      {/* BILAH PEMUTAR — FULLY FUNCTIONAL */}
      {playingChantId !== null && isPlayerVisible && (
        <PlayerBar
          track={currentTrack}
          isPlaying={isPlaying}
          isLiked={isLiked}
          isShuffle={isShuffle}
          isRepeat={isRepeat}
          volume={volume}
          onPlayPause={handlePlayPause}
          onLike={() => setIsLiked(l => !l)}
          onPrev={handlePrev}
          onNext={handleNext}
          onShuffle={() => setIsShuffle(s => !s)}
          onRepeat={() => setIsRepeat(r => !r)}
          onSeek={handleSeek}
          onVolume={handleVolume}
          onOpenDetail={handleOpenDetail}
          onToggleCrowdMode={() => setIsCrowdMode(prev => !prev)}
          onToggleQueue={() => setIsQueueOpen(prev => !prev)}
          onOpenPlaylist={() => setActiveNav('Playlist')}
          onClose={() => {
            stopAudio()
            setPlayingChantId(null)
            setIsPlayerVisible(false)
          }}
        />
      )}

      {/* CROWD MODE SCREEN OVERLAY (MODE TRIBUN) */}
      {isCrowdMode && playingChantId !== null && (() => {
        const chant = CHANTS.find(c => c.id === playingChantId)
        let currentText = 'MOKLETERS!'
        if (chant) {
          const idx = [...chant.lyrics].reverse().findIndex(l => (elapsed + 1.2) >= l.time)
          if (idx >= 0) {
            currentText = chant.lyrics[chant.lyrics.length - 1 - idx].text
          }
        }
        return (
          <div className="crowd-mode-overlay" onClick={() => setIsCrowdMode(false)}>
            <button
              type="button"
              className="crowd-mode-close"
              onClick={e => { e.stopPropagation(); setIsCrowdMode(false) }}
              aria-label="Tutup mode tribun"
            >
              <span aria-hidden="true">×</span>
              <span className="crowd-mode-close-label">Tutup</span>
            </button>
            <div className="crowd-mode-content">
              <span className="crowd-mode-chant-title">{chant?.title}</span>
              <h2 className="crowd-mode-big-lyric">{currentText.toUpperCase()}</h2>
              <div className="crowd-mode-instructions">Arahkan layar ponsel Anda ke lapangan / panggung!</div>
              
              <div className="crowd-mode-sound-triggers" onClick={e => e.stopPropagation()}>
                <button className="btn crowd-trigger-btn" onClick={() => playTribunSound('genderang')}>🥁 Genderang</button>
                <button className="btn crowd-trigger-btn" onClick={() => playTribunSound('terompet')}>🎺 Terompet</button>
                <button className="btn crowd-trigger-btn" onClick={() => playTribunSound('sorakan')}>🔥 Sorakan</button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* QUEUE POPUP PANEL */}
      {isQueueOpen && (
        <div className="player-queue-panel glass-2" onClick={(e) => e.stopPropagation()}>
          <div className="player-queue-header">
            <h4>Antrean Chant</h4>
            <button className="queue-close-btn" onClick={() => setIsQueueOpen(false)}>×</button>
          </div>
          <div className="player-queue-body">
            {CHANTS.map((c) => (
              <div
                key={c.id}
                className={`player-queue-item${c.id === playingChantId ? ' active' : ''}`}
                onClick={() => {
                  playChant(c)
                  setIsQueueOpen(false)
                }}
              >
                <img src={c.img} alt={c.title} className="queue-thumb" />
                <div style={{ flex: 1 }}>
                  <p className="queue-title">{c.title}</p>
                  <p className="queue-meta">{c.duration} • {c.category}</p>
                </div>
                {c.id === playingChantId && isPlaying && (
                  <span className="queue-live-tag">SEDANG DIPUTAR</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
