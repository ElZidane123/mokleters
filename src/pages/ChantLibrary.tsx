import { useState } from 'react'
import type { ChantData } from '../data/lyrics'
import { CHANTS } from '../data/lyrics'

/* =============================================
   ICONS
   ============================================= */
const IconPlay = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const IconPause = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
)

const IconHeart = ({ filled = false, size = 15 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const IconMoreHorizontal = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
  </svg>
)

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)

const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
)

const IconRows = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const IconSortDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5h10M11 9h7M11 13h4" /><path d="m7 20 4-4-4-4" />
  </svg>
)

const FILTERS = ['Semua Chant', 'Pembuka', 'Pertandingan', 'Kemenangan', 'Kebanggaan']

type ChantType = ChantData

/* =============================================
   MINI PROGRESS BAR (shown on playing card)
   ============================================= */
function MiniProgressBar({ progress }: { progress: number }) {
  return (
    <div style={{
      width: '100%',
      height: 3,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 99,
      overflow: 'hidden',
      marginTop: 8,
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #e53935, #ff6b35)',
        borderRadius: 99,
        transition: 'width 0.3s linear',
      }} />
    </div>
  )
}

/* =============================================
   CHANT CARD (Grid View)
   ============================================= */
const IconVolume2 = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><path d="M15.54 8.46a5,5,0,0,1,0,7.07" />
  </svg>
)

