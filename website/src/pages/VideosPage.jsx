import React, { useState, useRef } from 'react';

const rawVideos = [
  { filename: '01_School_Tie_And_Belt.mp4', category: 'School Tie And Belt', title: 'School Tie girls and boys, Corporate Tie' },
  '02_T Shirts_Round Neck T Shirt.mp4',
  '03_School T Shirts_Kids T-Shirt.mp4',
  '04_School Uniform Accessories_School Belt.mp4',
  '05_Mens Promotional T Shirt_Polo Sublimation T Shirt.mp4',
  '06_School Uniform_SCHOOL UNIFORM SET.mp4',
  '07_School Uniform_ODISHA GOVT CHECKS UNIFORM SALWAR.mp4',
  '08_Men Wear_Men Cotton Shirts.mp4',
  '09_Fleece Hoodies_Fleece Hoodie 350 gsm.mp4',
  '10_School Uniform_ODISHA GOVT BOYS FULL PANT SENIOR CLASS.mp4',
  '11_Mens Sweater_Oswal Winter King Pure Wool.mp4',
  '12_Mens Collar T Shirt_Mens Poly Cotton T Shirts.mp4',
  '13_Mens Sweater_Governtment School Sweater.mp4',
  '14_School Uniform_Odisha Govt School Frock.mp4',
  '15_Mens Corporate Suit_MEN THREE PIECE SUIT.mp4',
  '16_Cricket Wear_Cricket Unisex Sports Jersey.mp4',
  '17_FOOD DELIVERY BAG_Food Delivery Bags.mp4',
  '18_MEN JACKET_Full Sleeve Unisex Windcheater Jacket.mp4',
  '19_School Uniform Accessories_School Socks.mp4',
  '20_School T Shirts_Kv School Uniform T Shirt.mp4',
  '21_T Shirts_Half Sleeves T-Shirt.mp4',
  '22_School Uniform_School Pants.mp4',
  '23_Leather Duffel Bag_Designer Duffle Bag.mp4',
  '24_MONOGRAM LOGO_School Monogram Woven Labels.mp4',
  '25_School Uniform T Shirts_Cotton School T Shirt.mp4',
  "26_Men's T-shirt_Mens Loop Knit T Shirt 180 GSM.mp4",
];

// Parse filename: NN_Category_ProductName.mp4
const videos = rawVideos.map((entry) => {
  // If entry is already a parsed object, use it directly
  if (typeof entry === 'object') {
    const num = entry.filename.split('_')[0];
    return {
      num,
      category: entry.category,
      title: entry.title,
      filename: entry.filename,
      src: `/videos/${entry.filename}`,
    };
  }
  // Otherwise parse from filename string
  const filename = entry;
  const withoutExt = filename.replace('.mp4', '');
  const parts = withoutExt.split('_');
  const num = parts[0];
  const category = parts[1] || '';
  const title = parts.slice(2).join(' ') || category;
  return {
    num,
    category,
    title,
    filename,
    src: `/videos/${encodeURIComponent(filename)}`,
  };
});

const allCategories = ['All', ...Array.from(new Set(videos.map(v => v.category)))];

export default function VideosPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVideo, setModalVideo] = useState(null);
  const modalRef = useRef(null);

  const filtered = videos.filter(v => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const openModal = (video) => setModalVideo(video);
  const closeModal = () => setModalVideo(null);

  return (
    <div className="pt-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#3B2C24] mb-3">Product Videos</h1>
          <div className="w-24 h-1 bg-[#8C6B52] mx-auto rounded-full mb-4" />
          <p className="text-[#5C4A40]">{videos.length} videos showcasing our wholesale products</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6B52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#E8E1D9] rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6B52]/40"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="border border-[#E8E1D9] rounded-lg px-4 py-2.5 text-sm bg-white text-[#3B2C24] focus:outline-none focus:ring-2 focus:ring-[#8C6B52]/40"
          >
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Video Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((video) => (
              <div
                key={video.filename}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E8E1D9] hover:shadow-md transition-all group cursor-pointer"
                onClick={() => openModal(video)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-[#3B2C24]/10 overflow-hidden">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-[#3B2C24] ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#8C6B52] uppercase tracking-wider">
                      {video.category}
                    </span>
                    <span className="text-[10px] font-semibold text-[#B0A090]">
                      {video.num}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#3B2C24] mt-1 line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#8C6B52]">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium">No videos found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
          ref={modalRef}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <video
              src={modalVideo.src}
              controls
              autoPlay
              className="w-full max-h-[70vh]"
            />

            {/* Caption */}
            <div className="bg-[#1a1008] px-5 py-4">
              <p className="text-[10px] text-[#8C6B52] font-bold uppercase tracking-wider mb-1">
                {modalVideo.category}
              </p>
              <p className="text-white font-semibold text-sm">{modalVideo.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
