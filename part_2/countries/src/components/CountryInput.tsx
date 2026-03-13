
const Input = ({ value, handler }: { value: string, handler: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div>
            find countries <input value={value} onChange={handler} />

        </div>
    )
}

export default Input
