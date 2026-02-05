
import React from 'react';
import { Search, Box, User, Briefcase, PenTool, Megaphone, Trophy, ArrowRight, Cpu } from 'lucide-react';
import { Product, Job, Leader, BlogPost, NewsItem, Hackathon } from '../types';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
  jobs: Job[];
  leaders: Leader[];
  products: Product[];
  blogs: BlogPost[];
  news: NewsItem[];
  hackathons: Hackathon[];
  onNavigate: (page: string) => void;
  onProductClick: (productId: string) => void;
  onBlogClick: (blogId: string) => void;
  onHackathonClick: (hackathonId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
    query, 
    onBack, 
    jobs, 
    leaders, 
    products, 
    blogs, 
    news, 
    hackathons,
    onNavigate, 
    onProductClick,
    onBlogClick,
    onHackathonClick
}) => {
  // Filter logic
  const lowerQuery = query.toLowerCase();

  const matchedProducts = products.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );

  const matchedJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(lowerQuery) || 
    j.description.toLowerCase().includes(lowerQuery) ||
    j.department.toLowerCase().includes(lowerQuery)
  );

  const matchedLeaders = leaders.filter(l => 
    l.name.toLowerCase().includes(lowerQuery) || 
    l.role.toLowerCase().includes(lowerQuery) ||
    l.bio.toLowerCase().includes(lowerQuery)
  );

  const matchedBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(lowerQuery) || 
    b.excerpt.toLowerCase().includes(lowerQuery) ||
    b.content.toLowerCase().includes(lowerQuery)
  );

  const matchedNews = news.filter(n => 
    n.title.toLowerCase().includes(lowerQuery) || 
    n.excerpt.toLowerCase().includes(lowerQuery) || 
    n.category.toLowerCase().includes(lowerQuery)
  );

  const matchedHackathons = hackathons.filter(h => 
    h.title.toLowerCase().includes(lowerQuery) || 
    h.description.toLowerCase().includes(lowerQuery) || 
    h.venue.toLowerCase().includes(lowerQuery)
  );

  const softwareMatch = "rltm software rapid live tactical mapping".includes(lowerQuery);

  const totalResults = matchedProducts.length + matchedJobs.length + matchedLeaders.length + matchedBlogs.length + matchedNews.length + matchedHackathons.length + (softwareMatch ? 1 : 0);

  return (
    <div className="min-h-screen bg-accluav-black text-white pt-32 pb-20 px-6">
        <div className="container mx-auto">
            
            <div className="mb-16 border-b border-white/10 pb-8">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                    SEARCH RESULTS
                </h1>
                <p className="text-xl text-gray-400">
                    Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "<span className="text-white">{query}</span>"
                </p>
            </div>

            {totalResults === 0 && (
                <div className="text-center py-20 bg-white/5 border border-white/10">
                    <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No matches found</h3>
                    <p className="text-gray-500">Try adjusting your search terms or browse our capabilities.</p>
                </div>
            )}

            <div className="space-y-16">
                {softwareMatch && (
                    <section>
                         <h2 className="text-accluav-orange font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> Software Suite
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-900 border border-white/10 p-6 hover:border-accluav-orange/50 transition-colors group cursor-pointer" onClick={() => onNavigate('software')}>
                                <div className="aspect-video bg-black mb-4 overflow-hidden relative border border-white/10">
                                     <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" alt="RLTM" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-xl font-display font-bold mb-1">RLTM Software</h3>
                                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-3">Intelligence</span>
                                <p className="text-sm text-gray-400 line-clamp-2">Rapid Live Tactical Mapping engine for real-time 3D reconstruction and orthomosaics.</p>
                            </div>
                         </div>
                    </section>
                )}

                {matchedProducts.length > 0 && (
                    <section>
                         <h2 className="text-accluav-orange font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Box className="w-4 h-4" /> Systems & Capabilities
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {matchedProducts.map(product => (
                                <div key={product.id} className="bg-gray-900 border border-white/10 p-6 hover:border-accluav-orange/50 transition-colors group cursor-pointer" onClick={() => onProductClick(product.id)}>
                                    <div className="aspect-video bg-black mb-4 overflow-hidden relative">
                                         <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-1">{product.title}</h3>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest block mb-3">{product.category}</span>
                                    <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                                </div>
                            ))}
                         </div>
                    </section>
                )}

                {matchedBlogs.length > 0 && (
                    <section>
                         <h2 className="text-accluav-orange font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <PenTool className="w-4 h-4" /> Field Notes / Intel
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {matchedBlogs.map(blog => (
                                <div key={blog.id} className="bg-gray-900 border border-white/10 p-6 hover:border-white/30 transition-colors cursor-pointer" onClick={() => onBlogClick(blog.id)}>
                                    <h3 className="text-lg font-bold mb-1 line-clamp-1">{blog.title}</h3>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest block mb-3">{blog.date}</span>
                                    <p className="text-sm text-gray-400 line-clamp-2">{blog.excerpt}</p>
                                </div>
                            ))}
                         </div>
                    </section>
                )}

                {matchedHackathons.length > 0 && (
                    <section>
                         <h2 className="text-accluav-orange font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Trophy className="w-4 h-4" /> Hackathons
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {matchedHackathons.map(hackathon => (
                                <div key={hackathon.id} className="bg-gray-900 border border-white/10 p-6 hover:border-white/30 transition-colors cursor-pointer flex justify-between items-center" onClick={() => onHackathonClick(hackathon.id)}>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">{hackathon.title}</h3>
                                        <div className="flex gap-2 text-xs text-gray-500 uppercase tracking-widest mb-3">
                                            <span>{hackathon.date}</span>
                                            <span>•</span>
                                            <span>{hackathon.venue}</span>
                                        </div>
                                        <p className="text-sm text-gray-400 line-clamp-2 max-w-md">{hackathon.description}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-600" />
                                </div>
                            ))}
                         </div>
                    </section>
                )}

                {matchedJobs.length > 0 && (
                     <section>
                         <h2 className="text-accluav-orange font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> Open Roles
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {matchedJobs.map(job => (
                                <div key={job.id} className="bg-gray-900 border border-white/10 p-6 hover:border-white/30 transition-colors cursor-pointer" onClick={() => onNavigate('careers')}>
                                    <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                                    <div className="flex gap-2 text-xs text-gray-500 uppercase tracking-widest mb-3">
                                        <span>{job.department}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 line-clamp-2">{job.description}</p>
                                </div>
                            ))}
                         </div>
                    </section>
                )}

                {matchedNews.length > 0 && (
                     <section>
                         <h2 className="text-accluav-orange font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Megaphone className="w-4 h-4" /> Newsroom
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {matchedNews.map(item => (
                                <div key={item.id} className="bg-gray-900 border border-white/10 p-6 hover:border-white/30 transition-colors cursor-pointer" onClick={() => onNavigate('newsroom')}>
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-lg font-bold line-clamp-1">{item.title}</h3>
                                        <span className="text-xs text-accluav-orange uppercase tracking-widest ml-4">{item.category}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 line-clamp-2">{item.excerpt}</p>
                                </div>
                            ))}
                         </div>
                    </section>
                )}

                {matchedLeaders.length > 0 && (
                     <section>
                         <h2 className="text-accluav-orange font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <User className="w-4 h-4" /> Leadership
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {matchedLeaders.map(leader => (
                                <div key={leader.id} className="flex items-center gap-4 bg-gray-900 border border-white/10 p-4 hover:bg-white/5 cursor-pointer" onClick={() => onNavigate('leadership')}>
                                    <img src={leader.imageUrl} alt={leader.name} className="w-12 h-12 object-cover grayscale" />
                                    <div>
                                        <h3 className="font-bold">{leader.name}</h3>
                                        <p className="text-xs text-gray-500 uppercase">{leader.role}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </section>
                )}
            </div>
        </div>
    </div>
  );
};

export default SearchResults;
