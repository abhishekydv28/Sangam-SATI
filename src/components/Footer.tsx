import React from 'react';
import { SangamLogo, SatiCollegeLogo } from './Logos';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#02050f] text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Institute Brand & Logos */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <SangamLogo className="h-9" showWordmark={true} />
              <span className="h-6 w-px bg-slate-700" />
              <SatiCollegeLogo className="h-9" showSubtext={false} />
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              <strong>Sangam</strong> is the official annual festival confluence of Samrat Ashok Technological Institute, Vidisha (M.P.). Uniting the technical prowess of Technovision and the cultural vibrance of Samrat Utsav.
            </p>
            <div className="text-[11px] text-slate-500">
              Approved by AICTE · Affiliated to RGPV, Bhopal · Est. 1960
            </div>
          </div>

          {/* Col 2: Festival Portals */}
          <div className="space-y-2">
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Festivals & Programs
            </h5>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => onNavigate('technovision')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  TECHNOVISION 2026 (Technical Fest)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('samrat-utsav')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  SAMRAT UTSAV 2027 (Cultural Fest)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sports')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Sports Activity Calendar 2027
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('schedule')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Day-Wise Symposium Schedule
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Clubs & Cells */}
          <div className="space-y-2">
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Host Societies & Clubs
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>Flux Club (Robotics & Automation)</li>
              <li>Coding Club (Competitive Programming)</li>
              <li>Innovation & Startup Incubation Cell</li>
              <li>Departmental Technical Committees</li>
              <li>SATI Student Cultural Council</li>
            </ul>
          </div>

          {/* Col 4: Campus Address & Contact */}
          <div className="space-y-2">
            <h5 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Institute Address
            </h5>
            <p className="leading-relaxed">
              Samrat Ashok Technological Institute<br />
              Civil Lines, Vidisha, Madhya Pradesh — 464001<br />
              Phone: +91 7592 250121<br />
              Email: fest@satiengg.in
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026–2027 Sangam · Samrat Ashok Technological Institute, Vidisha.
          </div>
          <div className="text-slate-500">
            One Campus. Two Festivals. Endless Possibilities.
          </div>
        </div>
      </div>
    </footer>
  );
};
