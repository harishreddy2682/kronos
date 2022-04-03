import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import colors from 'colors'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import todoRouter from './routes/todoRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
    // allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}.`.yellow.bold))