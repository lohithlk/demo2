
import React, { useState, useEffect } from 'react';
import { Menu, X, Plus, Search, ArrowRight, Box, Briefcase, User, PenTool, Megaphone, Trophy, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job, Leader, Product, BlogPost, NewsItem, Hackathon } from '../types';

interface NavbarProps {
  onNavigateHome?: () => void;
  onNavigate?: (page: string) => void;
  onSearch?: (query: string) => void;
  jobs: Job[];
  leaders: Leader[];
  products: Product[];
  blogs: BlogPost[];
  news: NewsItem[];
  hackathons: Hackathon[];
  onProductClick?: (id: string) => void;
  onBlogClick?: (id: string) => void;
  onHackathonClick?: (id: string) => void;
}

type SuggestionItem = 
  | { type: 'product'; data: Product }
  | { type: 'job'; data: Job }
  | { type: 'leader'; data: Leader }
  | { type: 'blog'; data: BlogPost }
  | { type: 'news'; data: NewsItem }
  | { type: 'hackathon'; data: Hackathon }
  | { type: 'software'; title: string; description: string };

const Navbar: React.FC<NavbarProps> = ({ 
    onNavigateHome, 
    onNavigate, 
    onSearch, 
    jobs, 
    leaders, 
    products, 
    blogs, 
    news, 
    hackathons,
    onProductClick,
    onBlogClick,
    onHackathonClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompanyHovered, setIsCompanyHovered] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [mobileSearchValue, setMobileSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search Suggestion Logic
  useEffect(() => {
    if (searchInputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = searchInputValue.toLowerCase();

    const matchedProducts: SuggestionItem[] = products
      .filter(p => p.title.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery))
      .map(p => ({ type: 'product', data: p }));

    const matchedJobs: SuggestionItem[] = jobs
      .filter(j => j.title.toLowerCase().includes(lowerQuery) || j.department.toLowerCase().includes(lowerQuery))
      .map(j => ({ type: 'job', data: j }));

    const matchedLeaders: SuggestionItem[] = leaders
      .filter(l => l.name.toLowerCase().includes(lowerQuery) || l.role.toLowerCase().includes(lowerQuery))
      .map(l => ({ type: 'leader', data: l }));

    const matchedBlogs: SuggestionItem[] = blogs
      .filter(b => b.title.toLowerCase().includes(lowerQuery) || b.category.toLowerCase().includes(lowerQuery))
      .map(b => ({ type: 'blog', data: b }));

    const matchedNews: SuggestionItem[] = news
      .filter(n => n.title.toLowerCase().includes(lowerQuery) || n.category.toLowerCase().includes(lowerQuery))
      .map(n => ({ type: 'news', data: n }));

    const matchedHackathons: SuggestionItem[] = hackathons
      .filter(h => h.title.toLowerCase().includes(lowerQuery) || h.description.toLowerCase().includes(lowerQuery))
      .map(h => ({ type: 'hackathon', data: h }));

    // Hardcoded Software Match
    const softwareMatch: SuggestionItem[] = [];
    if ("rltm software rapid live tactical mapping".includes(lowerQuery)) {
        softwareMatch.push({
            type: 'software',
            title: 'RLTM Engine',
            description: 'Rapid Live Tactical Mapping Software'
        });
    }

    setSuggestions([
        ...matchedProducts, 
        ...softwareMatch,
        ...matchedBlogs, 
        ...matchedHackathons, 
        ...matchedJobs, 
        ...matchedNews, 
        ...matchedLeaders
    ].slice(0, 8)); // Limit to 8 suggestions
  }, [searchInputValue, jobs, leaders, products, blogs, news, hackathons]);


  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const handleNavClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
    setIsCompanyHovered(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchInputValue.trim() && onSearch) {
          onSearch(searchInputValue.trim());
          setIsSearchHovered(false);
          setSearchInputValue('');
          setSuggestions([]);
      }
  };

  const handleSuggestionClick = (item: SuggestionItem) => {
      if (item.type === 'product' && onProductClick) {
          onProductClick(item.data.id);
      } else if (item.type === 'job' && onNavigate) {
          onNavigate('careers');
      } else if (item.type === 'leader' && onNavigate) {
          onNavigate('leadership');
      } else if (item.type === 'blog' && onBlogClick) {
          onBlogClick(item.data.id);
      } else if (item.type === 'news' && onNavigate) {
          onNavigate('newsroom');
      } else if (item.type === 'hackathon' && onHackathonClick) {
          onHackathonClick(item.data.id);
      } else if (item.type === 'software' && onNavigate) {
          onNavigate('software');
      }
      
      setIsSearchHovered(false);
      setSearchInputValue('');
      setSuggestions([]);
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (mobileSearchValue.trim() && onSearch) {
          onSearch(mobileSearchValue.trim());
          setIsMobileMenuOpen(false);
          setMobileSearchValue('');
      }
  };

  // Shared liquid glass style for the mega menus
  const megaMenuClass = "absolute top-full left-0 w-full bg-black/30 backdrop-blur-3xl border-b border-transparent overflow-hidden shadow-2xl hidden md:block";

  const workWithUsLinks = [
    { label: 'Careers', page: 'careers' },
    { label: 'The Forge Program', page: 'forge' },
    { label: 'SkillBridge', page: 'skillbridge' },
    { label: 'Hackathons / Arena', page: 'hackathons' },
    { label: 'Open Roles', page: 'careers' }
  ];

  const companyLinks = [
      { label: 'Mission', page: 'mission' }, 
      { label: 'Newsroom', page: 'newsroom' },
      { label: 'Blogs / Intel', page: 'blogs' },
      { label: 'Leadership', page: 'leadership' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-accluav-black/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-3 group relative z-50">
            <div className="w-10 h-10 text-sky-500 group-hover:text-accluav-orange transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 0L1.61 6V18L12 0Z" />
                <path d="M12 0L22.39 6V18L12 0Z" />
                <path d="M1.61 18L12 24L22.39 18H1.61Z" />
              </svg>
            </div>
            <span className="font-display font-bold text-2xl tracking-widest text-white">
              AccelUAV
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12 h-full">
            <div 
                className="group h-full flex items-center cursor-pointer"
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
            >
                <button className={`text-sm font-medium transition-colors font-display tracking-widest uppercase flex items-center gap-2 ${isSearchHovered ? 'text-accluav-orange' : 'text-white'}`}>
                    Search <Search className={`w-4 h-4 transition-transform duration-300 ${isSearchHovered ? 'scale-110' : ''}`} />
                </button>
            </div>
            
            <div 
                className="group h-full flex items-center cursor-pointer"
                onMouseEnter={() => setIsCompanyHovered(true)}
                onMouseLeave={() => setIsCompanyHovered(false)}
            >
                <button className={`flex items-center gap-2 text-sm font-medium transition-colors font-display tracking-widest uppercase ${isCompanyHovered ? 'text-accluav-orange' : 'text-white'}`}>
                    Company <Plus className={`w-4 h-4 transition-transform duration-300 ${isCompanyHovered ? 'rotate-45' : ''}`} />
                </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>

        {/* Search Mega Menu */}
        <AnimatePresence>
          {isSearchHovered && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={megaMenuClass}
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
            >
                <div className="border-t border-transparent">
                    <div className="container mx-auto px-6 py-24">
                        <div className="max-w-5xl mx-auto">
                            <form onSubmit={handleSearchSubmit} className="relative border-b border-white/20 pb-4 group-focus-within:border-accluav-orange transition-colors">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-white/50" />
                                <input 
                                    type="text" 
                                    value={searchInputValue}
                                    onChange={(e) => setSearchInputValue(e.target.value)}
                                    placeholder="SEARCH INTELLIGENCE..." 
                                    className="w-full bg-transparent text-2xl md:text-5xl font-display font-bold text-white placeholder-white/20 focus:outline-none pl-16 py-2 uppercase tracking-tight"
                                    autoFocus
                                />
                            </form>
                            
                            {/* Suggestions List */}
                            <AnimatePresence>
                                {suggestions.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        <div className="col-span-1 md:col-span-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Suggested Results</div>
                                        {suggestions.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSuggestionClick(item)}
                                                className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accluav-orange/50 transition-all text-left group"
                                            >
                                                {item.type === 'product' && (
                                                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                                                        <Box className="w-6 h-6 text-accluav-orange" />
                                                    </div>
                                                )}
                                                {item.type === 'job' && (
                                                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                                                        <Briefcase className="w-6 h-6 text-accluav-orange" />
                                                    </div>
                                                )}
                                                {item.type === 'leader' && (
                                                    <div className="w-12 h-12 bg-gray-900 overflow-hidden shrink-0">
                                                        <img src={item.data.imageUrl} className="w-full h-full object-cover grayscale" />
                                                    </div>
                                                )}
                                                {item.type === 'blog' && (
                                                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                                                        <PenTool className="w-6 h-6 text-accluav-orange" />
                                                    </div>
                                                )}
                                                {item.type === 'news' && (
                                                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                                                        <Megaphone className="w-6 h-6 text-accluav-orange" />
                                                    </div>
                                                )}
                                                {item.type === 'hackathon' && (
                                                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                                                        <Trophy className="w-6 h-6 text-accluav-orange" />
                                                    </div>
                                                )}
                                                {item.type === 'software' && (
                                                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                                                        <Cpu className="w-6 h-6 text-accluav-orange" />
                                                    </div>
                                                )}
                                                
                                                <div>
                                                    <div className="text-white font-bold font-display uppercase group-hover:text-accluav-orange transition-colors line-clamp-1">
                                                        {item.type === 'product' ? (item.data as Product).title :
                                                         item.type === 'job' ? (item.data as Job).title :
                                                         item.type === 'leader' ? (item.data as Leader).name :
                                                         item.type === 'blog' ? (item.data as BlogPost).title :
                                                         item.type === 'news' ? (item.data as NewsItem).title :
                                                         item.type === 'hackathon' ? (item.data as Hackathon).title :
                                                         item.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                                                        {item.type === 'product' ? (item.data as Product).category :
                                                         item.type === 'job' ? (item.data as Job).department :
                                                         item.type === 'leader' ? (item.data as Leader).role :
                                                         item.type === 'blog' ? 'Field Notes' :
                                                         item.type === 'news' ? 'Newsroom' :
                                                         item.type === 'hackathon' ? 'Hackathon' :
                                                         'Software Suite'}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Default trending/links (Only show if no suggestions) */}
                            {suggestions.length === 0 && (
                                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm font-mono uppercase tracking-widest items-center">
                                    <span className="text-gray-500">Trending:</span>
                                    <a href="#products" className="text-white hover:text-accluav-orange transition-colors flex items-center gap-2">
                                      ACE-VI <ArrowRight className="w-3 h-3" />
                                    </a>
                                    <button onClick={(e) => handleNavClick(e, 'careers')} className="text-white hover:text-accluav-orange transition-colors flex items-center gap-2">
                                      Open Roles <ArrowRight className="w-3 h-3" />
                                    </button>
                                    <a href="#mission" className="text-white hover:text-accluav-orange transition-colors flex items-center gap-2">
                                      RLTM Software <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Company Mega Menu Dropdown */}
        <AnimatePresence>
          {isCompanyHovered && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={megaMenuClass}
                onMouseEnter={() => setIsCompanyHovered(true)}
                onMouseLeave={() => setIsCompanyHovered(false)}
            >
                <div className="border-t border-transparent">
                    <div className="container mx-auto px-6 py-16">
                        <div className="grid grid-cols-12 gap-12">
                            {/* Left Large Text */}
                            <div className="col-span-7 flex flex-col justify-between">
                                <h2 className="text-6xl lg:text-7xl font-display font-black leading-[0.9] uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-800 tracking-tighter">
                                    TRANSFORMING<br/>DEFENSE CAPABILITIES<br/>WITH ADVANCED<br/>TECHNOLOGIES
                                </h2>
                            </div>

                            {/* Links Columns */}
                            <div className="col-span-2">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Company</h4>
                                <ul className="space-y-6">
                                    {companyLinks.map(item => (
                                        <li key={item.label}>
                                            <button 
                                                onClick={(e) => handleNavClick(e, item.page)}
                                                className="flex items-center gap-3 group/link text-lg font-medium hover:text-accluav-orange transition-colors font-display text-white text-left"
                                            >
                                                <Plus className="w-4 h-4 text-accluav-orange opacity-0 group-hover/link:opacity-100 transition-opacity -ml-6" />
                                                <span className="group-hover/link:-translate-x-0 transition-transform duration-300">
                                                  + {item.label}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="col-span-3">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Work With Us</h4>
                                <ul className="space-y-6">
                                    {workWithUsLinks.map(item => (
                                        <li key={item.label}>
                                            <button 
                                                onClick={(e) => handleNavClick(e, item.page)}
                                                className="flex items-center gap-3 group/link text-lg font-medium hover:text-accluav-orange transition-colors font-display text-white text-left"
                                            >
                                                <Plus className="w-4 h-4 text-accluav-orange opacity-0 group-hover/link:opacity-100 transition-opacity -ml-6" />
                                                 <span className="group-hover/link:-translate-x-0 transition-transform duration-300">
                                                  + {item.label}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-accluav-black/95 backdrop-blur-xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-2xl tracking-widest text-white">
                AccelUAV
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-white hover:text-accluav-orange" />
              </button>
            </div>
            
            <form onSubmit={handleMobileSearchSubmit} className="relative mb-12">
                <input 
                    type="text" 
                    value={mobileSearchValue}
                    onChange={(e) => setMobileSearchValue(e.target.value)}
                    placeholder="SEARCH..." 
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-xl font-display uppercase tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-accluav-orange"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                    <Search className="w-6 h-6" />
                </button>
            </form>

            <div className="flex flex-col space-y-8 overflow-y-auto h-full pb-20">
              <div className="space-y-4">
                 <h4 className="text-xs text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Company</h4>
                 {companyLinks.map((item) => (
                    <button
                      key={item.label}
                      onClick={(e) => handleNavClick(e, item.page)}
                      className="block w-full text-left text-2xl font-display font-bold text-white hover:text-accluav-orange transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
              </div>

               <div className="space-y-4 mt-8">
                 <h4 className="text-xs text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Work With Us</h4>
                 {workWithUsLinks.map((item) => (
                    <button
                      key={item.label}
                      onClick={(e) => handleNavClick(e, item.page)}
                      className="block w-full text-left text-2xl font-display font-bold text-white hover:text-accluav-orange transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
