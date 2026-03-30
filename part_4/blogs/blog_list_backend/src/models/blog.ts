import mongoose from 'mongoose'

export interface Blog {
    title: string
    author: string
    url: string
    likes: number
}

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document: mongoose.Document, returnedObject: Record<string, unknown>) => {
        returnedObject.id = (returnedObject._id as mongoose.Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const BlogModel = mongoose.model('Blog', blogSchema)
