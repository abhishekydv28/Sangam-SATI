import React, { useEffect } from 'react';
import { FestEvent } from '../data/festivalsData';
import { 
  X, 
  Clock, 
  MapPin, 
  Users, 
  Bookmark, 
  Check, 
  AlertCircle, 
  Building2, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EventModalProps {
  event: FestEvent | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
  onRegisterInterest: (event: FestEvent) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onRegisterInterest
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata - Zero Pill Discipline */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-2">
          <span className="text-cyan-400 font-semibold uppercase tracking-wider">
            {event.festival === 'technovision' 
              ? 'TECHNOVISION 2026' 
              : event.festival === 'samrat-utsav' 
                ? 'SAMRAT UTSAV 2027' 
                : 'SPORTS 2027'}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{event.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{event.dayLabel}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
          {event.title}
        </h3>

        {/* Status Callout if TBA or Past */}
        {event.isTba ? (
          <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200">
              <span className="font-semibold block text-sm mb-0.5 text-amber-300">Details Marked To Be Announced (TBA)</span>
              Individual performance timings, exact venue assignments, and competition coordinators are awaiting official confirmation from the Cultural Organizing Committee.
            </div>
          </div>
        ) : event.status === 'past' ? (
          <div className="mb-6 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-cyan-400">Schedule Status:</span>
              <span>Past Event / Symposium Archive</span>
            </div>
            <span className="text-slate-500">Held at SATI Vidisha</span>
          </div>
        ) : null}

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-sm">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-400 block font-medium">Timing & Date</span>
              <span className="font-semibold text-white">{event.timeSlot}</span>
              <div className="text-xs text-slate-400">{event.dateLabel}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-400 block font-medium">Designated Venue</span>
              <span className="font-semibold text-white">{event.venue}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-400 block font-medium">Department / Host</span>
              <span className="font-medium text-white">{event.department}</span>
              {event.clubOrHost && (
                <div className="text-xs text-amber-400 font-semibold">{event.clubOrHost}</div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-slate-400 block font-medium">Format / Participation</span>
              <span className="font-medium text-white">{event.teamFormat || 'Open to all registered'}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Event Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Rules & Guidelines if available */}
        {event.rules && event.rules.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Evaluation Rubric & Rules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">›</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Coordinators Supplied in Schedule */}
        <div className="mb-8 pt-4 border-t border-slate-800">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Designated Coordinators & Jury
          </h4>
          <div className="flex flex-wrap gap-2">
            {event.coordinators.map((coord, idx) => (
              <span 
                key={idx}
                className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md font-medium border border-slate-700/60"
              >
                {coord}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => onToggleBookmark(event.id)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors border ${
              isBookmarked 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isBookmarked ? (
              <>
                <Check className="w-4 h-4 text-amber-400" />
                <span>Saved in My Itinerary</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-slate-400" />
                <span>Save to My Itinerary</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onRegisterInterest(event);
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-colors shadow-xs"
          >
            <span>{event.isTba ? 'Join Waitlist / Inquiry' : 'Register / Inquire for Event'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
