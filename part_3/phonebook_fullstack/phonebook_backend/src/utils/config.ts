import dotenv from 'dotenv'
dotenv.config()

// Fixed: Added fallback to 3001 and explicit type for MONGODB_URI
export const PORT = process.env.PORT || 3001
export const MONGODB_URI = process.env.MONGODB_URI as string



