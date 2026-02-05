
import React, { useState } from 'react';
import { ArrowLeft, Trash2, Check, X, Box, Briefcase, Users, FileText, Globe, DollarSign, Database, Award, Plus, AlertCircle, Save, Linkedin, Share2, Edit, UploadCloud, Target } from 'lucide-react';
import { Job, Application, Leader, NewsItem, Partner, Product, BlogPost, Hackathon, HackathonApplication, PricingModel, Payload } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
  jobs: Job[];
  onAddJob: (job: Job) => void;
  onDeleteJob: (id: string) => void;
  applications: Application[];
  onUpdateApplicationStatus: (id: string, status: Application['status']) => void;
  onDeleteApplication: (id: string) => void;
  leaders: Leader[];
  onAddLeader: (leader: Leader) => void;
  onDeleteLeader: (id: string) => void;
  news: NewsItem[];
  onAddNews: (news: NewsItem) => void;
  onUpdateNews: (news: NewsItem) => void;
  onDeleteNews: (id: string | number) => void;
  partners: Partner[];
  onAddPartner: (partner: Partner) => void;
  onUpdatePartner: (partner: Partner) => void;
  onDeletePartner: (id: string) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  blogs: BlogPost[];
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
  hackathons: Hackathon[];
  onAddHackathon: (hackathon: Hackathon) => void;
  onUpdateHackathon: (hackathon: Hackathon) => void;
  onDeleteHackathon: (id: string) => void;
  hackathonApplications: HackathonApplication[];
  onUpdateHackathonAppStatus: (id: string, status: HackathonApplication['status']) => void;
  onUpdateGeoMapSource: (source: string | null) => void;
  pricingModel: PricingModel;
  onUpdatePricing: (model: PricingModel) => void;
  payloads: Payload[];
  onAddPayload: (payload: Payload) => void;
  onUpdatePayload: (payload: Payload) => void;
  onDeletePayload: (id: string) => void;
}

