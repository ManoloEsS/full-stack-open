import mongoose from 'mongoose'

export interface Blog {
    id?: string
    title: string
    author: string
    url: string
    likes: number
}

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    }
})

blogSchema.set('toJSON', {
    transform: (document: mongoose.Document, returnedObject: Record<string, unknown>) => {
        returnedObject.id = (returnedObject._id as mongoose.Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const BlogModel = mongoose.model('Blog', blogSchema)
