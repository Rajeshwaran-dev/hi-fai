import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   HUMAN HAND  —  open palm, fingers up, thumb left
   Realistic skin tones, detailed anatomy, subtle
   lighting from upper-right, nail highlights.
───────────────────────────────────────────── */
function HumanHandSVG() {
  return (
    <svg
      viewBox="0 0 160 260"
      className="preloader-hand-svg"
      role="presentation"
      aria-hidden
      overflow="visible"
      style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.55))" }}
    >
      <defs>
        {/* Main skin gradient — cool white */}
        <linearGradient id="hSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="52%"  stopColor="#eef4ff" />
          <stop offset="100%" stopColor="#dbe9ff" />
        </linearGradient>
        {/* Finger tip slight shading */}
        <linearGradient id="hTip" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f3f8ff" />
          <stop offset="100%" stopColor="#d4e2f8" />
        </linearGradient>
        {/* Palm centre highlight */}
        <radialGradient id="hPalmHL" cx="45%" cy="40%" r="55%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#b9d2ff" stopOpacity="0" />
        </radialGradient>
        {/* Thumb gradient */}
        <linearGradient id="hThumb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#f8fbff" />
          <stop offset="100%" stopColor="#d7e5fb" />
        </linearGradient>
        {/* Ambient occlusion shadow under palm */}
        <radialGradient id="hAO" cx="50%" cy="100%" r="50%">
          <stop offset="0%"   stopColor="rgba(8,30,70,0.24)" />
          <stop offset="100%" stopColor="rgba(8,30,70,0)" />
        </radialGradient>
        {/* Nail gradient */}
        <linearGradient id="hNail" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="60%"  stopColor="#eef4ff" />
          <stop offset="100%" stopColor="#d3e1f7" />
        </linearGradient>
        <filter id="hShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(100,40,10,0.4)" />
        </filter>
      </defs>

      {/* ── WRIST / FOREARM ── */}
      <path
        d="M28 210 C24 218 22 232 24 248 C26 258 134 258 136 248 C138 232 136 218 132 210 Z"
        fill="url(#hSkin)"
      />
      {/* Wrist crease lines */}
      <path d="M30 218 Q80 224 130 218" fill="none" stroke="rgba(33,73,130,0.22)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M28 228 Q80 234 132 228" fill="none" stroke="rgba(33,73,130,0.14)" strokeWidth="1.0" strokeLinecap="round"/>

      {/* ── PALM body ── */}
      <path
        d="M22 85 C20 75 24 68 32 66 L128 66 C136 66 140 73 140 83 L140 212 C140 220 134 226 126 226 L34 226 C26 226 20 220 20 212 Z"
        fill="url(#hSkin)"
        filter="url(#hShadow)"
      />
      {/* Palm ambient occlusion */}
      <ellipse cx="80" cy="220" rx="62" ry="12" fill="url(#hAO)" />
      {/* Palm highlight */}
      <ellipse cx="72" cy="145" rx="40" ry="55" fill="url(#hPalmHL)" />

      {/* ── THUMB — protrudes left ── */}
      <path
        d="M22 125
           C14 118 4 118 2 128
           C0 140 4 155 12 160
           C20 165 28 160 30 150
           L32 125 Z"
        fill="url(#hThumb)"
        stroke="rgba(33,73,130,0.2)"
        strokeWidth="0.8"
      />
      {/* Thumb knuckle crease */}
      <path d="M6 138 Q18 143 30 137" fill="none" stroke="rgba(33,73,130,0.28)" strokeWidth="1" strokeLinecap="round"/>
      {/* Thumb nail */}
      <ellipse cx="8" cy="128" rx="6" ry="7.5" fill="url(#hNail)" stroke="rgba(54,98,160,0.24)" strokeWidth="0.6"/>
      <ellipse cx="7" cy="126" rx="4" ry="5" fill="rgba(255,245,235,0.6)"/>

      {/* ── FINGER BASES webbing ── */}
      <path d="M42 66 Q52 58 62 56 Q72 54 82 54 Q96 54 106 57 Q116 60 126 66"
        fill="none" stroke="rgba(33,73,130,0.14)" strokeWidth="1"/>

      {/* ── INDEX FINGER ── */}
      <g filter="url(#hShadow)">
        <path
          d="M38 68
             C37 52 36 34 37 18
             C38 9  43 4  50 4
             C57 4  62 9  63 18
             C64 34 63 52 62 68 Z"
          fill="url(#hSkin)"
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        {/* Knuckle creases */}
        <path d="M38 44 Q50 49 62 44" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M38 57 Q50 61 62 57" fill="none" stroke="rgba(33,73,130,0.18)"  strokeWidth="0.9" strokeLinecap="round"/>
        {/* Fingertip cap */}
        <ellipse cx="50" cy="7" rx="13" ry="7" fill="url(#hTip)"/>
        {/* Nail */}
        <rect x="43" y="4" width="14" height="10" rx="7" fill="url(#hNail)" stroke="rgba(54,98,160,0.22)" strokeWidth="0.5"/>
        <rect x="44.5" y="4.5" width="11" height="7" rx="5.5" fill="rgba(255,245,235,0.55)"/>
      </g>

      {/* ── MIDDLE FINGER — tallest ── */}
      <g filter="url(#hShadow)">
        <path
          d="M62 68
             C61 46 60 22 61 8
             C62 -2 67 -8 75 -8
             C83 -8 88 -2 89 8
             C90 22 89 46 88 68 Z"
          fill="url(#hSkin)"
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        <path d="M62 40 Q75 45 88 40" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M62 56 Q75 60 88 56" fill="none" stroke="rgba(33,73,130,0.18)"  strokeWidth="0.9" strokeLinecap="round"/>
        <ellipse cx="75" cy="-2" rx="14" ry="7.5" fill="url(#hTip)"/>
        <rect x="68" y="-7" width="15" height="11" rx="7.5" fill="url(#hNail)" stroke="rgba(54,98,160,0.22)" strokeWidth="0.5"/>
        <rect x="69.5" y="-6" width="12" height="8" rx="6" fill="rgba(255,245,235,0.55)"/>
      </g>

      {/* ── RING FINGER ── */}
      <g filter="url(#hShadow)">
        <path
          d="M88 68
             C87 50 86 30 87 17
             C88 8  93 3  100 3
             C107 3 112 8  113 17
             C114 30 113 50 112 68 Z"
          fill="url(#hSkin)"
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        <path d="M88 42 Q100 47 112 42" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M88 57 Q100 61 112 57" fill="none" stroke="rgba(33,73,130,0.18)"  strokeWidth="0.9" strokeLinecap="round"/>
        <ellipse cx="100" cy="6" rx="13" ry="7" fill="url(#hTip)"/>
        <rect x="93" y="2" width="14" height="10" rx="7" fill="url(#hNail)" stroke="rgba(54,98,160,0.22)" strokeWidth="0.5"/>
        <rect x="94.5" y="3" width="11" height="7" rx="5.5" fill="rgba(255,245,235,0.55)"/>
      </g>

      {/* ── PINKY ── */}
      <g filter="url(#hShadow)">
        <path
          d="M112 68
             C111 54 110 38 111 28
             C112 20 116 16 122 16
             C128 16 132 20 133 28
             C134 38 133 54 132 68 Z"
          fill="url(#hSkin)"
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        <path d="M112 49 Q122 53 132 49" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="0.9" strokeLinecap="round"/>
        <path d="M112 61 Q122 64 132 61" fill="none" stroke="rgba(33,73,130,0.18)"  strokeWidth="0.8" strokeLinecap="round"/>
        <ellipse cx="122" cy="19" rx="11" ry="6" fill="url(#hTip)"/>
        <rect x="116" y="15" width="12" height="9" rx="6" fill="url(#hNail)" stroke="rgba(54,98,160,0.22)" strokeWidth="0.5"/>
        <rect x="117" y="16" width="10" height="6.5" rx="5" fill="rgba(255,245,235,0.55)"/>
      </g>

      {/* ── PALM CREASES ── */}
      <path d="M24 115 C50 122 110 122 138 115" fill="none" stroke="rgba(33,73,130,0.2)" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M22 148 C50 156 110 156 138 148" fill="none" stroke="rgba(33,73,130,0.14)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M24 182 C50 188 110 188 136 182" fill="none" stroke="rgba(33,73,130,0.1)" strokeWidth="1.0" strokeLinecap="round"/>
      {/* Diagonal life-line crease */}
      <path d="M30 105 Q56 135 45 185" fill="none" stroke="rgba(33,73,130,0.13)" strokeWidth="1" strokeLinecap="round"/>

      {/* ── KNUCKLE BUMPS at finger bases ── */}
      <ellipse cx="50"  cy="69" rx="10" ry="5.5" fill="rgba(240,165,100,0.45)"/>
      <ellipse cx="75"  cy="69" rx="10" ry="5.5" fill="rgba(240,165,100,0.45)"/>
      <ellipse cx="100" cy="69" rx="10" ry="5.5" fill="rgba(240,165,100,0.45)"/>
      <ellipse cx="122" cy="69" rx="9"  ry="5"   fill="rgba(240,165,100,0.45)"/>

      {/* ── SPECULAR HIGHLIGHT strip ── */}
      <path
        d="M38 70 C36 120 36 170 38 210 Q44 215 50 210 C48 170 48 120 50 70 Z"
        fill="rgba(255,245,230,0.18)"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   ROBOT / AI HAND  — mechanical, matching the
   logo's robotic hand. Metallic blue-grey,
   segmented finger joints, glowing accents.
