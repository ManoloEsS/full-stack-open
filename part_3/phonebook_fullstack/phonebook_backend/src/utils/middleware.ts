import morgan from 'morgan'
import { NextFunction, Request, Response } from 'express'
import * as mongoose from 'mongoose'

morgan.token('person', (req: Request) => {
    if (!req.body || typeof req.body !== 'object') {
        return ''
    }
    return JSON.stringify({ name: req.body.name, number: req.body.number })
})

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'POST') {
        morgan(':method :url :status :res[content-length] - :response-time ms :person')(req, res, next)
    } else {
        morgan('tiny')(req, res, next)
    }
}

export const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error: mongoose.Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        const mongooseError = error as mongoose.Error.ValidationError
        return res.status(400).json({ errors: mongooseError.errors })
    }
    next(error)
}

