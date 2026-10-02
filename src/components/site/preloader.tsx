import { useEffect, useState } from "react";

const LETTERS = ["A", "J", "E", "T", "A", "N"];
const LETTER_DELAYS_MS = [0, 200, 400, 600, 800, 1000];

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>(
    new Array(LETTERS.length).fill(false)
  );
  const [iconVisible, setIconVisible] = useState(false);
  const [floatActive, setFloatActive] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide the static HTML preloader instantly when React mounts — handoff to animated version
    const htmlPL = document.getElementById("html-preloader");
    if (htmlPL) {
      htmlPL.style.display = "none";
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Logo icon appears immediately
    timers.push(setTimeout(() => setIconVisible(true), 50));

    // Reveal each letter one by one
    LETTER_DELAYS_MS.forEach((delay, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLetters((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, delay + 100)
      );
    });

    // After last letter (1100ms + 100ms offset = 1200ms) → tagline + float
    timers.push(setTimeout(() => setTaglineVisible(true), 1250));
    timers.push(setTimeout(() => setFloatActive(true), 1250));

    // At 2700ms → begin 300ms fade-out
    timers.push(setTimeout(() => setDone(true), 2700));

    // At 3000ms → fully unmount preloader
    timers.push(
      setTimeout(() => {
        setHidden(true);
        if (onComplete) onComplete();
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <>
      <style>{`
        @keyframes preloader-icon-drop {
          0%   { opacity: 0; transform: translateY(-44px) scale(0.76); filter: blur(8px); }
          65%  { opacity: 1; transform: translateY(6px)  scale(1.07); filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0px)  scale(1);    filter: blur(0px); }
        }
        @keyframes preloader-letter-drop {
          0%   { opacity: 0; transform: translateY(-30px) scale(0.80); filter: blur(5px); }
          65%  { opacity: 1; transform: translateY(4px)  scale(1.06); filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0px)  scale(1);    filter: blur(0px); }
        }
        @keyframes preloader-tagline-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0px);  }
        }
        @keyframes preloader-float {
          0%, 100% { transform: translateY(0px);  }
          50%      { transform: translateY(-10px); }
        }
        @keyframes preloader-line-sweep {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .pl-icon-drop  { animation: preloader-icon-drop  0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .pl-letter-drop{ animation: preloader-letter-drop 0.42s cubic-bezier(0.22,1,0.36,1) both; }
        .pl-tagline-in { animation: preloader-tagline-in  0.5s  cubic-bezier(0.22,1,0.36,1) both; }
        .pl-float      { animation: preloader-float       2.6s  ease-in-out infinite; }
        .pl-line-sweep { animation: preloader-line-sweep  0.55s cubic-bezier(0.22,1,0.36,1) both; transform-origin: left center; }
      `}</style>

      {/* Full-screen preloader — fixed, highest z-index, white background */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          transition: "opacity 0.3s ease-in-out",
          opacity: done ? 0 : 1,
          pointerEvents: done ? "none" : "all",
        }}
      >
        {/* Floating logo group */}
        <div className={floatActive ? "pl-float" : ""}>

          {/* Logo icon */}
          {iconVisible && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <img
                src="/preloader-logo.png"
                alt="AJETAN"
                className="pl-icon-drop"
                style={{
                  width: "clamp(130px, 18vw, 210px)",
                  height: "auto",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Letter-by-letter wordmark row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                className={visibleLetters[i] ? "pl-letter-drop" : ""}
                style={{
                  display: "inline-block",
                  fontFamily: "'Space Grotesk', 'Manrope', Arial, sans-serif",
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontSize: "clamp(2rem, 6vw, 3.6rem)",
                  lineHeight: 1,
                  color: "#0d5c5c",
                  opacity: visibleLetters[i] ? undefined : 0,
                  userSelect: "none",
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Sweep underline */}
          {taglineVisible && (
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
              <div
                className="pl-line-sweep"
                style={{
                  height: "2px",
                  width: "80%",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg, transparent 0%, #4ecdc4 30%, #0d5c5c 65%, transparent 100%)",
                }}
              />
            </div>
          )}
        </div>

        {/* Tagline */}
        {taglineVisible && (
          <p
            className="pl-tagline-in"
            style={{
              marginTop: "24px",
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "clamp(8px, 1.2vw, 11px)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            Build · Automate · Grow
          </p>
        )}
      </div>
    </>
  );
}