───────────────────────────────────────────── */
function RobotHandSVG() {
  return (
    <svg
      viewBox="0 0 160 260"
      className="preloader-hand-svg"
      role="presentation"
      aria-hidden
      overflow="visible"
      style={{ filter: "drop-shadow(0 8px 32px rgba(80,180,255,0.4))" }}
    >
      <defs>
        {/* Steel blue base */}
        <linearGradient id="rMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#c8dff0" />
          <stop offset="40%"  stopColor="#7aabcf" />
          <stop offset="100%" stopColor="#2e6a96" />
        </linearGradient>
        {/* Joint dark */}
        <linearGradient id="rJoint" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#4a8ab5" />
          <stop offset="100%" stopColor="#1a4a70" />
        </linearGradient>
        {/* Specular highlight */}
        <linearGradient id="rHL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Palm glow */}
        <radialGradient id="rGlow" cx="45%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="rgba(120,200,255,0.3)" />
          <stop offset="100%" stopColor="rgba(30,100,180,0)" />
        </radialGradient>
        {/* LED accent glow */}
        <radialGradient id="rLED" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#a0e8ff" />
          <stop offset="100%" stopColor="#40a0e0" />
        </radialGradient>
        <filter id="rGlowF" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rEdge">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(20,70,130,0.6)"/>
        </filter>
      </defs>

      {/* ── WRIST connector / forearm ── */}
      <rect x="26" y="210" width="108" height="50" rx="10" fill="url(#rJoint)"/>
      <rect x="30" y="212" width="100" height="46" rx="8"  fill="url(#rMetal)" opacity="0.7"/>
      {/* Wrist bolts */}
      <circle cx="42" cy="235" r="4.5" fill="#1a4a70" stroke="#7aabcf" strokeWidth="1"/>
      <circle cx="42" cy="235" r="2"   fill="#a0d4f0"/>
      <circle cx="118" cy="235" r="4.5" fill="#1a4a70" stroke="#7aabcf" strokeWidth="1"/>
      <circle cx="118" cy="235" r="2"   fill="#a0d4f0"/>
      {/* Wrist LED strip */}
      <rect x="52" y="228" width="56" height="4" rx="2" fill="#1a4a70"/>
      <rect x="54" y="229" width="52" height="2" rx="1" fill="url(#rLED)" opacity="0.8" filter="url(#rGlowF)"/>

      {/* ── PALM body ── */}
      <path
        d="M20 82 C20 74 26 68 34 68 L126 68 C134 68 140 74 140 82 L140 212 C140 220 134 226 126 226 L34 226 C26 226 20 220 20 212 Z"
        fill="url(#rMetal)"
        filter="url(#rEdge)"
      />
      {/* Palm panel lines */}
      <line x1="80" y1="75" x2="80" y2="220" stroke="rgba(30,80,140,0.4)" strokeWidth="1"/>
      <line x1="20" y1="148" x2="140" y2="148" stroke="rgba(30,80,140,0.35)" strokeWidth="1"/>
      {/* Palm glow overlay */}
      <path
        d="M20 82 C20 74 26 68 34 68 L126 68 C134 68 140 74 140 82 L140 212 C140 220 134 226 126 226 L34 226 C26 226 20 220 20 212 Z"
        fill="url(#rGlow)"
      />
      {/* Central hex/circuit detail */}
      <circle cx="80" cy="148" r="22" fill="none" stroke="rgba(120,200,255,0.35)" strokeWidth="1.5"/>
      <circle cx="80" cy="148" r="12" fill="none" stroke="rgba(120,200,255,0.5)"  strokeWidth="1"/>
      <circle cx="80" cy="148" r="5"  fill="url(#rLED)" filter="url(#rGlowF)" opacity="0.9"/>
      {/* Corner circuit traces */}
      <path d="M58 126 L68 136" stroke="rgba(120,200,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
      <path d="M102 126 L92 136" stroke="rgba(120,200,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
      <path d="M58 170 L68 160" stroke="rgba(120,200,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
      <path d="M102 170 L92 160" stroke="rgba(120,200,255,0.4)" strokeWidth="1" strokeLinecap="round"/>

      {/* Palm highlight */}
      <path d="M24 72 L50 68 L50 210 L24 218 Z" fill="url(#rHL)" opacity="0.4"/>

      {/* ── THUMB — left side ── */}
      <g filter="url(#rEdge)">
        {/* Thumb base segment */}
        <path
          d="M20 118 C12 114 4 116 2 126 C0 138 4 152 13 156 C20 160 28 154 30 144 L32 118 Z"
          fill="url(#rMetal)"
          stroke="rgba(30,80,140,0.4)"
          strokeWidth="1"
        />
        {/* Joint seam */}
        <path d="M4 140 Q16 145 30 139" fill="none" stroke="rgba(20,60,120,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M4 140 Q16 145 30 139" fill="none" stroke="rgba(150,220,255,0.3)" strokeWidth="0.6" strokeLinecap="round"/>
        {/* Thumb tip */}
        <ellipse cx="8" cy="122" rx="7.5" ry="8.5" fill="url(#rJoint)" stroke="rgba(100,180,240,0.5)" strokeWidth="0.8"/>
        <ellipse cx="7" cy="120" rx="4.5" ry="5.5" fill="url(#rHL)" opacity="0.5"/>
      </g>

      {/* ── Segmented FINGERS — each has 3 phalanges with joint rings ── */}

      {/* helper macro: index finger */}
      {/* INDEX */}
      <g filter="url(#rEdge)">
        {/* Proximal phalanx */}
        <path d="M38 68 C37 54 37 44 38 34 C39 30 43 28 50 28 C57 28 61 30 62 34 C63 44 63 54 62 68 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        {/* Joint ring 1 */}
        <rect x="37" y="44" width="26" height="7" rx="3.5" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="38.5" y="44.5" width="23" height="2.5" rx="1.2" fill="rgba(180,230,255,0.35)"/>
        {/* Middle phalanx */}
        <path d="M38 34 C37 24 37 16 38 9  C39 5  43 3  50 3  C57 3  61 5  62 9  C63 16 63 24 62 34 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        {/* Joint ring 2 */}
        <rect x="37" y="22" width="26" height="6" rx="3" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="38.5" y="22.5" width="23" height="2" rx="1" fill="rgba(180,230,255,0.35)"/>
        {/* Distal / tip */}
        <path d="M38 9 C38 4 43 0 50 0 C57 0 62 4 62 9 L62 14 L38 14 Z" fill="url(#rJoint)"/>
        <ellipse cx="50" cy="3" rx="11" ry="5" fill="url(#rMetal)"/>
        {/* Tip specular */}
        <ellipse cx="46" cy="3" rx="5.5" ry="3" fill="rgba(255,255,255,0.28)"/>
      </g>

      {/* MIDDLE */}
      <g filter="url(#rEdge)">
        <path d="M62 68 C61 50 61 36 62 24 C63 19 67 17 75 17 C83 17 87 19 88 24 C89 36 89 50 88 68 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        <rect x="61" y="48" width="28" height="7" rx="3.5" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="62.5" y="48.5" width="25" height="2.5" rx="1.2" fill="rgba(180,230,255,0.35)"/>
        <path d="M62 24 C61 12 61 4 62 -2 C63 -7 67 -10 75 -10 C83 -10 87 -7 88 -2 C89 4 89 12 88 24 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        <rect x="61" y="10" width="28" height="6.5" rx="3.2" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="62.5" y="10.5" width="25" height="2.5" rx="1.2" fill="rgba(180,230,255,0.35)"/>
        <path d="M62 -2 C62 -7 67 -11 75 -11 C83 -11 88 -7 88 -2 L88 4 L62 4 Z" fill="url(#rJoint)"/>
        <ellipse cx="75" cy="-5" rx="12.5" ry="5.5" fill="url(#rMetal)"/>
        <ellipse cx="71" cy="-5.5" rx="6" ry="3.2" fill="rgba(255,255,255,0.28)"/>
      </g>

      {/* RING */}
      <g filter="url(#rEdge)">
        <path d="M88 68 C87 52 87 38 88 27 C89 22 93 19 100 19 C107 19 111 22 112 27 C113 38 113 52 112 68 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        <rect x="87" y="50" width="26" height="7" rx="3.5" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="88.5" y="50.5" width="23" height="2.5" rx="1.2" fill="rgba(180,230,255,0.35)"/>
        <path d="M88 27 C87 16 87 8 88 2 C89 -3 93 -6 100 -6 C107 -6 111 -3 112 2 C113 8 113 16 112 27 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        <rect x="87" y="14" width="26" height="6" rx="3" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="88.5" y="14.5" width="23" height="2" rx="1" fill="rgba(180,230,255,0.35)"/>
        <path d="M88 2 C88 -3 93 -7 100 -7 C107 -7 112 -3 112 2 L112 8 L88 8 Z" fill="url(#rJoint)"/>
        <ellipse cx="100" cy="-1" rx="11" ry="5" fill="url(#rMetal)"/>
        <ellipse cx="96" cy="-1.5" rx="5.5" ry="3" fill="rgba(255,255,255,0.28)"/>
      </g>

      {/* PINKY */}
      <g filter="url(#rEdge)">
        <path d="M112 68 C111 56 111 46 112 38 C113 33 116 31 122 31 C128 31 131 33 132 38 C133 46 133 56 132 68 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        <rect x="111" y="54" width="22" height="6" rx="3" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="112.5" y="54.5" width="19" height="2" rx="1" fill="rgba(180,230,255,0.35)"/>
        <path d="M112 38 C111 28 111 21 112 16 C113 12 116 10 122 10 C128 10 131 12 132 16 C133 21 133 28 132 38 Z" fill="url(#rMetal)" stroke="rgba(30,80,140,0.3)" strokeWidth="0.7"/>
        <rect x="111" y="26" width="22" height="5.5" rx="2.8" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.6"/>
        <rect x="112.5" y="26.5" width="19" height="2" rx="1" fill="rgba(180,230,255,0.35)"/>
        <path d="M112 16 C112 11 116 8 122 8 C128 8 132 11 132 16 L132 21 L112 21 Z" fill="url(#rJoint)"/>
        <ellipse cx="122" cy="12" rx="9" ry="4.5" fill="url(#rMetal)"/>
        <ellipse cx="119" cy="11.5" rx="4.5" ry="2.8" fill="rgba(255,255,255,0.28)"/>
      </g>

      {/* ── KNUCKLE panels at finger bases ── */}
      <rect x="38" y="62" width="25" height="10" rx="5" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.7"/>
      <rect x="62" y="60" width="27" height="12" rx="6" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.7"/>
      <rect x="88" y="62" width="25" height="10" rx="5" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.7"/>
      <rect x="112" y="63" width="21" height="9"  rx="4.5" fill="url(#rJoint)" stroke="rgba(100,180,240,0.4)" strokeWidth="0.7"/>

      {/* Knuckle LED dots */}
      <circle cx="50"  cy="67" r="2.5" fill="url(#rLED)" filter="url(#rGlowF)" opacity="0.85"/>
      <circle cx="75"  cy="65" r="2.5" fill="url(#rLED)" filter="url(#rGlowF)" opacity="0.85"/>
      <circle cx="100" cy="67" r="2.5" fill="url(#rLED)" filter="url(#rGlowF)" opacity="0.85"/>
      <circle cx="122" cy="67" r="2"   fill="url(#rLED)" filter="url(#rGlowF)" opacity="0.85"/>
    </svg>
  );
}


