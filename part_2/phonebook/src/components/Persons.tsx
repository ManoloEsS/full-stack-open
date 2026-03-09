export type Person = {
    name: string,
    number: string,
    id: number
}

const Persons = ({ personArr, filter }: { personArr: Person[], filter: string }) => {
    if (filter) {
        const filteredArr = personArr.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
        return (
            <div>
                {filteredArr.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
            </div>
        )
    }
    return (
        <div>
            {personArr.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
        </div>
    )
}

export default Persons
