import React from 'react';
import { SATI_CAMPUS_LOCATIONS } from '../data/festivalsData';
import { MapPin, Navigation, Train, Plane, Bus, Compass, Info } from 'lucide-react';

export const CampusGuide: React.FC = () => {
  return (
    <div id="campus" className="w-full">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Campus Navigation & Connectivity
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-1">
          SATI Vidisha Venue Directory
        </h3>
        <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-2xl">
          Samrat Ashok Technological Institute is an autonomous grant-in-aid engineering college established in 1960, situated along NH-86 in Vidisha, MP.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Venues List (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Designated Festival Event Zones
          </div>
          {SATI_CAMPUS_LOCATIONS.map((loc, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/80 rounded-xl border border-slate-800 p-4.5 hover:border-cyan-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white">{loc.name}</h4>
                </div>
                <p className="text-xs text-slate-400 pl-6">
                  {loc.landmark}
                </p>
              </div>

              <div className="sm:text-right shrink-0 pl-6 sm:pl-0">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Hosted Tracks:</span>
                <div className="flex flex-wrap sm:justify-end gap-1.5">
                  {loc.events.map((ev, eIdx) => (
                    <span 
                      key={eIdx}
                      className="text-[11px] bg-slate-950 text-cyan-300 border border-slate-800 px-2 py-0.5 rounded-md font-medium"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel & Reaching SATI */}
        <div className="space-y-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Transit & How to Reach
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Outstation Delegate Guide</span>
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">By Train (Vidisha Station - BHS)</strong>
                  <span>Vidisha Junction is directly connected to Delhi, Mumbai, Bhopal, and Jabalpur. SATI is ~3 km from the station (10 mins by auto-rickshaw).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Plane className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">By Air (Bhopal Airport - BHO)</strong>
                  <span>Raja Bhoj International Airport in Bhopal is 55 km away. Direct highway taxis and local express trains operate frequently.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Heritage Proximity</strong>
                  <span>World Heritage UNESCO Sanchi Stupa is only 9 km from the SATI campus. Historical Udayagiri caves are within 5 km.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Hostel & Guest Room Helpdesk</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              Visiting faculty evaluators and outstation participants can request guest house or student hostel accommodation via the Registration & Inquiries portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
