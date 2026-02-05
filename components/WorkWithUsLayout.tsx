
import React, { useState } from 'react';
import { ArrowLeft, Plus, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PageType = 'careers' | 'life' | 'forge' | 'skillbridge' | 'hackathons';

interface WorkWithUsLayoutProps {
  children: React.ReactNode;
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  onBackHome: () => void;
}

const WorkWithUsLayout: React.FC<WorkWithUsLayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate, 
  onBackHome 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string }[] = [
    { id: 'careers', label: 'Careers' },
    { id: 'life', label: 'Life at AccelUAV' },
    { id: 'forge', label: 'The Forge Program' },
    { id: 'skillbridge', label: 'SkillBridge' },
    { id: 'hackathons', label: 'Hackathons / Arena' },
  ];

  return (
    <div className="min-h-screen bg-accluav-black text-white flex flex-col lg:flex-row">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-80 h-screen sticky top-0 border-r border-white/10 bg-black backdrop-blur-md p-8 z-40">
        <div className="mb-16">
           {/* Back to Main Menu Button */}
           <button 
              onClick={onBackHome}
              className="flex items-center text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest mb-8 group"
           >
              <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
              Main Menu
           </button>
           
           {/* Logo - Added to Sidebar for branding since Navbar is hidden */}
           <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={onBackHome}>
             <div className="w-8 h-8 text-sky-500">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                 <path d="M12 0L1.61 6V18L12 0Z" />
                 <path d="M12 0L22.39 6V18L12 0Z" />
                 <path d="M1.61 18L12 24L22.39 18H1.61Z" />
               </svg>
             </div>
             <span className="font-display font-bold text-xl tracking-widest text-white">
                AccelUAV
             </span>
           </div>

           {/* Section Header */}
           <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Work With Us</h2>
        </div>

        <nav className="flex-1 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center group w-full text-left transition-all duration-300 ${
                activePage === item.id ? 'text-white pl-0' : 'text-gray-500 hover:text-white hover:pl-2'
              }`}
            >
              <Plus className={`w-3 h-3 mr-3 transition-colors ${
                activePage === item.id ? 'text-accluav-orange' : 'text-gray-600 group-hover:text-accluav-orange'
              }`} />
              <span className={`font-display font-bold text-lg tracking-wide ${activePage === item.id ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-white/10">
             <a href="#open-roles" onClick={(e) => {
                 e.preventDefault();
                 onNavigate('careers');
                 // Allow time for render then scroll
                 setTimeout(() => {
                     document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
                 }, 100);
             }} className="text-gray-500 hover:text-accluav-orange text-[10px] font-bold uppercase tracking-widest flex items-center transition-colors">
                + Open Roles
             </a>
          </div>
        </nav>
      </aside>

      {/* Mobile Header - Visible only on mobile */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-white/10 p-4 flex justify-between items-center">
         <div className="flex items-center gap-2">
            <button onClick={onBackHome} className="p-2 text-gray-400">
               <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-display font-bold text-lg tracking-widest">WORK WITH US</span>
         </div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="fixed inset-0 z-40 bg-black pt-20 px-6 lg:hidden"
           >
              <nav className="space-y-6">
                {navItems.map((item) => (
                    <button
                    key={item.id}
                    onClick={() => {
                        onNavigate(item.id);
                        setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left font-display font-bold text-2xl ${
                        activePage === item.id ? 'text-accluav-orange' : 'text-white'
                    }`}
                    >
                    + {item.label}
                    </button>
                ))}
              </nav>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative lg:h-screen lg:overflow-y-auto pt-20 lg:pt-0 scroll-smooth">
        {children}
        
        {/* Simple Footer for Sub-pages */}
        <footer className="py-12 border-t border-white/10 mt-20 px-8 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} AccelUAV Industries.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default WorkWithUsLayout;