type Tab = 'deployment' | 'signals' | 'systems' | 'pricing' | 'geo' | 'blogs' | 'hackathons' | 'leadership' | 'comms' | 'partners' | 'payloads';

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBack,
  jobs, onAddJob, onDeleteJob,
  applications, onUpdateApplicationStatus, onDeleteApplication,
  leaders, onAddLeader, onDeleteLeader,
  news, onAddNews, onUpdateNews, onDeleteNews,
  partners, onAddPartner, onDeletePartner,
  products, onAddProduct, onUpdateProduct, onDeleteProduct,
  blogs, onAddBlog, onUpdateBlog, onDeleteBlog,
  hackathons, onAddHackathon, onDeleteHackathon,
  hackathonApplications, onUpdateHackathonAppStatus,
  onUpdateGeoMapSource,
  pricingModel, onUpdatePricing,
  payloads, onAddPayload, onUpdatePayload, onDeletePayload
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('deployment');
  const [geoSourceInput, setGeoSourceInput] = useState('');
  
  // --- FORMS STATE ---
  
  // Job
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '', department: 'Engineering', type: 'Full-time', location: '', description: '', requirements: ['']
  });

  // Product
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
      title: '', category: 'KINETIC', description: '', imageUrl: '', modelUrl: '', specs: [{ label: '', value: '' }]
  });

  // Payload
  const [editingPayloadId, setEditingPayloadId] = useState<string | null>(null);
  const [newPayload, setNewPayload] = useState<Partial<Payload>>({
      title: '', type: 'surveillance', description: '', manufacturer: '', imageUrl: '', modelUrl: '', specs: [{ label: '', value: '' }]
  });

  // Leader
  const [newLeader, setNewLeader] = useState<Partial<Leader>>({
      name: '', role: '', bio: '', imageUrl: ''
  });

  // Partner
  const [newPartner, setNewPartner] = useState<Partial<Partner>>({
      company: '', quote: '', logoUrl: ''
  });

  // News
  const [editingNewsId, setEditingNewsId] = useState<string | number | null>(null);
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
      title: '', 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
      category: 'Corporate', 
      excerpt: '',
      content: '',
      imageUrl: ''
  });

  // Blog
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
      title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0], imageUrl: '', category: 'Tech'
  });

  // Hackathon
  const [newHackathon, setNewHackathon] = useState<Partial<Hackathon>>({
      title: '', description: '', date: '', venue: '', prizePool: '', status: 'upcoming', imageUrl: ''
  });

  // --- HANDLERS ---

  const handleJobSubmit = () => {
      if (!newJob.title || !newJob.description) return;
      onAddJob({
          id: `job-${Date.now()}`,
          title: newJob.title!,
          department: newJob.department || 'Engineering',
          location: newJob.location || 'Remote',
          type: newJob.type || 'Full-time',
          description: newJob.description!,
          requirements: newJob.requirements?.filter(r => r.trim() !== '') || []
      });
      setNewJob({ title: '', department: 'Engineering', type: 'Full-time', location: '', description: '', requirements: [''] });
  };

  const handleProductSubmit = () => {
      if (!newProduct.title) return;
      
      const productData: Product = {
          id: editingProductId || `sys-${Date.now()}`,
          title: newProduct.title!,
          category: newProduct.category || 'KINETIC',
          description: newProduct.description || '',
          imageUrl: newProduct.imageUrl || 'https://picsum.photos/600/800',
          modelUrl: newProduct.modelUrl,
          specs: newProduct.specs?.filter(s => s.label && s.value) || [],
          features: newProduct.features || [], 
          details: newProduct.details || [],
          visualSections: newProduct.visualSections || []
      };

      if (editingProductId) {
          onUpdateProduct(productData);
          setEditingProductId(null);
      } else {
          onAddProduct(productData);
      }
      
      // Reset form
      setNewProduct({ title: '', category: 'KINETIC', description: '', imageUrl: '', modelUrl: '', specs: [{ label: '', value: '' }] });
  };

  const handleEditProduct = (product: Product) => {
      setNewProduct({ ...product });
      setEditingProductId(product.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelProductEdit = () => {
      setEditingProductId(null);
      setNewProduct({ title: '', category: 'KINETIC', description: '', imageUrl: '', modelUrl: '', specs: [{ label: '', value: '' }] });
  };

  const handlePayloadSubmit = () => {
      if (!newPayload.title) return;

      const payloadData: Payload = {
          id: editingPayloadId || `pl-${Date.now()}`,
          productId: '02', // Hardcoded to ACE-IV for now based on requirement
          type: newPayload.type || 'surveillance',
          title: newPayload.title!,
          manufacturer: newPayload.manufacturer,
          description: newPayload.description || '',
          imageUrl: newPayload.imageUrl || '',
          modelUrl: newPayload.modelUrl,
          specs: newPayload.specs?.filter(s => s.label && s.value) || []
      };

      if (editingPayloadId) {
          onUpdatePayload(payloadData);
          setEditingPayloadId(null);
      } else {
          onAddPayload(payloadData);
      }

      setNewPayload({ title: '', type: 'surveillance', description: '', manufacturer: '', imageUrl: '', modelUrl: '', specs: [{ label: '', value: '' }] });
  };

  const handleEditPayload = (payload: Payload) => {
      setNewPayload({ ...payload });
      setEditingPayloadId(payload.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelPayloadEdit = () => {
      setEditingPayloadId(null);
      setNewPayload({ title: '', type: 'surveillance', description: '', manufacturer: '', imageUrl: '', modelUrl: '', specs: [{ label: '', value: '' }] });
  };

  const handleLeaderSubmit = () => {
      if (!newLeader.name) return;
      onAddLeader({
          id: `lead-${Date.now()}`,
          name: newLeader.name!,
          role: newLeader.role || '',
          bio: newLeader.bio || '',
          imageUrl: newLeader.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
      });
      setNewLeader({ name: '', role: '', bio: '', imageUrl: '' });
  };

  const handlePartnerSubmit = () => {
      if (!newPartner.company) return;
      onAddPartner({
          id: `part-${Date.now()}`,
          company: newPartner.company!,
          quote: newPartner.quote || '',
          logoUrl: newPartner.logoUrl
      });
      setNewPartner({ company: '', quote: '', logoUrl: '' });
  };

  const handleNewsSubmit = () => {
      if (!newNews.title) return;
      
      const newsItem: NewsItem = {
          id: editingNewsId || Date.now(),
          title: newNews.title!,
          date: newNews.date!,
          category: newNews.category || 'Corporate',
          excerpt: newNews.excerpt || '',
          content: newNews.content || '',
          imageUrl: newNews.imageUrl || ''
      };

      if (editingNewsId) {
          onUpdateNews(newsItem);
          setEditingNewsId(null);
      } else {
          onAddNews(newsItem);
      }

      setNewNews({ 
          title: '', 
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
          category: 'Corporate', 
          excerpt: '',
          content: '',
          imageUrl: ''
      });
  };

  const handleEditNews = (news: NewsItem) => {
      setNewNews({ ...news });
      setEditingNewsId(news.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelNewsEdit = () => {
      setEditingNewsId(null);
      setNewNews({ 
          title: '', 
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
          category: 'Corporate', 
          excerpt: '',
          content: '',
          imageUrl: ''
      });
  };

  const handleBlogSubmit = () => {
      if (!newBlog.title) return;
      
      const blogData: BlogPost = {
          id: editingBlogId || `blog-${Date.now()}`,
          title: newBlog.title!,
          excerpt: newBlog.excerpt || '',
          content: newBlog.content || '',
          author: newBlog.author || 'Acceluav Team',
          date: newBlog.date!,
          imageUrl: newBlog.imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
          category: newBlog.category || 'Tech',
          likes: newBlog.likes || 0,
          shares: newBlog.shares || 0
      };

      if (editingBlogId) {
          onUpdateBlog(blogData);
          setEditingBlogId(null);
      } else {
          onAddBlog(blogData);
      }

      setNewBlog({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0], imageUrl: '', category: 'Tech' });
  };

  const handleEditBlog = (blog: BlogPost) => {
      setNewBlog({ ...blog });
      setEditingBlogId(blog.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelBlogEdit = () => {
      setEditingBlogId(null);
      setNewBlog({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0], imageUrl: '', category: 'Tech' });
  };

  const handleHackathonSubmit = () => {
      if (!newHackathon.title) return;
      onAddHackathon({
          id: `hack-${Date.now()}`,
          title: newHackathon.title!,
          description: newHackathon.description || '',
          date: newHackathon.date || '',
          venue: newHackathon.venue || '',
          prizePool: newHackathon.prizePool || '',
          status: newHackathon.status || 'upcoming',
          imageUrl: newHackathon.imageUrl || 'https://images.unsplash.com/photo-1535378437323-952a8d9ec5c2?auto=format&fit=crop&q=80',
          requirements: []
      });
      setNewHackathon({ title: '', description: '', date: '', venue: '', prizePool: '', status: 'upcoming', imageUrl: '' });
  };

  // --- HELPER HANDLERS ---
  
  const handleGeoUpdate = () => {
    onUpdateGeoMapSource(geoSourceInput);
    alert('Map Source Updated');
  };

  const updatePrice = (category: string, index: number, field: 'limit' | 'rate', value: string) => {
      const newModel = { ...pricingModel };
      newModel[category][index][field] = Number(value);
      onUpdatePricing(newModel);
  };

  const shareToLinkedIn = (text: string, url: string = '') => {
      const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text + " " + url)}`;
      window.open(shareUrl, '_blank');
  };

  // --- COMPONENT RENDER ---

  return (
    <div className="min-h-screen bg-accluav-black text-white p-6 md:p-12 font-sans selection:bg-accluav-orange selection:text-white">
       {/* Header / Nav */}
       <div className="flex flex-col xl:flex-row xl:items-end justify-between border-b border-white/10 pb-6 mb-12 gap-8">
            <div>
                <h1 className="text-3xl font-display font-black tracking-tighter uppercase">
                    ACCELUAV <span className="text-accluav-orange">ADMIN</span>
                </h1>
                <p className="text-xs text-gray-500 font-bold tracking-[0.15em] mt-2">RECRUITMENT MODULE V2.1</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
                <TabButton active={activeTab === 'deployment'} onClick={() => setActiveTab('deployment')} label="HR" />
                <TabButton active={activeTab === 'signals'} onClick={() => setActiveTab('signals')} label={`JOB APPLICATION (${applications.filter(a => a.status === 'pending').length})`} />
                <TabButton active={activeTab === 'systems'} onClick={() => setActiveTab('systems')} label="PRODUCTS & SERVICES" />
                <TabButton active={activeTab === 'payloads'} onClick={() => setActiveTab('payloads')} label="PAYLOADS" />
                <TabButton active={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')} label="PRICING" />
                <TabButton active={activeTab === 'leadership'} onClick={() => setActiveTab('leadership')} label="LEADERSHIP" />
                <TabButton active={activeTab === 'comms'} onClick={() => setActiveTab('comms')} label="NEWS" />
                <TabButton active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} label="BLOGS" />
                <TabButton active={activeTab === 'hackathons'} onClick={() => setActiveTab('hackathons')} label="ARENA" />
                <TabButton active={activeTab === 'partners'} onClick={() => setActiveTab('partners')} label="PARTNERS" />
                <TabButton active={activeTab === 'geo'} onClick={() => setActiveTab('geo')} label="GEO DATA" />
                
                <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase ml-4 px-4 py-2 hover:bg-white/10">
                    <ArrowLeft className="w-3 h-3 mr-2" /> EXIT
                </button>
            </div>
        </div>

        {/* --- DEPLOYMENT TAB (Jobs) --- */}
        {activeTab === 'deployment' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-accluav-orange" /> Post New Role
                    </h2>
                    <div className="space-y-6">
                        <Input label="Job Title" value={newJob.title} onChange={v => setNewJob({...newJob, title: v})} />
                        <div className="grid grid-cols-2 gap-6">
                            <Select label="Department" value={newJob.department} onChange={v => setNewJob({...newJob, department: v})} options={['Engineering', 'Operations', 'Software', 'Design', 'Legal']} />
                            <Select label="Type" value={newJob.type} onChange={v => setNewJob({...newJob, type: v})} options={['Full-time', 'Contract', 'Internship']} />
                        </div>
                        <Input label="Location" value={newJob.location} onChange={v => setNewJob({...newJob, location: v})} />
                        <TextArea label="Description" value={newJob.description} onChange={v => setNewJob({...newJob, description: v})} />
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Requirements</label>
                                <button onClick={() => setNewJob({ ...newJob, requirements: [...(newJob.requirements || []), ''] })} className="text-[10px] font-bold uppercase tracking-widest text-accluav-orange hover:text-white transition-colors">+ Add Field</button>
                            </div>
                            {newJob.requirements?.map((req, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input type="text" value={req} onChange={e => {
                                        const r = [...newJob.requirements!]; r[idx] = e.target.value; setNewJob({...newJob, requirements: r});
                                    }} className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-sm text-white focus:border-accluav-orange outline-none" placeholder={`Requirement ${idx + 1}`} />
                                    <button onClick={() => { const r = [...newJob.requirements!]; r.splice(idx, 1); setNewJob({...newJob, requirements: r}); }} className="px-3 border border-white/10 bg-[#0a0a0a] text-red-500 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleJobSubmit}>Publish Position</Button>
                    </div>
                </div>
                <div className="lg:col-span-7">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-accluav-orange" /> Active Listings ({jobs.length})</h2>
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="border border-white/10 bg-transparent p-6 relative group hover:border-white/20 transition-colors">
                                <button onClick={() => onDeleteJob(job.id)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                                <h3 className="text-xl font-bold mb-2 pr-12">{job.title}</h3>
                                <div className="text-accluav-orange text-xs font-bold uppercase tracking-widest mb-4">{job.department} • {job.location}</div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">{job.description}</p>
                                <div className="text-[10px] font-mono text-gray-600 uppercase">ID: {job.id}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- SYSTEMS TAB (Products) --- */}
        {activeTab === 'systems' && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                        {editingProductId ? <Edit className="w-5 h-5 text-accluav-orange" /> : <Plus className="w-5 h-5 text-accluav-orange" />}
                        {editingProductId ? 'Edit System' : 'Add System'}
                    </h2>
                    <div className="space-y-6">
                        <Input label="System Name" value={newProduct.title} onChange={v => setNewProduct({...newProduct, title: v})} />
                        <Select label="Category" value={newProduct.category} onChange={v => setNewProduct({...newProduct, category: v})} options={['KINETIC', 'INTELLIGENCE', 'TACTICAL', 'MUNITION', 'MULTI-MISSION', 'AIR DEFENSE', 'C-UAS']} />
                        <TextArea label="Description" value={newProduct.description} onChange={v => setNewProduct({...newProduct, description: v})} />
                        
                        <FileUploadField 
                            label="System Image" 
                            value={newProduct.imageUrl} 
                            onChange={(val) => setNewProduct({...newProduct, imageUrl: val})} 
                            accept="image/*"
                        />

                        <FileUploadField 
                            label="3D Model (.glb / .gltf)" 
                            value={newProduct.modelUrl} 
                            onChange={(val) => setNewProduct({...newProduct, modelUrl: val})} 
                            accept=".glb,.gltf"
                        />
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Specifications</label>
                                <button onClick={() => setNewProduct({ ...newProduct, specs: [...(newProduct.specs || []), { label: '', value: '' }] })} className="text-[10px] font-bold uppercase tracking-widest text-accluav-orange hover:text-white transition-colors">+ Add Spec</button>
                            </div>
                            {newProduct.specs?.map((spec, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input type="text" value={spec.label} onChange={e => { const s = [...newProduct.specs!]; s[idx].label = e.target.value; setNewProduct({...newProduct, specs: s}); }} className="w-1/3 bg-[#0a0a0a] border border-white/10 p-3 text-sm text-white focus:border-accluav-orange outline-none" placeholder="Label" />
                                    <input type="text" value={spec.value} onChange={e => { const s = [...newProduct.specs!]; s[idx].value = e.target.value; setNewProduct({...newProduct, specs: s}); }} className="w-2/3 bg-[#0a0a0a] border border-white/10 p-3 text-sm text-white focus:border-accluav-orange outline-none" placeholder="Value" />
                                    <button onClick={() => { const s = [...newProduct.specs!]; s.splice(idx, 1); setNewProduct({...newProduct, specs: s}); }} className="px-3 border border-white/10 bg-[#0a0a0a] text-red-500 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex gap-3">
                            <Button onClick={handleProductSubmit}>{editingProductId ? 'Update System' : 'Initialize System'}</Button>
                            {editingProductId && (
                                <button onClick={handleCancelProductEdit} className="w-1/3 bg-transparent border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors mt-4">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Box className="w-5 h-5 text-accluav-orange" /> Inventory ({products.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.map(p => (
                             <div key={p.id} className="bg-black/40 border border-white/5 relative group hover:border-white/20 transition-colors overflow-hidden">
                                <div className="h-40 overflow-hidden bg-gray-900">
                                    <img src={p.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={p.title} />
                                </div>
                                <div className="p-4">
                                    <div className="text-accluav-orange text-[10px] font-bold uppercase tracking-widest mb-2">{p.category}</div>
                                    <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                                    <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={() => handleEditProduct(p)} className="p-2 bg-blue-600 text-white shadow-lg hover:bg-blue-700" title="Edit">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onDeleteProduct(p.id)} className="p-2 bg-red-600 text-white shadow-lg hover:bg-red-700" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
             </div>
        )}

        {/* --- PAYLOADS TAB --- */}
        {activeTab === 'payloads' && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                        {editingPayloadId ? <Edit className="w-5 h-5 text-accluav-orange" /> : <Plus className="w-5 h-5 text-accluav-orange" />}
                        {editingPayloadId ? 'Edit Payload' : 'Add Payload'}
                    </h2>
                    <div className="space-y-6">
                        <Input label="Payload Name" value={newPayload.title} onChange={v => setNewPayload({...newPayload, title: v})} />
                        <div className="grid grid-cols-2 gap-6">
                            <Select label="Type" value={newPayload.type} onChange={v => setNewPayload({...newPayload, type: v as any})} options={['surveillance', 'mapping']} />
                            <Input label="Manufacturer" value={newPayload.manufacturer} onChange={v => setNewPayload({...newPayload, manufacturer: v})} />
                        </div>
                        <TextArea label="Description" value={newPayload.description} onChange={v => setNewPayload({...newPayload, description: v})} />
                        
                        <FileUploadField 
                            label="Payload Image" 
                            value={newPayload.imageUrl} 
                            onChange={(val) => setNewPayload({...newPayload, imageUrl: val})} 
                            accept="image/*"
                        />

                        <FileUploadField 
                            label="3D Model (.glb / .gltf)" 
                            value={newPayload.modelUrl} 
                            onChange={(val) => setNewPayload({...newPayload, modelUrl: val})} 
                            accept=".glb,.gltf"
                        />
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Specifications</label>
                                <button onClick={() => setNewPayload({ ...newPayload, specs: [...(newPayload.specs || []), { label: '', value: '' }] })} className="text-[10px] font-bold uppercase tracking-widest text-accluav-orange hover:text-white transition-colors">+ Add Spec</button>
                            </div>
                            {newPayload.specs?.map((spec, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input type="text" value={spec.label} onChange={e => { const s = [...newPayload.specs!]; s[idx].label = e.target.value; setNewPayload({...newPayload, specs: s}); }} className="w-1/3 bg-[#0a0a0a] border border-white/10 p-3 text-sm text-white focus:border-accluav-orange outline-none" placeholder="Label" />
                                    <input type="text" value={spec.value} onChange={e => { const s = [...newPayload.specs!]; s[idx].value = e.target.value; setNewPayload({...newPayload, specs: s}); }} className="w-2/3 bg-[#0a0a0a] border border-white/10 p-3 text-sm text-white focus:border-accluav-orange outline-none" placeholder="Value" />
                                    <button onClick={() => { const s = [...newPayload.specs!]; s.splice(idx, 1); setNewPayload({...newPayload, specs: s}); }} className="px-3 border border-white/10 bg-[#0a0a0a] text-red-500 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex gap-3">
                            <Button onClick={handlePayloadSubmit}>{editingPayloadId ? 'Update Payload' : 'Create Payload'}</Button>
                            {editingPayloadId && (
                                <button onClick={handleCancelPayloadEdit} className="w-1/3 bg-transparent border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors mt-4">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="w-5 h-5 text-accluav-orange" /> Payloads ({payloads.length})</h2>
                    <div className="space-y-4">
                        {payloads.map(p => (
                             <div key={p.id} className="bg-black/40 border border-white/5 p-6 flex justify-between items-start group hover:border-white/20 transition-colors">
                                <div className="flex gap-6">
                                    <div className="w-20 h-20 bg-gray-900 border border-white/10 flex-shrink-0 overflow-hidden">
                                        {p.imageUrl ? (
                                            <img src={p.imageUrl} className="w-full h-full object-cover" alt={p.title} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-700">No Img</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${p.type === 'surveillance' ? 'bg-red-900/50 text-red-300' : 'bg-blue-900/50 text-blue-300'}`}>{p.type}</span>
                                            {p.modelUrl && <span className="text-[10px] font-bold uppercase text-green-500 flex items-center gap-1"><Box className="w-3 h-3" /> 3D Ready</span>}
                                        </div>
                                        <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-2 max-w-md">{p.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                    <button onClick={() => handleEditPayload(p)} className="p-2 bg-blue-600 text-white shadow-lg hover:bg-blue-700" title="Edit">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onDeletePayload(p.id)} className="p-2 bg-red-600 text-white shadow-lg hover:bg-red-700" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
             </div>
        )}

        {/* --- PRICING TAB --- */}
        {activeTab === 'pricing' && (
             <div>
                 <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><DollarSign className="w-5 h-5 text-accluav-orange" /> Price Sheet Configuration</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {Object.entries(pricingModel).map(([category, tiers]) => (
                         <div key={category} className="bg-white/5 border border-white/10 p-6">
                             <h3 className="text-lg font-bold font-display uppercase mb-4 text-accluav-orange">{category.replace('_', ' ')}</h3>
                             <div className="space-y-2">
                                 <div className="flex text-[10px] font-bold uppercase text-gray-500 tracking-widest px-2">
                                     <span className="w-1/2">Limit (HA)</span>
                                     <span className="w-1/2">Rate (INR)</span>
                                 </div>
                                 {tiers.map((tier, idx) => (
                                     <div key={idx} className="flex gap-2">
                                         <input type="number" value={tier.limit} onChange={(e) => updatePrice(category, idx, 'limit', e.target.value)} className="w-1/2 bg-black border border-white/10 p-2 text-sm text-white font-mono" />
                                         <input type="number" value={tier.rate} onChange={(e) => updatePrice(category, idx, 'rate', e.target.value)} className="w-1/2 bg-black border border-white/10 p-2 text-sm text-white font-mono text-right" />
                                     </div>
                                 ))}
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        {/* --- LEADERSHIP TAB --- */}
        {activeTab === 'leadership' && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                 <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Plus className="w-5 h-5 text-accluav-orange" /> Add Commander</h2>
                    <div className="space-y-6">
                        <Input label="Name" value={newLeader.name} onChange={v => setNewLeader({...newLeader, name: v})} />
                        <Input label="Role" value={newLeader.role} onChange={v => setNewLeader({...newLeader, role: v})} />
                        <FileUploadField 
                            label="Leader Image" 
                            value={newLeader.imageUrl} 
                            onChange={(val) => setNewLeader({...newLeader, imageUrl: val})} 
                            accept="image/*"
                        />
                        <TextArea label="Bio" value={newLeader.bio} onChange={v => setNewLeader({...newLeader, bio: v})} />
                        <Button onClick={handleLeaderSubmit}>Induct Leader</Button>
                    </div>
                 </div>
                 <div className="lg:col-span-7">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Users className="w-5 h-5 text-accluav-orange" /> Command Structure</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {leaders.map(l => (
                            <div key={l.id} className="flex items-center gap-4 bg-black/40 p-4 border border-white/5 relative group">
                                <img src={l.imageUrl} className="w-12 h-12 object-cover grayscale" alt={l.name} />
                                <div>
                                    <h3 className="font-bold">{l.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase">{l.role}</p>
                                </div>
                                <button onClick={() => onDeleteLeader(l.id)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                 </div>
             </div>
        )}

        {/* --- PARTNERS TAB --- */}
        {activeTab === 'partners' && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                 <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Plus className="w-5 h-5 text-accluav-orange" /> Add Partner</h2>
                    <div className="space-y-6">
                        <Input label="Company Name" value={newPartner.company} onChange={v => setNewPartner({...newPartner, company: v})} />
                        <FileUploadField 
                            label="Partner Logo" 
                            value={newPartner.logoUrl} 
                            onChange={(val) => setNewPartner({...newPartner, logoUrl: val})} 
                            accept="image/*"
                        />
                        <TextArea label="Quote / Testimonial" value={newPartner.quote} onChange={v => setNewPartner({...newPartner, quote: v})} />
                        <Button onClick={handlePartnerSubmit}>Add Partner</Button>
                    </div>
                 </div>
                 <div className="lg:col-span-7">
                     <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Users className="w-5 h-5 text-accluav-orange" /> Strategic Partners</h2>
                     <div className="space-y-4">
                        {partners.map(p => (
                            <div key={p.id} className="bg-black/40 p-6 border border-white/5 relative group">
                                <h3 className="font-bold text-lg mb-2">{p.company}</h3>
                                <p className="text-sm text-gray-400 italic">"{p.quote}"</p>
                                <button onClick={() => onDeletePartner(p.id)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                     </div>
                 </div>
             </div>
        )}

        {/* --- COMMS (NEWS) TAB --- */}
        {activeTab === 'comms' && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                 <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                        {editingNewsId ? <Edit className="w-5 h-5 text-accluav-orange" /> : <Plus className="w-5 h-5 text-accluav-orange" />}
                        {editingNewsId ? 'Edit News' : 'Post News'}
                    </h2>
                    <div className="space-y-6">
                        <Input label="Headline" value={newNews.title} onChange={v => setNewNews({...newNews, title: v})} />
                        <div className="grid grid-cols-2 gap-6">
                             <Input label="Date" value={newNews.date} onChange={v => setNewNews({...newNews, date: v})} />
                             <Select label="Category" value={newNews.category} onChange={v => setNewNews({...newNews, category: v})} options={['Corporate', 'Contracts', 'Product', 'Operations']} />
                        </div>
                        <FileUploadField 
                            label="Cover Image" 
                            value={newNews.imageUrl} 
                            onChange={(val) => setNewNews({...newNews, imageUrl: val})} 
                            accept="image/*"
                        />
                        <TextArea label="Excerpt" value={newNews.excerpt} onChange={v => setNewNews({...newNews, excerpt: v})} />
                        <TextArea label="Full Content" value={newNews.content} onChange={v => setNewNews({...newNews, content: v})} />
                        
                        <div className="flex gap-3">
                            <Button onClick={handleNewsSubmit}>{editingNewsId ? 'Update Release' : 'Publish Release'}</Button>
                            {editingNewsId && (
                                <button onClick={handleCancelNewsEdit} className="w-1/3 bg-transparent border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors mt-4">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                 </div>
                 <div className="lg:col-span-7">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Globe className="w-5 h-5 text-accluav-orange" /> Wire</h2>
                    <div className="space-y-4">
                        {news.map(n => (
                            <div key={n.id} className="flex justify-between items-start bg-black/40 p-6 border border-white/5 group relative">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-accluav-orange text-xs font-bold uppercase">{n.category}</span>
                                        <span className="text-gray-500 text-xs">{n.date}</span>
                                    </div>
                                    <h3 className="font-bold text-lg">{n.title}</h3>
                                </div>
                                <div className="flex gap-2">
                                     <button onClick={() => handleEditNews(n)} className="text-gray-500 hover:text-blue-500 p-2" title="Edit"><Edit className="w-4 h-4" /></button>
                                     <button onClick={() => shareToLinkedIn(n.title + " - " + n.excerpt)} className="text-gray-500 hover:text-[#0077b5] p-2" title="Share to LinkedIn"><Linkedin className="w-4 h-4" /></button>
                                     <button onClick={() => onDeleteNews(n.id)} className="text-gray-500 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
             </div>
        )}

        {/* --- BLOGS TAB --- */}
        {activeTab === 'blogs' && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                 <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                        {editingBlogId ? <Edit className="w-5 h-5 text-accluav-orange" /> : <Plus className="w-5 h-5 text-accluav-orange" />}
                        {editingBlogId ? 'Edit Field Note' : 'Publish Field Note'}
                    </h2>
                    <div className="space-y-6">
                        <Input label="Title" value={newBlog.title} onChange={v => setNewBlog({...newBlog, title: v})} />
                        <div className="grid grid-cols-2 gap-6">
                             <Input label="Author" value={newBlog.author} onChange={v => setNewBlog({...newBlog, author: v})} />
                             <Input label="Date" value={newBlog.date} onChange={v => setNewBlog({...newBlog, date: v})} type="date" />
                        </div>
                        <FileUploadField 
                            label="Cover Image" 
                            value={newBlog.imageUrl} 
                            onChange={(val) => setNewBlog({...newBlog, imageUrl: val})} 
                            accept="image/*"
                        />
                        <TextArea label="Excerpt" value={newBlog.excerpt} onChange={v => setNewBlog({...newBlog, excerpt: v})} />
                        <TextArea label="Full Content (Markdown supported)" value={newBlog.content} onChange={v => setNewBlog({...newBlog, content: v})} />
                        
                        <div className="flex gap-3">
                            <Button onClick={handleBlogSubmit}>{editingBlogId ? 'Update Article' : 'Publish Article'}</Button>
                            {editingBlogId && (
                                <button onClick={handleCancelBlogEdit} className="w-1/3 bg-transparent border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors mt-4">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                 </div>
                 <div className="lg:col-span-7">
                     <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><FileText className="w-5 h-5 text-accluav-orange" /> Field Notes</h2>
                     <div className="space-y-4">
                        {blogs.map(blog => (
                            <div key={blog.id} className="flex justify-between items-center bg-black/40 p-4 border border-white/5 hover:border-white/20 transition-colors">
                                 <div className="flex items-center gap-4">
                                     <div className="w-16 h-16 bg-gray-800 overflow-hidden">
                                         <img src={blog.imageUrl} className="w-full h-full object-cover" alt={blog.title} />
                                     </div>
                                     <div>
                                         <h3 className="font-bold line-clamp-1">{blog.title}</h3>
                                         <p className="text-xs text-gray-500">{blog.date} • {blog.author}</p>
                                     </div>
                                 </div>
                                 <div className="flex gap-2">
                                     <button onClick={() => handleEditBlog(blog)} className="text-gray-500 hover:text-blue-500 p-2" title="Edit"><Edit className="w-4 h-4" /></button>
                                     <button onClick={() => shareToLinkedIn(blog.title + " - " + blog.excerpt)} className="text-gray-500 hover:text-[#0077b5] p-2" title="Share to LinkedIn"><Linkedin className="w-4 h-4" /></button>
                                     <button onClick={() => onDeleteBlog(blog.id)} className="text-gray-500 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                                 </div>
                            </div>
                        ))}
                     </div>
                 </div>
             </div>
        )}

        {/* --- HACKATHONS TAB --- */}
        {activeTab === 'hackathons' && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                 <div className="lg:col-span-5">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2"><Plus className="w-5 h-5 text-accluav-orange" /> Create Arena Event</h2>
                    <div className="space-y-6">
                        <Input label="Event Title" value={newHackathon.title} onChange={v => setNewHackathon({...newHackathon, title: v})} />
                        <div className="grid grid-cols-2 gap-6">
                             <Input label="Date" value={newHackathon.date} onChange={v => setNewHackathon({...newHackathon, date: v})} />
                             <Input label="Venue" value={newHackathon.venue} onChange={v => setNewHackathon({...newHackathon, venue: v})} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                             <Input label="Prize Pool" value={newHackathon.prizePool} onChange={v => setNewHackathon({...newHackathon, prizePool: v})} />
                             <Select label="Status" value={newHackathon.status} onChange={v => setNewHackathon({...newHackathon, status: v as any})} options={['upcoming', 'ongoing', 'completed']} />
                        </div>
                        <FileUploadField 
                            label="Cover Image" 
                            value={newHackathon.imageUrl} 
                            onChange={(val) => setNewHackathon({...newHackathon, imageUrl: val})} 
                            accept="image/*"
                        />
                        <TextArea label="Description / Brief" value={newHackathon.description} onChange={v => setNewHackathon({...newHackathon, description: v})} />
                        <Button onClick={handleHackathonSubmit}>Launch Event</Button>
                    </div>
                 </div>
                 <div className="lg:col-span-7">
                    <div className="mb-12">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-6"><Award className="w-5 h-5 inline mr-2 text-accluav-orange"/>Active Arenas</h2>
                        <div className="grid gap-4">
                            {hackathons.map(h => (
                                <div key={h.id} className="bg-black/40 p-4 border border-white/5 flex justify-between items-center relative group">
                                    <div>
                                        <h3 className="font-bold">{h.title}</h3>
                                        <p className="text-xs text-gray-500">{h.date} • {h.status}</p>
                                    </div>
                                    <button onClick={() => onDeleteHackathon(h.id)} className="text-gray-600 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Applications ({hackathonApplications.length})</h2>
                         <div className="grid gap-4">
                             {hackathonApplications.map(app => (
                                 <div key={app.id} className="bg-black/40 p-6 border border-white/5">
                                     <div className="flex justify-between mb-2">
                                         <h3 className="font-bold">{app.applicantName}</h3>
                                         <span className={`text-xs uppercase px-2 py-1 ${app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : app.status === 'accepted' ? 'bg-green-500/20 text-green-500' : 'text-red-500'}`}>{app.status}</span>
                                     </div>
                                     <p className="text-sm text-gray-400">Event: {app.hackathonTitle}</p>
                                     <div className="flex gap-4 mt-4">
                                         {app.status === 'pending' && (
                                             <>
                                                <button onClick={() => onUpdateHackathonAppStatus(app.id, 'accepted')} className="text-xs font-bold uppercase text-green-500 hover:text-white">Approve</button>
                                                <button onClick={() => onUpdateHackathonAppStatus(app.id, 'rejected')} className="text-xs font-bold uppercase text-red-500 hover:text-white">Reject</button>
                                             </>
                                         )}
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                 </div>
             </div>
        )}

        {/* --- GEO TAB --- */}
        {activeTab === 'geo' && (
             <div>
                 <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-accluav-orange" /> Geospatial Data Source</h2>
                 <div className="max-w-xl">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">3D Model Upload (.glb, .gltf)</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border border-white/10 hover:border-accluav-orange cursor-pointer transition-colors w-full text-sm text-gray-400">
                            <UploadCloud className="w-4 h-4" />
                            {geoSourceInput && geoSourceInput.startsWith('data') ? 'Model Loaded' : 'Upload Terrain Asset'}
                            <input type="file" accept=".glb,.gltf" className="hidden" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setGeoSourceInput(reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }} />
                        </label>
                        <button onClick={handleGeoUpdate} className="bg-accluav-orange text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
                            Update
                        </button>
                    </div>
                    {geoSourceInput && (
                        <div className="mt-2 text-green-500 text-xs flex items-center gap-2">
                            <Check className="w-3 h-3" /> File ready for update
                        </div>
                    )}
                    <p className="text-xs text-gray-600 mt-4">
                        Updates the interactive 3D terrain viewer on the Geographical Data Services page.
                    </p>
                 </div>
             </div>
        )}
        
        {/* --- OTHER TABS (Signals) --- */}
        {activeTab === 'signals' && (
             <div className="space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Incoming Signals</h2>
                {applications.length === 0 && <div className="text-gray-500 italic">No applications in the queue.</div>}
                <div className="grid gap-4">
                    {applications.map(app => (
                        <div key={app.id} className="bg-black/40 p-6 border border-white/5 hover:border-white/20 transition-colors relative">
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{app.applicantName}</h3>
                                    <p className="text-accluav-orange text-xs font-bold uppercase tracking-widest mt-1">Role: {app.jobTitle}</p>
                                </div>
                                <div className={`px-3 py-1 text-xs font-bold uppercase tracking-widest h-fit ${app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : app.status === 'accepted' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    {app.status}
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded text-sm text-gray-300 mb-4 font-mono">
                                {app.coverLetter}
                            </div>
                            <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
                                <span className="text-gray-500 text-xs">{app.email} • {new Date(app.timestamp).toLocaleDateString()}</span>
                                <div className="flex gap-3">
                                    {app.resumeData && (
                                        <button 
                                            onClick={() => {
                                                const win = window.open();
                                                if(win) win.document.write(`<iframe src="${app.resumeData}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                            }}
                                            className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 text-xs font-bold uppercase hover:bg-blue-600/40 transition-colors"
                                        >
                                            <FileText className="w-4 h-4" /> View Resume
                                        </button>
                                    )}
                                    {app.status === 'pending' && (
                                        <>
                                            <button onClick={() => onUpdateApplicationStatus(app.id, 'accepted')} className="flex items-center gap-2 bg-green-600/20 text-green-500 px-4 py-2 text-xs font-bold uppercase hover:bg-green-600/40 transition-colors">
                                                <Check className="w-4 h-4" /> Accept
                                            </button>
                                            <button onClick={() => onUpdateApplicationStatus(app.id, 'rejected')} className="flex items-center gap-2 bg-red-600/20 text-red-500 px-4 py-2 text-xs font-bold uppercase hover:bg-red-600/40 transition-colors">
                                                <X className="w-4 h-4" /> Reject
                                            </button>
                                        </>
                                    )}
                                    <button onClick={() => onDeleteApplication(app.id)} className="text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded ml-2">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

// --- Reusable UI Components for Admin ---

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
    <button onClick={onClick} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${active ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
        {label}
    </button>
);

const Input: React.FC<{ label: string; value: any; onChange: (val: string) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
        <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white placeholder-white/20 focus:border-accluav-orange outline-none transition-colors" />
    </div>
);

const TextArea: React.FC<{ label: string; value: any; onChange: (val: string) => void }> = ({ label, value, onChange }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
        <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white placeholder-white/20 focus:border-accluav-orange outline-none transition-colors resize-none" />
    </div>
);

const Select: React.FC<{ label: string; value: any; onChange: (val: string) => void; options: string[] }> = ({ label, value, onChange, options }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-white focus:border-accluav-orange outline-none appearance-none cursor-pointer">
            {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
    </div>
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-accluav-orange hover:text-white transition-colors mt-4">
        {children}
    </button>
);

const handleGenericFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
};

const FileUploadField: React.FC<{ label: string; value: string | undefined; onChange: (val: string) => void; accept?: string }> = ({ label, value, onChange, accept = "image/*" }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
        <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border border-white/10 hover:border-accluav-orange cursor-pointer transition-colors w-full text-sm text-gray-400">
                <UploadCloud className="w-4 h-4" />
                {value && value.startsWith('data') ? 'File Selected' : 'Upload File'}
                <input type="file" accept={accept} className="hidden" onChange={(e) => handleGenericFileUpload(e, onChange)} />
            </label>
            {value && (
                <div className="w-12 h-12 bg-gray-800 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                     {accept.includes('image') ? (
                         <img src={value} className="w-full h-full object-cover" alt="Preview" />
                     ) : (
                         <Check className="w-5 h-5 text-green-500" />
                     )}
                </div>
            )}
        </div>
    </div>
);

export default AdminDashboard;
