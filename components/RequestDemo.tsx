
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';

interface RequestDemoProps {
  onBack: () => void;
}

const RequestDemo: React.FC<RequestDemoProps> = ({ onBack }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    interest: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email parameters
    const subject = `AccelUAV Demo Request: ${formState.interest} - ${formState.organization}`;
    const body = `Name: ${formState.name}
Email: ${formState.email}
Organization: ${formState.organization}
Role: ${formState.role}
System Interest: ${formState.interest}

Mission Requirements:
${formState.message}`;

    // Open default mail client
    window.location.href = `mailto:acceluav@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show success state
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="min-h-screen bg-accluav-black pt-32 pb-20 relative overflow-hidden flex flex-col">
        {/* Background elements */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900 to-transparent opacity-20 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accluav-orange to-transparent opacity-20" />
         
         <div className="container mx-auto px-6 relative z-10 flex-grow">
            <button 
                onClick={onBack}
                className="flex items-center text-gray-400 hover:text-white mb-12 transition-colors group text-sm font-bold tracking-widest uppercase"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Column: Copy */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[0.9]">
                        REQUEST <br/>
                        <span className="text-accluav-orange">CAPABILITIES</span> <br/>
                        DEMO
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">
                        Our systems are built for the most demanding environments. 
                        Connect with our mission specialists to discuss your specific operational requirements and schedule a live demonstration of our autonomous platforms.
                    </p>

                    <div className="space-y-8 border-t border-white/10 pt-8">
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">General Inquiries</h4>
                            <p className="text-gray-400 font-mono text-sm">acceluav@gmail.com</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Headquarters</h4>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed">
                                Plot No 7A, Prashant Nagar<br/>
                                IDA Kukatpally, Kukatpally<br/>
                                Hyderabad, Telangana 500072
                            </p>
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Secure Channels</h4>
                           <p className="text-gray-400 text-sm">
                              Encrypted communication channels available upon request for sensitive requirements.
                           </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm relative"
                >
                     {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30"></div>

                    {isSubmitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 min-h-[500px]">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-accluav-orange/10 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-accluav-orange" />
                            </motion.div>
                            <h3 className="text-2xl font-display font-bold mb-4">Request Initiated</h3>
                            <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                                Your default email client has been opened with the request details. Please hit send to complete the request.
                            </p>
                            <button 
                                onClick={onBack}
                                className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors text-sm"
                            >
                                Return to Intelligence
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-accluav-orange transition-colors placeholder-white/20"
                                        placeholder="J. Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Work Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        required
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-accluav-orange transition-colors placeholder-white/20"
                                        placeholder="name@agency.gov"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="organization" className="text-xs font-bold uppercase tracking-widest text-gray-500">Organization</label>
                                    <input 
                                        type="text" 
                                        id="organization" 
                                        name="organization" 
                                        required
                                        value={formState.organization}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-accluav-orange transition-colors placeholder-white/20"
                                        placeholder="Company / Agency"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-gray-500">Title</label>
                                    <input 
                                        type="text" 
                                        id="role" 
                                        name="role" 
                                        required
                                        value={formState.role}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-accluav-orange transition-colors placeholder-white/20"
                                        placeholder="Director of Operations"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="interest" className="text-xs font-bold uppercase tracking-widest text-gray-500">System Interest</label>
                                <div className="relative">
                                    <select 
                                        id="interest" 
                                        name="interest" 
                                        value={formState.interest}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-accluav-orange transition-colors appearance-none cursor-pointer"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Kinetic Systems (VINASHAK)</option>
                                        <option>ISR Platforms (ACE-VI)</option>
                                        <option>Tactical Systems (ACE-II)</option>
                                        <option>RLTM Software</option>
                                        <option>Counter-UAS (INTERCEPTOR)</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l border-white/10 pl-4">
                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">Mission Requirements</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows={4}
                                    required
                                    value={formState.message}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-accluav-orange transition-colors resize-none placeholder-white/20"
                                    placeholder="Briefly describe your operational needs..."
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-accluav-orange text-white font-bold uppercase tracking-widest py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 mt-4"
                            >
                                Submit Request <Send className="w-4 h-4" />
                            </button>
                            
                            <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest">
                                Protected by RLTM Security Protocols.
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
         </div>
    </section>
  );
};

export default RequestDemo;
