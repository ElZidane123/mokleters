import { useState, useEffect, useRef } from 'react'
import type { PlayerTrack } from './App'

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

/* =============================================
   LYRICS DATA
   ============================================= */
const LYRICS_DATA = [
  { id: 0, text: 'Bersatu Dalam Jiwa', time: 0 },
  { id: 1, text: 'Tak Gentar Lawan Menerjang', time: 14 },
  { id: 2, text: 'Mokleters Kebanggaan Kita', time: 28 },
  { id: 3, text: 'Di Atas Tanah Merah Putih', time: 44 },
  { id: 4, text: 'Semangat Kita Takkan Padam', time: 58 },
  { id: 5, text: 'Sampai Akhir Hayat Nanti', time: 72 },
  { id: 6, text: 'Kami Berdiri Bersama', time: 86 },
  { id: 7, text: 'Merah Putih Jiwa Raga', time: 100 },
]

const TRACK_DURATION = 134  // 2:14 in seconds (as shown in screenshot)
const TRACK_DURATION_LABEL = '3:45'

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* =============================================
   PLAYLIST PAGE
   ============================================= */
export default function PlaylistPage({
  onPlay,
  isPlaying: externalIsPlaying,
  onPlayPause,
}: {
  onPlay: (track: Partial<PlayerTrack>) => void
  isPlaying: boolean
  onPlayPause: () => void
}) {
  const [elapsed, setElapsed] = useState(134)   // start at 2:14 as in screenshot
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [volume, setVolume] = useState(55)
  const [activeLyricIdx, setActiveLyricIdx] = useState(2) // "Mokleters Kebanggaan Kita"
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalDuration = 225  // 3:45 in seconds

  // Advance timer when playing
  useEffect(() => {
    if (externalIsPlaying) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => {
          const next = prev + 1
          if (next >= totalDuration) return 0
          return next
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [externalIsPlaying])

  // Sync lyric to elapsed time
  useEffect(() => {
    const idx = LYRICS_DATA.findLastIndex(l => elapsed >= l.time)
    if (idx >= 0) setActiveLyricIdx(idx)
  }, [elapsed])

  const progressPct = (elapsed / totalDuration) * 100

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    setElapsed(Math.round(pct * totalDuration))
  }

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setVolume(Math.round(pct * 100))
  }

  // Notify parent when started
  const handlePlayPause = () => {
    if (!externalIsPlaying) {
      onPlay({
        title: 'Mokleters Pride',
        artist: 'Opening Anthem • Mokleters Fans',
        img: '/chant-art.png',
        duration: TRACK_DURATION_LABEL,
        currentTime: formatTime(elapsed),
        progress: progressPct,
      })
    }
    onPlayPause()
  }

  return (
    <div className="playlist-page" id="playlist-page">
      {/* Atmospheric background */}
      <div className="playlist-page-bg" aria-hidden="true" />

      <div className="container playlist-page-layout">

        {/* ══ LEFT: Player Panel ══ */}
        <section className="pl-player-panel" aria-label="Music player">

          {/* Album Art */}
          <div className="pl-artwork-wrap">
            <img
              src="/chant-art.png"
              alt="Mokleters Pride — The Chant album art"
              className="pl-artwork"
            />
            {/* Playing glow ring */}
            {externalIsPlaying && (
              <div className="pl-artwork-glow" aria-hidden="true" />
            )}
            {/* Spotify + play overlay */}
            <div className="pl-artwork-badges" aria-hidden="true">
              <div className="pl-artwork-badge">
                <IconSpotify />
              </div>
              <div className="pl-artwork-badge pl-artwork-badge--play" onClick={handlePlayPause}>
                {externalIsPlaying ? <IconPause size={16} /> : <IconPlay size={16} />}
              </div>
            </div>
          </div>

          {/* Track info */}
          <div className="pl-track-info">
            <p className="pl-track-title">Mokleters Pride</p>
            <p className="pl-track-artist">Opening Anthem • Mokleters Fans</p>
          </div>

          {/* Progress bar */}
          <div className="pl-progress-section">
            <div
              className="pl-progress-track"
              id="playlist-progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progressPct)}
              aria-label="Track progress"
              onClick={handleProgressClick}
            >
              <div className="pl-progress-fill" style={{ width: `${progressPct}%` }}>
                <div className="pl-progress-thumb" aria-hidden="true" />
              </div>
            </div>
            <div className="pl-progress-times">
              <span id="pl-current-time">{formatTime(elapsed)}</span>
              <span id="pl-total-time">{TRACK_DURATION_LABEL}</span>
            </div>
          </div>

          {/* Playback controls */}
          <div className="pl-controls" role="group" aria-label="Playback controls">
            <button
              id="pl-shuffle-btn"
              className={`pl-ctrl-btn${isShuffle ? ' pl-ctrl-btn--active' : ''}`}
              type="button"
              aria-label="Shuffle"
              aria-pressed={isShuffle}
              onClick={() => setIsShuffle(s => !s)}
            >
              <IconShuffle />
            </button>

            <button
              id="pl-prev-btn"
              className="pl-ctrl-btn"
              type="button"
              aria-label="Previous track"
            >
              <IconSkipBack />
            </button>

            <button
              id="pl-play-btn"
              className="pl-play-btn"
              type="button"
              aria-label={externalIsPlaying ? 'Pause' : 'Play'}
              aria-pressed={externalIsPlaying}
              onClick={handlePlayPause}
            >
              {externalIsPlaying ? <IconPause size={28} /> : <IconPlay size={28} />}
            </button>

            <button
              id="pl-next-btn"
              className="pl-ctrl-btn"
              type="button"
              aria-label="Next track"
            >
              <IconSkipForward />
            </button>

            <button
              id="pl-repeat-btn"
              className={`pl-ctrl-btn${isRepeat ? ' pl-ctrl-btn--active' : ''}`}
              type="button"
              aria-label="Repeat"
              aria-pressed={isRepeat}
              onClick={() => setIsRepeat(r => !r)}
            >
              <IconRepeat />
            </button>
          </div>

          {/* Volume + Crowd Mode */}
          <div className="pl-bottom-row">
            <div className="pl-volume" role="group" aria-label="Volume control">
              <button id="pl-volume-icon-btn" className="pl-ctrl-btn pl-ctrl-btn--sm" type="button" aria-label="Mute">
                <IconVolume />
              </button>
              <div
                className="pl-volume-track"
                id="pl-volume-slider"
                role="slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={volume}
                aria-label="Volume"
                onClick={handleVolumeClick}
              >
                <div className="pl-volume-fill" style={{ width: `${volume}%` }} />
                <div className="pl-volume-thumb" style={{ left: `${volume}%` }} aria-hidden="true" />
              </div>
            </div>

            <button
              id="pl-crowd-mode-btn"
              className="pl-crowd-btn"
              type="button"
              aria-label="Enter Crowd Mode"
            >
              <IconUsers />
              Enter Crowd Mode
            </button>
          </div>
        </section>

        {/* ══ RIGHT: Live Lyrics Panel ══ */}
        <section className="pl-lyrics-panel glass-1" aria-label="Live lyrics" aria-live="polite">
          <div className="pl-lyrics-header">
            <span className="pl-lyrics-label" aria-label="Live Lyrics">LIVE LYRICS</span>
            <div className="live-dot" aria-hidden="true" />
          </div>

          <div className="pl-lyrics-list" role="list">
            {LYRICS_DATA.map((lyric, idx) => {
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
                    setActiveLyricIdx(idx)
                    setElapsed(lyric.time)
                  }}
                >
                  {lyric.text}
                </div>
              )
            })}
          </div>

          {/* Sync indicator */}
          <div className="pl-lyrics-sync" aria-hidden="true">
            <div className="pl-lyrics-sync-bar">
              <div className="pl-lyrics-sync-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="pl-lyrics-sync-label">AUTO-SYNC</span>
          </div>
        </section>

      </div>
    </div>
  )
}
