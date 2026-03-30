import express from 'express'
import mongoose from 'mongoose'
import { logInfo, logError } from './utils/logger'
import { MONGODB_URI } from './utils/config'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware'
import { blogsRouter, healthRouter } from './controllers/blogs'

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

app.use('/health', healthRouter)
app.use('/api/blogs', blogsRouter)


app.use(unknownEndpoint)
app.use(errorHandler)
