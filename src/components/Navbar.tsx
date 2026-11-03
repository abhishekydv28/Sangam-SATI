import React, { useState } from 'react';
import { Menu, X, Bookmark, Ticket, User, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SangamLogo, SatiCollegeLogo } from './Logos';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  bookmarkCount: number;
  onOpenItinerary: () => void;
  onOpenRegister: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  bookmarkCount,
  onOpenItinerary,
  onOpenRegister,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

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
    <header className="sticky top-0 z-40 w-full bg-[#030714]/92 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Brand Zone with Sangam and SATI College logos */}
        <a 
          href="#overview" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('overview'); }}
          className="flex items-center gap-3 shrink-0 hover:opacity-95 transition-opacity"
          aria-label="Sangam 2026-27 - Samrat Ashok Technological Institute"
        >
          {/* Official Sangam Logo */}
          <SangamLogo className="h-8 sm:h-9" showWordmark={true} />

          {/* Divider */}
          <span className="hidden sm:inline-block h-6 w-px bg-slate-700/80" />

          {/* Official SATI College Logo */}
          <div className="hidden sm:flex items-center">
            <SatiCollegeLogo className="h-9" showSubtext={false} />
          </div>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
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

        {/* Zone 3: 1 primary action + Auth Controls */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
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

          {/* Student Auth State Indicator */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 border border-cyan-500/50 rounded-lg hover:border-cyan-400 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                  {profile?.fullName ? profile.fullName.charAt(0) : 'S'}
                </div>
                <span className="max-w-[120px] truncate">{profile?.fullName || 'Student'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 text-xs text-white z-50">
                  <div className="p-2 border-b border-slate-800">
                    <div className="font-bold truncate text-cyan-300">{profile?.fullName}</div>
                    <div className="text-[11px] text-slate-400 truncate">{profile?.collegeEmail}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{profile?.branch}</div>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenRegister();
                    }}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors mt-1"
                  >
                    My Registration Desk
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenItinerary();
                    }}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
                  >
                    Saved Sessions ({bookmarkCount})
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-red-950/40 text-red-400 rounded-lg transition-colors flex items-center gap-1.5 mt-1 border-t border-slate-800 pt-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 hover:border-cyan-400 rounded-lg transition-all"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Student Login</span>
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
            {user ? (
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-cyan-300">{profile?.fullName}</div>
                  <div className="text-[10px] text-slate-400">{profile?.collegeEmail}</div>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full py-2 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/40 rounded-lg hover:bg-slate-800 transition-colors text-center"
              >
                Student Login / Sign Up
              </button>
            )}

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
