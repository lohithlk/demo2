import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve 3D Models
app.get('/api/models/:modelName', (req, res) => {
  const modelName = req.params.modelName;
  const modelPath = path.join(__dirname, '../public/3d-model', modelName);
  
  // Security: prevent directory traversal
  if (!modelPath.startsWith(path.join(__dirname, '../public/3d-model'))) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!fs.existsSync(modelPath)) {
    return res.status(404).json({ error: 'Model not found' });
  }

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'model/gltf-binary');
  res.sendFile(modelPath);
});

// Serve Images
app.get('/api/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../public/images', imageName);
  
  if (!imagePath.startsWith(path.join(__dirname, '../public/images'))) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(imagePath);
});

// Serve Videos (with streaming support)
app.get('/api/videos/:videoName', (req, res) => {
  const videoName = req.params.videoName;
  const videoPath = path.join(__dirname, '../public', videoName);
  
  if (!videoPath.startsWith(path.join(__dirname, '../public'))) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    });

    fs.createReadStream(videoPath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AccelUAV backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ AccelUAV Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving assets from: ${path.join(__dirname, '../public')}`);
});

export default app;
