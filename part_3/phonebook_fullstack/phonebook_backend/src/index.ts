// used this type of import to be able to use express types with TS
import express, { Response, Request } from 'express'
const morgan = require('morgan')
const app = express()


app.use(express.static('dist'))
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

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/api/persons', (_req: Request, res: Response) => {
    res.json(persons)
})

app.get('/info', (req: Request, res: Response) => {
    const currTime = new Date()
    res.type('text/html')
    const info = `<p>Phonebook has info for ${persons.length} people</p>
                  <p>${currTime.toString()}</p>`
    res.send(info)
})

app.get('/api/persons/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        return res.json(person)
    }
    res.sendStatus(404).end()
})

app.delete('/api/persons/:id', (req: Request, res: Response) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.sendStatus(204).end()
})

app.post('/api/persons/', (req: Request, res: Response) => {
    const personData = req.body
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

    if (persons.map((p) => p.name).includes(personData.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: personData.name,
        number: personData.number,
        id: String(getRandomInt(0, 500))
    }

    persons = persons.concat(person)
    res.json(person)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
