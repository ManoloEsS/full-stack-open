const Filter = ({ filter, handler }: { filter: string, handler: (event: any) => void }) => {


    return (
        <div>
            filter shown with <input value={filter} onChange={handler} />
        </div>
    )

}

export default Filter
