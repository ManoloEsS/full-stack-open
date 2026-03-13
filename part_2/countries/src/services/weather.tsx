const api_key = import.meta.env.VITE_SOME_KEY
import axios from "axios"

const getWeather = (city: string) => {
    const request = axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: api_key,
            units: 'metric',
        },
    })
    return request.then((weatherObj) => { return weatherObj.data })
}

export default {
    getWeather,
}
