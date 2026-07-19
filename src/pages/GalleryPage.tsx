import { useState, useCallback } from 'react'
import gallery1 from '../assets/images/DSC01919_optimized.webp'
import gallery2 from '../assets/images/DSC01950_optimized.webp'
import gallery3 from '../assets/images/DSC01952_optimized.webp'
import gallery4 from '../assets/images/DSC01954_optimized.webp' // Fixed from DSC01952
import gallery5 from '../assets/images/DSC01957_optimized.webp'
import gallery6 from '../assets/images/DSC01958_optimized.webp'
import nabilPhoto from '../assets/nabil_optimized.webp'
import elzidanePhoto from '../assets/elzidane_optimized.webp'
import mascotPhoto from '../assets/mascot_optimized.webp'
import bombiPhoto from '../assets/bombi_optimized.webp'
// WhatsApp Images
import wa1 from '../assets/images/wa_1_optimized.webp'
import wa2 from '../assets/images/wa_2_optimized.webp'
import wa3 from '../assets/images/wa_3_optimized.webp'
import wa4 from '../assets/images/wa_4_optimized.webp'
import wa5 from '../assets/images/wa_5_optimized.webp'
import wa6 from '../assets/images/wa_6_optimized.webp'
import wa7 from '../assets/images/wa_7_optimized.webp'
import wa8 from '../assets/images/wa_8_optimized.webp'

/* =============================================
   GALLERY PAGE – MOKLETERS PHOTO ARCHIVE
   ============================================= */

type GalleryItem = {
  id: number
  src: string
  title: string
  category: string
  date: string
  desc: string
  wide?: boolean  // span 2 columns in grid
  tall?: boolean  // span 2 rows in grid
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: gallery1,
    title: 'koor mokleters 2025',
    category: 'Laga',
    date: '12 Mei 2024',
    desc: 'Koor Mokleters 2025 di tribun utara stadion Wikusama, menyalakan semangat tim dengan yel-yel yang menggema.',
    wide: true,
  },
  {
    id: 2,
    src: gallery2,
    title: 'KickOff DBL 2025',
    category: 'Kolektif',
    date: '8 Maret 2024',
    desc: 'Mokleters hadir memeriahkan KickOff DBL 2025, menyalakan semangat tim dengan koreografi dan yel-yel yang menggema di seluruh stadion.',
  },
  {
    id: 3,
    src: gallery6,
    title: 'Syal Mokleters',
    category: 'Kolektif',
    date: '15 April 2024',
    desc: 'Syal merah kebanggaan Mokleters diangkat tinggi sebagai simbol persatuan dan loyalitas tanpa batas.',
  },
  {
    id: 4,
    src: gallery4,
    title: 'Perkusi Mokleters',
    category: 'Koreografi',
    date: '22 Februari 2024',
    desc: 'Ritme perkusi yang menghentak di tribun utara, menggetarkan stadion dan membakar semangat tim.',
    wide: true,
  },
  {
    id: 5,
    src: gallery5,
    title: 'Momen Gol',
    category: 'Laga',
    date: '5 Januari 2024',
    desc: 'Tim Wikusama merayakan gol di hadapan ribuan supporter yang memadati tribun.',
  },
  {
    id: 6,
    src: gallery3,
    title: 'Porseni 2024',
    category: 'Event',
    date: '17 Agustus 2024',
    desc: 'Suasana Pekan Olahraga & Seni SMK Telkom Malang 2024 — Mokleters hadir penuh semangat dari awal hingga akhir.',
    wide: true,
  },
  {
    id: 7,
    src: mascotPhoto,
    title: 'Bombi Si Maskot',
    category: 'Maskot',
    date: '1 Juli 2024',
    desc: 'Si Wiku—maskot resmi Mokleters—hadir memeriahkan setiap laga sebagai penjaga semangat tribun.',
    tall: true,
  },
  {
    id: 8,
    src: nabilPhoto,
    title: 'Developer & Crew',
    category: 'Tim',
    date: '10 Juni 2024',
    desc: 'Anggota tim kreatif Mokleters yang bekerja di balik layar untuk memajukan komunitas supporter.',
  },
  {
    id: 9,
    src: elzidanePhoto,
    title: 'Website Developer Mokleters',
    category: 'Developer',
    date: '10 Juni 2026',
    desc: 'Website Developer Mokleters',
  },
  {
    id: 10,
    src: bombiPhoto,
    title: 'Bombi — Pahlawan Kecil',
    category: 'Maskot',
    date: '30 Mei 2024',
    desc: 'Bombi, sang maskot gagah yang terinspirasi dari Gatotkaca—simbol keberanian dan kekuatan Mokleters.',
  },
  {
    id: 11,
    src: wa1,
    title: 'Aksi Tribun Utara',
    category: 'Laga',
    date: '19 Juli 2026',
    desc: 'Gemuruh ribuan Mokleters menyanyikan chant kebanggaan di tribun utara stadion.',
  },
  {
    id: 12,
    src: wa2,
    title: 'Koreografi Merah Putih',
    category: 'Koreografi',
    date: '19 Juli 2026',
    desc: 'Pertunjukan koreografi kertas dan bendera raksasa oleh suporter Mokleters.',
  },
  {
    id: 13,
    src: wa3,
    title: 'Semangat Wikusama',
    category: 'Kolektif',
    date: '19 Juli 2026',
    desc: 'Kekompakan suporter Mokleters yang tak kenal lelah mengawal tim kebanggaan.',
  },
  {
    id: 14,
    src: wa4,
    title: 'Kibaran Bendera Kebesaran',
    category: 'Laga',
    date: '19 Juli 2026',
    desc: 'Giant flag dengan lambang Mokleters berkibar megah di tengah-tengah kerumunan suporter.',
  },
  {
    id: 15,
    src: wa5,
    title: 'Gemuruh Stadion',
    category: 'Event',
    date: '19 Juli 2026',
    desc: 'Euforia dan gairah suporter Mokleters saat merayakan kemenangan tim Wikusama.',
  },
  {
    id: 16,
    src: wa6,
    title: 'Suasana DBL Malang',
    category: 'Laga',
    date: '19 Juli 2026',
    desc: 'Potret lautan merah suporter Mokleters memadati DBL Arena Malang.',
    wide: true,
  },
  {
    id: 17,
    src: wa7,
    title: 'Solidaritas Tanpa Batas',
    category: 'Kolektif',
    date: '19 Juli 2026',
    desc: 'Persaudaraan erat antar suporter Mokleters baik di dalam maupun di luar tribun.',
  },
  {
    id: 18,
    src: wa8,
    title: 'Kreativitas Tribun',
    category: 'Koreografi',
    date: '19 Juli 2026',
    desc: 'Persiapan koreo 3D kreatif dari tim kreatif Mokleters.',
  },
]

