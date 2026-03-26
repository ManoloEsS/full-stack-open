import { useState, useEffect } from "react"
import Persons, { type Person } from "./components/Persons"
import Filter from "./components/Filter"
import ContactForm from "./components/Form"
import personService from "./services/persons"
import Notification, { type NotificationObj } from "./components/Notification"
import "./index.css"


const App = () => {
    const [persons, setPersons] = useState<Person[]>([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")
    const [notification, setNotification] = useState<NotificationObj | null>(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event: any) => {
        event.preventDefault()
        if (newName === "") {
            setNotification({
                message: `Name field cannot be empty`,
                isError: true,
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            return
        }

        if (newNumber === "") {
            setNotification({
                message: `Number field cannot be empty`,
                isError: true,
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)

            return
        }

        // CHANGED: Use .find() instead of .filter()[0] - more efficient
        const personUpdate = persons.find((person) => person.name === newName)
        if (personUpdate) {
            const confirmed = confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )

            // update person
            if (confirmed) {
                const personUpdated = {
                    name: personUpdate.name,
                    number: newNumber,
                    id: personUpdate.id
                }
                personService
                    .updatePerson(personUpdated)
                    .then((updated) => {
                        setPersons(persons.map((person) => person.id !== updated.id ? person : updated))
                        setNotification({ message: `${updated.name}'s number has been updated to ${updated.number}`, isError: false })
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                        // CHANGED: Clear form only AFTER successful update
                        setNewName("")
                        setNewNumber("")
                    })
                    .catch((error) => {
                        // CHANGED: Added optional chaining to handle missing response (network errors, etc.)
                        const errors = error.response?.data?.errors
                        if (errors?.name) {
                            setNotification({ message: `Name field has to be at least 3 characters long`, isError: true })
                            setTimeout(() => {
                                setNotification(null)
                            }, 5000)
                        }
                        if (errors?.number) {
                            setNotification({ message: `Number format is invalid`, isError: true })
                            setTimeout(() => {
                                setNotification(null)
                            }, 5000)
                        }
                    })
            } else {
                setNewName("")
                setNewNumber("")
            }
            // create new person
        } else {
            const personObj = {
                name: newName,
                number: newNumber,
            }
            personService
                .createPerson(personObj)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNotification({ message: `Added ${person.name}`, isError: false })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                    // CHANGED: Clear form only AFTER successful creation
                    setNewName("")
                    setNewNumber("")
                })
                .catch((error) => {
                    // CHANGED: Added optional chaining to handle missing response
                    const errors = error.response?.data?.errors
                    console.log(errors)
                    if (errors?.name) {
                        setNotification({ message: `Name field has to be at least 3 characters long`, isError: true })
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    }
                    if (errors?.number) {
                        setNotification({ message: `Number format is invalid`, isError: true })
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    }

                })
        }
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

    const handleDelete = (person: Person) => {
        const confirmed = confirm(`Delete ${person.name}?`)
        if (confirmed) {
            personService
                .deletePerson(person)
                .then(_deleted => {
                    setPersons(persons.filter((p => p.id !== person.id)))
                    setNotification({ message: `Deleted ${person.name}`, isError: false })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch((error) => alert(`${error}`))
        } else {
            return
        }

    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />

            <Filter filter={filter} handler={handleFilter} />

            <h3>Add a new</h3>

            <ContactForm name={newName} number={newNumber} nameChanger={handleNameChange} numberChanger={handleNumberChange} addPerson={addPerson} />

            <h3>Numbers</h3>

            <Persons personArr={persons} filter={filter} personDeleter={handleDelete} />
        </div >

    )
}

export default App
