
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MissionStatement from './components/MissionStatement';
import ProductShowcase, { PRODUCTS as INITIAL_PRODUCTS } from './components/ProductShowcase';
import Capabilities from './components/Capabilities';
import TechnologySection from './components/TechnologySection';
import CareersCTA from './components/CareersCTA';
import Footer from './components/Footer';
import RequestDemo from './components/RequestDemo';
import Careers from './components/Careers';
import LifeAtAcceluav from './components/LifeAtAcceluav';
import Forge from './components/Forge';
import SkillBridge from './components/SkillBridge';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AllSystems from './components/AllSystems';
import Leadership from './components/Leadership';
import SearchResults from './components/SearchResults';
import Mission from './components/Mission';
import Newsroom from './components/Newsroom';
import ProductDetail from './components/ProductDetail';
import SoftwareDetail from './components/SoftwareDetail';
import Partners from './components/Partners';
import BlogList from './components/BlogList';
import BlogPostDetail from './components/BlogPostDetail';
import HackathonList from './components/HackathonList';
import HackathonDetail from './components/HackathonDetail';
import WorkWithUsLayout from './components/WorkWithUsLayout';
import ProductVariantSelector from './components/ProductVariantSelector';
import GeographicalData from './components/GeographicalData';
import SoftwareHub from './components/SoftwareHub';
import GCSDetail from './components/GCSDetail';
import PayloadDetail from './components/PayloadDetail';
import { Job, Application, Leader, NewsItem, Partner, Product, BlogPost, Hackathon, HackathonApplication, PricingModel, Payload } from './types';

// Initial Data
const INITIAL_JOBS: Job[] = [
  {
    id: 'eng-01',
    title: 'Senior Autonomous Systems Engineer',
    department: 'Engineering',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description: 'We are seeking a senior engineer to lead the development of navigation and control algorithms for our VTOL platforms. You will work at the intersection of hardware and software, pushing the boundaries of what is possible in contested environments.',
    requirements: [
      '5+ years experience in C++ and Python',
      'Deep understanding of flight dynamics and control theory',
      'Experience with ROS/ROS2',
      'Ability to obtain security clearance'
    ]
  },
  {
    id: 'ops-01',
    title: 'Flight Test Operator',
    department: 'Operations',
    location: 'Remote / Field',
    type: 'Contract',
    description: 'Execute field testing of experimental airframes. You will be responsible for mission planning, pre-flight checks, and safe operation of prototype UAS during critical test phases.',
    requirements: [
      'Part 107 Remote Pilot Certificate (or equivalent)',
      'Experience with fixed-wing and multi-rotor platforms',
      'Willingness to travel 50% of the time',
      'Technical troubleshooting skills'
    ]
  },
  {
    id: 'soft-01',
    title: 'Frontend Engineer (RLTM Software)',
    department: 'Software',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description: 'Build the mission control interfaces used by operators in high-stakes scenarios. You will design and implement high-performance, low-latency UI components for real-time situational awareness.',
    requirements: [
      'Expertise in React, TypeScript, and WebGL',
      'Experience with data visualization',
      'Eye for design and user experience',
      'Performance optimization skills'
    ]
  }
];

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    jobId: 'eng-01',
    jobTitle: 'Senior Autonomous Systems Engineer',
    applicantName: 'Arjun Reddy',
    email: 'arjun.r@example.com',
    coverLetter: 'I have 6 years of experience working with PX4 and ArduPilot stacks. Highly interested in your VTOL program.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'pending',
    // Minimal valid PDF data URI for demonstration
    resumeData: 'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXwKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCisgICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqCjw8IC9MZW5ndGggNDQgPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDE1NyAwMDAwMCBuIAowMDAwMDAwMjU1IDAwMDAwIG4gCjAwMDAwMDAzNTMgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDQ5CiUlRU9FCg=='
  }
];