function ChantCard({
  chant,
  isPlaying,
  onPlay,
  progress,
}: {
  chant: ChantType
  isPlaying: boolean
  onPlay: () => void
  progress: number
}) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <article
      className={`chant-card${isPlaying ? ' chant-card--playing' : ''}${chant.id === 6 ? ' chant-card--featured' : ''}`}
      id={`chant-card-${chant.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIsMenuOpen(false); }}
      aria-label={chant.title}
    >
      {/* Image area */}
      <div className="chant-card-img-wrap">
        <img
          src={chant.img}
          alt={chant.title}
          className="chant-card-img"
          loading="lazy"
        />

        {/* Overlay on hover / playing */}
        <div className={`chant-card-overlay${hovered || isPlaying ? ' chant-card-overlay--visible' : ''}`} aria-hidden="true" />

        {/* Popular / Anthem badge */}
        {chant.id === 6 ? (
          <div className="chant-card-anthem-badge" aria-label="Anthem Utama">ANTHEM UTAMA</div>
        ) : chant.popular ? (
          <div className="chant-card-popular-badge" aria-label="Popular">POPULAR</div>
        ) : null}

        {/* Play button */}
        <button
          className={`chant-card-play-btn${hovered || isPlaying ? ' chant-card-play-btn--visible' : ''}`}
          type="button"
          aria-label={isPlaying ? `Pause ${chant.title}` : `Play ${chant.title}`}
          onClick={onPlay}
          id={`chant-play-btn-${chant.id}`}
        >
          {isPlaying ? <IconPause size={22} /> : <IconPlay size={22} />}
        </button>

        {/* Active playing indicator bar */}
        {isPlaying && (
          <div className="chant-card-playing-bar" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="chant-card-info">
        <h3 className="chant-card-title" style={{ color: isPlaying ? '#ff6060' : undefined }}>{chant.title}</h3>
        <p className="chant-card-meta">{chant.duration} • {chant.category}</p>
        {isPlaying && <MiniProgressBar progress={progress} />}
        <div className="chant-card-actions">
          <button
            className={`chant-card-action-btn${liked ? ' chant-card-action-btn--liked' : ''}`}
            type="button"
            aria-label={liked ? 'Unlike' : 'Like'}
            aria-pressed={liked}
            onClick={() => setLiked(l => !l)}
          >
            <IconHeart filled={liked} size={14} />
          </button>
          {isPlaying && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#ff6060' }}>
              <IconVolume2 /> Diputar
            </span>
          )}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              className="chant-card-action-btn"
              type="button"
              aria-label="More options"
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(prev => !prev)
              }}
            >
              <IconMoreHorizontal />
            </button>

            {isMenuOpen && (
              <div className="chant-card-dropdown-menu glass-2">
                <button
                  type="button"
                  className="chant-card-dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPlay()
                    setIsMenuOpen(false)
                  }}
                >
                  Putar Sekarang
                </button>
                <button
                  type="button"
                  className="chant-card-dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(chant.lyrics.map(l => l.text).join('\n'))
                    setIsMenuOpen(false)
                    alert('Lirik chant berhasil disalin!')
                  }}
                >
                  Salin Lirik
                </button>
                <button
                  type="button"
                  className="chant-card-dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(window.location.origin + '?chant=' + chant.id)
                    setIsMenuOpen(false)
                    alert('Tautan bagikan chant berhasil disalin!')
                  }}
                >
                  Bagikan Chant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/* =============================================
   CHANT ROW (List View)
   ============================================= */
function ChantRow({
  chant,
  index,
  isPlaying,
  onPlay,
  progress,
}: {
  chant: ChantType
  index: number
  isPlaying: boolean
  onPlay: () => void
  progress: number
}) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <li
      className={`chant-row${isPlaying ? ' chant-row--playing' : ''}`}
      id={`chant-row-${chant.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={chant.title}
    >
      <div className="chant-row-num">
        {isPlaying ? (
          <div className="chant-row-playing-bars" aria-hidden="true"><span /><span /><span /></div>
        ) : hovered ? (
          <button type="button" className="chant-row-play-inline" onClick={onPlay} aria-label={`Play ${chant.title}`}><IconPlay size={14} /></button>
        ) : (
          <span className="chant-row-index">{index + 1}</span>
        )}
      </div>
      <img src={chant.img} alt="" aria-hidden="true" className="chant-row-thumb" />
      <div className="chant-row-info">
        <p className="chant-row-title" style={{ color: isPlaying ? '#ff6060' : undefined }}>{chant.title}</p>
        {isPlaying && <MiniProgressBar progress={progress} />}
      </div>
      <span className="chant-row-category">{chant.category}</span>
      <span className="chant-row-plays">{chant.popular ? 'Populer' : 'Standard'}</span>
      <div className="chant-row-actions">
        <button
          className={`chant-card-action-btn${liked ? ' chant-card-action-btn--liked' : ''}`}
          type="button"
          aria-label={liked ? 'Unlike' : 'Like'}
          aria-pressed={liked}
          onClick={() => setLiked(l => !l)}
        >
          <IconHeart filled={liked} size={14} />
        </button>
        <span className="chant-row-duration">{chant.duration}</span>
        <button
          type="button"
          className="chant-row-play-inline"
          onClick={onPlay}
          aria-label={isPlaying ? `Pause ${chant.title}` : `Play ${chant.title}`}
        >
          {isPlaying ? <IconPause size={14} /> : <IconPlay size={14} />}
        </button>
        <button className="chant-card-action-btn" type="button" aria-label="More options"><IconMoreHorizontal /></button>
      </div>
    </li>
  )
}

/* =============================================
   CHANT LIBRARY PAGE
   ============================================= */
