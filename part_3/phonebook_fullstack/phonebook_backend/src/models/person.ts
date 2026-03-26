require('dotenv').config()
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI as string

console.log('connecting to MongoDB')
mongoose.connect(url, { family: 4 })
    .then((result: any) => {
        console.log('connected to MongoDB')
    })
    .catch((error: any) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
})

personSchema.set('toJSON', {
    transform: (document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.model('Person', personSchema)



