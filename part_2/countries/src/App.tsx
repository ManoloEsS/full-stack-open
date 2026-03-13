import { useState, useEffect } from "react"
import Input from "./components/CountryInput"
import Countries from "./components/Countries"
import countryServices from "./services/countries"

function App() {
    const [country, setCountry] = useState<string>("")
    const [countryNames, setCountryNames] = useState<string[]>([])

    useEffect(() => {
        countryServices
            .getAll()
            .then(
                (cArr) => {
                    const countriesData = cArr.map((c: any) => c.name.common)
                    setCountryNames(countriesData)
                }
            )
            .catch((_err) =>
                console.log("couldn't fetch countries on first render"))
    }, [])

    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`setting country to ${e.target.value}`)
        setCountry(e.target.value)
    }



    return (
        <div>
            <h1>Country Data</h1>
            <Input value={country} handler={handleCountryChange} />
            <Countries value={countryNames} filter={country} />
        </div>
    )
}

export default App