const INITIAL_LEADERS: Leader[] = [
  {
    id: 'l-01',
    name: 'Sarah Chen',
    role: 'Chief Executive Officer',
    bio: 'Former defense strategy analyst and aerospace engineer. Sarah founded AccelUAV to bridge the gap between Silicon Valley speed and military grade reliability.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
  },
  {
    id: 'l-02',
    name: 'David Vance',
    role: 'Chief Technology Officer',
    bio: 'Architect of the RLTM Platform. David leads the software and autonomy divisions, focusing on sensor fusion and distributed mesh networks.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
  },
  {
    id: 'l-03',
    name: 'Marcus Thorne',
    role: 'Head of Operations',
    bio: 'Retired Special Forces operator with 15 years of field experience. Marcus ensures our systems meet the rigorous demands of down-range deployment.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  },
   {
    id: 'l-04',
    name: 'Elena Rodriguez',
    role: 'VP of Hardware',
    bio: 'Expert in composite materials and propulsion systems. Elena oversees the rapid prototyping and manufacturing of all airframe structures.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80'
  },
  {
    id: 'l-05',
    name: 'James Wu',
    role: 'Head of AI',
    bio: 'PhD in Computer Vision. James leads the team responsible for real-time object detection and autonomous decision-making algorithms.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80'
  }
];

const INITIAL_NEWS: NewsItem[] = [
    {
        id: 1,
        title: "AccelUAV Secures $450M Series D Funding",
        date: "Oct 24, 2024",
        category: "Corporate",
        excerpt: "Funding to accelerate production of the ACE-VI VTOL platform and expand RLTM software capabilities.",
        content: "We are thrilled to announce that AccelUAV has secured $450 million in Series D funding led by major defense technology investors. This capital injection will be primarily used to scale our manufacturing capabilities in Hyderabad and accelerate the R&D of our next-generation autonomous swarm technologies. \n\n 'This funding is a validation of our mission to redefine defense capabilities through software-defined hardware,' said Sarah Chen, CEO. 'We are moving faster than ever to put advanced tools in the hands of those who need them most.'",
        imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        title: "U.S. Army Selects AccelUAV for FTUAS Program",
        date: "Sep 12, 2024",
        category: "Contracts",
        excerpt: "AccelUAV to provide next-generation tactical reconnaissance capabilities to brigade combat teams.",
        content: "AccelUAV has been selected by the U.S. Army for the Future Tactical Unmanned Aircraft System (FTUAS) program. Our ACE-VI platform was chosen for its superior endurance, reduced acoustic signature, and rapid deployment capabilities. \n\n This contract marks a significant milestone in our partnership with allied defense forces and underscores the reliability of our VTOL systems in contested environments.",
        imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        title: "Introducing RLTM 2.0: Swarm Mapping",
        date: "Aug 05, 2024",
        category: "Product",
        excerpt: "New update enables single-operator control of up to 50 autonomous assets for real-time 3D terrain generation.",
        content: "RLTM 2.0 is here. The latest update to our Rapid Live Tactical Mapping engine introduces 'Swarm Mode', allowing a single operator to command a fleet of up to 50 drones simultaneously. \n\n This capability drastically reduces the time required to map large areas of terrain, providing commanders with near-instantaneous 3D situational awareness. The update also includes enhanced edge-processing algorithms for faster on-site data generation without cloud connectivity.",
        imageUrl: "https://images.unsplash.com/photo-1524813686514-a5756c97759e?auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        title: "AccelUAV Expands Manufacturing in Hyderabad",
        date: "Jul 15, 2024",
        category: "Operations",
        excerpt: "New 150,000 sq ft facility will triple production capacity for heavy-lift platforms.",
        content: "To meet growing global demand, AccelUAV is opening a new 150,000 sq ft advanced manufacturing facility in Hyderabad. This facility will house our composites lab, avionics assembly, and final integration lines. \n\n 'Hyderabad offers an incredible talent pool of engineers and technicians,' said Elena Rodriguez, VP of Hardware. 'This expansion allows us to triple our production capacity and reduce lead times for our partners.'",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    }
];

const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'p-1',
    company: "DEFENSE INNOVATION UNIT",
    quote: "AccelUAV's rapid prototyping capabilities have allowed us to field test new autonomous systems in weeks, not years."
  },
  {
    id: 'p-2',
    company: "BORDER SECURITY FORCE",
    quote: "The RLTM system is a game changer for monitoring vast stretches of terrain autonomously."
  },
  {
    id: 'p-3',
    company: "NATIONAL DISASTER RESPONSE FORCE",
    quote: "During critical relief operations, the heavy-lift capabilities of the Hexacopter fleet were instrumental in delivering medical supplies to cut-off areas."
  },
  {
    id: 'p-4',
    company: "SPECIAL FRONTIER FORCE",
    quote: "Stealth, endurance, and ease of use. The ACE-IV platform has become a standard part of our tactical loadout for high-altitude reconnaissance."
  },
  {
    id: 'p-5',
    company: "TELANGANA STATE POLICE",
    quote: "Deployment of AccelUAV's tethered systems for crowd monitoring has significantly improved our ability to manage large-scale public events securely."
  }
];