export default function ChantLibrary({
  playingChantId,
  isPlaying,
  onCardClick,
  onPlayChantOnly,
  search,
  setSearch,
}: {
  playingChantId: number | null
  isPlaying: boolean
  onCardClick: (chant: ChantData) => void
  onPlayChantOnly: (chant: ChantData) => void
  search: string
  setSearch: (s: string) => void
}) {
  const [activeFilter, setActiveFilter] = useState('Semua Chant')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [expandedChantId, setExpandedChantId] = useState<number | null>(null)

  const matchFlowPhases = [
    {
      phase: 'INTRO PANJANG BARU (6 MENIT)',
      sub: 'Dinyanyikan sebelum pertandingan dimulai',
      chants: [
        { id: 4, num: '1.', title: '1. Mokleters Mokleters wikusama (oe oe o)', note: 'Wikusama SMK Telkom (Syalalalalalala) - 1.35 MENIT' },
        { id: 7, num: '2.', title: '2. Hari ini Telkom Malang berlaga', note: 'Hey forza moklet (clap 4x tangan diatas) - 1.40 MENIT' },
      ]
    },
    {
      phase: 'ISTIRAHAT QUARTER 1 KE 2 (INTRO PENDEK)',
      sub: 'Jeda pertandingan Quarter 1 ke Quarter 2',
      chants: [
        { id: 1, num: '3.', title: '3. Kami datang lagi', note: 'SMK Telkom Malang (Lantang ku bernyanyi 3X) - 2 MENIT' },
        { id: 2, num: '5.', title: '5. SMK Telkom Malang', note: 'Mendukungmu selamanya (clap 4x tangan diatas) - 2 MENIT' },
      ]
    },
    {
      phase: 'QUARTER 2 (TRIBUN)',
      sub: 'Dinyanyikan selama Quarter 2 berlangsung',
      chants: [
        { id: 3, num: '10.', title: '10. Buka lah Matamu', note: 'Dukung wikusama (Kiri & Kanan bersuara) - 1.50 MENIT' },
        { id: 11, num: '11.', title: '11. Hari ini kutinggalkan Pelajaran', note: 'Untuk moklet segalanya kulakukan (clap 4x) - 2 MENIT' },
        { id: 8, num: '12.', title: '12. Wis sue aku ngenteni koe', note: 'Telkom Malang kudu dimenangke (Bret) - 2.10 MENIT' },
      ]
    },
    {
      phase: 'QUARTER 2 KE 3 (INTRO PANJANG LAWAS) 3.30 MENIT',
      sub: 'Jeda Quarter 2 ke 3',
      chants: [
        { id: 5, num: '14.', title: '14. Kami pendukung Telkom Malang', note: 'Ale ale Telkom School selamanya - 2.10 MENIT' },
        { id: 10, num: '17.', title: '17. Warna merah kebanggaan kami', note: 'Disini kami terus berdiri (Takkan berhenti) - 2 MENIT' },
      ]
    },
    {
      phase: 'QUARTER 3 KE 4 (INTRO PENDEK)',
      sub: 'Jeda Quarter 3 ke 4 & Pengulangan',
      chants: [
        { id: 9, num: '17.', title: '17. Yeyeye happy yayaya', note: 'Telkom Malang jadi juara (4x) - 1.40 MENIT' },
      ]
    },
    {
      phase: 'ANTHEM (PENUTUP)',
      sub: 'Dinyanyikan bersama di akhir laga',
      chants: [
        { id: 6, num: 'ANTHEM', title: 'LOYALITAS TANPA BATAS MOKLETERS', note: 'Dengarlah kawan cerita dan semangatku' },
      ]
    }
  ]

  const filtered = CHANTS.filter(c => {
    const matchFilter = activeFilter === 'Semua Chant' || c.tag === activeFilter
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="chant-library" id="chant-library">
      <style>{`
        .match-flow-vertical-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 800px;
          margin: 40px auto 0;
          position: relative;
          width: 100%;
          text-align: left;
        }

        .match-flow-vertical-list::before {
          content: '';
          position: absolute;
          left: 9px;
          top: 10px;
          bottom: 10px;
          width: 2px;
          background: linear-gradient(180deg, var(--color-primary-bright) 0%, rgba(255,255,255,0.06) 100%);
          z-index: 1;
        }

        .match-flow-vertical-phase {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        .match-flow-vertical-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-left: 2px;
        }

        .match-flow-header-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary-bright);
          border: 4px solid #0b0c10;
          box-shadow: 0 0 10px var(--color-primary-bright);
          flex-shrink: 0;
        }

        .match-flow-header-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-primary-bright);
          text-transform: uppercase;
          margin: 0;
        }

        .match-flow-header-sub {
          font-size: 11px;
          color: var(--color-outline);
          margin-top: 2px;
          margin-bottom: 0;
        }

        .match-flow-vertical-chants {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 36px;
        }

        .match-flow-vertical-item-wrap {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .match-flow-vertical-item {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 16px;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.02) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 16px !important;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          width: 100%;
          box-sizing: border-box;
          text-align: left;
        }

        .match-flow-vertical-item:hover {
          background: rgba(161, 15, 18, 0.05) !important;
          border-color: rgba(161, 15, 18, 0.3) !important;
          transform: translateX(4px);
        }

        .match-flow-vertical-item--playing {
          background: rgba(161, 15, 18, 0.12) !important;
          border-color: rgba(161, 15, 18, 0.45) !important;
          box-shadow: 0 4px 20px rgba(161, 15, 18, 0.1) !important;
        }

        .match-flow-vertical-item--expanded {
          border-bottom-left-radius: 0px !important;
          border-bottom-right-radius: 0px !important;
          border-bottom-color: transparent !important;
          background: rgba(255, 255, 255, 0.03) !important;
        }

        .match-flow-badge {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: rgba(161, 15, 18, 0.15) !important;
          border: 1px solid rgba(161, 15, 18, 0.35) !important;
          font-size: 10px;
          font-weight: 800;
          color: var(--color-primary-bright) !important;
          flex-shrink: 0;
        }

        .match-flow-chant-info {
          flex-grow: 1;
          min-width: 0;
          text-align: left;
        }

        .match-flow-chant-title {
          font-size: 13.5px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
        }

        .match-flow-chant-note {
          font-size: 10.5px;
          color: var(--color-outline);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 3px;
          margin-bottom: 0;
        }

        .match-flow-play-btn {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .match-flow-vertical-item:hover .match-flow-play-btn {
          background: var(--color-primary);
          color: #ffffff;
          transform: scale(1.1);
        }

        .match-flow-vertical-item--playing .match-flow-play-btn {
          background: var(--color-primary-bright);
          color: #ffffff;
          transform: scale(1.1);
        }

        .match-flow-lyrics-panel {
          background: linear-gradient(180deg, rgba(14, 14, 18, 0.98) 0%, rgba(8, 8, 10, 0.99) 100%) !important;
          border: 1px solid rgba(161, 15, 18, 0.2) !important;
          border-top: none !important;
          border-bottom-left-radius: 16px !important;
          border-bottom-right-radius: 16px !important;
          padding: 24px !important;
          box-shadow: inset 0 8px 30px rgba(0, 0, 0, 0.95), 0 10px 30px rgba(0, 0, 0, 0.5) !important;
          animation: slideDownFade 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
        }

        .match-flow-lyrics-header {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
          padding-bottom: 12px;
        }

        .match-flow-lyrics-badge {
          font-size: 9px;
          font-weight: 800;
          color: var(--color-primary-bright);
          letter-spacing: 0.15em;
          background: rgba(161, 15, 18, 0.12);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(161, 15, 18, 0.25);
          text-transform: uppercase;
        }

        .match-flow-lyrics-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 220px;
          overflow-y: auto;
          padding: 0 8px;
          align-items: center;
        }

        .match-flow-lyric-line {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
          font-weight: 500;
          margin: 0;
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
          padding: 4px 16px;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
          box-sizing: border-box;
        }

        .match-flow-lyric-line:hover {
          color: var(--color-primary-bright);
          background: rgba(255, 255, 255, 0.03);
          transform: scale(1.02);
          text-shadow: 0 0 8px rgba(161, 15, 18, 0.4);
        }

        @media (max-width: 768px) {
          .match-flow-vertical-list::before {
            left: 9px;
          }
          .match-flow-vertical-chants {
            padding-left: 24px;
          }
          .match-flow-vertical-item {
            padding: 12px 16px !important;
            gap: 12px;
          }
          .match-flow-vertical-list {
            gap: 24px;
          }
        }
      `}</style>
      {/* ── HEADER HALAMAN ── */}
      <div className="chant-library-header">
        <div className="chant-library-header-bg" aria-hidden="true" />
        <div className="container chant-library-header-content">
          <div>
            <h1 className="chant-library-title">Perpustakaan Chant</h1>
            <p className="chant-library-subtitle">
              Klik card chant untuk membuka detail lirik &amp; memutar audio asli Mokleters.<br className="br-desktop" />
              Dirancang untuk mengguncang tribun dan menyatukan kebanggaan.
            </p>
          </div>
        </div>
      </div>

      {/* ── BILAH KONTROL ── */}
      <div className="chant-controls-bar">
        <div className="container chant-controls-inner">
          <nav className="chant-filters" aria-label="Filter chant berdasarkan kategori">
            {FILTERS.map(f => (
              <button
                key={f}
                id={`filter-${f.toLowerCase().replace(/ /g, '-')}`}
                className={`chant-filter-pill${activeFilter === f ? ' chant-filter-pill--active' : ''}`}
                type="button"
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </nav>

          <div className="chant-controls-right">
            <label className="chant-search-box" htmlFor="chant-search-input">
              <IconSearch />
              <input
                id="chant-search-input"
                type="search"
                placeholder="Cari chant..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Cari chant"
              />
            </label>

            <button className="chant-sort-btn" type="button" id="chant-sort-btn" aria-label="Urutkan chant">
              <IconSortDown />
              Urutkan
            </button>

            <div className="chant-view-toggle" role="group" aria-label="Mode tampilan">
              <button id="view-grid-btn" className={`chant-view-btn${viewMode === 'grid' ? ' chant-view-btn--active' : ''}`} type="button" aria-label="Tampilan grid" aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')}><IconGrid /></button>
              <button id="view-list-btn" className={`chant-view-btn${viewMode === 'list' ? ' chant-view-btn--active' : ''}`} type="button" aria-label="Tampilan daftar" aria-pressed={viewMode === 'list'} onClick={() => setViewMode('list')}><IconRows /></button>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRID / LIST ── */}
      <div className="container" style={{ paddingBottom: 60 }}>
        {filtered.length === 0 ? (
          <div className="chant-empty" role="status">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Chant tidak ditemukan</p>
            <p style={{ fontSize: 14, color: 'var(--color-outline)', marginTop: 8 }}>Coba gunakan filter atau kata kunci pencarian lainnya.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <>
            <div className="chant-grid" role="list" aria-label="Grid perpustakaan chant">
              {filtered.filter(c => c.id !== 6).map(chant => (
                <ChantCard
                  key={chant.id}
                  chant={chant}
                  isPlaying={playingChantId === chant.id && isPlaying}
                  onPlay={() => onCardClick(chant)}
                  progress={0}
                />
              ))}
            </div>

            {filtered.some(c => c.id === 6) && (
              <div className="chant-featured-section">
                <div className="chant-featured-separator" />
                <div className="chant-featured-label-row">
                  <span className="chant-featured-tag">ANTHEM MOKLETERS</span>
                </div>
                <ChantCard
                  chant={CHANTS.find(c => c.id === 6)!}
                  isPlaying={playingChantId === 6 && isPlaying}
                  onPlay={() => onCardClick(CHANTS.find(c => c.id === 6)!)}
                  progress={0}
                />
              </div>
            )}
          </>
        ) : (
          <div className="chant-list-view">
            <div className="chant-list-header" aria-hidden="true">
              <span className="chant-list-col-num">#</span>
              <span style={{ gridColumn: 'span 2' }}>Judul</span>
              <span>Kategori</span>
              <span>Diputar</span>
              <span style={{ textAlign: 'right' }}>Durasi</span>
            </div>
            <ol className="chant-list" aria-label="Daftar perpustakaan chant">
              {filtered.map((chant, i) => (
                <ChantRow
                  key={chant.id}
                  chant={chant}
                  index={i}
                  isPlaying={playingChantId === chant.id && isPlaying}
                  onPlay={() => onCardClick(chant)}
                  progress={0}
                />
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* ── SIDELIST / URUTAN CHANT (MATCH FLOW) ── */}
      <section className="container" style={{ paddingBottom: 180, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 50 }}>
        <header style={{ marginBottom: 40, textAlign: 'center' }}>
          <span className="section-label" style={{ color: 'var(--color-primary-bright)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Panduan Tribun</span>
          <h2 className="section-title" style={{ marginTop: 8, fontSize: 'clamp(24px, 3.5vw, 36px)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', color: '#ffffff', justifyContent: 'center' }}>Urutan Chant (Match Flow)</h2>
          <p style={{ fontSize: 14, color: 'var(--color-outline)', marginTop: 6, maxWidth: 600, margin: '6px auto 0' }}>Berikut adalah tata urutan menyanyikan chant di tribun utara dari sebelum kick-off hingga akhir laga. Klik lagu untuk memutar &amp; menampilkan lirik.</p>
        </header>

        <div className="match-flow-vertical-list">
          {matchFlowPhases.map((phaseItem, pIdx) => (
            <div key={pIdx} className="match-flow-vertical-phase">
              {/* Phase Header */}
              <div className="match-flow-vertical-header">
                <div className="match-flow-header-dot" />
                <div>
                  <h4 className="match-flow-header-title">{phaseItem.phase}</h4>
                  <p className="match-flow-header-sub">{phaseItem.sub}</p>
                </div>
              </div>

              {/* Phase Chants List */}
              <div className="match-flow-vertical-chants">
                {phaseItem.chants.map((item) => {
                  const ch = CHANTS.find(c => c.id === item.id);
                  if (!ch) return null;
                  const isPlayingCurrent = playingChantId === ch.id && isPlaying;
                  const isExpanded = expandedChantId === ch.id;

                  return (
                    <div key={item.id} className="match-flow-vertical-item-wrap">
                      <div
                        className={`match-flow-vertical-item${isPlayingCurrent ? ' match-flow-vertical-item--playing' : ''}${isExpanded ? ' match-flow-vertical-item--expanded' : ''}`}
                        onClick={() => {
                          onPlayChantOnly(ch);
                          setExpandedChantId(prev => prev === ch.id ? null : ch.id);
                        }}
                        role="button"
                        aria-expanded={isExpanded}
                        aria-label={`Putar dan buka lirik ${ch.title}`}
                      >
                        <span className="match-flow-badge">{item.num}</span>
                        <div className="match-flow-chant-info">
                          <p className="match-flow-chant-title" style={{ color: isPlayingCurrent ? 'var(--color-primary-bright)' : '#ffffff' }}>{item.title}</p>
                          <p className="match-flow-chant-note">{item.note}</p>
                        </div>
                        <button
                          className="match-flow-play-btn"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayChantOnly(ch);
                            setExpandedChantId(ch.id);
                          }}
                          aria-label={isPlayingCurrent ? 'Pause' : 'Play'}
                        >
                          {isPlayingCurrent ? <IconPause size={10} /> : <IconPlay size={10} />}
                        </button>
                      </div>

                      {/* Expandable Lyrics Area */}
                      {isExpanded && (
                        <div className="match-flow-lyrics-panel">
                          <div className="match-flow-lyrics-header">
                            <span className="match-flow-lyrics-badge">Lirik Chant Tribun</span>
                          </div>
                          <div className="match-flow-lyrics-content">
                            {ch.lyrics.map((line, lIdx) => (
                              <p key={lIdx} className="match-flow-lyric-line">{line.text}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
