/*
 * HENRY HWU PORTFOLIO — Home Page (Updated for Videographer)
 * Design: Brutalist Editorial Photography Portfolio
 * Layout: Fixed 200px left sidebar + two-column masonry gallery
 * Background: Warm beige rgb(223,221,216)
 * 
 * PHOTO/VIDEO INTEGRATION:
 * Replace the placeholder URLs below with your own Cloudinary URLs.
 * Cloudinary free tier: 25GB/month, perfect for videos + photos
 * 
 * HOW TO USE CLOUDINARY:
 * 1. Sign up free at https://cloudinary.com
 * 2. Upload your videos/photos to your Cloudinary account
 * 3. Copy the delivery URL for each file
 * 4. Paste the URL into the 'src' field below
 * 5. Set 'type' to 'image' or 'video'
 * 
 * Example Cloudinary URL:
 * https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/my-video.mp4
 * https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/my-photo.jpg
 */

import { useState, useEffect, useCallback } from "react";

// Gallery items with placeholder URLs
// Replace these with your own Cloudinary URLs
const GALLERY_ITEMS = [
  {
    id: 1,
    type: "image", // 'image' or 'video'
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
    alt: "Placeholder 1",
    dims: "800x600",
  },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    thumb: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    alt: "Placeholder 2",
    dims: "800x600",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1000&fit=crop",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    alt: "Placeholder 3",
    dims: "800x1000",
  },
  {
    id: 4,
    type: "image",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    thumb: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    alt: "Placeholder 4",
    dims: "800x600",
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=1000&fit=crop",
    thumb: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    alt: "Placeholder 5",
    dims: "800x1000",
  },
  {
    id: 6,
    type: "image",
    src: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop",
    thumb: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=300&h=300&fit=crop",
    alt: "Placeholder 6",
    dims: "800x600",
  },
  {
    id: 7,
    type: "image",
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    alt: "Placeholder 7",
    dims: "800x600",
  },
  {
    id: 8,
    type: "image",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=1000&fit=crop",
    thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=300&fit=crop",
    alt: "Placeholder 8",
    dims: "800x1000",
  },
  {
    id: 9,
    type: "image",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    thumb: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    alt: "Placeholder 9",
    dims: "800x600",
  },
  {
    id: 10,
    type: "image",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1000&fit=crop",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    alt: "Placeholder 10",
    dims: "800x1000",
  },
  {
    id: 11,
    type: "image",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    thumb: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    alt: "Placeholder 11",
    dims: "800x600",
  },
  {
    id: 12,
    type: "image",
    src: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=1000&fit=crop",
    thumb: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    alt: "Placeholder 12",
    dims: "800x1000",
  },
];

const NAV_LINKS = [
  { label: "circus maximus tour", href: "/travisscott" },
  { label: "mañana será bonito tour", href: "/karolg" },
  { label: "hit me hard and soft tour", href: "/hmhastour" },
  { label: "landscape", href: "/landscape" },
  { label: "exhibition 01", href: "/exhibition-01" },
  { label: "shop", href: "/shop" },
  { label: "contact", href: "/contact" },
];

const LOGO_URL = "https://via.placeholder.com/160x160?text=YOUR+LOGO";

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
      <button className="lightbox-close" onClick={onClose}>
        ✕
      </button>
      <button
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ‹
      </button>

      {/* Render image or video based on type */}
      {item.type === "image" ? (
        <img
          className="lightbox-img"
          src={item.src}
          alt={item.alt}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <video
          className="lightbox-img"
          controls
          autoPlay
          onClick={(e) => e.stopPropagation()}
        >
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <button
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ›
      </button>
    </div>
  );
}

export default function Home() {
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
    );
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % GALLERY_ITEMS.length : null
    );
  }, []);

  return (
    <div className="site-wrapper">
      {/* ===== FIXED LEFT SIDEBAR ===== */}
      <aside className="sidebar">
        {/* Logo - Replace with your own */}
        <a href="/" className="sidebar-logo">
          <img src={LOGO_URL} alt="YOUR LOGO" />
        </a>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {/* Home — separate section */}
          <div className="nav-home-section">
            <a href="/" className="nav-home-link active">
              home
            </a>
          </div>

          {/* Secondary nav links */}
          <div className="nav-links-section">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        {/* Gallery controls bar */}
        <div className="gallery-controls-bar">
          <span
            className="ctrl-link"
            onClick={() => {
              if (lightboxIndex !== null) prevImage();
            }}
          >
            prev
          </span>
          <span className="ctrl-sep">/</span>
          <span
            className="ctrl-link"
            onClick={() => {
              if (lightboxIndex !== null) nextImage();
            }}
          >
            next
          </span>
          <div className="page-nums">
            {GALLERY_ITEMS.map((_, i) => (
              <span
                key={i}
                className="page-num"
                onClick={() => openLightbox(i)}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* Two-column masonry gallery */}
        <div className="gallery-masonry">
          {GALLERY_ITEMS.map((item, index) => {
            const [w, h] = item.dims.split("x").map(Number);
            return (
              <div
                key={item.id}
                className="gallery-masonry-item"
                onClick={() => openLightbox(index)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.thumb}
                    alt={item.alt}
                    style={{ aspectRatio: `${w}/${h}` }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="video-thumbnail"
                    style={{ aspectRatio: `${w}/${h}` }}
                  >
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div className="video-play-button">▶</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Gallery footer */}
        <div className="gallery-footer">
          <div className="gallery-dots">
            {"·".repeat(GALLERY_ITEMS.length)}
          </div>
          <button
            className="show-thumbnails-btn"
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            {showThumbnails ? "hide thumbnails" : "show thumbnails"}
          </button>
        </div>

        {/* Thumbnail strip */}
        {showThumbnails && (
          <div className="thumbnail-strip">
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`thumb-item ${lightboxIndex === index ? "active" : ""}`}
                onClick={() => openLightbox(index)}
              >
                {item.type === "image" ? (
                  <img src={item.thumb} alt={item.alt} />
                ) : (
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div className="video-play-button-small">▶</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ===== LIGHTBOX ===== */}
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
