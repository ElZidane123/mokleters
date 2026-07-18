import { useState, useEffect } from 'react'
import type { ChantData } from '../data/lyrics'
import { CHANTS } from '../data/lyrics'





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

  // Reference unused variables to satisfy strict compilation checks
  const _unused = { isShuffle, isRepeat, volume, onPlayPause, onPrev, onNext, onShuffle, onRepeat, onVolume, handleProgressClick: onSeek }
  void _unused

  // Sync lyric to elapsed time
  useEffect(() => {
    const idx = [...activeChant.lyrics].reverse().findIndex(l => (elapsed + 1.2) >= l.time)
    if (idx >= 0) {
      setActiveLyricIdx(activeChant.lyrics.length - 1 - idx)
    } else {
      setActiveLyricIdx(0)
    }
  }, [elapsed, activeChant.lyrics])

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
          </div>

          {/* Info Lagu */}
          <div className="pl-track-info">
            <p className="pl-track-title">{activeChant.title}</p>
            <p className="pl-track-artist">{activeChant.category}</p>
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