export default function Preloader({ onComplete, reducedMotion = false }) {
  const rootRef    = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const impactRef  = useRef(null);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const root    = rootRef.current;
    const left    = leftRef.current;
    const right   = rightRef.current;
    const impact  = impactRef.current;
    const ripples = ripplesRef.current.filter(Boolean);
    if (!root || !left || !right || !impact) return;

    if (reducedMotion) {
      const q = gsap.to(root, {
        autoAlpha: 0, duration: 0.4, ease: "power2.out", delay: 0.2, onComplete,
      });
      return () => q.kill();
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete });

    tl
      .set(root,    { autoAlpha: 1 })
      .set(left,    { x: -280, rotate: -10, autoAlpha: 0, transformOrigin: "right center" })
      .set(right,   { x:  280, rotate:  10, autoAlpha: 0, transformOrigin: "left center"  })
      .set(impact,  { autoAlpha: 0, scale: 0 })
      .set(ripples, { autoAlpha: 0, scale: 0 })

      /* ── Appear ── */
      .to([left, right], { autoAlpha: 1, duration: 0.3 })

      /* ── Sweep together ── */
      .to(left,  { x: 0, rotate: -3, duration: 0.88, ease: "power3.out" }, "<.04")
      .to(right, { x: 0, rotate:  3, duration: 0.88, ease: "power3.out" }, "<")

      /* ── Anticipation pull-back ── */
      .to(left,  { x: -20, duration: 0.16, ease: "power1.inOut" })
      .to(right, { x:  20, duration: 0.16, ease: "power1.inOut" }, "<")

      /* ── CLAP ── */
      .to([left, right], { x: 0, duration: 0.12, ease: "power4.in" })

      /* ── Impact flash ── */
      .to(impact,  { autoAlpha: 1, scale: 2.0, duration: 0.12, ease: "back.out(3)" }, "<.02")
      .to(ripples, { autoAlpha: 0.9, scale: 1, duration: 0.20, ease: "power2.out", stagger: 0.08 }, "<")

      /* ── Expand & dissolve ── */
      .to(impact,  { autoAlpha: 0, scale: 4.5, duration: 0.55, ease: "power2.out" })
      .to(ripples, { autoAlpha: 0, scale: 5.5, duration: 0.62, ease: "power2.out", stagger: 0.09 }, "<")

      /* ── Recoil spring ── */
      .to(left,  { x: -18, rotate: -5, duration: 0.22, ease: "power2.out" }, "<-.42")
      .to(right, { x:  18, rotate:  5, duration: 0.22, ease: "power2.out" }, "<")
      .to([left, right], { x: 0, rotate: 0, duration: 0.46, ease: "elastic.out(1.1,.6)" })

      /* ── Hold ── */
      .to({}, { duration: 0.5 })

      /* ── Exit ── */
      .to(left,  { x: -240, autoAlpha: 0, rotate: -10, duration: 0.56, ease: "power3.in" })
      .to(right, { x:  240, autoAlpha: 0, rotate:  10, duration: 0.56, ease: "power3.in" }, "<")
      .to(root,  { autoAlpha: 0, duration: 0.54, ease: "power2.inOut" }, "<.24");

    return () => tl.kill();
  }, [onComplete, reducedMotion]);

  return (
    <div ref={rootRef} className="preloader-root" aria-hidden>
      <div className="preloader-grid" />
      <div className="preloader-glow preloader-glow-left"  />
      <div className="preloader-glow preloader-glow-right" />

      <div className="preloader-stage">

        {/*
          LEFT — HUMAN HAND
          Palm faces right, thumb on left outer edge.
          We rotate it so fingers point up and palm faces the robot hand.
        */}
        <div ref={leftRef} className="preloader-hand-wrap preloader-hand-left">
          <HumanHandSVG />
        </div>

        {/* Impact burst + three concentric ripple rings */}
        <div ref={impactRef} className="preloader-impact" />
        <div ref={(el) => (ripplesRef.current[0] = el)} className="preloader-ripple preloader-ripple-1" />
        <div ref={(el) => (ripplesRef.current[1] = el)} className="preloader-ripple preloader-ripple-2" />
        <div ref={(el) => (ripplesRef.current[2] = el)} className="preloader-ripple preloader-ripple-3" />

        {/*
          RIGHT — ROBOT / AI HAND
          Mirrored via CSS scaleX(-1) so the thumb is on the right outer edge.
          The mechanical blue hand faces the human hand — just like the logo.
        */}
        <div ref={rightRef} className="preloader-hand-wrap preloader-hand-right preloader-hand-flip">
          <RobotHandSVG />
        </div>

      </div>
    </div>
  );
}