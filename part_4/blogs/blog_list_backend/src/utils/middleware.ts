import morgan from 'morgan'
import { NextFunction, Request, Response } from 'express'
import { JWT_SECRET } from './config'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/user'
import mongoose from 'mongoose'

//extend Request type globally to be able to add token field
declare global {
    namespace Express {
        interface Request {
            token?: string
            user?: InstanceType<typeof UserModel>
        }
    }
}

// logger middleware with morgan
morgan.token('body', (req: Request) => {
    if (!req.body || typeof req.body !== 'object') {
        return ''
    }
    return JSON.stringify(req.body)
})

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'test') { return next() }
    if (req.method === 'POST') {
        morgan(':method :url :status :res[content-length] - :response-time ms :body')(req, res, next)
    } else {
        morgan('tiny')(req, res, next)
    }
}

// token extraction middleware
const getTokenFrom = (request: Request): string | null => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

export const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFrom(req)
    req.token = token ?? undefined

    next()
}

// user extraction middleware
export const userExtractor = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.token) {
        return res.status(401).json({ error: 'no token found' })
    }
    const decodedToken = jwt.verify(req.token, JWT_SECRET) as jwt.JwtPayload

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    const user = await UserModel.findById(decodedToken.id)

    if (!user) {
        return res.status(400).json({ error: 'userId missing or not valid' })
    }

    req.user = user

    next()
}


// error handler middleware
export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(error.name, error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' &&
        error.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' })
    }
    next(error)
}

// unknown endpoint middleware (last)
export const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
