import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT

export const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST as string
    : process.env.MONGODB_URI as string

export const JWT_SECRET = process.env.SECRET as string