const INITIAL_BLOGS: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'The Future of Swarm Logistics',
        excerpt: 'How autonomous distribution is redefining the "Last Tactical Mile".',
        content: `
            Traditional logistics supply chains are vulnerable. In a peer-to-peer conflict, large convoys are easy targets.
            The future lies in distributed, autonomous swarms of heavy-lift drones that can deliver critical supplies—ammunition, blood, batteries—to the tactical edge without risking human life.

            At AccelUAV, we are testing swarm algorithms that allow our Hexacopter fleet to operate as a single organism. 
            One operator can manage a fleet of 50 drones, each carrying 15kg of payload, delivering a total of 750kg of supplies in a single wave.

            This capability is not theoretical. It is being field-tested today in high-altitude environments.
        `,
        author: 'Marcus Thorne',
        date: '2024-11-02',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        category: 'Ops',
        likes: 1245,
        shares: 450
    },
    {
        id: 'blog-2',
        title: 'Why We Moved to Rust for Flight Control',
        excerpt: 'Memory safety is flight safety. A technical deep dive into our stack.',
        content: `
            C++ has been the standard for embedded flight control systems for decades. However, memory safety issues remain a primary cause of critical system failures.
            
            We made the strategic decision to migrate our core flight control stack to Rust. The borrow checker ensures that we catch concurrency bugs at compile time, not flight time.
            
            This shift has reduced our crash rate in simulation by 99% and allows us to deploy updates to deployed fleets with significantly higher confidence.
        `,
        author: 'David Vance',
        date: '2024-10-15',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80',
        category: 'Tech',
        likes: 3420,
        shares: 892
    }
];

const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: 'hack-1',
    title: 'DroneSwarm 2025',
    description: 'Design and simulate coordinated swarm behaviors for search and rescue operations in GPS-denied environments.',
    date: 'March 15-16, 2025',
    venue: 'AccelUAV HQ, Hyderabad',
    prizePool: '₹5,00,000 + Internship Ops',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1535378437323-952a8d9ec5c2?auto=format&fit=crop&q=80',
    requirements: ['Team of 2-4', 'Python/C++ Proficiency', 'Laptop Required']
  }
];

// Initial Pricing Tiers
const INITIAL_PRICING: PricingModel = {
    '3d_twin': [
        { label: '< 10 ha', limit: 10, rate: 250 },
        { label: '< 15 ha', limit: 15, rate: 400 },
        { label: '< 1000 ha', limit: 1000, rate: 120 },
        { label: '> 1000 ha', limit: Infinity, rate: 95 }
    ],
    'ortho': [
        { label: '< 10 ha', limit: 10, rate: 60 },
        { label: '< 15 ha', limit: 15, rate: 400 },
        { label: '< 1000 ha', limit: 1000, rate: 120 },
        { label: '> 1000 ha', limit: Infinity, rate: 95 }
    ],
    'point_cloud_low': [
        { label: '< 10 ha', limit: 10, rate: 150 },
        { label: '< 15 ha', limit: 15, rate: 200 },
        { label: '< 1000 ha', limit: 1000, rate: 60 },
        { label: '> 1000 ha', limit: Infinity, rate: 45 }
    ],
    'point_cloud_lidar': [
        { label: '< 10 ha', limit: 10, rate: 260 },
        { label: '< 15 ha', limit: 15, rate: 900 },
        { label: '< 1000 ha', limit: 1000, rate: 120 },
        { label: '> 1000 ha', limit: Infinity, rate: 90 }
    ],
    'spectral_multi': [
        { label: '< 10 ha', limit: 10, rate: 1200 },
        { label: '< 15 ha', limit: 15, rate: 2300 },
        { label: '< 1000 ha', limit: 1000, rate: 600 },
        { label: '> 1000 ha', limit: Infinity, rate: 350 }
    ],
    'spectral_hyper': [
        { label: '< 10 ha', limit: 10, rate: 3500 },
        { label: '< 15 ha', limit: 15, rate: 5000 },
        { label: '< 1000 ha', limit: 1000, rate: 1700 },
        { label: '> 1000 ha', limit: Infinity, rate: 1200 }
    ]
};

