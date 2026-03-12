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
    // Notification state holds an object with { message, isError } or null when empty.
    // Initialize explicitly with null to match the NotificationProps shape.
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
            // Validate and show error notification using NotificationObj shape
            const newNotif = {
                message: `Name field cannot be empty`,
                isError: true,
            }
            setNotification(newNotif)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            return
        }

        if (newNumber === "") {
            // Validate and show error notification using NotificationObj shape
            const newNotif = {
                message: `Number field cannot be empty`,
                isError: true,
            }
            setNotification(newNotif)
            setTimeout(() => {
                setNotification(null)
            }, 5000)

            return
        }

        if (persons.find((person) => person.name === newName)) {
            const personUpdate = persons.filter((person) => person.name === newName)
            const confirmed = confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )

            if (confirmed) {
                const personUpdated = {
                    name: personUpdate[0].name,
                    number: newNumber,
                    id: personUpdate[0].id
                }
                personService
                    .updatePerson(personUpdated)
                    .then((updated) => {
                        setPersons(persons.map((person) => person.id !== updated.id ? person : updated))
                        // Use the NotificationObj shape (message + isError) instead of a raw string.
                        setNotification({ message: `${updated.name}'s number has been updated to ${updated.number}`, isError: false })
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
                    .catch((_error) => {
                        // Server-side removal is an error condition, set isError: true.
                        setNotification({ message: `inoformation of ${newName} has already been removed from the server`, isError: true })
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)

                    })
            }
        } else {
            const personObj = {
                name: newName,
                number: newNumber,
            }
            personService
                .createPerson(personObj)
                .then(person => {
                    setPersons(persons.concat(person))
                    // Normal (non-error) notification when a person is added.
                    setNotification({ message: `Added ${person.name}`, isError: false })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch((error) => {
                    alert(`${error}`)
                })
        }

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

    const handleDelete = (person: Person) => {
        const confirmed = confirm(`Delete ${person.name}?`)
        if (confirmed) {
            personService
                .deletePerson(person)
                .then(deleted => {
                    setPersons(persons.filter((person => person.id !== deleted.id)))
                    // Normal (non-error) notification when a person is deleted.
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
