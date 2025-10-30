import express from "express"
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import postsRoutes from './routes/postsRoutes.js'
import emailAuthRoutes from './routes/emailAuthRoutes.js'

//=== SETUP ===//
const app = express()
app.use(helmet())

// === PRE-ROUTE MIDDLEWARE === //
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

if (!corsOptions.origin) {
  console.error("FATAL ERROR: CLIENT_URL is not defined in the environment variables.");
  process.exit(1);
}

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// === RATE LIMIT === //
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

app.use('/api', limiter);

//=== API ROUTES ===//
app.use('/api/posts', postsRoutes)
app.use('/api/auth', emailAuthRoutes)


// === HEALTH CHECK ROUTE === //
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});


export default app;