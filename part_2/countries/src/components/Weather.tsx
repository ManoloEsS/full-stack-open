import weatherService from "../services/weather"
import { useState, useEffect } from "react"

export interface WeatherObj {
    weather: {
        main: string
        description: string
        icon: string
    }[]
    main: {
        temp: number
    }
    wind: {
        speed: number
    }

}

const Weather = ({ capital }: { capital: string }) => {
    const [weather, setWeather] = useState<WeatherObj | null>(null)
    const [iconLink, setIcon] = useState<string>("")
    const imgUrl = (code: string) => `https://openweathermap.org/payload/api/media/file/${code}.png`

    useEffect(() => {
        weatherService
            .getWeather(capital)
            .then((w) => {
                setWeather(w)
                setIcon(imgUrl(w.weather[0].icon))
            })
    }, [capital])


    if (weather) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <div>Temperature {weather.main.temp} Celsius</div>
                <img src={iconLink} alt="icon" />
                <div>Wind {weather.wind.speed} m/s</div>

            </div>)
    }

}

export default Weather
