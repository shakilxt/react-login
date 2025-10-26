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

export default app;