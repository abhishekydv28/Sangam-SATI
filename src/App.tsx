/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  FESTIVAL_DETAILS, 
  TECHNOVISION_EVENTS, 
  SAMRAT_UTSAV_CATEGORIES, 
  SAMRAT_UTSAV_TEASER_EVENTS,
  SPORTS_ACTIVITIES,
  FestEvent 
} from './data/festivalsData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { Navbar } from './components/Navbar';
import { CountdownTimer } from './components/CountdownTimer';
import { ScheduleExplorer } from './components/ScheduleExplorer';
import { EventModal } from './components/EventModal';
import { RegistrationForm } from './components/RegistrationForm';
import { PhotoGallery } from './components/PhotoGallery';
import { CampusGuide } from './components/CampusGuide';
import { Footer } from './components/Footer';
import { SangamLogo, SatiCollegeLogo } from './components/Logos';

import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  ChevronDown,
  Cpu, 
  Music, 
  Trophy, 
  Code, 
  Users, 
  AlertTriangle, 
  Check, 
  Bookmark, 
  X,
  FileText,
  Clock,
  Printer,
  Compass,
  ArrowRight,
  ShieldCheck,
  LogIn,
  Volume2,
  VolumeX
} from 'lucide-react';

function SangamFestApp() {
  const { user, profile, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedEvent, setSelectedEvent] = useState<FestEvent | null>(null);
  const [preselectedEventForReg, setPreselectedEventForReg] = useState<FestEvent | null>(null);
  const [isLandingVideoMuted, setIsLandingVideoMuted] = useState(true);
  
  // Bookmarks / Personal Itinerary
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sati_fest_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const [itineraryDrawerOpen, setItineraryDrawerOpen] = useState(false);
  const landingVideoRef = useRef<HTMLVideoElement>(null);

  const toggleBookmark = (eventId: string) => {
    setBookmarks(prev => {
      let updated: string[];
      if (prev.includes(eventId)) {
        updated = prev.filter(id => id !== eventId);
      } else {
        updated = [...prev, eventId];
      }
      try {
        localStorage.setItem('sati_fest_bookmarks', JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterInterest = (event: FestEvent) => {
    setPreselectedEventForReg(event);
    scrollToSection('register');
  };

  const bookmarkedEvents = [...TECHNOVISION_EVENTS, ...SAMRAT_UTSAV_TEASER_EVENTS].filter(e => 
    bookmarks.includes(e.id)
  );

  return (
    <div className="min-h-screen bg-[#030714] text-slate-100 flex flex-col font-sans cosmic-stars selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ========================================================================= */}
      {/* CONTINUOUS LANDING VIEWPORT (Scrolls down away, reappears on scroll up)   */}
      {/* "create the landing as a continuous part as when a person scroll down it  */}
      {/* disappears but when he scroll up the landing also view again"             */}
      {/* ========================================================================= */}
      <section 
        id="landing-hero" 
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-black select-none z-10"
      >
        {/* Full-Screen Continuous UFO Landing Video Asset */}
        <div className="absolute inset-0 z-0">
          <video
            ref={landingVideoRef}
            src="/assets/aistudio/UFO_flying_and_landing_313a22aa_dd605a55.mp4"
            autoPlay
            loop
            muted={isLandingVideoMuted}
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Subtle Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030714] via-black/40 to-black/70" />
        </div>

        {/* Top Header Row of the Landing */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between gap-4">
          {/* Dual Brand Logos */}
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10">
            <SangamLogo className="h-9 sm:h-10" showWordmark={true} />
            <span className="h-6 w-px bg-white/20" />
            <SatiCollegeLogo className="h-9 sm:h-10" showSubtext={false} />
          </div>

          {/* Controls: Mute toggle + Student Auth */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLandingVideoMuted(!isLandingVideoMuted)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
              title={isLandingVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={isLandingVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isLandingVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-cyan-500/40 text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">{profile?.fullName}</span>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-cyan-500/40 text-xs font-semibold text-cyan-300 hover:text-white transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>
            )}

            <button
              onClick={() => scrollToSection('overview')}
              className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 rounded-full hover:from-cyan-300 hover:to-sky-200 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            >
              Explore Hub
            </button>
          </div>
        </div>

        {/* Center Content of Continuous Landing */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span>Samrat Ashok Technological Institute (SATI), Vidisha</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl leading-none">
            SANGAM <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">2026–27</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
            One Campus. Two Festivals. Endless Possibilities. The grand confluence of <strong className="text-cyan-300">TECHNOVISION 2026</strong> and <strong className="text-amber-300">SAMRAT UTSAV 2027</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('schedule')}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center gap-2"
            >
              <span>Explore Day-Wise Schedules</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('register')}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 rounded-xl transition-colors"
            >
              Delegate Registration & Inquiries
            </button>
          </div>
        </div>

        {/* Bottom Scroll Indicator: Tells user that scrolling brings them down, and scrolling up brings the landing back */}
        <div className="relative z-10 w-full pb-8 flex flex-col items-center justify-center text-center text-xs text-slate-400">
          <button
            onClick={() => scrollToSection('overview')}
            className="group flex flex-col items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 drop-shadow">
              Scroll Down to Enter Festival
            </span>
            <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce group-hover:text-white" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STICKY NAVBAR (With Sangam & SATI College Logos + Supabase Student Auth)  */}
      {/* ========================================================================= */}
      <Navbar 
        activeSection={activeSection}
        onNavigate={scrollToSection}
        bookmarkCount={bookmarks.length}
        onOpenItinerary={() => setItineraryDrawerOpen(true)}
        onOpenRegister={() => scrollToSection('register')}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1: OVERVIEW & PILLARS                                             */}
        {/* ========================================================================= */}
        <section id="overview" className="space-y-6 pt-2 scroll-mt-20">
          {/* Main Sangam Overview Card */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-xl p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <SangamLogo className="h-10 sm:h-12" showWordmark={true} />
                  <span className="h-8 w-px bg-slate-700" />
                  <SatiCollegeLogo className="h-10 sm:h-12" showSubtext={true} />
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Welcome to <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">Sangam</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Established in 1960 in the historic city of Vidisha, Samrat Ashok Technological Institute presents <strong>Sangam</strong> — our overarching festival ecosystem uniting the technical innovation of <strong>TECHNOVISION 2026</strong>, the cultural radiance of <strong>SAMRAT UTSAV 2027</strong>, and the collegiate athletic calendar.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-300 pt-2">
                  <span>• 2 Major Festivals</span>
                  <span>• 15+ Engineering Tracks</span>
                  <span>• 4 Athletic Tournaments</span>
                  <span>• Central India Hub</span>
                </div>
              </div>

              {/* Quick Action Box */}
              <div className="w-full lg:w-80 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3.5 shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">
                  Quick Access Portal
                </span>
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="w-full py-2.5 px-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>View Full Schedule</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('register')}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-center"
                >
                  Delegate Registration
                </button>
                {!user && (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full py-2 px-3 text-xs font-medium text-cyan-300 hover:text-white bg-slate-950 rounded-lg border border-slate-700 transition-colors text-center"
                  >
                    Student Login (Supabase)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Cosmic Pillar Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Technovision Tile */}
            <div 
              onClick={() => scrollToSection('technovision')}
              className="group cursor-pointer bg-slate-900/80 rounded-2xl border border-slate-800 p-5 hover:border-cyan-500/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-cyan-400">TECHNOVISION 2026</span>
                  <span className="text-slate-500 font-medium">Past Event</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Technical Symposium
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Paper presentations, combat robotics, coding challenges & startup generation.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-400">
                <span>2–3 November 2026</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Samrat Utsav Tile */}
            <div 
              onClick={() => scrollToSection('samrat-utsav')}
              className="group cursor-pointer bg-slate-900/80 rounded-2xl border border-slate-800 p-5 hover:border-amber-500/70 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-amber-400">SAMRAT UTSAV 2027</span>
                  <span className="text-emerald-400 font-medium">Upcoming</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Cultural Extravaganza
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Indian heritage meets contemporary campus culture: dance, music, drama & arts.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-amber-400">
                <span>18–19 February 2027</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Sports Calendar Tile */}
            <div 
              onClick={() => scrollToSection('sports')}
              className="group cursor-pointer bg-slate-900/80 rounded-2xl border border-slate-800 p-5 hover:border-cyan-500/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-cyan-400">SPORTS CALENDAR</span>
                  <span className="text-slate-400 font-medium">Academic 2027</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Athletic Championships
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Volleyball, Kho-Kho, Track & Field Athletics, and Collegiate Cricket.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-400">
                <span>Jan – Feb 2027</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: TECHNOVISION 2026 (Technical Festival Showcase)                */}
        {/* ========================================================================= */}
        <section id="technovision" className="space-y-8 scroll-mt-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <span>Sangam 2026–27 · Technical Symposium Chapter</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                TECHNOVISION 2026
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {FESTIVAL_DETAILS.technovision.summary}
              </p>
            </div>

            {/* Past Event notice tag */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 shrink-0">
              <span className="font-semibold text-white block">Dates: 2–3 November 2026</span>
              <span className="text-slate-500">Symposium Completed · Past Event</span>
            </div>
          </div>

          {/* Technovision Hero Spotlight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 cols: Image & Theme Overview */}
            <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="relative aspect-16/9 bg-slate-950 overflow-hidden">
                <img
                  src="/src/assets/images/technovision_robotics_1793689164420.jpg"
                  alt="Technovision Robotics Arena"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                      Featured Arena Highlight
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Robotics Arena & Autonomous Obstacle Trials
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-medium text-cyan-300">Theme</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Futuristic technology, innovation, coding and robotics</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Technovision 2026 brought together students from across Madhya Pradesh for rigorous paper presentations across every engineering discipline, combat robotics in the Flux Club arena, competitive programming with the Coding Club, and startup idea generation judged by industry luminaries.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => scrollToSection('schedule')}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg hover:from-cyan-300 hover:to-sky-200 transition-colors"
                  >
                    View Day 1 & Day 2 Schedule
                  </button>
                  <button
                    onClick={() => scrollToSection('register')}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Request Symposium Proceedings
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Key Technical Highlights */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wide">
                  <Cpu className="w-4 h-4" />
                  <span>Paper Presentations by Department</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Specialized technical sessions held in the Computer Center and Smart Classrooms covering CSE, IT, Cyber Security, IoT, AIADS, AIML, Civil, Electronics (EC & EI), Mechanical, Electrical, and MBA & M.Sc.
                </p>
                <div className="text-[11px] text-slate-500">
                  Coordinated by Technical Committees for respective branches.
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wide">
                  <Code className="w-4 h-4" />
                  <span>Coding Challenge & Startup Pitch</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Day 2 featured the CODE CRACK hackathon led by Prof. Satish Pawar, Prof. Mukesh Azad, Prof. Garima Jain, and Prof. Ankur Mishra; alongside Startup Pitching mentored by Dr. Divya Rashi Sahu and Prof. Jyoti Sonkar.
                </p>
              </div>

              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  <span>Robotics & Flux Club Arena</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Boat Racing & Robo Obstacle Challenge (Day 1) and Robo Rumble (Day 2) held at Open Area Main Building under Prof. K.G. Kirar, Prof. Niraj Kumar, and Prof. Kamlesh Sharma.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: SAMRAT UTSAV 2027 (Dedicated Cultural Festival Page)           */}
        {/* ========================================================================= */}
        <section id="samrat-utsav" className="space-y-8 scroll-mt-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <span>Sangam 2026–27 · Cultural Celebration Chapter</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                SAMRAT UTSAV 2027
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {FESTIVAL_DETAILS.samratUtsav.summary}
              </p>
            </div>

            <div className="text-xs text-slate-400 text-left md:text-right shrink-0">
              <span className="font-semibold text-white block">Dates: 18–19 February 2027</span>
              <span className="text-slate-500">Venue: SATI Main Campus, Vidisha</span>
            </div>
          </div>

          {/* Dynamic Countdown Component */}
          <CountdownTimer 
            targetDate={FESTIVAL_DETAILS.samratUtsav.targetDateIso}
            eventTitle="SAMRAT UTSAV 2027"
          />

          {/* Clear Distinguish TBA Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200 space-y-1">
              <h4 className="text-sm font-bold text-amber-300">
                Notice: Detailed Schedule & Competitions To Be Announced (TBA)
              </h4>
              <p className="leading-relaxed text-amber-200/80">
                Individual cultural performances, competition names, performance timings, specific venues, coordinators and registration deadlines have not been confirmed in the supplied information. The categories below represent <strong>suggested cultural categories</strong> rather than confirmed competitions until the SATI Cultural Organizing Committee officially publishes the schedule.
              </p>
            </div>
          </div>

          {/* Cultural Banner & Festival Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Visual banner */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-800 shadow-xs relative aspect-4/3 sm:aspect-16/9 lg:aspect-auto">
              <img
                src="/src/assets/images/samrat_utsav_cultural_1793689164067.jpg"
                alt="Samrat Utsav Cultural Celebration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Cultural Heritage
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Indian Heritage Meets Contemporary Campus Culture
                  </h3>
                </div>
              </div>
            </div>

            {/* Welcome & Participation Info */}
            <div className="lg:col-span-6 bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Welcome & Delegate Invitation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Two Days of Rhythm, Theatre, Arts & Celebration
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Named in honor of Emperor Ashoka who once governed the historical Malwa region from ancient Besnagar (Vidisha), Samrat Utsav is SATI’s premier cultural fest. Students from across engineering, sciences, and management join together in celebration of traditional folk expressions and modern campus artistry.
                </p>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
                  <div className="font-semibold text-white">Participation Guidelines:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Open to all bona fide undergraduate and postgraduate students.</li>
                    <li>Both intra-college SATI departments and external guest teams eligible.</li>
                    <li>Digital badges and certificates issued for all confirmed participants.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Early bird registration open online.
                </span>
                <button
                  onClick={() => scrollToSection('register')}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-colors"
                >
                  Join Early Cultural Waitlist
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Cultural Categories Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Suggested Cultural Event Streams
                </h3>
                <p className="text-xs text-slate-400">
                  Disciplines undergoing final committee review for the 2027 calendar.
                </p>
              </div>
              <span className="text-xs text-amber-400 font-semibold bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-md">
                All Details TBA
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAMRAT_UTSAV_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 shadow-2xs hover:border-amber-400/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-amber-400">{cat.tag}</span>
                      <span className="text-slate-500 text-[11px]">TBA</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>{cat.status}</span>
                    <button
                      onClick={() => {
                        setPreselectedEventForReg({
                          id: `su-${cat.id}`,
                          festival: 'samrat-utsav',
                          title: `${cat.name} — Early Interest`,
                          category: 'Cultural (Suggested)',
                          dateLabel: '18–19 February 2027',
                          dateIso: '2027-02-18',
                          dayLabel: 'TBA',
                          timeSlot: 'Timings TBA',
                          venue: 'SATI Campus (TBA)',
                          department: 'Cultural Council',
                          coordinators: ['Cultural Committee TBA'],
                          status: 'tba',
                          isTba: true,
                          description: `Early waitlist interest for ${cat.name} competitions.`
                        });
                        scrollToSection('register');
                      }}
                      className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: SPORTS ACTIVITY CALENDAR 2027                                  */}
        {/* ========================================================================= */}
        <section id="sports" className="space-y-6 scroll-mt-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <span>Department of Physical Education & Sports · SATI Vidisha</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Sports Activity Calendar — 2027
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Annual collegiate championships across traditional and contemporary sports conducted at the SATI Sports Complex and Stadium Ground.
              </p>
            </div>

            <div className="text-xs text-slate-400 shrink-0">
              <span className="font-semibold text-white block">Academic Sports Schedule</span>
              <span>January – February 2027</span>
            </div>
          </div>

          {/* Disclaimer regarding academic vs fest competition */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <Trophy className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Academic Calendar Clarification:</span>
              <span>These dates are supplied for the institutional academic sports calendar and must not automatically be treated as confirmed Samrat Utsav competitions.</span>
            </div>
          </div>

          {/* Sports Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPORTS_ACTIVITIES.map((sp) => (
              <div 
                key={sp.id}
                className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 shadow-2xs hover:border-cyan-500/60 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">{sp.category}</span>
                    <span className={`text-[11px] font-medium ${sp.isTba ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {sp.detailsStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {sp.sport}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {sp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{sp.dates}</span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-400 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span>{sp.venue}</span>
                  </div>

                  <button
                    onClick={() => {
                      setPreselectedEventForReg({
                        id: sp.id,
                        festival: 'sports',
                        title: `${sp.sport} — SATI Sports 2027`,
                        category: 'Sports Academic',
                        dateLabel: sp.dates,
                        dateIso: '2027-01-16',
                        dayLabel: 'Academic Calendar',
                        timeSlot: 'Match Timings as per Fixture',
                        venue: sp.venue,
                        department: 'Department of Physical Education',
                        coordinators: ['SATI Sports Officer & Referees'],
                        status: 'confirmed',
                        isTba: sp.isTba,
                        description: sp.description
                      });
                      scrollToSection('register');
                    }}
                    className="w-full mt-2 py-1.5 text-center text-xs font-semibold text-cyan-300 bg-slate-950 hover:bg-slate-800 rounded-md border border-slate-700 transition-colors"
                  >
                    Register Team / Player
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: MASTER SCHEDULE EXPLORER (Day-Wise, Time-Wise, Filterable)    */}
        {/* ========================================================================= */}
        <section className="space-y-6 scroll-mt-20">
          <ScheduleExplorer
            onSelectEvent={(ev) => setSelectedEvent(ev)}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
          />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: REGISTRATION & INQUIRIES PORTAL                               */}
        {/* ========================================================================= */}
        <section className="scroll-mt-20">
          <RegistrationForm
            preselectedEvent={preselectedEventForReg}
            onClearPreselectedEvent={() => setPreselectedEventForReg(null)}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: PHOTO GALLERY                                                 */}
        {/* ========================================================================= */}
        <section className="scroll-mt-20">
          <PhotoGallery />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: SATI VIDISHA CAMPUS & VENUE GUIDE                             */}
        {/* ========================================================================= */}
        <section className="scroll-mt-20">
          <CampusGuide />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9: FREQUENTLY ASKED QUESTIONS                                     */}
        {/* ========================================================================= */}
        <section id="faq" className="w-full bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Ground Control Support
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-400">
                Key questions for students, outstation delegates, and faculty participants.
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white">
                  What is Sangam?
                </h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Sangam is the unified annual festival umbrella of Samrat Ashok Technological Institute (SATI), Vidisha. It integrates both the technical symposium (Technovision 2026) and the cultural festival (Samrat Utsav 2027), along with the academic sports calendar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white">
                  Are Technovision 2026 events open for registration right now?
                </h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Technovision 2026 took place on 2–3 November 2026 and is documented as a past event. If you need symposium proceedings, author presentation certificates, or coordinator contact for academic verification, please use the Inquiries tab in the registration section.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white">
                  When will the confirmed schedule for Samrat Utsav 2027 be announced?
                </h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  The SATI Student Cultural Council will announce the official competition rules, stage slots, and confirmed coordinators closer to January 2027. You can join the early waitlist today to receive the official brochure upon release.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white">
                  How does student authentication with Supabase work?
                </h4>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Students can log in with their college email address and password to auto-populate their registered identity across all festival forms, retrieve past delegate passes, and manage their personal itinerary.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Event Details Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isBookmarked={selectedEvent ? bookmarks.includes(selectedEvent.id) : false}
        onToggleBookmark={toggleBookmark}
        onRegisterInterest={handleRegisterInterest}
      />

      {/* Supabase Student Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Personal Itinerary Drawer / Modal */}
      {itineraryDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setItineraryDrawerOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl max-h-[85vh] bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-lg font-bold text-white">My Sangam Itinerary</h3>
                <span className="text-xs text-slate-400">({bookmarks.length} Saved)</span>
              </div>
              <button 
                onClick={() => setItineraryDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {bookmarkedEvents.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p>No sessions bookmarked yet.</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Click the bookmark icon on any event card in the schedule to build your custom schedule.
                  </p>
                </div>
              ) : (
                bookmarkedEvents.map((ev) => (
                  <div 
                    key={ev.id}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="text-[11px] text-cyan-400 font-semibold">{ev.dateLabel}</div>
                      <h4 className="font-bold text-white">{ev.title}</h4>
                      <div className="text-[11px] text-slate-400">{ev.timeSlot} · {ev.venue}</div>
                    </div>
                    <button
                      onClick={() => toggleBookmark(ev.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg shrink-0"
                      title="Remove from itinerary"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {bookmarkedEvents.length > 0 && (
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setBookmarks([])}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Clear All
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Itinerary</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiet Collegiate Footer with Sangam & SATI Logos */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SangamFestApp />
    </AuthProvider>
  );
}
