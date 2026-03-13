import { useState, useEffect } from "react";

function useCount(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [target]);
  return count;
}

export default function App() {
  const [dlState, setDlState] = useState(null); // null | "loading" | "done"
  const p1 = useCount(500000);
  const p2 = useCount(200);

  // ✅ Direct GitHub raw APK download link
  const APK_URL = "https://github.com/progamegamer22-svg/AashiqxTournament/raw/090bba6133d63c72bbd6fc4ee6a71a3f975d4ff8/AXT%20TOURNAMENT.apk";

  useEffect(() => {
    if (!document.getElementById("axt-css")) {
      const s = document.createElement("style");
      s.id = "axt-css";
      s.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@500;600;700&family=Orbitron:wght@700;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#06060C;overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatAnim{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes dlPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,68,0,0.6)}50%{box-shadow:0 0 32px 12px rgba(255,68,0,0.2)}}
        @keyframes gridMove{from{background-position:0 0}to{background-position:60px 60px}}
        @keyframes heroPulse{0%,100%{opacity:0.15}50%{opacity:0.28}}
      `;
      document.head.appendChild(s);
    }
  }, []);

  const handleInstall = () => {
    setDlState("loading");
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = APK_URL;
      a.download = "AXT-TOURNAMENT.apk";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDlState("done");
    }, 1200);
  };

  const InstallBtn = ({ size = "large" }) => (
    <button
      onClick={handleInstall}
      disabled={dlState === "loading"}
      style={{
        background: dlState === "done"
          ? "linear-gradient(135deg,#22aa44,#118833)"
          : "linear-gradient(135deg,#FF4400,#FF7700)",
        color: "#fff", border: "none",
        fontFamily: "'Orbitron',monospace",
        fontSize: size === "large" ? 14 : 12,
        fontWeight: 900, letterSpacing: 2,
        padding: size === "large" ? "18px 48px" : "14px 36px",
        cursor: dlState === "loading" ? "not-allowed" : "pointer",
        borderRadius: 8, transition: "all 0.3s",
        boxShadow: "0 0 40px rgba(255,68,0,0.5)",
        animation: dlState ? "none" : "dlPulse 2s ease-in-out infinite",
        display: "inline-flex", alignItems: "center", gap: 12,
      }}>
      <span style={{ fontSize: size === "large" ? 24 : 20 }}>
        {dlState === "loading" ? "⏳" : dlState === "done" ? "✅" : "📥"}
      </span>
      {dlState === "loading" ? "DOWNLOADING..."
       : dlState === "done" ? "DOWNLOAD STARTED!"
       : "INSTALL APP — FREE"}
    </button>
  );

  return (
    <div style={{ fontFamily: "'Rajdhani',sans-serif", background: "#06060C", minHeight: "100vh", color: "#E8E8F0" }}>

      {/* NAV */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: "rgba(6,6,12,0.97)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid #14141e", height: 58,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
      }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: "#FF4400" }}>AASHIQ</span>
          <span style={{ color: "#FFD700" }}>✕</span>
          <span style={{ color: "#E8E8F0" }}>TOURNAMENT</span>
        </div>
        <button onClick={handleInstall} disabled={dlState === "loading"}
          style={{
            background: dlState === "done"
              ? "linear-gradient(135deg,#22aa44,#118833)"
              : "linear-gradient(135deg,#FF4400,#FF7700)",
            color: "#fff", border: "none", fontFamily: "'Orbitron',monospace",
            fontSize: 10, fontWeight: 700, letterSpacing: 2, padding: "9px 18px",
            cursor: "pointer", borderRadius: 4,
            boxShadow: "0 0 16px rgba(255,68,0,0.4)", transition: "all 0.3s",
          }}>
          {dlState === "loading" ? "⏳ ..." : dlState === "done" ? "✅ DONE" : "📥 INSTALL"}
        </button>
      </div>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", position: "relative", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "100px 20px 60px", overflow: "hidden",
        animation: "fadeUp 0.6s ease both",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,68,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,68,0,0.05) 1px,transparent 1px)",
          backgroundSize: "60px 60px", animation: "gridMove 10s linear infinite", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 75% 55% at 50% 10%,rgba(255,68,0,0.22) 0%,transparent 70%)",
          animation: "heroPulse 4s ease-in-out infinite", pointerEvents: "none",
        }} />

        {/* App Icon */}
        <div style={{
          width: 100, height: 100, background: "linear-gradient(135deg,#FF4400,#FF8800)",
          borderRadius: 26, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 52, marginBottom: 28, boxShadow: "0 20px 60px rgba(255,68,0,0.55)",
          animation: "floatAnim 3s ease-in-out infinite", position: "relative", zIndex: 1,
        }}>🔥</div>

        <div style={{
          background: "linear-gradient(90deg,#FF4400,#FF8800)", color: "#fff",
          fontFamily: "'Orbitron',monospace", fontSize: 9, letterSpacing: 3,
          padding: "5px 18px", marginBottom: 22, borderRadius: 2,
          position: "relative", zIndex: 1, boxShadow: "0 0 24px rgba(255,68,0,0.45)",
        }}>🔴 LIVE FREE FIRE TOURNAMENTS — WIN REAL CASH</div>

        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,14vw,108px)",
          lineHeight: 0.88, letterSpacing: 4, position: "relative", zIndex: 1,
        }}>
          <span style={{ color: "#FF4400" }}>AASHIQ</span>{" "}
          <span style={{ color: "#FFD700", textShadow: "0 0 40px rgba(255,215,0,0.7)" }}>✕</span>
          <br />
          <span style={{ color: "#E8E8F0" }}>TOURNAMENT</span>
        </h1>

        <p style={{
          fontSize: 16, color: "#666680", margin: "22px 0 36px",
          maxWidth: 440, lineHeight: 1.8, position: "relative", zIndex: 1,
        }}>
          India's #1 Free Fire esports platform. Play daily tournaments &amp; win real cash straight to your UPI.
        </p>

        <div style={{ position: "relative", zIndex: 1 }}>
          <InstallBtn size="large" />
        </div>

        {dlState === "done" && (
          <div style={{
            marginTop: 20, padding: "12px 24px",
            background: "rgba(52,168,83,0.12)", border: "1px solid rgba(52,168,83,0.4)",
            borderRadius: 6, color: "#34A853", fontFamily: "'Orbitron',monospace",
            fontSize: 11, letterSpacing: 2, position: "relative", zIndex: 1,
            animation: "fadeUp 0.4s ease both",
          }}>
            ✅ OPEN THE APK FILE TO INSTALL & START WINNING!
          </div>
        )}
      </div>

      {/* STATS */}
      <div style={{
        background: "#0a0a14", borderTop: "1px solid #14141e", borderBottom: "1px solid #14141e",
        display: "flex", justifyContent: "center", flexWrap: "wrap",
      }}>
        {[[`${(p1 / 100000).toFixed(1)}L+`, "PLAYERS"], ["₹50L+", "PRIZE PAID"],
          [`${p2}+`, "DAILY MATCHES"], ["#1", "FREE FIRE"]].map(([n, l]) => (
          <div key={l} style={{ padding: "20px 30px", borderRight: "1px solid #14141e", textAlign: "center", minWidth: 110 }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, fontWeight: 900, color: "#FFD700" }}>{n}</div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#444460", marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* HOW TO INSTALL */}
      <div style={{ padding: "60px 20px 80px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(28px,6vw,48px)", letterSpacing: 3, marginBottom: 8 }}>
          HOW TO <span style={{ color: "#FF4400" }}>INSTALL</span>
        </h2>
        <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#FF4400,#FFD700)", margin: "0 auto 36px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 40 }}>
          {[["📥","STEP 1","TAP INSTALL","Click the install button"],
            ["📂","STEP 2","OPEN APK","Open the downloaded file"],
            ["⚙️","STEP 3","ALLOW","Enable unknown sources"],
            ["🔥","STEP 4","PLAY & WIN","Enter tournaments & win cash"]].map(([ic, s, t, d]) => (
            <div key={s} style={{ background: "#0c0c18", border: "1px solid #1a1a2e", borderRadius: 8, padding: "22px 14px" }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{ic}</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 8, color: "#FF4400", letterSpacing: 2, marginBottom: 4 }}>{s}</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, fontWeight: 700, color: "#E8E8F0", marginBottom: 6 }}>{t}</div>
              <div style={{ fontSize: 12, color: "#555570", lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </div>

        <InstallBtn size="medium" />
      </div>

    </div>
  );
}
