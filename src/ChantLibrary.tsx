import { useState } from 'react'
import type { ChantData } from './lyrics'
import { CHANTS } from './lyrics'

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

  return (
    <article
      className={`chant-card${isPlaying ? ' chant-card--playing' : ''}`}
      id={`chant-card-${chant.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <div className={`chant-card-overlay${hovered || isPlaying ? ' chant-card-overlay--visible' : ''}`} aria-hidden="true">
          {/* Overlaid icons top-right */}
          <div className="chant-card-overlay-top">
            <button
              className={`chant-card-icon-btn${liked ? ' chant-card-icon-btn--liked' : ''}`}
              type="button"
              aria-label={liked ? 'Unlike' : 'Like'}
              onClick={e => { e.stopPropagation(); setLiked(l => !l) }}
            >
              <IconHeart filled={liked} size={13} />
            </button>
            <button
              className="chant-card-icon-btn"
              type="button"
              aria-label="More options"
              onClick={e => e.stopPropagation()}
            >
              <IconMoreHorizontal />
            </button>
          </div>
        </div>

        {/* Popular badge */}
        {chant.popular && (
          <div className="chant-card-popular-badge" aria-label="Popular">POPULAR</div>
        )}

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
          <button
            className="chant-card-action-btn"
            type="button"
            aria-label="More options"
          >
            <IconMoreHorizontal />
          </button>
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
        <p className="chant-row-artist">{chant.artist}</p>
        {isPlaying && <MiniProgressBar progress={progress} />}
      </div>
      <span className="chant-row-category">{chant.category}</span>
      <span className="chant-row-plays">{chant.plays}</span>
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
}: {
  playingChantId: number | null
  isPlaying: boolean
  onCardClick: (chant: ChantData) => void
}) {
  const [activeFilter, setActiveFilter] = useState('Semua Chant')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  const filtered = CHANTS.filter(c => {
    const matchFilter = activeFilter === 'Semua Chant' || c.tag === activeFilter
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="chant-library" id="chant-library">
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
            <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '6px 16px', fontSize: 13 }}>
                🎵 {CHANTS.length} Chant Tersedia
              </span>
              <span style={{ background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 99, padding: '6px 16px', fontSize: 13, color: '#ff6060' }}>
                ● Audio Asli Mokleters
              </span>
              <span style={{ background: 'rgba(80,180,255,0.10)', border: '1px solid rgba(80,180,255,0.25)', borderRadius: 99, padding: '6px 16px', fontSize: 13, color: '#60c8ff' }}>
                📝 Lirik Sinkron
              </span>
            </div>
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
      <div className="container" style={{ paddingBottom: 100 }}>
        {filtered.length === 0 ? (
          <div className="chant-empty" role="status">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Chant tidak ditemukan</p>
            <p style={{ fontSize: 14, color: 'var(--color-outline)', marginTop: 8 }}>Coba gunakan filter atau kata kunci pencarian lainnya.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="chant-grid" role="list" aria-label="Grid perpustakaan chant">
            {filtered.map(chant => (
              <ChantCard
                key={chant.id}
                chant={chant}
                isPlaying={playingChantId === chant.id && isPlaying}
                onPlay={() => onCardClick(chant)}
                progress={0}
              />
            ))}
          </div>
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
    </div>
  )
}
