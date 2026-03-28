import mongoose from 'mongoose'


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
        returnedObject.id = (returnedObject._id as mongoose.Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Person = mongoose.model('Person', personSchema)



