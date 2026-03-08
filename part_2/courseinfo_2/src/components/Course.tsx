
type CourseObj = {
    name: string
    parts: Part[]
    id: number
}

type Part = {
    name: string
    exercises: number
    id: number
}

const Course = ({ course }: { course: CourseObj }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )

}

const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>
}

const Part = ({ part }: { part: Part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }: { parts: Part[] }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    )
}

const Total = ({ parts }: { parts: Part[] }) => {
    const total = parts.reduce((ttl, part) => ttl + part.exercises, 0)

    return <p className='total'>Total of {total} exercises</p>
}
export default Course

