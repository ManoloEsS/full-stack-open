export type Person = {
    name: string,
    number: string,
    id?: string
}

const Persons = ({ personArr, filter, personDeleter }:
    { personArr: Person[], filter: string, personDeleter: (person: Person) => void }) => {
    if (filter) {
        const filteredArr = personArr.filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()))
        return (
            <div>
                {filteredArr.map((person) =>
                    <div key={person.id}>
                        {person.name} {`${person.number} `}
                        <button onClick={() => personDeleter(person)}>delete</button>
                    </div>
                )}
            </div>
        )
    }
    return (
        <div>
            {personArr.map((person) => <div key={person.id}>
                {person.name} {`${person.number} `}
                <button onClick={() => personDeleter(person)}>delete</button>
            </div>)}

        </div>
    )
}

export default Persons
