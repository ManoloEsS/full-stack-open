const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div >
    )
}

const Header = ({ course }: { course: { name: string; parts: { name: string; exercises: number }[] } }) => {
    return (
        <h1>{course.name}</h1>
    )
}

// const Part = ({ part }: { part: { name: string; exercises: number } }) => {
//     return (
//         <p>
//             {part.name} {part.exercises}
//         </p>
//     )
// }

const Content = ({ course }: { course: { name: string; parts: { name: string; exercises: number }[] } }) => {
    return (
        course.parts.map(p => <p>{p.name} {p.exercises}</p>)
    )
}

const Total = ({ course }: { course: { name: string; parts: { name: string; exercises: number }[] } }) => {
    return (
        <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    )
}


export default App
