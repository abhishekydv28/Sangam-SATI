import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/festivalsData';
import { X, ZoomIn, Camera, Image as ImageIcon } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const categories = ['All', 'Technovision', 'Samrat Utsav', 'Sports', 'Campus'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div id="gallery" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Campus Life & Memories
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Festival & Campus Gallery
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Visual highlights from technical arenas, cultural showcases, and stadium grounds at SATI Vidisha.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group cursor-pointer bg-slate-900/80 rounded-xl overflow-hidden border border-slate-800 shadow-xs hover:border-cyan-400 hover:shadow-cyan-950/40 hover:shadow-lg transition-all flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
              {item.isVideo ? (
                <video
                  src={item.imageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 bg-cyan-500/90 text-slate-950 rounded-full shadow-md font-semibold text-xs flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/70 text-white hover:bg-black/90 transition-colors"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-16/9 w-full bg-black flex items-center justify-center">
              {activePhoto.isVideo ? (
                <video
                  src={activePhoto.imageUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="p-6 bg-slate-900 text-white border-t border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {activePhoto.category} Archive
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {activePhoto.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
