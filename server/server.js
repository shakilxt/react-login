import express from "express"
import cors from 'cors'
import postsRoutes from './routes/postsRoutes.js'
import emailAuthRoutes from './routes/emailAuthRoutes.js'

//=== SETUP ===//
const app = express()

//=== MIDDLEWARE ===//
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//=== API ROUTES ===//
app.use('/api/posts', postsRoutes)
app.use('/api/auth', emailAuthRoutes)

// CORS configuration to allow requests from the Vercel app
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

export default app;