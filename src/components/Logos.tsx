import React from 'react';

/**
 * Sangam Official Festival Website Logo
 * Accurately vectorized from the user's provided logo:
 * - Upper orange crescent arc
 * - Handshake emblem (navy & orange hands)
 * - Distinctive "Sangam" typography with sweeping orange & navy ribbon swoosh underline
 */
export const SangamLogo: React.FC<{ className?: string; showWordmark?: boolean }> = ({ 
  className = "h-10", 
  showWordmark = true 
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg 
        viewBox="0 0 450 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto aspect-[450/300] shrink-0"
      >
        {/* Upper Orange Arch */}
        <path 
          d="M 150 145 C 150 70, 310 70, 310 145 C 295 145, 292 90, 230 90 C 168 90, 165 145, 150 145 Z" 
          fill="url(#sangamOrangeGrad)" 
        />
        
        {/* Handshake Graphic */}
        {/* Left hand (Navy sleeve & wrist) */}
        <path 
          d="M 170 120 L 210 155 L 225 140 L 195 110 Z" 
          fill="#0F1F38" 
        />
        <rect x="165" y="112" width="10" height="26" transform="rotate(-40 165 112)" fill="#0A1424" />
        <rect x="162" y="108" width="5" height="28" transform="rotate(-40 162 108)" fill="#E05A1F" />

        {/* Right hand (Orange sleeve & wrist) */}
        <path 
          d="M 290 120 L 250 155 L 235 140 L 265 110 Z" 
          fill="#E56717" 
        />
        <rect x="285" y="112" width="10" height="26" transform="rotate(40 285 112)" fill="#0F1F38" />
        <rect x="290" y="108" width="5" height="28" transform="rotate(40 290 108)" fill="#E56717" />

        {/* Clasping fingers */}
        <circle cx="218" cy="162" r="5" fill="#E56717" />
        <circle cx="228" cy="167" r="5" fill="#E56717" />
        <circle cx="238" cy="163" r="5" fill="#E56717" />
        <circle cx="248" cy="156" r="5" fill="#E56717" />
        <path d="M 220 142 L 240 142 L 235 152 L 215 152 Z" fill="#0F1F38" />

        {/* Lower Sweeping Ribbon (Orange bottom swoop) */}
        <path 
          d="M 40 220 C 70 270, 270 280, 420 190 C 360 215, 230 240, 105 220 C 85 210, 60 195, 40 220 Z" 
          fill="url(#sangamOrangeGrad)" 
        />

        {/* Dark Navy Ribbon Underline Swoop */}
        <path 
          d="M 70 215 C 130 250, 310 245, 410 160 C 370 175, 270 190, 160 185 C 110 180, 80 195, 70 215 Z" 
          fill="#0F1F38" 
        />

        {/* "Sangam" Typography */}
        <text 
          x="65" 
          y="215" 
          fontFamily="'Playfair Display', 'Plus Jakarta Sans', Georgia, serif" 
          fontSize="115" 
          fontWeight="900" 
          fontStyle="italic" 
          fill="#0F1F38" 
          letterSpacing="-3"
        >
          Sangam
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="sangamOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
        </defs>
      </svg>

      {showWordmark && (
        <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
          <span>Sangam</span>
          <span className="text-xs uppercase tracking-wider font-semibold text-orange-400 bg-orange-950/60 border border-orange-500/30 px-1.5 py-0.5 rounded">
            2026–27
          </span>
        </span>
      )}
    </div>
  );
};

/**
 * Samrat Ashok Technological Institute (SATI), Vidisha M.P.
 * Official College Crest / Emblem
 * - Circular blue outer ring with "SAMRAT ASHOK TECHNOLOGICAL INSTITUTE"
 * - Golden 16-toothed cogwheel with DEGREE banner
 * - Transmission tower, flame lamp, open scripture book
 * - Green laurel leaves on left & right
 * - Golden ribbon banner "VIDISHA M.P." with motto "योगः कर्मसु कौशलम्"
 */
