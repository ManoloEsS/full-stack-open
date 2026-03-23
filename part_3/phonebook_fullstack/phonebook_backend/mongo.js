const mongoose = require('mongoose')


if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('usage\nadd person: node mongo.js <password> <name> <number>\nlist all: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://manoloess:${password}@cluster0.gsgcifo.mongodb.net/phonebookApp?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons => {
            persons.forEach(p => {
                console.log(p)
            })
            mongoose.connection.close()
        })
} else if (process.argv.length === 5) {
    const personName = process.argv[3]

    const personNumber = process.argv[4]


    const person = new Person({
        name: personName,
        number: personNumber,
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}


