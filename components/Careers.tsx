
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Briefcase, ChevronRight, Upload, CheckCircle, ArrowDown, ArrowLeft, FileText } from 'lucide-react';
import { Job, Application } from '../types';
import WorkWithUsLayout from './WorkWithUsLayout';

interface CareersProps {
  onBackHome: () => void;
  jobs: Job[];
  onApply: (app: Application) => void;
  onNavigate: (page: 'careers' | 'life' | 'forge' | 'skillbridge') => void;
}

const Careers: React.FC<CareersProps> = ({ onBackHome, jobs, onApply, onNavigate }) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [applicationState, setApplicationState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', coverLetter: '' });
  const [resumeFile, setResumeFile] = useState<{ name: string, data: string } | null>(null);

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeFile({
          name: file.name,
          data: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setApplicationState('submitting');
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      applicantName: formData.name,
      email: formData.email,
      coverLetter: formData.coverLetter,
      resumeData: resumeFile?.data,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setTimeout(() => {
      onApply(newApplication);
      setApplicationState('success');
      setTimeout(() => {
          setFormData({ name: '', email: '', coverLetter: '' });
          setResumeFile(null);
      }, 500);
    }, 1500);
  };

  return (
    <WorkWithUsLayout activePage="careers" onNavigate={onNavigate} onBackHome={onBackHome}>
      <AnimatePresence mode="wait">
        {!selectedJobId ? (
          <motion.div
            key="careers-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {/* Hero Section */}
            <div className="relative h-[80vh] flex items-center px-8 lg:px-20 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-20 grayscale" alt="Lab" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                </div>
                
                <div className="relative z-10 max-w-4xl">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-accluav-orange font-bold uppercase tracking-[0.2em] mb-4 block"
                    >
                        Join The Mission
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] mb-8"
                    >
                        DEPLOY YOUR <br/> TALENT
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-xl leading-relaxed"
                    >
                        We are building the future of autonomous defense. We need engineers, operators, and strategists who run towards hard problems.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1 }}
                    className="absolute bottom-12 left-8 lg:left-20 animate-bounce"
                >
                    <ArrowDown className="w-6 h-6 text-white/50" />
                </motion.div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">
                {[
                    { label: "Founded", value: "2020" },
                    { label: "Locations", value: "HYD" },
                    { label: "Systems", value: "6+" },
                    { label: "Mission", value: "Critical" }
                ].map((stat, i) => (
                    <div key={i} className="p-8 lg:p-12 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors group cursor-default">
                        <span className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-accluav-orange transition-colors">{stat.label}</span>
                        <span className="font-display font-bold text-3xl md:text-4xl">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Intro Content */}
            <div className="px-8 lg:px-20 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div>
                    <h2 className="text-4xl font-display font-bold mb-6">Why We Build</h2>
                    <p className="text-gray-400 leading-relaxed text-lg mb-8">
                        The geopolitical landscape is shifting. Traditional defense mechanisms are too slow, too expensive, and too fragile. 
                        At AccelUAV, we believe software-defined hardware is the only way to maintain deterrence in the 21st century.
                    </p>
                    <button onClick={() => onNavigate('life')} className="text-accluav-orange font-bold uppercase tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2">
                        Explore Our Culture <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="relative h-64 lg:h-auto border border-white/10 bg-white/5">
                     <div className="absolute inset-0 flex items-center justify-center">
                         <div className="text-center">
                             <div className="text-6xl font-display font-bold text-white/10">CORE</div>
                             <div className="text-sm font-mono text-accluav-orange mt-2">OPERATING SYSTEM</div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Job List */}
            <div id="open-roles" className="px-8 lg:px-20 py-24 bg-[#080808] border-t border-white/10">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold">Open Roles</h2>
                    <div className="hidden md:block text-gray-500 text-sm font-mono">
                        POSITIONS_AVAILABLE: {jobs.length}
                    </div>
                </div>

                <div className="grid gap-px bg-white/10 border border-white/10">
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
                            onClick={() => setSelectedJobId(job.id)}
                            className="bg-black p-8 hover:bg-white/5 transition-colors cursor-pointer group flex flex-col md:flex-row justify-between md:items-center gap-6"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-2 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-accluav-orange transition-colors">
                                    <span>{job.department}</span>
                                    <span>•</span>
                                    <span>{job.location}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold">{job.title}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 border border-white/20 text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {job.type}
                                </span>
                                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                    {jobs.length === 0 && (
                        <div className="bg-black p-12 text-center">
                            <Briefcase className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500">No open positions at this time. Check back later.</p>
                        </div>
                    )}
                </div>
            </div>
          </motion.div>
        ) : (
            // --- JOB DETAIL VIEW ---
          <motion.div
            key="job-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-8 lg:px-20 py-12"
          >
            <button onClick={() => setSelectedJobId(null)} className="mb-12 flex items-center text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Roles
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <span className="text-accluav-orange font-bold uppercase tracking-widest text-sm mb-4 block">{selectedJob?.department}</span>
                    <h1 className="text-5xl font-display font-bold mb-8">{selectedJob?.title}</h1>
                    
                    <div className="flex gap-8 border-y border-white/10 py-6 mb-12">
                         <div className="flex items-center gap-3">
                             <MapPin className="w-5 h-5 text-gray-500" />
                             <span className="text-sm font-bold uppercase tracking-widest">{selectedJob?.location}</span>
                         </div>
                         <div className="flex items-center gap-3">
                             <Clock className="w-5 h-5 text-gray-500" />
                             <span className="text-sm font-bold uppercase tracking-widest">{selectedJob?.type}</span>
                         </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <h3 className="text-white font-display uppercase tracking-widest text-sm font-bold">The Mission</h3>
                        <p className="text-gray-400">{selectedJob?.description}</p>
                        
                        <h3 className="text-white font-display uppercase tracking-widest text-sm font-bold mt-12">Requirements</h3>
                        <ul className="space-y-4 mt-6">
                            {selectedJob?.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-4 text-gray-400">
                                    <span className="w-1.5 h-1.5 bg-accluav-orange rounded-full mt-2.5 flex-shrink-0"></span>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white/5 border border-white/10 p-8 sticky top-8">
                        <h3 className="font-display font-bold text-xl mb-6">Apply for this role</h3>
                        {applicationState === 'success' ? (
                            <div className="text-center py-8">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                <h4 className="font-bold mb-2">Application Sent</h4>
                                <p className="text-sm text-gray-500">We will be in touch shortly.</p>
                                <button onClick={() => setSelectedJobId(null)} className="mt-6 text-accluav-orange text-xs font-bold uppercase tracking-widest">Return to Jobs</button>
                            </div>
                        ) : (
                            <form onSubmit={handleApply} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Full Name</label>
                                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Email</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Cover Letter</label>
                                    <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows={4} className="w-full bg-black border border-white/10 p-3 text-sm focus:border-accluav-orange outline-none text-white resize-none"></textarea>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Resume / CV</label>
                                    <label className="border border-dashed border-white/20 p-4 text-center cursor-pointer hover:bg-white/5 transition-colors block group">
                                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                                        {resumeFile ? (
                                            <div className="text-green-500 flex flex-col items-center">
                                                <FileText className="w-6 h-6 mb-2" />
                                                <span className="text-xs font-bold">{resumeFile.name}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4 mx-auto mb-2 text-gray-500 group-hover:text-white transition-colors" />
                                                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Upload PDF</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                                <button type="submit" disabled={applicationState === 'submitting'} className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 hover:bg-accluav-orange hover:text-white transition-colors text-sm mt-4">
                                    {applicationState === 'submitting' ? 'Sending...' : 'Submit Application'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorkWithUsLayout>
  );
};

export default Careers;
