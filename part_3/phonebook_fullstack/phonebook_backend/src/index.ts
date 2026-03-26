// used this type of import to be able to use types with TS
import express, { Response, Request, NextFunction } from 'express'
import morgan from 'morgan'
//importing Person starts db connection
import Person from './models/person'
import Mongoose from 'mongoose'

// express app
const app = express()

// middleware
app.use(express.static('dist'))
app.use(express.json())
// morgan logger
morgan.token('person', (req: Request) => {
    if (!req.body || typeof req.body !== 'object') {
        return '';
    }
    return JSON.stringify({ name: req.body.name, number: req.body.number })
})
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'POST') {
        morgan(':method :url :status :res[content-length] - :response-time ms :person')(req, res, next)
    } else {
        morgan('tiny')(req, res, next)
    }
})

// enpoint handlers
// get all
app.get('/api/persons', (_req: Request, res: Response) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

//get info
app.get('/info', (req: Request, res: Response) => {
    const currTime = new Date()
    res.type('text/html')
    Person.find({}).then((persons) => {
        const info = `<p>Phonebook has info for ${persons.length} people</p>
<p>${currTime.toString()}</p>`
        res.send(info)
    })
})

// get one
app.get('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                return res.json(person)
            } else {
                res.sendStatus(404).end()
            }
        })
        .catch(error => next(error))
})

// delete one
app.delete('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(deleted => {
            console.log(deleted)
            res.sendStatus(204).end()
        })
        .catch(error => next(error))
})

// add one
app.post('/api/persons/', (req: Request, res: Response, next: NextFunction) => {
    const personData = req.body

    const newPerson = new Person({
        name: personData.name,
        number: personData.number,
    })

    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.id
    const personData = req.body

    Person.findById(personId)
        .then(personToUpdate => {
            if (personToUpdate) {
                personToUpdate.number = personData.number
                return personToUpdate.save()
                    .then((updatedData) => {
                        res.json(updatedData)
                    })
            } else {
                res.status(400).json({
                    error: 'person does not exist in db'
                })
            }
        })
        .catch(error => next(error))

})


// middleware for unknown endpoints
const unknownEndpoint = (req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error: Mongoose.Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        const mongooseError = error as Mongoose.Error.ValidationError
        return res.status(400).json({ errors: mongooseError.errors })
    }
    next(error)
}
app.use(errorHandler)

// start server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
