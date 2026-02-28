const App = () => {
    const course = 'Half Stack application development'
    const content1 = { name: "Fundamentals of React", exercises: 10 }
    const content2 = { name: "Using props to pass data", exercises: 7 }
    const content3 = { name: "State of a component", exercises: 14 }

    return (
        <div>
            <Header course={course} />
            <Part part={content1} />
            <Part part={content2} />
            <Part part={content3} />
            <Total a={content1.exercises} b={content2.exercises} c={content3.exercises} />
        </div>
    )
}

const Header = ({ course }: { course: string }) => {
    return (
        <h1>{course}</h1>
    )
}

const Part = ({ part }: { part: { name: string; exercises: number } }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ a, b, c }: { a: number; b: number; c: number }) => {
    return (
        <p>
            Number of exercises {a + b + c}
        </p>
    )
}


export default App
