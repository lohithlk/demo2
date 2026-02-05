
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, PenTool } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogListProps {
  blogs: BlogPost[];
  onBlogClick: (id: string) => void;
  onBack: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onBlogClick, onBack }) => {
  return (
    <div className="min-h-screen bg-accluav-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 border-b border-white/10 pb-12"
        >
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase mb-4">
                Field Notes
            </h1>
            <p className="text-xl text-gray-400">
                Engineering deep dives, operational reports, and strategic insights.
            </p>
        </motion.div>

        {blogs.length === 0 ? (
           <div className="text-center py-20 bg-white/5 border border-white/10">
               <PenTool className="w-12 h-12 text-gray-600 mx-auto mb-4" />
               <h3 className="text-xl font-bold mb-2">Transmission Silence</h3>
               <p className="text-gray-500">No entries in the log yet.</p>
           </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <motion.div 
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onBlogClick(blog.id)}
                        className="bg-[#111] border border-white/10 group cursor-pointer flex flex-col h-full hover:border-accluav-orange/30 transition-colors"
                    >
                        <div className="aspect-[16/9] overflow-hidden bg-gray-900 relative">
                            <img 
                                src={blog.imageUrl} 
                                alt={blog.title} 
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-accluav-orange text-black text-xs font-bold uppercase tracking-widest px-2 py-1">
                                    {blog.category}
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mb-4">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
                            </div>
                            
                            <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-accluav-orange transition-colors">
                                {blog.title}
                            </h2>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                {blog.excerpt}
                            </p>
                            
                            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white mt-auto">
                                Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
