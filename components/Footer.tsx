
import React from 'react';
import { Linkedin, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, onNavigate }) => {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Branding */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 text-sky-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 0L1.61 6V18L12 0Z" />
                    <path d="M12 0L22.39 6V18L12 0Z" />
                    <path d="M1.61 18L12 24L22.39 18H1.61Z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-xl tracking-widest">AccelUAV</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-6">
              AccelUAV is a defense technology company. We invent and build technology to secure the future.
            </p>
            <div className="flex gap-4">
               {/* Social Icons */}
               <a href="https://in.linkedin.com/company/acceluav" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accluav-orange transition-colors cursor-pointer group">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="w-4 h-4 text-white group-hover:text-white transition-colors" />
               </a>
               <a href="https://www.instagram.com/auavpl?igsh=MWhod2xkMzljcXVqNQ" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accluav-orange transition-colors cursor-pointer group">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="w-4 h-4 text-white group-hover:text-white transition-colors" />
               </a>
               <a href="https://www.youtube.com/@ACCELUAV" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accluav-orange transition-colors cursor-pointer group">
                  <span className="sr-only">YouTube</span>
                  <Youtube className="w-4 h-4 text-white group-hover:text-white transition-colors" />
               </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
             <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-2 inline-block">Location</h4>
             <div className="text-sm text-gray-400 space-y-4">
                <p className="leading-relaxed">
                  <strong className="text-white block mb-1">AccelUAV HQ</strong>
                  Plot No 7A, Prashant Nagar<br/>
                  IDA Kukatpally, Kukatpally<br/>
                  Hyderabad, Telangana 500072
                </p>
                <div className="flex flex-col gap-1 pt-2">
                  <a href="mailto:acceluav@gmail.com" className="hover:text-accluav-orange transition-colors">acceluav@gmail.com</a>
                  <a href="tel:+917989201489" className="hover:text-accluav-orange transition-colors">+91 7989201489</a>
                </div>
             </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-2 inline-block">Sitemap</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <button onClick={() => onNavigate?.('mission')} className="hover:text-accluav-orange transition-colors flex items-center gap-2 text-left w-full">
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span> Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('systems')} className="hover:text-accluav-orange transition-colors flex items-center gap-2 text-left w-full">
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span> Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('careers')} className="hover:text-accluav-orange transition-colors flex items-center gap-2 text-left w-full">
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span> Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('newsroom')} className="hover:text-accluav-orange transition-colors flex items-center gap-2 text-left w-full">
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span> News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('blogs')} className="hover:text-accluav-orange transition-colors flex items-center gap-2 text-left w-full">
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span> Field Notes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('demo')} className="hover:text-accluav-orange transition-colors flex items-center gap-2 text-left w-full">
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span> Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Map */}
          <div className="lg:col-span-3">
             <div className="w-full h-full min-h-[200px] rounded-sm overflow-hidden border border-white/10 relative group">
                <iframe 
                  width="100%" 
                  height="100%" 
                  className="absolute inset-0 w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=AccelUAV+Pvt.+Ltd.&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="AccelUAV Location"
                >
                </iframe>
                <div className="absolute inset-0 pointer-events-none border border-white/5"></div>
             </div>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} AccelUAV Industries. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            {/* Admin Link */}
            <button 
              onClick={onAdminClick}
              className="text-gray-700 hover:text-accluav-orange transition-colors cursor-pointer ml-4 text-[10px] uppercase tracking-widest font-bold"
              title="Employee Login"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
