// Changed: Using named imports instead of namespace imports for better readability
import express from 'express'
import mongoose from 'mongoose'
import { info, error as logError } from './utils/logger'
import { MONGODB_URI } from './utils/config'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware'
import { personsRouter } from './controllers/persons'

mongoose.set('strictQuery', false)

export const app = express()

info('connecting to MongoDB')

mongoose
    .connect(MONGODB_URI, { family: 4 })
    .then(() => {
        info('connected to MongoDB')
    })
    .catch((error) => {
        logError('error connection to MongoDB:', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/', personsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


