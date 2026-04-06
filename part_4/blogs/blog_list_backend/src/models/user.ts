import mongoose from 'mongoose'

export interface User {
    id?: string
    name?: string
    username: string
    passwordHash: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document: mongoose.Document, returnedObject: Record<string, unknown>) => {
        returnedObject.id = (returnedObject._id as mongoose.Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

export const UserModel = mongoose.model('User', userSchema)


