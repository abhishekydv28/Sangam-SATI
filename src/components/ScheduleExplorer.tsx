import React, { useState, useMemo } from 'react';
import { FestEvent, TECHNOVISION_EVENTS, SAMRAT_UTSAV_TEASER_EVENTS } from '../data/festivalsData';
import { 
  Search, 
  Clock, 
  MapPin, 
  Users, 
  AlertCircle, 
  ExternalLink, 
  Bookmark, 
  Check, 
  Calendar,
  Layers
} from 'lucide-react';

interface ScheduleExplorerProps {
  onSelectEvent: (event: FestEvent) => void;
  bookmarks: string[];
  onToggleBookmark: (eventId: string) => void;
  initialFestival?: 'all' | 'technovision' | 'samrat-utsav';
}

export const ScheduleExplorer: React.FC<ScheduleExplorerProps> = ({
  onSelectEvent,
  bookmarks,
  onToggleBookmark,
  initialFestival = 'all'
}) => {
  const [selectedFestival, setSelectedFestival] = useState<'all' | 'technovision' | 'samrat-utsav'>(initialFestival);
  const [selectedDay, setSelectedDay] = useState<'all' | 'Day 1' | 'Day 2'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);

  // Combine event datasets
  const allEvents = useMemo(() => {
    return [...TECHNOVISION_EVENTS, ...SAMRAT_UTSAV_TEASER_EVENTS];
  }, []);

  // Department options derived cleanly
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'CSE', label: 'CSE, IT & MCA' },
    { value: 'Emerging', label: 'Cyber, IoT, AI&DS, AIML' },
    { value: 'Civil', label: 'Civil Engineering' },
    { value: 'EC', label: 'Electronics & EI' },
    { value: 'ME', label: 'Mechanical & Electrical' },
    { value: 'MBA', label: 'MBA & M.Sc.' },
    { value: 'Robotics', label: 'Robotics / Flux Club' },
    { value: 'Coding', label: 'Coding Club' },
    { value: 'Startup', label: 'Startup Cell' },
    { value: 'Cultural', label: 'Cultural Council' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Paper Presentation', label: 'Paper Presentations' },
    { value: 'Robotics & Challenge', label: 'Robotics & Challenges' },
    { value: 'Coding & Tech', label: 'Coding Challenge' },
    { value: 'Exhibition & Poster', label: 'Exhibition & Poster' },
    { value: 'Startup & Innovation', label: 'Startup & Innovation' },
    { value: 'Ceremony', label: 'Inaugural & Valedictory' },
    { value: 'Cultural (Suggested)', label: 'Cultural Showcases (TBA)' }
  ];

  // Filtering
  const filteredEvents = useMemo(() => {
    return allEvents.filter(ev => {
      // Festival filter
      if (selectedFestival !== 'all' && ev.festival !== selectedFestival) {
        return false;
      }

      // Day filter
      if (selectedDay !== 'all' && ev.dayLabel !== selectedDay) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
        return false;
      }

      // Department filter
      if (selectedDepartment !== 'all') {
        const deptUpper = ev.department.toUpperCase();
        if (selectedDepartment === 'CSE' && !deptUpper.includes('CSE') && !deptUpper.includes('IT') && !deptUpper.includes('MCA')) return false;
        if (selectedDepartment === 'Emerging' && !deptUpper.includes('CYBER') && !deptUpper.includes('AI') && !deptUpper.includes('IOT')) return false;
        if (selectedDepartment === 'Civil' && !deptUpper.includes('CIVIL')) return false;
        if (selectedDepartment === 'EC' && !deptUpper.includes('EC') && !deptUpper.includes('EI') && !deptUpper.includes('ELECTRONICS')) return false;
        if (selectedDepartment === 'ME' && !deptUpper.includes('ME') && !deptUpper.includes('EE') && !deptUpper.includes('MECHANICAL') && !deptUpper.includes('ELECTRICAL')) return false;
        if (selectedDepartment === 'MBA' && !deptUpper.includes('MBA') && !deptUpper.includes('M.SC')) return false;
        if (selectedDepartment === 'Robotics' && !deptUpper.includes('ROBOTICS') && ev.clubOrHost !== 'Flux Club') return false;
        if (selectedDepartment === 'Coding' && ev.clubOrHost !== 'Coding Club' && !ev.title.includes('Coding')) return false;
        if (selectedDepartment === 'Startup' && !deptUpper.includes('INNOVATION') && !ev.title.includes('Startup')) return false;
        if (selectedDepartment === 'Cultural' && ev.festival !== 'samrat-utsav') return false;
      }

      // Bookmarks filter
      if (showBookmarksOnly && !bookmarks.includes(ev.id)) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = ev.title.toLowerCase().includes(query);
        const matchVenue = ev.venue.toLowerCase().includes(query);
        const matchDesc = ev.description.toLowerCase().includes(query);
        const matchDept = ev.department.toLowerCase().includes(query);
        const matchCoord = ev.coordinators.some(c => c.toLowerCase().includes(query));
        const matchClub = ev.clubOrHost?.toLowerCase().includes(query) ?? false;
        if (!matchTitle && !matchVenue && !matchDesc && !matchDept && !matchCoord && !matchClub) {
          return false;
        }
      }

      return true;
    });
  }, [allEvents, selectedFestival, selectedDay, selectedCategory, selectedDepartment, showBookmarksOnly, bookmarks, searchQuery]);

  // Group events by day to display structured schedule
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: { dateLabel: string; festival: string; events: FestEvent[] } } = {};

    filteredEvents.forEach(ev => {
      const groupKey = `${ev.festival}_${ev.dateLabel}`;
      if (!groups[groupKey]) {
        groups[groupKey] = {
          dateLabel: ev.dateLabel,
          festival: ev.festival,
          events: []
        };
      }
      groups[groupKey].events.push(ev);
    });

    return Object.values(groups);
  }, [filteredEvents]);

  const clearAllFilters = () => {
    setSelectedFestival('all');
    setSelectedDay('all');
    setSelectedCategory('all');
    setSelectedDepartment('all');
    setSearchQuery('');
    setShowBookmarksOnly(false);
  };

  const isFiltered = selectedFestival !== 'all' || selectedDay !== 'all' || selectedCategory !== 'all' || selectedDepartment !== 'all' || searchQuery !== '' || showBookmarksOnly;

  return (
    <div id="schedule" className="w-full">
      {/* Control Bar & Filter Tabs */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 md:p-6 mb-8 shadow-md backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Interactive Mission Directory
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
              Day-Wise & Departmental Schedule
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports parallel & overlapping session tracks without omission. Click any session card for jury & coordinator assignments.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event, coordinator, venue..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all text-white placeholder:text-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Segmented Filter Controls */}
        <div className="pt-5 space-y-4">
          {/* Row 1: Festival & Day Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setSelectedFestival('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedFestival === 'all' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                All Festivals
              </button>
              <button
                onClick={() => setSelectedFestival('technovision')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedFestival === 'technovision' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Technovision 2026
              </button>
              <button
                onClick={() => setSelectedFestival('samrat-utsav')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedFestival === 'samrat-utsav' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Samrat Utsav 2027 (TBA)
              </button>
            </div>

            {/* Day Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setSelectedDay('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedDay === 'all' 
                    ? 'bg-slate-800 text-white font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Days
              </button>
              <button
                onClick={() => setSelectedDay('Day 1')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedDay === 'Day 1' 
                    ? 'bg-slate-800 text-white font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Day 1 (2 Nov)
              </button>
              <button
                onClick={() => setSelectedDay('Day 2')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedDay === 'Day 2' 
                    ? 'bg-slate-800 text-white font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Day 2 (3 Nov)
              </button>
            </div>

            {/* Bookmark Itinerary Toggle */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                showBookmarksOnly 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-semibold' 
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
              <span>Saved Itinerary ({bookmarks.length})</span>
            </button>
          </div>

          {/* Row 2: Category & Department dropdown selectors */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium focus:outline-hidden focus:ring-1 focus:ring-cyan-500"
              >
                {categoryOptions.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Department:</span>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium focus:outline-hidden focus:ring-1 focus:ring-cyan-500"
              >
                {departmentOptions.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            {isFiltered && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium ml-auto"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events List / Timeline Display */}
      {groupedEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-slate-800 mb-1">No sessions match your filter criteria</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Try resetting your department, category or text search query to view all available symposium schedules.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Clear Active Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedEvents.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <h4 className="text-base font-bold text-slate-900">
                    {group.dateLabel}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    ({group.events.length} {group.events.length === 1 ? 'Session' : 'Sessions'})
                  </span>
                </div>

                <div className="text-xs text-slate-500">
                  {group.festival === 'technovision' ? (
                    <span className="text-slate-600 font-medium">Technovision 2026 · Past Event</span>
                  ) : (
                    <span className="text-amber-700 font-medium">Samrat Utsav 2027 · Details TBA</span>
                  )}
                </div>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.events.map((ev) => {
                  const isSaved = bookmarks.includes(ev.id);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => onSelectEvent(ev)}
                      className="group cursor-pointer bg-slate-900/80 rounded-xl border border-slate-800/90 p-5 hover:border-cyan-500/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Static Metadata - Strict Zero Pill Discipline */}
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-semibold text-cyan-300 truncate">{ev.category}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-slate-400 truncate">{ev.department}</span>
                          </div>

                          {/* Status Indicator */}
                          {ev.isTba ? (
                            <span className="text-[11px] font-semibold text-amber-400 shrink-0">
                              TBA
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-500 shrink-0">
                              Past Event
                            </span>
                          )}
                        </div>

                        {/* Event Title */}
                        <h5 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2 leading-snug">
                          {ev.title}
                        </h5>

                        {/* Description Preview */}
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {ev.description}
                        </p>
                      </div>

                      {/* Footer Info & Affordances */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{ev.timeSlot}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate max-w-[200px] sm:max-w-[240px]">{ev.venue}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(ev.id);
                            }}
                            className={`p-1.5 rounded-md border transition-colors ${
                              isSaved 
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                            }`}
                            title={isSaved ? 'Remove from Itinerary' : 'Save to Itinerary'}
                            aria-label={isSaved ? 'Remove from Itinerary' : 'Save to Itinerary'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>

                          <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                            Details
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
