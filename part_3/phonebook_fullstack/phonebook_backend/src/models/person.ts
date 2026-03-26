import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI as string

console.log('connecting to MongoDB')
mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error: Error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function(n: string) {
                return /\d{2,3}-\d+/.test(n)
            },
        },
    },
})

personSchema.set('toJSON', {
    transform: (document: mongoose.Document, returnedObject: Record<string, unknown>) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.model('Person', personSchema)



