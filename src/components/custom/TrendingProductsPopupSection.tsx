import React, { useEffect, useRef, useState } from "react";

type ModalContent = "none" | "frame1" | "frame2";

const FrameSection: React.FC = () => {
  const [open, setOpen] = useState<ModalContent>("none");
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen("none");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close when clicking backdrop (but not when clicking the modal content)
  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setOpen("none");
  };

  return (
    <section
      className="w-full max-w-[1280px] h-auto flex flex-col sm:flex-row items-center gap-4 md:gap-8 lg:gap-[80px] relative py-4"
      aria-label="Frame 1321317125"
      dir="rtl"
    >
      {/* Left - Trending products.svg */}
      <button
        onClick={() => setOpen("frame1")}
        aria-haspopup="dialog"
        aria-controls="modal-frame"
        className="flex-none w-full sm:w-auto"
        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
      >
        <img
          src="/Trending products.svg"
          alt="Trending products"
          className="w-full h-auto max-w-none sm:max-w-[300px] md:max-w-[450px] lg:max-w-[600px]"
          style={{ display: "block", height: "auto", margin: "0 auto" }}
        />
      </button>

      {/* Right - Trending products2.svg */}
      <button
        onClick={() => setOpen("frame2")}
        aria-haspopup="dialog"
        aria-controls="modal-frame"
        className="flex-none w-full sm:w-auto"
        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
      >
        <img
          src="/Trending products2.svg"
          alt="Trending products 2"
          className="w-full h-auto max-w-none sm:max-w-[300px] md:max-w-[450px] lg:max-w-[600px]"
          style={{ display: "block", height: "auto", margin: "0 auto" }}
        />
      </button>

      {/* Modal Overlay */}
      {open !== "none" && (
        <div
          ref={overlayRef}
          onClick={onBackdropClick}
          role="presentation"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // use backdrop blur like the provided foreignObject
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {/* clickable blurred area snippet (matches foreignObject idea) */}
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 40.5,
              width: 44,
              height: 44,
              // clip-path placeholder - keep accessible close button inside
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
            onClick={() => setOpen("none")}
            aria-label="Close popup"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpen("none");
            }}
          />

          {/* Modal content (frame image) */}
          <div
            id="modal-frame"
            role="dialog"
            aria-modal="true"
            aria-label={open === "frame1" ? "Frame 1321317073" : "Frame 13213170732"}
            style={{
              width: "min(1100px, 92vw)",
              maxHeight: "90vh",
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              overflow: "auto",
              position: "relative",
            }}
          >
            {/* inner close button (top-right) */}
            <button
              onClick={() => setOpen("none")}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                width: 40,
                height: 40,
                borderRadius: 8,
                border: "none",
                background: "#ffffffcc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" stroke="#211C4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Frame image */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: 24 }}>
              <img
                src={open === "frame1" ? "/Frame 1321317073.svg" : "/Frame 13213170732.svg"}
                alt={open === "frame1" ? "Frame 1321317073" : "Frame 13213170732"}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FrameSection;
