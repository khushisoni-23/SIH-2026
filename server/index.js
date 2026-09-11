require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errorHandler } = require('./src/middleware/errorHandler');

// Route imports
const authRoutes = require('./src/routes/auth.routes');
const freightRoutes = require('./src/routes/freight.routes');
const forecastRoutes = require('./src/routes/forecast.routes');
const vesselRoutes = require('./src/routes/vessel.routes');
const portRoutes = require('./src/routes/port.routes');
const routeRoutes = require('./src/routes/route.routes');
const alertRoutes = require('./src/routes/alert.routes');
const charterRoutes = require('./src/routes/charter.routes');
const marketRoutes = require('./src/routes/market.routes');

const app = express();

// --- Middleware ---
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV });
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/freight', freightRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/vessels', vesselRoutes);
app.use('/api/ports', portRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/charter', charterRoutes);
app.use('/api/market', marketRoutes);

// --- Error Handler (must be last) ---
app.use(errorHandler);

// --- Connect to MongoDB then start server ---
const PORT = process.env.PORT || 5001;

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`🚀  FreightSense backend running on http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`⚠️  Port ${PORT} is busy. Clearing port and restarting...`);
    } else {
      console.error('Server error:', err);
    }
  });
};

const getMongoURIs = () => {
  const candidates = [
    process.env.MONGODB_URI,
    'mongodb://127.0.0.1:27017/freightsense',
  ];

  return [...new Set(candidates.filter(Boolean))];
};

const connectMongoDB = async () => {
  const uris = getMongoURIs();

  if (uris.length === 0) {
    console.warn('⚠️  No MONGODB_URI found. Starting backend in demo mode.');
    startServer();
    return;
  }

  let lastError = null;

  for (const uri of uris) {
    try {
      await mongoose.connect(uri);
      console.log(`✅  MongoDB connected → freightsense (${uri})`);
      startServer();
      return;
    } catch (err) {
      lastError = err;
      console.warn(`⚠️  MongoDB connection failed for ${uri}: ${err.message}`);
    }
  }

  console.error('❌  MongoDB connection error:', lastError?.message || 'Unable to connect to MongoDB');
  console.warn('⚠️  Starting backend in demo mode without database.');
  startServer();
};

connectMongoDB();
