/*
 * MIDNITE TONES — Cloudinary Upload Page
 * Upload photos/videos directly to Cloudinary, then copy URLs into Home.tsx
 */

import { useState, useCallback, useRef } from "react";

const CLOUD_NAME = "deh9om69m";
const UPLOAD_PRESET = "Website";

interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video";
  url: string;
  thumbUrl: string;
  dims: string;
  status: "uploading" | "done" | "error";
  progress: number;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const id = crypto.randomUUID();

    setFiles((prev) => [
      ...prev,
      {
        id,
        name: file.name,
        type: isVideo ? "video" : "image",
        url: "",
        thumbUrl: "",
        dims: "",
        status: "uploading",
        progress: 0,
      },
    ]);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const resourceType = isVideo ? "video" : "image";
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`
      );

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, progress: pct } : f))
          );
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const w = data.width || 1920;
          const h = data.height || 1080;
          const thumbUrl = isVideo
            ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0,f_jpg,w_400/${data.public_id}.jpg`
            : data.secure_url;

          setFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? {
                    ...f,
                    url: data.secure_url,
                    thumbUrl,
                    dims: `${w}x${h}`,
                    status: "done",
                    progress: 100,
                  }
                : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id ? { ...f, status: "error", progress: 0 } : f
            )
          );
        }
      };

      xhr.onerror = () => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, status: "error", progress: 0 } : f
          )
        );
      };

      xhr.send(formData);
    } catch {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, status: "error", progress: 0 } : f
        )
      );
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      Array.from(e.dataTransfer.files).forEach(uploadFile);
    },
    [uploadFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        Array.from(e.target.files).forEach(uploadFile);
      }
    },
    [uploadFile]
  );

  const handleCopy = (id: string, text: string) => {
    copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const generateGalleryItem = (f: UploadedFile, index: number) => {
    return `  {
    id: ${index + 1},
    type: "${f.type}",
    src: "${f.url}",
    thumb: "${f.thumbUrl}",
    alt: "${f.name.replace(/\.[^/.]+$/, "")}",
    dims: "${f.dims}",
  },`;
  };

  const doneFiles = files.filter((f) => f.status === "done");

  const allCode = doneFiles.length
    ? `const GALLERY_ITEMS = [\n${doneFiles.map((f, i) => generateGalleryItem(f, i)).join("\n")}\n];`
    : "";

  return (
    <div className="site-wrapper">
      <aside className="sidebar">
        <a href="/" className="sidebar-logo">
          <img
            src="https://via.placeholder.com/160x160?text=MT"
            alt="MIDNITE TONES"
          />
        </a>
        <nav className="sidebar-nav">
          <div className="nav-home-section">
            <a href="/" className="nav-home-link">
              home
            </a>
          </div>
          <div className="nav-links-section">
            <a href="/upload" className="nav-link active">
              upload
            </a>
          </div>
        </nav>
      </aside>

      <main className="main-content" style={{ padding: "40px 48px" }}>
        <h1
          style={{
            fontFamily: "inherit",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            marginBottom: "32px",
          }}
        >
          Upload to Cloudinary
        </h1>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `1px solid ${dragging ? "#1a1a1a" : "#ccc"}`,
            backgroundColor: dragging ? "rgba(0,0,0,0.03)" : "transparent",
            padding: "48px",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "40px",
            transition: "all 0.15s ease",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#666",
            }}
          >
            {dragging
              ? "drop files here"
              : "drag & drop photos / videos — or click to browse"}
          </p>
          <p
            style={{
              fontSize: "10px",
              color: "#999",
              marginTop: "8px",
              letterSpacing: "0.05em",
            }}
          >
            JPG, PNG, WebP, MP4, MOV supported
          </p>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            {files.map((f) => (
              <div
                key={f.id}
                style={{
                  borderTop: "1px solid #ddd",
                  padding: "16px 0",
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#e0deda",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {f.status === "done" ? (
                    <img
                      src={f.thumbUrl}
                      alt={f.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "20px" }}>
                      {f.type === "video" ? "🎬" : "🖼"}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginBottom: "4px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {f.name}
                  </p>

                  {f.status === "uploading" && (
                    <div>
                      <div
                        style={{
                          height: "2px",
                          backgroundColor: "#e0deda",
                          width: "200px",
                          marginBottom: "4px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            backgroundColor: "#1a1a1a",
                            width: `${f.progress}%`,
                            transition: "width 0.2s",
                          }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#999",
                          letterSpacing: "0.05em",
                        }}
                      >
                        uploading {f.progress}%
                      </p>
                    </div>
                  )}

                  {f.status === "done" && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#999",
                        letterSpacing: "0.05em",
                        wordBreak: "break-all",
                      }}
                    >
                      {f.url}
                    </p>
                  )}

                  {f.status === "error" && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        letterSpacing: "0.05em",
                      }}
                    >
                      upload failed — try again
                    </p>
                  )}
                </div>

                {/* Copy button */}
                {f.status === "done" && (
                  <button
                    onClick={() => handleCopy(f.id, f.url)}
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "1px solid #1a1a1a",
                      background: "transparent",
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#1a1a1a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {copiedId === f.id ? "copied ✓" : "copy url"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Generated code block */}
        {doneFiles.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                }}
              >
                Copy this into Home.tsx
              </p>
              <button
                onClick={() => handleCopy("all", allCode)}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "1px solid #1a1a1a",
                  background: "transparent",
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: "#1a1a1a",
                }}
              >
                {copiedId === "all" ? "copied ✓" : "copy all"}
              </button>
            </div>
            <pre
              style={{
                backgroundColor: "#1a1a1a",
                color: "#e0deda",
                padding: "24px",
                fontSize: "11px",
                lineHeight: 1.7,
                overflowX: "auto",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {allCode}
            </pre>
            <p
              style={{
                fontSize: "10px",
                color: "#999",
                marginTop: "12px",
                letterSpacing: "0.05em",
              }}
            >
              Replace the GALLERY_ITEMS array in{" "}
              <code>client/src/pages/Home.tsx</code> with the code above.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
