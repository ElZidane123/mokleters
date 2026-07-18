import { useState, useCallback } from 'react'
import gallery1 from '../assets/gallery1.png'
import gallery2 from '../assets/gallery2.png'
import gallery3 from '../assets/gallery3.png'
import gallery4 from '../assets/gallery4.png'
import gallery5 from '../assets/gallery5.png'
import gallery6 from '../assets/gallery6.png'
import nabilPhoto from '../assets/nabil.jpg'
import elzidanePhoto from '../assets/elzidane.jpg'
import mascotPhoto from '../assets/mascot.png'
import bombiPhoto from '../assets/bombi.png'

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
    title: 'Lautan Merah Utara',
    category: 'Laga',
    date: '12 Mei 2024',
    desc: 'Ribuan Mokleters menyalakan flare merah putih di tribun utara, menciptakan lautan api kebanggaan yang takkan terlupakan.',
    wide: true,
  },
  {
    id: 2,
    src: gallery2,
    title: 'Formasi Korsa',
    category: 'Kolektif',
    date: '8 Maret 2024',
    desc: 'Momen kompak Mokleters berbaris di depan banner raksasa sebelum laga dimulai.',
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
    title: 'Tifo Raksasa',
    category: 'Koreografi',
    date: '22 Februari 2024',
    desc: 'Koreografi kertas berwarna membentuk mosaik luar biasa di tribun utara saat laga dimulai.',
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
