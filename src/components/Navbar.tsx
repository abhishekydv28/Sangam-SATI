import React, { useState } from 'react';
import { Menu, X, Bookmark, Ticket } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  bookmarkCount: number;
  onOpenItinerary: () => void;
  onOpenRegister: () => void;
  onPlayCinematic?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  bookmarkCount,
  onOpenItinerary,
  onOpenRegister,
  onPlayCinematic
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'technovision', label: 'Technovision' },
    { id: 'samrat-utsav', label: 'Samrat Utsav' },
    { id: 'sports', label: 'Sports' },
    { id: 'schedule', label: 'Schedule' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#030714]/90 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#overview" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('overview'); }}
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
          <span>SATI Fest Hub</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                activeSection === link.id ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.8)] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {onPlayCinematic && (
            <button
              onClick={onPlayCinematic}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg hover:text-cyan-300 transition-all whitespace-nowrap shrink-0"
              title="Replay UFO Landing Animation"
            >
              <span className="text-cyan-400">🛸</span>
              <span>Landing Video</span>
            </button>
          )}

          {bookmarkCount > 0 && (
            <button
              onClick={onOpenItinerary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              title="View saved itinerary"
            >
              <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Itinerary ({bookmarkCount})</span>
            </button>
          )}

          <button
            onClick={onOpenRegister}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
          >
            Register / Inquire
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {onPlayCinematic && (
            <button
              onClick={onPlayCinematic}
              className="p-2 text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg"
              title="Play Landing Video"
            >
              🛸
            </button>
          )}

          {bookmarkCount > 0 && (
            <button
              onClick={onOpenItinerary}
              className="p-2 text-amber-400 bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="View saved itinerary"
            >
              <Bookmark className="w-4 h-4 fill-amber-400 text-amber-400" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#030714] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === link.id 
                    ? 'bg-cyan-950/60 text-cyan-400 font-semibold border border-cyan-800/40' 
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { onOpenRegister(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg transition-all text-center"
            >
              Register / Inquire
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
