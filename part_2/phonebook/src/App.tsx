import { useState } from 'react'
import Persons, { type Person } from "./components/Persons"
import Filter from "./components/Filter"
import ContactForm from './components/Form'


const App = () => {
    const [persons, setPersons] = useState<Person[]>([
        {
            name: 'Arto Hellas',
            number: '464-456-4566',
            id: 2
        }
    ])
    // TODO: all state in app
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")

    // TODO: all handlers in app
    const addPerson = (event: any) => {
        event.preventDefault()
        if (newName === "") {
            alert("name can't be empty")
            return
        }
        if (newNumber === "") {
            alert("number can't be empty")
            return
        }
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already in the phonebook`)
            return
        }
        const personObj = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        setPersons(persons.concat(personObj))
        setNewName("")
        setNewNumber("")
    }

    const handleNameChange = (event: any) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event: any) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event: any) => {
        setFilter(event.target.value)
    }

    // TODO: refactor, extract components, pass handlers to components,
    // handle state change in components with ()=>void type 
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handler={handleFilter} />
            <h3>Add a new</h3>
            <ContactForm name={newName} number={newNumber} nameChanger={handleNameChange} numberChanger={handleNumberChange} addPerson={addPerson} />
            {/* <form onSubmit={addPerson}> */}
            {/*     <div> */}
            {/*         name: <input value={newName} onChange={handleNameChange} /> */}
            {/*     </div> */}
            {/*     <div> */}
            {/*         number: <input value={newNumber} onChange={handleNumberChange} /> */}
            {/*     </div> */}
            {/*     <div> */}
            {/*         <button type="submit">add</button> */}
            {/*     </div> */}
            {/* </form> */}
            <h3>Numbers</h3>
            <Persons personArr={persons} filter={filter} />
        </div >

    )
}

export default App
