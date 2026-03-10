import { useState, useEffect } from 'react'
import Persons, { type Person } from "./components/Persons"
import Filter from "./components/Filter"
import ContactForm from './components/Form'
import axios from 'axios'


const App = () => {
    const [persons, setPersons] = useState<Person[]>([])
    // all state in app
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")

    // const hook = () => {
    //     axios
    //         .get("http://localhost:3001/persons")
    //         .then(response => {
    //             setPersons(response.data)
    //         })
    // }
    //
    // useEffect(hook, [])

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    // all handlers in app
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

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} handler={handleFilter} />

            <h3>Add a new</h3>

            <ContactForm name={newName} number={newNumber} nameChanger={handleNameChange} numberChanger={handleNumberChange} addPerson={addPerson} />

            <h3>Numbers</h3>

            <Persons personArr={persons} filter={filter} />
        </div >

    )
}

export default App
