import { useState, useEffect } from 'react'
import type { ChantData } from '../data/lyrics'
import { CHANTS } from '../data/lyrics'

/* =============================================
   ICONS
   ============================================= */
const IconPlay = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6,3 20,12 6,21" />
  </svg>
)
const IconPause = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="4" height="18" rx="1" /><rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
)
const IconSkipBack = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19,20 9,12 19,4" /><line x1="5" y1="19" x2="5" y2="5" />
  </svg>
)
const IconSkipForward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5,4 15,12 5,20" /><line x1="19" y1="5" x2="19" y2="19" />
  </svg>
)
const IconShuffle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,3 21,3 21,8" /><line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21,16 21,21 16,21" /><line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
)
const IconRepeat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17,1 21,5 17,9" /><path d="M3,11V9a4,4,0,0,1,4-4h14" />
    <polyline points="7,23 3,19 7,15" /><path d="M21,13v2a4,4,0,0,1-4,4H3" />
  </svg>
)
const IconVolume = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconSpotify = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="12" fill="#1DB954" />
    <path d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm-1.2 2.75c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85z" fill="white" />
  </svg>
)

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* =============================================
   PLAYLIST PAGE
   ============================================= */
export default function PlaylistPage({
  chant,
  isPlaying,
  elapsed,
  progress,
  isShuffle,
  isRepeat,
  volume,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onShuffle,
  onRepeat,
  onVolume,
}: {
  chant: ChantData | null
  isPlaying: boolean
  elapsed: number
  progress: number
  isShuffle: boolean
  isRepeat: boolean
  volume: number
  onPlayPause: () => void
  onPrev: () => void
  onNext: () => void
  onSeek: (pct: number) => void
  onShuffle: () => void
  onRepeat: () => void
  onVolume: (v: number) => void
}) {
  const activeChant = chant || CHANTS[0]
  const [activeLyricIdx, setActiveLyricIdx] = useState(0)

  // Sync lyric to elapsed time
  useEffect(() => {
    const idx = [...activeChant.lyrics].reverse().findIndex(l => (elapsed + 0.6) >= l.time)
    if (idx >= 0) {
      setActiveLyricIdx(activeChant.lyrics.length - 1 - idx)
    } else {
      setActiveLyricIdx(0)
    }
  }, [elapsed, activeChant.lyrics])

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
    <div className="playlist-page" id="playlist-page">
      {/* Latar belakang atmosferik */}
      <div className="playlist-page-bg" aria-hidden="true" style={{ backgroundImage: `url(${activeChant.img})` }} />
      <div className="playlist-page-overlay" aria-hidden="true" />

      <div className="container playlist-page-layout">

        {/* ══ KIRI: Panel Pemutar ══ */}
        <section className="pl-player-panel" aria-label="Pemutar musik">

          {/* Seni Sampul */}
          <div className="pl-artwork-wrap">
            <img
              src={activeChant.img}
              alt={`${activeChant.title} — Gambar sampul album Chant`}
              className="pl-artwork"
            />
            {/* Cincin cahaya saat berputar */}
            {isPlaying && (
              <div className="pl-artwork-glow" aria-hidden="true" />
            )}
            {/* Overlay Spotify + putar */}
            <div className="pl-artwork-badges" aria-hidden="true">
              <div className="pl-artwork-badge">
                <IconSpotify />
              </div>
              <div className="pl-artwork-badge pl-artwork-badge--play" onClick={onPlayPause}>
                {isPlaying ? <IconPause size={16} /> : <IconPlay size={16} />}
              </div>
            </div>
          </div>

          {/* Info Lagu */}
          <div className="pl-track-info">
            <p className="pl-track-title">{activeChant.title}</p>
            <p className="pl-track-artist">{activeChant.category} • {activeChant.artist}</p>
          </div>

          {/* Bilah Kemajuan */}
          <div className="pl-progress-section">
            <div
              className="pl-progress-track"
              id="playlist-progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Kemajuan lagu"
              onClick={handleProgressClick}
            >
              <div className="pl-progress-fill" style={{ width: `${progress}%` }}>
                <div className="pl-progress-thumb" aria-hidden="true" />
              </div>
            </div>
            <div className="pl-progress-times">
              <span id="pl-current-time">{formatTime(elapsed)}</span>
              <span id="pl-total-time">{activeChant.duration}</span>
            </div>
          </div>

          {/* Kontrol Pemutaran */}
          <div className="pl-controls" role="group" aria-label="Kontrol pemutaran">
            <button
              id="pl-shuffle-btn"
              className={`pl-ctrl-btn${isShuffle ? ' pl-ctrl-btn--active' : ''}`}
              type="button"
              aria-label="Acak"
              aria-pressed={isShuffle}
              onClick={onShuffle}
            >
              <IconShuffle />
            </button>

            <button
              id="pl-prev-btn"
              className="pl-ctrl-btn"
              type="button"
              aria-label="Lagu sebelumnya"
              onClick={onPrev}
            >
              <IconSkipBack />
            </button>

            <button
              id="pl-play-btn"
              className="pl-play-btn"
              type="button"
              aria-label={isPlaying ? 'Jeda' : 'Putar'}
              aria-pressed={isPlaying}
              onClick={onPlayPause}
            >
              {isPlaying ? <IconPause size={28} /> : <IconPlay size={28} />}
            </button>

            <button
              id="pl-next-btn"
              className="pl-ctrl-btn"
              type="button"
              aria-label="Lagu berikutnya"
              onClick={onNext}
            >
              <IconSkipForward />
            </button>

            <button
              id="pl-repeat-btn"
              className={`pl-ctrl-btn${isRepeat ? ' pl-ctrl-btn--active' : ''}`}
              type="button"
              aria-label="Ulangi"
              aria-pressed={isRepeat}
              onClick={onRepeat}
            >
              <IconRepeat />
            </button>
          </div>
        </section>

        {/* ══ KANAN: Panel Lirik Langsung ══ */}
        <section className="pl-lyrics-panel glass-1" aria-label="Lirik langsung" aria-live="polite">
          <div className="pl-lyrics-header">
            <span className="pl-lyrics-label" aria-label="Lirik Langsung">LIRIK CHANT</span>
          </div>

          <div className="pl-lyrics-list" role="list">
            {activeChant.lyrics.map((lyric, idx) => {
              const diff = idx - activeLyricIdx
              let role: 'prev-far' | 'prev' | 'active' | 'next' | 'next-far' = 'next-far'
              if (diff === 0) role = 'active'
              else if (diff === -1) role = 'prev'
              else if (diff < -1) role = 'prev-far'
              else if (diff === 1) role = 'next'
              else role = 'next-far'

              return (
                <div
                  key={lyric.id}
                  className={`pl-lyric-line pl-lyric-line--${role}`}
                  role="listitem"
                  aria-current={role === 'active' ? 'true' : undefined}
                  onClick={() => {
                    onSeek(lyric.time / activeChant.durationSec)
                  }}
                >
                  {lyric.text}
                </div>
              )
            })}
          </div>

          {/* Indikator Sinkronisasi */}
          <div className="pl-lyrics-sync" aria-hidden="true">
            <div className="pl-lyrics-sync-bar">
              <div className="pl-lyrics-sync-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
