
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPostDetailProps {
  blog: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ blog, onBack }) => {
  const handleShare = async () => {
      // Ensure we have a valid URL. In some preview environments (iframe), window.location.href might be 'about:srcdoc'
      // which causes navigator.share to throw "Invalid URL".
      let shareUrl = window.location.href;
      if (!shareUrl.startsWith('http')) {
          shareUrl = `https://acceluav.com/intel/${blog.id}`;
      }

      const shareData = {
          title: blog.title,
          text: blog.excerpt,
          url: shareUrl,
      };

      try {
          // Check if Web Share API is supported and can share this data
          if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
              await navigator.share(shareData);
          } else if (navigator.share) {
               // Try sharing without validation check if canShare isn't available or fails for some reason but share exists
               await navigator.share(shareData);
          } else {
              throw new Error('Web Share API not supported');
          }
      } catch (err) {
          console.warn('Native share failed or not supported, falling back to new tab:', err);
          // Fallback for desktop or when share fails
          const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(blog.title + " - " + blog.excerpt + " " + shareUrl)}`;
          window.open(linkedinUrl, '_blank');
      }
  };

  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
       {/* Hero Image */}
       <div className="w-full h-[50vh] relative overflow-hidden">
            <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accluav-black via-accluav-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <button 
                            onClick={onBack}
                            className="flex items-center text-gray-300 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Intel
                        </button>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-accluav-orange text-black text-xs font-bold uppercase tracking-widest px-3 py-1">
                                {blog.category}
                            </span>
                            <span className="text-gray-300 text-xs font-mono flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> {blog.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold max-w-4xl leading-tight mb-6">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-4 border-t border-white/20 pt-6 max-w-xl">
                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase tracking-widest">Written By</div>
                                <div className="font-bold">{blog.author}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
       </div>

       <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Article Body */}
           <div className="lg:col-span-8">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="prose prose-invert prose-lg max-w-none"
               >
                   <p className="text-xl text-gray-300 leading-relaxed font-medium mb-12 border-l-4 border-accluav-orange pl-6 italic">
                       {blog.excerpt}
                   </p>
                   
                   {/* Render content - treating as paragraphs for simplicity since it's a string */}
                   {blog.content.split('\n').map((paragraph, idx) => (
                       paragraph.trim() && <p key={idx} className="mb-6 text-gray-400 leading-relaxed">{paragraph}</p>
                   ))}
               </motion.div>

               <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                   <div className="flex gap-2">
                       <Tag className="w-4 h-4 text-accluav-orange" />
                       <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Keywords:</span>
                       <span className="text-xs text-gray-400">Defense, Autonomy, Engineering</span>
                   </div>
                   <button 
                        onClick={handleShare}
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-accluav-orange transition-colors"
                   >
                       <Share2 className="w-4 h-4" /> Share Article
                   </button>
               </div>
           </div>

           {/* Sidebar */}
           <div className="lg:col-span-4 space-y-8">
               <div className="bg-[#111] border border-white/10 p-8 sticky top-24">
                   <h3 className="text-xl font-display font-bold mb-4">Subscribe to Field Notes</h3>
                   <p className="text-sm text-gray-400 mb-6">
                       Get technical deep dives and company updates delivered to your inbox.
                   </p>
                   <input 
                        type="email" 
                        placeholder="ENTER EMAIL" 
                        className="w-full bg-black border border-white/10 p-3 text-sm text-white focus:border-accluav-orange outline-none mb-4"
                   />
                   <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 hover:bg-accluav-orange hover:text-white transition-colors text-sm">
                       Subscribe
                   </button>
               </div>
           </div>
       </div>
    </div>
  );
};

export default BlogPostDetail;