export const SatiCollegeLogo: React.FC<{ className?: string; showSubtext?: boolean }> = ({ 
  className = "h-11", 
  showSubtext = false 
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg 
        viewBox="0 0 200 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto aspect-[200/240] shrink-0 drop-shadow-md"
      >
        {/* Outer Circular Ring */}
        <circle cx="100" cy="100" r="82" fill="#EBF8FF" stroke="#1E40AF" strokeWidth="6" />

        {/* Circular text along arc: SAMRAT ASHOK TECHNOLOGICAL INSTITUTE */}
        <path id="satiArc" d="M 30 115 A 72 72 0 1 1 170 115" fill="none" />
        <text fontSize="12" fontWeight="800" fill="#1E3A8A" letterSpacing="1.2">
          <textPath href="#satiArc" startOffset="50%" textAnchor="middle">
            SAMRAT ASHOK TECHNOLOGICAL INSTITUTE
          </textPath>
        </text>

        {/* Green Laurel Leaves (Left side) */}
        <g fill="#16A34A">
          <path d="M 22 80 C 12 90, 15 105, 25 110 C 22 100, 20 90, 22 80 Z" />
          <path d="M 24 115 C 16 125, 20 140, 32 145 C 28 135, 25 125, 24 115 Z" />
          <path d="M 33 148 C 28 160, 35 175, 48 178 C 42 168, 38 158, 33 148 Z" />
          <path d="M 49 178 C 45 190, 58 200, 72 200 C 65 190, 58 184, 49 178 Z" />
        </g>

        {/* Green Laurel Leaves (Right side) */}
        <g fill="#16A34A">
          <path d="M 178 80 C 188 90, 185 105, 175 110 C 178 100, 180 90, 178 80 Z" />
          <path d="M 176 115 C 184 125, 180 140, 168 145 C 172 135, 175 125, 176 115 Z" />
          <path d="M 167 148 C 172 160, 165 175, 152 178 C 158 168, 162 158, 167 148 Z" />
          <path d="M 151 178 C 155 190, 142 200, 128 200 C 135 190, 142 184, 151 178 Z" />
        </g>

        {/* Central Cogwheel (Gear) */}
        <circle cx="100" cy="100" r="54" fill="#D97706" stroke="#92400E" strokeWidth="2.5" />
        {/* Gear teeth */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <rect 
              key={i} 
              x="95" 
              y="40" 
              width="10" 
              height="8" 
              fill="#D97706" 
              stroke="#92400E" 
              strokeWidth="1.5" 
              transform={`rotate(${angle} 100 100)`} 
            />
          );
        })}

        {/* Inner Hub Circle */}
        <circle cx="100" cy="100" r="44" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />

        {/* Antenna / Transmission Tower */}
        <path d="M 100 68 L 100 112 M 90 112 L 100 68 L 110 112 M 93 96 L 107 96 M 95 84 L 105 84" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="100" cy="66" r="3" fill="#B45309" />
        {/* Transmission Radiations */}
        <path d="M 94 62 C 97 58, 103 58, 106 62" stroke="#B45309" strokeWidth="1.5" fill="none" />
        <path d="M 90 58 C 96 52, 104 52, 110 58" stroke="#B45309" strokeWidth="1.5" fill="none" />

        {/* Open Book on left */}
        <path d="M 72 82 C 78 80, 84 83, 86 87 C 82 86, 76 84, 72 85 Z" fill="#78350F" />
        <path d="M 72 86 L 86 88 L 86 98 L 72 96 Z" fill="#FFFBEB" stroke="#78350F" strokeWidth="1" />

        {/* Lamp / Flame */}
        <path d="M 79 73 C 82 68, 83 75, 83 77 C 81 78, 78 77, 79 73 Z" fill="#EA580C" />

        {/* Plumb / Triangle on right */}
        <path d="M 120 78 L 126 95 L 114 95 Z" fill="#FFFBEB" stroke="#78350F" strokeWidth="1" />
        <line x1="120" y1="78" x2="120" y2="95" stroke="#78350F" strokeWidth="1" />

        {/* "DEGREE" Ribbon Banner across gear */}
        <path d="M 75 110 L 125 110 L 120 120 L 80 120 Z" fill="#FDE68A" stroke="#92400E" strokeWidth="1.5" />
        <text x="100" y="118" fontSize="8" fontWeight="900" fill="#78350F" textAnchor="middle" letterSpacing="0.8">
          DEGREE
        </text>

        {/* Pillar base ornament */}
        <path d="M 95 150 L 105 150 L 102 175 L 98 175 Z" fill="#D97706" />
        <path d="M 92 175 L 108 175 L 105 185 L 95 185 Z" fill="#B45309" />

        {/* Bottom Banner Ribbon: VIDISHA M.P. */}
        <path d="M 45 190 L 155 190 L 145 210 L 55 210 Z" fill="#FDF6B2" stroke="#92400E" strokeWidth="2" />
        <text x="100" y="205" fontSize="13" fontWeight="900" fill="#1E3A8A" textAnchor="middle" letterSpacing="1">
          VIDISHA M.P.
        </text>

        {/* Lower Motto Scroll Banner */}
        <path d="M 60 212 L 140 212 L 135 226 L 65 226 Z" fill="#FEF08A" stroke="#92400E" strokeWidth="1.5" />
        <text x="100" y="222" fontSize="9" fontWeight="bold" fill="#78350F" textAnchor="middle">
          योगः कर्मसु कौशलम्
        </text>
      </svg>

      {showSubtext && (
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-white tracking-tight uppercase leading-tight">
            SATI Vidisha
          </span>
          <span className="text-[10px] text-slate-400">
            Govt. Aided Autonomous Inst. (Est. 1960)
          </span>
        </div>
      )}
    </div>
  );
};
