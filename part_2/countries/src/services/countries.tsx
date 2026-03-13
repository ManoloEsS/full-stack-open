import axios from "axios";

const getAll = () => {
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    return request.then(request => request.data)
}

const getOne = (country: string) => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    return request.then(request => request.data)
}

export default {
    getAll,
    getOne
}

