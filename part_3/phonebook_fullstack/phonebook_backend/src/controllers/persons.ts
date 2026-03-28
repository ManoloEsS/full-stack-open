import express, { Response, Request, NextFunction } from 'express'
import { Person } from '../models/person'

export const personsRouter = express.Router()

// get all
personsRouter.get('/api/persons', (_req: Request, res: Response) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

// get info
personsRouter.get('/info', (_req: Request, res: Response) => {
    const currTime = new Date()
    res.type('text/html')
    Person.find({}).then((persons) => {
        const info = `<p>Phonebook has info for ${persons.length} people</p>
<p>${currTime.toString()}</p>`
        res.send(info)
    })
})

// get one
personsRouter.get('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
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
personsRouter.delete('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(deleted => {
            console.log(deleted)
            res.sendStatus(204).end()
        })
        .catch(error => next(error))
})

// add one
personsRouter.post('/api/persons/', (req: Request, res: Response, next: NextFunction) => {
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

personsRouter.put('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
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