const INITIAL_PAYLOADS: Payload[] = [
    {
        id: 'payload-01',
        productId: '02',
        type: 'surveillance',
        title: 'RAPTOR',
        manufacturer: 'NextVision',
        description: 'The Raptor is a long-range, stabilized, dual-sensor payload designed for day and night observation. It features high-zoom capabilities and thermal imaging in a compact, lightweight form factor optimized for the ACE-IV VTOL.',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        specs: [
            { label: 'Weight', value: '640g' },
            { label: 'Zoom', value: 'x80 (x40 Optical)' },
            { label: 'Thermal', value: '1280x720 (HD)' },
            { label: 'Pitch', value: '-120° to +30°' }
        ]
    },
    {
        id: 'payload-02',
        productId: '02',
        type: 'mapping',
        title: 'Oblique',
        description: 'Five-lens oblique camera system capturing 1x Nadir and 4x Oblique (45°) images simultaneously. Ideal for 3D city modeling and complex structure reconstruction.',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        specs: [
            { label: 'Lenses', value: '5 x 24MP' },
            { label: 'Total Res', value: '120 MP' },
            { label: 'Mount', value: 'Fixed / Damped' },
            { label: 'Format', value: 'APS-C' }
        ]
    },
    {
        id: 'payload-03',
        productId: '02',
        type: 'mapping',
        title: '102 MP',
        description: 'Ultra-high resolution medium format sensor. Delivers engineering-grade accuracy for topographic surveys and large-scale corridor mapping.',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        specs: [
            { label: 'Resolution', value: '102 MP' },
            { label: 'Sensor', value: 'Medium Format' },
            { label: 'GSD', value: '1.5 cm @ 100m' },
            { label: 'Weight', value: '900g' }
        ]
    },
    {
        id: 'payload-04',
        productId: '02',
        type: 'mapping',
        title: '61 MP',
        description: 'High-resolution full-frame sensor balancing coverage and file size. Perfect for general purpose mapping, agriculture, and mining applications.',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        specs: [
            { label: 'Resolution', value: '61 MP' },
            { label: 'Sensor', value: 'Full Frame' },
            { label: 'GSD', value: '2.4 cm @ 100m' },
            { label: 'Weight', value: '600g' }
        ]
    }
];

