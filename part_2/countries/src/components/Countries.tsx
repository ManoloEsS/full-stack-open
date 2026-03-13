import countryServices from "../services/countries"
import { useEffect, useState } from "react"
import Weather from "./Weather"

export interface CountryObj {
    name: {
        common: string
        official: string
    }
    capital: string[]
    area: string
    languages: Record<string, string>
    flags: {
        png: string
        svg: string
    }
}


const Countries = ({ value, filter }: { value: string[], filter: string }) => {
    const [countryDetails, setCountryDetails] = useState<CountryObj | null>(null)
    const [showClicked, setShowClicked] = useState<boolean>(false)
    const filtered = value.filter((a) => a.toLowerCase().includes(filter.toLowerCase()))

    const handleButton = (country: string) => {
        setShowClicked(true)
        countryServices
            .getOne(country.toLowerCase())
            .then((c) => { setCountryDetails(c) })
    }

    useEffect(() => {
        setShowClicked(false)

        if (filter) {
            if (filtered.length === 1) {
                countryServices
                    .getOne(filtered[0].toLowerCase())
                    .then((c) => {
                        setCountryDetails(c)
                    })
            } else {
                setCountryDetails(null)
            }
        }
    }, [filter])

    if (!filter) {
        return (null)
    }

    if (filtered.length === 1 && !countryDetails) {
        return (
            <div>Loading...</div>
        )
    }

    if ((filtered.length === 1 || showClicked) && countryDetails) {
        return (
            <div>
                <h1>{countryDetails.name.common}</h1>
                <div>Capital: {countryDetails.capital}</div>
                <div>Area: {countryDetails.area}</div>
                <h2>Languages</h2>
                <ul>
                    {Object.values(countryDetails.languages).map((l) => <li key={l}>{l}</li>)}
                </ul>
                <img src={countryDetails.flags.png} alt="flag" />
                <Weather capital={countryDetails.capital[0]} />
            </div>
        )

    }

    if (filter && filtered.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }


    if (filter && filtered.length > 1) {
        return (
            <div>
                {filtered.map((c: string) => <div key={c}>{c}<button onClick={
                    () => handleButton(c)
                }>Show</button></div>)
                }
            </div >
        )

    }


}

export default Countries
