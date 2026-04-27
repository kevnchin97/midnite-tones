/*
 * MIDNITE TONES PORTFOLIO — Home Page
 */

import { useState, useEffect, useCallback } from "react";

const CLOUD = "deh9om69m";
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;

const makeItem = (id: number, file: string, folder: string, w: number, h: number, alt: string) => ({
  id,
  type: "image" as const,
  src: `${BASE}/${folder}/${file}.jpg`,
  thumb: `${BASE}/w_400,h_400,c_fill/${folder}/${file}.jpg`,
  alt,
  dims: `${w}x${h}`,
});

const GALLERY_ITEMS = [
  makeItem(1,  "Z8P_1559-Enhanced-NR_zh2yf9", "Photos/Concerts", 7935, 5290, "Concert 1"),
  makeItem(2,  "Z8P_7940_qhfedc",              "Photos/Concerts", 8256, 5504, "Concert 2"),
  makeItem(3,  "Z8P_8050_ymfksk",              "Photos/Concerts", 8150, 5433, "Concert 3"),
  makeItem(4,  "Z8P_1656-Enhanced-NR_q9akb6", "Photos/Concerts", 7142, 4761, "Concert 4"),
  makeItem(5,  "Z8P_8208-2_jqjkbe",           "Photos/Concerts", 8256, 5504, "Concert 5"),
  makeItem(6,  "Z8P_8249-2_pfyy7t",           "Photos/Concerts", 8256, 5504, "Concert 6"),
  makeItem(7,  "Z8P_3375_y0kli2",             "Photos/Concerts", 8256, 5504, "Concert 7"),
  makeItem(8,  "Z8P_3983-Enhanced-NR_kbenzq", "Photos/Concerts", 8256, 5504, "Concert 8"),
  makeItem(9,  "Z8P_3950-Enhanced-NR_uucqrj", "Photos/Concerts", 8256, 5504, "Concert 9"),
  makeItem(10, "Z8P_4938-Enhanced-NR_wapata", "Photos/Concerts", 7960, 5307, "Concert 10"),
  makeItem(11, "Z8P_1803-Enhanced-NR-2_ruhozc","Photos/Concerts",3592, 5392, "Concert 11"),
  makeItem(12, "Z8P_5034-Enhanced-NR_hwhzn4", "Photos/Concerts", 8256, 5504, "Concert 12"),
  makeItem(13, "Z8P_5130-Enhanced-NR_vd3f4l", "Photos/Concerts", 7690, 5260, "Concert 13"),
  makeItem(14, "Z8P_5125-Enhanced-NR_za9dab", "Photos/Concerts", 7690, 5260, "Concert 14"),
  makeItem(15, "Z8P_5204-Enhanced-NR_censms", "Photos/Concerts", 8256, 5504, "Concert 15"),
  makeItem(16, "Z8P_3490-Enhanced-NR_hdfkje", "Photos/Concerts", 8256, 5504, "Concert 16"),
  makeItem(17, "Z8P_3954-Enhanced-NR_jvegzd", "Photos/Concerts", 8256, 5504, "Concert 17"),
  makeItem(18, "Z8P_6533-Enhanced-NR_drylmp", "Photos/Concerts", 8256, 5504, "Concert 18"),
  makeItem(19, "Z8P_3313_yw4ycn",             "Photos/Concerts", 8256, 5504, "Concert 19"),
  makeItem(20, "Z8P_5393_crswmi",             "Photos/Concerts", 8256, 5504, "Concert 20"),
  makeItem(21, "Z8P_4983-Enhanced-NR_vobsw9", "Photos/Concerts", 5504, 8256, "Concert 21"),
  makeItem(22, "Z8P_5063-Enhanced-NR_abjomk", "Photos/Concerts", 8256, 5504, "Concert 22"),
  makeItem(23, "Z8P_5018-Enhanced-NR_wr1ede", "Photos/Concerts", 3592, 5392, "Concert 23"),
  makeItem(24, "Z8P_7589_rcftlr",             "Photos/Concerts", 8256, 5504, "Concert 24"),
  makeItem(25, "Z8P_5148_hwt7hl",             "Photos/Concerts", 7357, 4905, "Concert 25"),
  makeItem(26, "Z8P_7515_syj3hk",             "Photos/Concerts", 8256, 5504, "Concert 26"),
  makeItem(27, "Z8P_8476_dw1ve1",             "Photos/Concerts", 8256, 5504, "Concert 27"),
  makeItem(28, "Z8P_3555-Enhanced-NR_kpf34v", "Photos/Concerts", 7935, 5290, "Concert 28"),
  makeItem(29, "Z8P_3962-Enhanced-NR_m78q2r", "Photos/Concerts", 8256, 5504, "Concert 29"),
];

const NAV_LINKS = [
  { label: "concerts", href: "/" },
  { label: "weddings", href: "/" },
  { label: "contact", href: "/" },
];

const LOGO_URL = "https://via.placeholder.com/160x160?text=MT";

interface LightboxProps {
  items: typeof GALLERY_ITEMS;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <img
        className="lightbox-img"
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
      />
      <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
    </div>
  );
}

export default function Home() {
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => i !== null ? (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null);
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => i !== null ? (i + 1) % GALLERY_ITEMS.length : null);
  }, []);

  return (
    <div className="site-wrapper">
      <aside className="sidebar">
        <a href="/" className="sidebar-logo">
          <img src={LOGO_URL} alt="MIDNITE TONES" />
        </a>
        <nav className="sidebar-nav">
          <div className="nav-home-section">
            <a href="/" className="nav-home-link active">home</a>
          </div>
          <div className="nav-links-section">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <div className="gallery-controls-bar">
          <span className="ctrl-link" onClick={() => { if (lightboxIndex !== null) prevImage(); }}>prev</span>
          <span className="ctrl-sep">/</span>
          <span className="ctrl-link" onClick={() => { if (lightboxIndex !== null) nextImage(); }}>next</span>
          <div className="page-nums">
            {GALLERY_ITEMS.map((_, i) => (
              <span key={i} className="page-num" onClick={() => openLightbox(i)}>{i + 1}</span>
            ))}
          </div>
        </div>

        <div className="gallery-masonry">
          {GALLERY_ITEMS.map((item, index) => {
            const [w, h] = item.dims.split("x").map(Number);
            return (
              <div key={item.id} className="gallery-masonry-item" onClick={() => openLightbox(index)}>
                <img
                  src={item.thumb}
                  alt={item.alt}
                  style={{ aspectRatio: `${w}/${h}` }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        <div className="gallery-footer">
          <div className="gallery-dots">{"·".repeat(GALLERY_ITEMS.length)}</div>
          <button className="show-thumbnails-btn" onClick={() => setShowThumbnails(!showThumbnails)}>
            {showThumbnails ? "hide thumbnails" : "show thumbnails"}
          </button>
        </div>

        {showThumbnails && (
          <div className="thumbnail-strip">
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`thumb-item ${lightboxIndex === index ? "active" : ""}`}
                onClick={() => openLightbox(index)}
              >
                <img src={item.thumb} alt={item.alt} />
              </div>
            ))}
          </div>
        )}
      </main>

      {lightboxIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