type ViewState = 'home' | 'demo' | 'careers' | 'life' | 'forge' | 'skillbridge' | 'admin' | 'admin-login' | 'systems' | 'defence-systems' | 'leadership' | 'search' | 'mission' | 'newsroom' | 'product-detail' | 'geo-data' | 'software-hub' | 'software' | 'gcs' | 'blogs' | 'blog-detail' | 'hackathons' | 'hackathon-detail' | 'payloads';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [leaders, setLeaders] = useState<Leader[]>(INITIAL_LEADERS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [hackathons, setHackathons] = useState<Hackathon[]>(INITIAL_HACKATHONS);
  const [hackathonApps, setHackathonApps] = useState<HackathonApplication[]>([]);
  const [pricingModel, setPricingModel] = useState<PricingModel>(INITIAL_PRICING);
  const [payloads, setPayloads] = useState<Payload[]>(INITIAL_PAYLOADS);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedHackathonId, setSelectedHackathonId] = useState<string | null>(null);
  
  // State for the variant selector modal
  const [activeVariantFamily, setActiveVariantFamily] = useState<'vinashak' | 'ace' | null>(null);

  // New Global State for Geo Map Source
  const [geoMapSource, setGeoMapSource] = useState<string | null>(null);

  // Simple smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Keyboard shortcut for Admin Access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+A (or Cmd+Shift+A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.scrollTo(0, 0);
        setCurrentView('admin-login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (view: ViewState) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
    // Close variant selector if navigating away
    setActiveVariantFamily(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigateTo('search');
  };

  const handleCapabilitySelect = (category: 'defence' | 'geo' | 'software') => {
    if (category === 'defence') {
        navigateTo('defence-systems');
    } else if (category === 'geo') {
        navigateTo('geo-data');
    } else if (category === 'software') {
        navigateTo('software-hub');
    }
  };

  const handleProductClick = (productId: string) => {
    // Intercept click for VINASHAK (ID 01)
    if (productId === '01') {
      setActiveVariantFamily('vinashak');
    } 
    // Intercept click for ACE-IV (ID 02)
    else if (productId === '02') {
      setActiveVariantFamily('ace');
    } else {
      setSelectedProductId(productId);
      navigateTo('product-detail');
    }
  };

  // Handle selection from the Variant Selector modal
  const handleVariantSelect = (productId: string) => {
    setActiveVariantFamily(null);
    setSelectedProductId(productId);
    navigateTo('product-detail');
  };

  const handleBlogClick = (blogId: string) => {
      setSelectedBlogId(blogId);
      navigateTo('blog-detail');
  };

  const handleHackathonClick = (hackathonId: string) => {
      setSelectedHackathonId(hackathonId);
      navigateTo('hackathon-detail');
  };

  // Product Functions (Added for Admin)
  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Admin Functions
  const handleAddJob = (newJob: Job) => {
    setJobs([...jobs, newJob]);
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  // Application Functions
  const handleNewApplication = (app: Application) => {
    setApplications([app, ...applications]);
  };

  const handleUpdateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  // Leadership Functions
  const handleAddLeader = (newLeader: Leader) => {
    setLeaders([...leaders, newLeader]);
  };

  const handleDeleteLeader = (id: string) => {
    setLeaders(leaders.filter(l => l.id !== id));
  };

  // News Functions
  const handleAddNews = (newItem: NewsItem) => {
    setNews([newItem, ...news]);
  };

  const handleUpdateNews = (updatedNews: NewsItem) => {
    setNews(news.map(n => n.id === updatedNews.id ? updatedNews : n));
  };

  const handleDeleteNews = (id: string | number) => {
    setNews(news.filter(item => item.id !== id));
  };

  // Blog Functions
  const handleAddBlog = (newBlog: BlogPost) => {
      setBlogs([newBlog, ...blogs]);
  };

  const handleUpdateBlog = (updatedBlog: BlogPost) => {
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b));
  };

  const handleDeleteBlog = (id: string) => {
      setBlogs(blogs.filter(b => b.id !== id));
  };

  // Hackathon Functions
  const handleAddHackathon = (newHackathon: Hackathon) => {
      setHackathons([newHackathon, ...hackathons]);
  };

  const handleUpdateHackathon = (updated: Hackathon) => {
      setHackathons(hackathons.map(h => h.id === updated.id ? updated : h));
  };

  const handleDeleteHackathon = (id: string) => {
      setHackathons(hackathons.filter(h => h.id !== id));
  };

  const handleNewHackathonApp = (app: HackathonApplication) => {
      setHackathonApps([app, ...hackathonApps]);
  };

  const handleUpdateHackathonAppStatus = (id: string, status: HackathonApplication['status']) => {
      setHackathonApps(hackathonApps.map(a => a.id === id ? { ...a, status } : a));
  };

  // Partner Functions
  const handleAddPartner = (newPartner: Partner) => {
    setPartners([...partners, newPartner]);
  };

  const handleUpdatePartner = (updatedPartner: Partner) => {
    setPartners(partners.map(p => p.id === updatedPartner.id ? updatedPartner : p));
  };

  const handleDeletePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  // Payload Functions
  const handleAddPayload = (newPayload: Payload) => {
      setPayloads([...payloads, newPayload]);
  };

  const handleUpdatePayload = (updatedPayload: Payload) => {
      setPayloads(payloads.map(p => p.id === updatedPayload.id ? updatedPayload : p));
  };

  const handleDeletePayload = (id: string) => {
      setPayloads(payloads.filter(p => p.id !== id));
  };

  // Views that should show the main Navbar
  const showNavbar = ['home', 'mission', 'newsroom', 'leadership', 'systems', 'defence-systems', 'search', 'product-detail', 'software-hub', 'software', 'gcs', 'geo-data', 'blogs', 'blog-detail', 'payloads'].includes(currentView);
  const showFooter = ['home', 'mission', 'newsroom', 'leadership', 'systems', 'defence-systems', 'product-detail', 'software-hub', 'software', 'gcs', 'geo-data', 'blogs', 'blog-detail', 'payloads'].includes(currentView);

  return (
    <div className="min-h-screen bg-accluav-black text-white selection:bg-accluav-orange selection:text-white overflow-x-hidden">
      {/* Global Navbar */}
      {showNavbar && (
        <Navbar 
          onNavigateHome={() => navigateTo('home')} 
          onNavigate={(page) => navigateTo(page as ViewState)}
          onSearch={handleSearch}
          jobs={jobs}
          leaders={leaders}
          products={products}
          blogs={blogs}
          news={news}
          hackathons={hackathons}
          onProductClick={handleProductClick}
          onBlogClick={handleBlogClick}
          onHackathonClick={handleHackathonClick}
        />
      )}

      {/* Product Variant Selector Modal */}
      {activeVariantFamily && (
        <ProductVariantSelector 
          products={products}
          family={activeVariantFamily}
          onSelect={handleVariantSelect}
          onClose={() => setActiveVariantFamily(null)}
        />
      )}
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero />
            <MissionStatement />
            <TechnologySection onExplore={() => navigateTo('software-hub')} />
            {/* New Capabilities Section replaces the direct ProductShowcase */}
            <Capabilities onSelectCategory={handleCapabilitySelect} />
            <Partners partners={partners} />
            <CareersCTA 
                onRequestDemo={() => navigateTo('demo')} 
                onViewOpenRoles={() => navigateTo('careers')} 
                onViewLife={() => navigateTo('life')}
            />
          </>
        )}
        
        {currentView === 'mission' && <Mission />}
        {currentView === 'newsroom' && <Newsroom news={news} />}
        
        {currentView === 'blogs' && (
            <BlogList 
                blogs={blogs} 
                onBlogClick={handleBlogClick}
                onBack={() => navigateTo('home')}
            />
        )}

        {currentView === 'blog-detail' && selectedBlogId && (
            <BlogPostDetail 
                blog={blogs.find(b => b.id === selectedBlogId)!}
                onBack={() => navigateTo('blogs')}
            />
        )}

        {currentView === 'hackathons' && (
             <WorkWithUsLayout activePage="hackathons" onNavigate={(page) => navigateTo(page)} onBackHome={() => navigateTo('home')}>
                <HackathonList 
                    hackathons={hackathons}
                    onHackathonClick={handleHackathonClick}
                    onBack={() => navigateTo('home')}
                />
             </WorkWithUsLayout>
        )}

        {currentView === 'hackathon-detail' && selectedHackathonId && (
            <HackathonDetail 
                hackathon={hackathons.find(h => h.id === selectedHackathonId)!}
                onBack={() => navigateTo('hackathons')}
                onApply={handleNewHackathonApp}
            />
        )}

        {currentView === 'demo' && (
          <RequestDemo onBack={() => navigateTo('home')} />
        )}

        {/* DEFENCE SYSTEMS VIEW (Was AllSystems, but now specific to Defence category) */}
        {(currentView === 'systems' || currentView === 'defence-systems') && (
          <AllSystems 
            onBack={() => navigateTo('home')} 
            onProductClick={handleProductClick}
            products={products}
          />
        )}

        {/* GEO DATA VIEW */}
        {currentView === 'geo-data' && (
          <GeographicalData 
            onBack={() => navigateTo('home')}
            onRequestService={() => navigateTo('demo')}
            mapSource={geoMapSource}
            pricingModel={pricingModel}
          />
        )}

        {/* SOFTWARE HUB VIEW */}
        {currentView === 'software-hub' && (
          <SoftwareHub 
            onBack={() => navigateTo('home')}
            onNavigateRLTM={() => navigateTo('software')}
            onNavigateGCS={() => navigateTo('gcs')}
          />
        )}

        {/* RLTM Software Detail */}
        {currentView === 'software' && (
            <SoftwareDetail 
                onBack={() => navigateTo('software-hub')} 
                onRequestDemo={() => navigateTo('demo')}
            />
        )}

        {/* GCS Detail */}
        {currentView === 'gcs' && (
            <GCSDetail
                onBack={() => navigateTo('software-hub')}
                onRequestDemo={() => navigateTo('demo')}
            />
        )}

        {currentView === 'product-detail' && selectedProductId && (
            <ProductDetail 
                product={products.find(p => p.id === selectedProductId)!}
                onBack={() => navigateTo('defence-systems')}
                onRequestInfo={() => navigateTo('demo')}
                onViewPayloads={() => navigateTo('payloads')}
            />
        )}

        {currentView === 'payloads' && (
            <PayloadDetail 
                onBack={() => {
                    // Try to go back to the ACE-IV product page
                    setSelectedProductId('02');
                    navigateTo('product-detail');
                }}
                payloads={payloads.filter(p => p.productId === '02')}
            />
        )}

        {currentView === 'leadership' && (
          <Leadership onBack={() => navigateTo('home')} leaders={leaders} />
        )}
        
        {/* Work With Us Section */}
        {currentView === 'careers' && (
          <Careers 
            onBackHome={() => navigateTo('home')} 
            jobs={jobs} 
            onApply={handleNewApplication}
            onNavigate={(page) => navigateTo(page)}
          />
        )}
        
        {currentView === 'life' && (
          <LifeAtAcceluav
            onBackHome={() => navigateTo('home')}
            onNavigate={(page) => navigateTo(page)}
          />
        )}
        
        {currentView === 'forge' && (
          <Forge
            onBackHome={() => navigateTo('home')}
            onNavigate={(page) => navigateTo(page)}
          />
        )}

        {currentView === 'skillbridge' && (
          <SkillBridge
            onBackHome={() => navigateTo('home')}
            onNavigate={(page) => navigateTo(page)}
          />
        )}

        {currentView === 'search' && (
          <SearchResults 
            query={searchQuery}
            onBack={() => navigateTo('home')}
            jobs={jobs}
            leaders={leaders}
            products={products}
            blogs={blogs}
            news={news}
            hackathons={hackathons}
            onNavigate={(page) => navigateTo(page as ViewState)}
            onProductClick={handleProductClick}
            onBlogClick={handleBlogClick}
            onHackathonClick={handleHackathonClick}
          />
        )}

        {currentView === 'admin-login' && (
          <AdminLogin 
            onLogin={(username, password) => {
              setIsAdminAuthenticated(true);
              setCurrentView('admin');
            }}
            onBack={() => navigateTo('home')}
          />
        )}

        {currentView === 'admin' && isAdminAuthenticated && (
          <AdminDashboard 
            onBack={() => {
              setIsAdminAuthenticated(false);
              navigateTo('home');
            }} 
            jobs={jobs} 
            onAddJob={handleAddJob} 
            onDeleteJob={handleDeleteJob}
            applications={applications}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            onDeleteApplication={handleDeleteApplication}
            leaders={leaders}
            onAddLeader={handleAddLeader}
            onDeleteLeader={handleDeleteLeader}
            news={news}
            onAddNews={handleAddNews}
            onUpdateNews={handleUpdateNews}
            onDeleteNews={handleDeleteNews}
            partners={partners}
            onAddPartner={handleAddPartner}
            onUpdatePartner={handleUpdatePartner}
            onDeletePartner={handleDeletePartner}
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            blogs={blogs}
            onAddBlog={handleAddBlog}
            onUpdateBlog={handleUpdateBlog}
            onDeleteBlog={handleDeleteBlog}
            hackathons={hackathons}
            onAddHackathon={handleAddHackathon}
            onUpdateHackathon={handleUpdateHackathon}
            onDeleteHackathon={handleDeleteHackathon}
            hackathonApplications={hackathonApps}
            onUpdateHackathonAppStatus={handleUpdateHackathonAppStatus}
            onUpdateGeoMapSource={setGeoMapSource}
            pricingModel={pricingModel}
            onUpdatePricing={setPricingModel}
            payloads={payloads}
            onAddPayload={handleAddPayload}
            onUpdatePayload={handleUpdatePayload}
            onDeletePayload={handleDeletePayload}
          />
        )}
      </main>
      
      {showFooter && (
        <Footer 
            onAdminClick={() => navigateTo('admin-login')} 
            onNavigate={(page) => navigateTo(page as ViewState)}
        />
      )}
    </div>
  );
};

export default App;
