import express from 'express'
import mongoose from 'mongoose'
import { logInfo, logError } from './utils/logger'
import { MONGODB_URI } from './utils/config'
import { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor } from './utils/middleware'
import { blogsRouter } from './controllers/blogs'
import { healthRouter } from './controllers/health'
import { usersRouter } from './controllers/users'
import { loginRouter } from './controllers/login'

mongoose.set('strictQuery', false)

export const app = express()

logInfo('connecting to MongoDB')

mongoose
    .connect(MONGODB_URI, { family: 4 })
    .then(() => {
        logInfo('connected to MongoDB')
    })
    .catch((error) => {
        logError('error connection to MongoDB:', error.message)
    })

// app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/health', healthRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(unknownEndpoint)
app.use(errorHandler)
