import { useState, useEffect } from 'react'
import type { ChantData } from './lyrics'
import { CHANTS } from './lyrics'

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
const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
  </svg>
)
const IconHeart = ({ filled = false }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const IconShuffle = ({ active = false }: { active?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#e53935' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,3 21,3 21,8" /><line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21,16 21,21 16,21" /><line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
)
const IconRepeat = ({ active = false }: { active?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#e53935' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17,1 21,5 17,9" /><path d="M3,11V9a4,4,0,0,1,4-4h14" />
    <polyline points="7,23 3,19 7,15" /><path d="M21,13v2a4,4,0,0,1-4,4H3" />
  </svg>
)

/* =============================================
   HELPER
   ============================================= */
function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* =============================================
   CHANT DETAIL PAGE
   ============================================= */
export default function ChantDetailPage({
  chant,
  isPlaying,
  elapsed,
  progress,
  isShuffle,
  isRepeat,
  onBack,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onShuffle,
  onRepeat,
}: {
  chant: ChantData
  isPlaying: boolean
  elapsed: number
  progress: number
  isShuffle: boolean
  isRepeat: boolean
  onBack: () => void
  onPlayPause: () => void
  onPrev: () => void
  onNext: () => void
  onSeek: (pct: number) => void
  onShuffle: () => void
  onRepeat: () => void
}) {
  const [liked, setLiked] = useState(false)
  const [activeLyricIdx, setActiveLyricIdx] = useState(0)

  // Sync lyric line to elapsed
  useEffect(() => {
    const idx = [...chant.lyrics].reverse().findIndex(l => elapsed >= l.time)
    if (idx >= 0) setActiveLyricIdx(chant.lyrics.length - 1 - idx)
  }, [elapsed, chant.lyrics])

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onSeek(pct)
  }

  // Find adjacent chants
  const allIds = CHANTS.map(c => c.id)
  const currentIdx = allIds.indexOf(chant.id)
  const prevChant = currentIdx > 0 ? CHANTS[currentIdx - 1] : CHANTS[CHANTS.length - 1]
  const nextChant = currentIdx < CHANTS.length - 1 ? CHANTS[currentIdx + 1] : CHANTS[0]

  return (
    <div className="chant-detail-page" id="chant-detail-page">
      {/* Blurred background from chant image */}
      <div
        className="chant-detail-bg"
        style={{ backgroundImage: `url(${chant.img})` }}
        aria-hidden="true"
      />
      <div className="chant-detail-overlay" aria-hidden="true" />

      <div className="container chant-detail-layout">

        {/* ── LEFT: Player Panel ── */}
        <section className="chant-detail-player" aria-label="Pemutar chant">

          {/* Back Button */}
          <button
            className="chant-detail-back"
            type="button"
            onClick={onBack}
            aria-label="Kembali ke perpustakaan"
          >
            <IconArrowLeft />
            <span>Perpustakaan Chant</span>
          </button>

          {/* Cover Art */}
          <div className="chant-detail-artwork-wrap">
            <img
              src={chant.img}
              alt={chant.title}
              className={`chant-detail-artwork${isPlaying ? ' chant-detail-artwork--playing' : ''}`}
            />
            {isPlaying && <div className="chant-detail-artwork-glow" aria-hidden="true" />}
          </div>

          {/* Track Info */}
          <div className="chant-detail-info">
            <div style={{ flex: 1 }}>
              <p className="chant-detail-title">{chant.title}</p>
              <p className="chant-detail-artist">{chant.category} • {chant.artist}</p>
            </div>
            <button
              type="button"
              className={`chant-detail-like${liked ? ' chant-detail-like--active' : ''}`}
              aria-label={liked ? 'Batal sukai' : 'Sukai'}
              onClick={() => setLiked(l => !l)}
            >
              <IconHeart filled={liked} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="chant-detail-progress-section">
            <div
              className="chant-detail-progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Kemajuan chant"
              onClick={handleProgressClick}
              id="detail-progress-bar"
            >
              <div className="chant-detail-progress-fill" style={{ width: `${progress}%` }}>
                <div className="chant-detail-progress-thumb" aria-hidden="true" />
              </div>
            </div>
            <div className="chant-detail-times">
              <span>{fmt(elapsed)}</span>
              <span>{chant.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="chant-detail-controls" role="group" aria-label="Kontrol pemutaran">
            <button
              className={`chant-detail-ctrl${isShuffle ? ' chant-detail-ctrl--active' : ''}`}
              type="button"
              aria-label="Acak"
              aria-pressed={isShuffle}
              onClick={onShuffle}
            >
              <IconShuffle active={isShuffle} />
            </button>

            <button
              className="chant-detail-ctrl"
              type="button"
              aria-label="Chant sebelumnya"
              onClick={onPrev}
              id="detail-prev-btn"
            >
              <IconSkipBack />
            </button>

            <button
              className="chant-detail-play-btn"
              type="button"
              aria-label={isPlaying ? 'Jeda' : 'Putar'}
              aria-pressed={isPlaying}
              onClick={onPlayPause}
              id="detail-play-btn"
            >
              {isPlaying ? <IconPause size={28} /> : <IconPlay size={28} />}
            </button>

            <button
              className="chant-detail-ctrl"
              type="button"
              aria-label="Chant berikutnya"
              onClick={onNext}
              id="detail-next-btn"
            >
              <IconSkipForward />
            </button>

            <button
              className={`chant-detail-ctrl${isRepeat ? ' chant-detail-ctrl--active' : ''}`}
              type="button"
              aria-label="Ulangi"
              aria-pressed={isRepeat}
              onClick={onRepeat}
            >
              <IconRepeat active={isRepeat} />
            </button>
          </div>

          {/* Prev / Next preview */}
          <div className="chant-detail-queue">
            <div className="chant-detail-queue-item" onClick={onPrev} role="button" tabIndex={0} aria-label={`Putar ${prevChant.title}`}>
              <img src={prevChant.img} alt={prevChant.title} />
              <div>
                <p style={{ fontSize: 10, color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Sebelumnya</p>
                <p style={{ fontSize: 13, color: 'var(--color-on-surface)', fontWeight: 600 }}>{prevChant.title}</p>
              </div>
            </div>
            <div className="chant-detail-queue-item chant-detail-queue-item--right" onClick={onNext} role="button" tabIndex={0} aria-label={`Putar ${nextChant.title}`}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 10, color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Berikutnya</p>
                <p style={{ fontSize: 13, color: 'var(--color-on-surface)', fontWeight: 600 }}>{nextChant.title}</p>
              </div>
              <img src={nextChant.img} alt={nextChant.title} />
            </div>
          </div>
        </section>

        {/* ── RIGHT: Lyrics Panel ── */}
        <section
          className="chant-detail-lyrics-panel"
          aria-label="Lirik chant"
          aria-live="polite"
        >
          <div className="chant-detail-lyrics-header">
            <span className="chant-detail-lyrics-label">LIRIK LANGSUNG</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {isPlaying && (
                <>
                  <div className="live-dot" aria-hidden="true" />
                  <span style={{ fontSize: 11, color: '#e53935', fontWeight: 700, letterSpacing: '0.05em' }}>LIVE</span>
                </>
              )}
            </div>
          </div>

          <div className="chant-detail-lyrics-list" role="list">
            {chant.lyrics.map((lyric, idx) => {
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
                  className={`chant-detail-lyric-line chant-detail-lyric-line--${role}`}
                  role="listitem"
                  aria-current={role === 'active' ? 'true' : undefined}
                  onClick={() => {
                    setActiveLyricIdx(idx)
                    onSeek(lyric.time / chant.durationSec)
                  }}
                >
                  {lyric.text}
                </div>
              )
            })}
          </div>

          {/* Sync indicator */}
          <div className="chant-detail-lyrics-sync" aria-hidden="true">
            <div className="chant-detail-lyrics-sync-bar">
              <div className="chant-detail-lyrics-sync-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Stats */}
          <div className="chant-detail-stats">
            <div className="chant-detail-stat">
              <span className="chant-detail-stat-value">{chant.plays}</span>
              <span className="chant-detail-stat-label">Putaran</span>
            </div>
            <div className="chant-detail-stat">
              <span className="chant-detail-stat-value">{chant.lyrics.length}</span>
              <span className="chant-detail-stat-label">Baris Lirik</span>
            </div>
            <div className="chant-detail-stat">
              <span className="chant-detail-stat-value">{chant.duration}</span>
              <span className="chant-detail-stat-label">Durasi</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