const CATEGORIES = ['Semua', 'Laga', 'Koreografi', 'Kolektif', 'Event', 'Maskot', 'Tim']

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const filtered = activeCategory === 'Semua'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeCategory)

  const openLightbox = useCallback((item: GalleryItem) => {
    setLightboxItem(item)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxItem(null)
    document.body.style.overflow = ''
  }, [])

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (!lightboxItem) return
    const currentIdx = filtered.findIndex(i => i.id === lightboxItem.id)
    const nextIdx = direction === 'next'
      ? (currentIdx + 1) % filtered.length
      : (currentIdx - 1 + filtered.length) % filtered.length
    setLightboxItem(filtered[nextIdx])
  }, [lightboxItem, filtered])

  return (
    <div className="gallery-page">
      {/* ── Header ── */}
      <div className="gallery-header">
        <div className="gallery-header-glow" />
        <div className="container gallery-header-content">
          <h1 className="gallery-title">
            GALERI<br />
            <span className="gallery-title-accent">MOKLETERS</span>
          </h1>
          <p className="gallery-subtitle">
            Setiap foto adalah cerita kebanggaan — momen-momen paling berapi dari tribun utara Wikusama.
          </p>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="gallery-filter-bar">
        <div className="container gallery-filter-inner">
          <div className="gallery-filter-label">Filter:</div>
          <div className="gallery-filter-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-pill${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                type="button"
              >
                {cat}
                {cat !== 'Semua' && (
                  <span className="gallery-filter-count">
                    {GALLERY_ITEMS.filter(i => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="gallery-total-label">
            {filtered.length} foto
          </div>
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="container gallery-grid-wrap">
        <div className="gallery-masonry">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className={`gallery-card${item.wide ? ' gallery-card--wide' : ''}${item.tall ? ' gallery-card--tall' : ''}`}
              style={{ animationDelay: `${idx * 60}ms` }}
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openLightbox(item)}
              aria-label={`Lihat foto ${item.title}`}
            >
              <div className="gallery-card-img-wrap">
                <img
                  src={item.src}
                  alt={item.title}
                  className="gallery-card-img"
                  loading="lazy"
                />
                <div className="gallery-card-overlay">
                  <div className="gallery-card-zoom-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="gallery-card-info">
                <span className="gallery-card-cat">{item.category}</span>
                <h3 className="gallery-card-title">{item.title}</h3>
                <span className="gallery-card-date">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="gallery-empty">
            <div className="gallery-empty-icon">📷</div>
            <p>Belum ada foto dalam kategori ini.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxItem && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox foto galeri"
        >
          <div className="gallery-lightbox-backdrop" />

          {/* Close */}
          <button
            className="gallery-lightbox-close"
            type="button"
            aria-label="Tutup lightbox"
            onClick={closeLightbox}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>

          {/* Prev */}
          <button
            className="gallery-lightbox-nav gallery-lightbox-nav--prev"
            type="button"
            aria-label="Foto sebelumnya"
            onClick={e => { e.stopPropagation(); navigateLightbox('prev') }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6" /></svg>
          </button>

          {/* Content */}
          <div
            className="gallery-lightbox-content"
            onClick={e => e.stopPropagation()}
          >
            <div className="gallery-lightbox-img-wrap">
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className="gallery-lightbox-img"
              />
            </div>
            <div className="gallery-lightbox-meta">
              <span className="gallery-lightbox-cat">{lightboxItem.category}</span>
              <h2 className="gallery-lightbox-title">{lightboxItem.title}</h2>
              <p className="gallery-lightbox-desc">{lightboxItem.desc}</p>
              <span className="gallery-lightbox-date">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {lightboxItem.date}
              </span>
              <div className="gallery-lightbox-counter">
                {filtered.findIndex(i => i.id === lightboxItem.id) + 1} / {filtered.length}
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            className="gallery-lightbox-nav gallery-lightbox-nav--next"
            type="button"
            aria-label="Foto berikutnya"
            onClick={e => { e.stopPropagation(); navigateLightbox('next') }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6" /></svg>
          </button>
        </div>
      )}
    </div>
  )
}
