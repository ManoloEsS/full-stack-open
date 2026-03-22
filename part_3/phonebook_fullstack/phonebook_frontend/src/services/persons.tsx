import axios from "axios";
import { type Person } from "../components/Persons";
const baseURL = "/api/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createPerson = (person: Person) => {
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

const deletePerson = (person: Person) => {
    const request = axios.delete(`${baseURL}/${person.id}`)
    return request.then(response => response.data)
}

const updatePerson = (person: Person) => {
    const request = axios.put(`${baseURL}/${person.id}`, person)
    return request.then(response => response.data)
}


export default {
    getAll,
    updatePerson,
    createPerson,
    deletePerson
}
