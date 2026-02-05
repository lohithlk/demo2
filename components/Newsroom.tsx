
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsroomProps {
  news: NewsItem[];
}

const Newsroom: React.FC<NewsroomProps> = ({ news }) => {
  const [selectedNewsId, setSelectedNewsId] = useState<string | number | null>(null);

  const selectedItem = news.find(n => n.id === selectedNewsId);

  const handleShare = async (item: NewsItem) => {
      const shareUrl = window.location.href; // In a real app this would be a permalink
      const shareData = {
          title: item.title,
          text: item.excerpt,
          url: shareUrl,
      };

      try {
          if (navigator.share && navigator.canShare(shareData)) {
              await navigator.share(shareData);
          } else {
              throw new Error('Native share unavailable');
          }
      } catch (err) {
          const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(item.title + " - " + item.excerpt)}`;
          window.open(linkedinUrl, '_blank');
      }
  };

  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
            {!selectedItem ? (
                <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div className="mb-16 border-b border-white/10 pb-12">
                        <h1 className="text-5xl md:text-8xl font-display font-black uppercase mb-4">
                            Newsroom
                        </h1>
                        <p className="text-xl text-gray-400">
                            Latest updates, press releases, and stories from the field.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            {news.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    layoutId={`news-${item.id}`}
                                    onClick={() => setSelectedNewsId(item.id)}
                                    className="bg-[#111] border border-white/10 p-8 hover:border-accluav-orange/30 transition-colors group cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-accluav-orange text-xs font-bold uppercase tracking-widest bg-accluav-orange/10 px-2 py-1 rounded">
                                            {item.category}
                                        </span>
                                        <div className="flex items-center text-gray-500 text-xs font-mono">
                                            <Calendar className="w-3 h-3 mr-2" />
                                            {item.date}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-white transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {item.excerpt}
                                    </p>
                                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-accluav-orange transition-colors">
                                        Read Story <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white/5 p-8 border border-white/10">
                                <h3 className="text-xl font-bold mb-4 font-display">Media Contact</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    For press inquiries, assets, and interview requests.
                                </p>
                                <a href="mailto:press@acceluav.com" className="text-accluav-orange font-bold text-sm hover:text-white transition-colors">
                                    press@acceluav.com
                                </a>
                            </div>

                            <div className="bg-white/5 p-8 border border-white/10">
                                <h3 className="text-xl font-bold mb-4 font-display">Press Kit</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    Download official logos, executive bios, and high-res product imagery.
                                </p>
                                <button className="border border-white/20 w-full py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                    Download Assets
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <button 
                        onClick={() => setSelectedNewsId(null)}
                        className="flex items-center text-gray-500 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Newsroom
                    </button>

                    <motion.div layoutId={`news-${selectedItem.id}`} className="bg-[#111] border border-white/10 overflow-hidden">
                        {/* Hero Image if available */}
                        {selectedItem.imageUrl && (
                            <div className="w-full aspect-video bg-gray-900 relative">
                                <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-60"></div>
                            </div>
                        )}

                        <div className="p-8 md:p-12">
                            <div className="flex flex-col gap-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <span className="bg-accluav-orange text-black text-xs font-bold uppercase tracking-widest px-3 py-1">
                                        {selectedItem.category}
                                    </span>
                                    <span className="text-gray-500 text-xs font-mono flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> {selectedItem.date}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                                    {selectedItem.title}
                                </h1>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none border-t border-white/10 pt-8">
                                {/* If content exists, render it. Otherwise fall back to excerpt. */}
                                {selectedItem.content ? (
                                    selectedItem.content.split('\n').map((paragraph, i) => (
                                        paragraph.trim() && <p key={i} className="text-gray-300 leading-relaxed mb-6">{paragraph}</p>
                                    ))
                                ) : (
                                    <p className="text-gray-300 leading-relaxed text-xl">{selectedItem.excerpt}</p>
                                )}
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleShare(selectedItem); }}
                                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-accluav-orange transition-colors"
                                >
                                    <Share2 className="w-4 h-4" /> Share Release
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Newsroom;
