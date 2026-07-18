import { useState } from 'react'
import type { PlayerTrack } from './App'

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

/* =============================================
   CHANT DATA
   ============================================= */
const CHANTS = [
  { id: 1, title: 'Mokleters Pride', duration: '3:45', category: 'Anthem Pembuka', tag: 'Pembuka', popular: true, img: '/chant-art.png', artist: 'Fans Mokleters', plays: '1.5Jt' },
  { id: 2, title: 'Red Storm', duration: '2:12', category: 'Tempo Pertandingan', tag: 'Pertandingan', popular: false, img: '/chant-art.png', artist: 'Paduan Suara Tribun Utara', plays: '892Rb' },
  { id: 3, title: 'Victory Roar', duration: '4:05', category: 'Chant Kemenangan', tag: 'Kemenangan', popular: true, img: '/chant-art.png', artist: 'Unit Perkusi', plays: '740Rb' },
  { id: 4, title: 'We Are One', duration: '2:50', category: 'Lagu Penutup', tag: 'Penutup', popular: false, img: '/chant-art.png', artist: 'Ensembel Vokal 2025', plays: '612Rb' },
  { id: 5, title: 'Stadium Shaker', duration: '1:45', category: 'Tempo Pertandingan', tag: 'Pertandingan', popular: false, img: '/chant-art.png', artist: 'Ultras SMK Malang', plays: '541Rb' },
  { id: 6, title: 'Iron Hearts', duration: '3:18', category: 'Anthem Pembuka', tag: 'Pembuka', popular: false, img: '/chant-art.png', artist: 'Fans Mokleters', plays: '498Rb' },
  { id: 7, title: 'Blood & Pride', duration: '2:40', category: 'Tempo Pertandingan', tag: 'Pertandingan', popular: true, img: '/chant-art.png', artist: 'Paduan Suara Tribun Utara', plays: '432Rb' },
  { id: 8, title: 'Telkom Rising', duration: '3:55', category: 'Chant Kemenangan', tag: 'Kemenangan', popular: false, img: '/chant-art.png', artist: 'Unit Perkusi', plays: '387Rb' },
]

const FILTERS = ['Semua Chant', 'Pembuka', 'Pertandingan', 'Kemenangan', 'Penutup']

/* =============================================
   CHANT CARD (Grid View)
   ============================================= */
function ChantCard({
  chant,
  isPlaying,
  onPlay,
}: {
  chant: typeof CHANTS[0]
  isPlaying: boolean
  onPlay: () => void
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
        <h3 className="chant-card-title">{chant.title}</h3>
        <p className="chant-card-meta">{chant.duration} • {chant.category}</p>
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
}: {
  chant: typeof CHANTS[0]
  index: number
  isPlaying: boolean
  onPlay: () => void
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
        <p className="chant-row-title">{chant.title}</p>
        <p className="chant-row-artist">{chant.artist}</p>
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
        <button className="chant-card-action-btn" type="button" aria-label="More options"><IconMoreHorizontal /></button>
      </div>
    </li>
  )
}

/* =============================================
   CHANT LIBRARY PAGE
   ============================================= */
export default function ChantLibrary({ onPlay }: { onPlay: (track: Partial<PlayerTrack>) => void }) {
  const [activeFilter, setActiveFilter] = useState('Semua Chant')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [playingId, setPlayingId] = useState<number | null>(1)
  const [search, setSearch] = useState('')

  const filtered = CHANTS.filter(c => {
    const matchFilter = activeFilter === 'Semua Chant' || c.tag === activeFilter
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const handlePlay = (chant: typeof CHANTS[0]) => {
    if (playingId === chant.id) {
      setPlayingId(null)
    } else {
      setPlayingId(chant.id)
      onPlay({
        title: chant.title,
        artist: `${chant.category} • Fans Mokleters`,
        img: chant.img,
        duration: chant.duration,
        currentTime: '0:00',
        progress: 0,
      })
    }
  }

  return (
    <div className="chant-library" id="chant-library">
      {/* ── HEADER HALAMAN ── */}
      <div className="chant-library-header">
        <div className="chant-library-header-bg" aria-hidden="true" />
        <div className="container chant-library-header-content">
          <div>
            <h1 className="chant-library-title">Perpustakaan Chant</h1>
            <p className="chant-library-subtitle">
              Bakar semangat juang. Akses koleksi lengkap anthem stadion Mokleters,<br className="br-desktop" />
              dirancang untuk mengguncang tribun dan menyatukan kebanggaan.
            </p>
          </div>
        </div>
      </div>

      {/* ── BILAH KONTROL ── */}
      <div className="chant-controls-bar">
        <div className="container chant-controls-inner">
          {/* Pil Filter */}
          <nav className="chant-filters" aria-label="Filter chant berdasarkan kategori">
            {FILTERS.map(f => (
              <button
                key={f}
                id={`filter-${f.toLowerCase().replace(' ', '-')}`}
                className={`chant-filter-pill${activeFilter === f ? ' chant-filter-pill--active' : ''}`}
                type="button"
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Kanan: cari + urutkan + mode tampilan */}
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
              <button
                id="view-grid-btn"
                className={`chant-view-btn${viewMode === 'grid' ? ' chant-view-btn--active' : ''}`}
                type="button"
                aria-label="Tampilan grid"
                aria-pressed={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
              >
                <IconGrid />
              </button>
              <button
                id="view-list-btn"
                className={`chant-view-btn${viewMode === 'list' ? ' chant-view-btn--active' : ''}`}
                type="button"
                aria-label="Tampilan daftar"
                aria-pressed={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              >
                <IconRows />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRID CHANT ── */}
      <div className="container" style={{ paddingBottom: 100 }}>
        {filtered.length === 0 ? (
          <div className="chant-empty" role="status">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Chant tidak ditemukan
            </p>
            <p style={{ fontSize: 14, color: 'var(--color-outline)', marginTop: 8 }}>
              Coba gunakan filter atau kata kunci pencarian lainnya.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="chant-grid" role="list" aria-label="Grid perpustakaan chant">
            {filtered.map(chant => (
              <ChantCard
                key={chant.id}
                chant={chant}
                isPlaying={playingId === chant.id}
                onPlay={() => handlePlay(chant)}
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
                  isPlaying={playingId === chant.id}
                  onPlay={() => handlePlay(chant)}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
