
const ContactForm = ({ name, number, nameChanger, numberChanger, addPerson }:
    {
        name: string,
        number: string,
        nameChanger: (event: any) => void,
        numberChanger: (event: any) => void,
        addPerson: (event: any) => void
    }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={name} onChange={nameChanger} />
            </div>
            <div>
                number: <input value={number} onChange={numberChanger} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default ContactForm
