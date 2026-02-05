# Backend Server Requirements for AccelUAV Website

## Overview
Your current frontend is a **React + Vite application** with all data stored in-memory (localStorage). To make it production-ready, you need a backend server.

---

## 📊 Data Models That Need Backend Support

### 1. **Job Management**
- Job listings (create, read, update, delete)
- Job applications with resume storage
- Application status tracking

### 2. **User Management**
- Job applicants/users
- Admin authentication & authorization
- Leadership team profiles

### 3. **Content Management**
- Blog posts
- News items
- Hackathon information
- Partner information
- Product catalog
- Payload specifications

### 4. **Communication**
- Demo requests
- Contact form submissions
- Job applications

### 5. **Geographical Data**
- 3D model uploads/serving
- Map source management

### 6. **Admin Dashboard**
- Admin login credentials (currently hardcoded)
- Content management (CRUD operations)
- Analytics & reporting

---

## 🛠️ Recommended Backend Stack

### **Option 1: Node.js/Express (Recommended)**
```
Backend: Node.js + Express
Database: MongoDB or PostgreSQL
Auth: JWT tokens
```

**Why:** JavaScript/TypeScript compatibility with React frontend

### **Option 2: Python/FastAPI**
```
Backend: FastAPI or Django
Database: PostgreSQL
Auth: JWT tokens
```

**Why:** Easy data processing, good for GIS/3D model handling

### **Option 3: Firebase**
```
Backend: Firebase (Serverless)
Database: Firestore
Auth: Firebase Authentication
```

**Why:** Quick setup, no server management needed

---

## 🔌 Required API Endpoints

### **Authentication**
```
POST   /api/auth/login           - Admin login
POST   /api/auth/register        - User registration
POST   /api/auth/logout          - Logout
GET    /api/auth/verify          - Verify token
```

### **Jobs**
```
GET    /api/jobs                 - List all jobs
POST   /api/jobs                 - Create job
PUT    /api/jobs/:id             - Update job
DELETE /api/jobs/:id             - Delete job
GET    /api/jobs/:id             - Get job details
```

### **Applications**
```
POST   /api/applications         - Submit application
GET    /api/applications         - List applications
PUT    /api/applications/:id     - Update status
DELETE /api/applications/:id     - Delete application
```

### **Blog & Content**
```
GET    /api/blogs                - List blogs
POST   /api/blogs                - Create blog
PUT    /api/blogs/:id            - Update blog
DELETE /api/blogs/:id            - Delete blog
GET    /api/news                 - List news
POST   /api/news                 - Create news
```

### **Hackathons**
```
GET    /api/hackathons           - List hackathons
POST   /api/hackathons           - Create hackathon
POST   /api/hackathons/:id/apply - Submit application
GET    /api/hackathons/apps      - List applications
```

### **Products & Payloads**
```
GET    /api/products             - List products
POST   /api/products             - Create product
PUT    /api/products/:id         - Update product
DELETE /api/products/:id         - Delete product
GET    /api/payloads             - List payloads
POST   /api/payloads             - Create payload
```

### **3D Models**
```
GET    /api/3d-models            - List models
POST   /api/3d-models/upload     - Upload GLB/OBJ
GET    /api/3d-models/:id        - Get model metadata
```

### **Admin Content**
```
GET    /api/admin/dashboard      - Dashboard stats
POST   /api/admin/pricing        - Update pricing
GET    /api/admin/geo-source     - Get geo data source
PUT    /api/admin/geo-source     - Update geo source
```

---

## 📦 Database Schema

### Users Collection
```javascript
{
  id: String,
  email: String,
  passwordHash: String,
  role: 'admin' | 'user',
  createdAt: Date,
  updatedAt: Date
}
```

### Jobs Collection
```javascript
{
  id: String,
  title: String,
  department: String,
  location: String,
  type: String,
  description: String,
  requirements: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Applications Collection
```javascript
{
  id: String,
  jobId: String,
  applicantName: String,
  email: String,
  coverLetter: String,
  resumeUrl: String,
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted',
  timestamp: Date
}
```

### Blog Posts Collection
```javascript
{
  id: String,
  title: String,
  excerpt: String,
  content: String,
  author: String,
  category: String,
  imageUrl: String,
  likes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Quick Start: Express.js Example

```bash
# Create backend project
mkdir acceluav-backend
cd acceluav-backend
npm init -y
npm install express cors dotenv mongoose bcryptjs jsonwebtoken

# Create .env
echo "DATABASE_URL=mongodb://localhost:27017/acceluav
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<bcrypt_hash>
JWT_SECRET=your_secret_key
PORT=5000" > .env
```

**Basic Server (server.js)**
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/blogs', require('./routes/blogs'));
// ... other routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🔐 Security Considerations

1. **Authentication**: Use JWT tokens with refresh tokens
2. **Authorization**: Role-based access control (RBAC)
3. **Validation**: Input validation on all endpoints
4. **Encryption**: Hash passwords with bcrypt, use HTTPS
5. **Rate Limiting**: Implement to prevent abuse
6. **CORS**: Configure properly for frontend domain
7. **File Uploads**: Validate file types & sizes

---

## 📝 Frontend Integration Updates Needed

### Update API calls in components:
```typescript
// Current: localStorage
// const [blogs, setBlogs] = useState(INITIAL_BLOGS);

// Future: API calls
useEffect(() => {
  fetch('/api/blogs')
    .then(res => res.json())
    .then(data => setBlogs(data))
    .catch(err => console.error(err));
}, []);
```

---

## 💾 Database Recommendations

- **Small Scale**: SQLite or Firebase
- **Medium Scale**: PostgreSQL + Node.js
- **Large Scale**: MongoDB + Redis cache

---

## ⚡ Deployment Options

1. **Heroku** (easy, good for Node.js)
2. **AWS** (EC2, RDS, S3 for file storage)
3. **DigitalOcean** (affordable VPS)
4. **Vercel + API routes** (serverless)
5. **Railway.app** (modern, simple)

---

## 📋 Next Steps

1. Choose backend framework (Express recommended)
2. Set up database (PostgreSQL or MongoDB)
3. Implement authentication
4. Create API endpoints (start with jobs & applications)
5. Update frontend to call API instead of localStorage
6. Deploy both frontend & backend
7. Set up CI/CD pipeline

---

**Current Status**: ⚠️ Frontend-only (no backend)  
**For Production**: ✅ Backend + Database + Authentication required
