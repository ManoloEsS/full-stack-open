// used this type of import to be able to use types with TS
import express, { Response, Request } from 'express'
import morgan from 'morgan'
import Person from './models/person'

// express app
const app = express()

// serve static react frontend
app.use(express.static('dist'))

// middleware
app.use(express.json())

morgan.token('person', (req: Request) => {
    if (!req.body || typeof req.body !== 'object') {
        return '';
    }
    return JSON.stringify({ name: req.body.name, number: req.body.number })
})

// morgan logger
app.use((req, res, next) => {
    if (req.method === 'POST') {
        morgan(':method :url :status :res[content-length] - :response-time ms :person')(req, res, next)
    } else {
        morgan('tiny')(req, res, next)
    }
})


app.get('/api/persons', (_req: Request, res: Response) => {
    Person.find({}).then((persons: any) => {
        res.json(persons)
    })
})

app.get('/info', (req: Request, res: Response) => {
    const currTime = new Date()
    res.type('text/html')
    Person.find({}).then((persons: any) => {
        const info = `<p>Phonebook has info for ${persons.length} people</p>
<p>${currTime.toString()}</p>`
        res.send(info)
    })
})

app.get('/api/persons/:id', (req: Request, res: Response) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (person) {
            return res.json(person)
        }
        res.sendStatus(404).end()
    })
})

app.delete('/api/persons/:id', (req: Request, res: Response) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(deleted => {
        console.log(deleted)
        res.sendStatus(204).end()

    })
})

app.post('/api/persons/', (req: Request, res: Response) => {
    const personData = req.body
    if (!personData) {
        return res.status(400).json({ error: 'content missing' })
    }

    if (!personData.name) {
        return res.status(400).json({
            error: 'name required'
        })
    }

    if (!personData.number) {
        return res.status(400).json({
            error: 'number required'
        })
    }


    const newPerson = new Person({
        name: personData.name,
        number: personData.number,
    })

    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => {
            res.status(400).json({ error: 'name must be unique' })

        })

})


const unknownEndpoint = (request: Request, response: Response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
