const App = () => {
    const course = 'Half Stack application development'
    const content1 = { part: "Fundamentals of React", exercises: 10 }
    const content2 = { part: "Using props to pass data", exercises: 7 }
    const content3 = { part: "State of a component", exercises: 14 }

    return (
        <div>
            <Header course={course} />
            <Content content={content1} />
            <Content content={content2} />
            <Content content={content3} />
        </div>
    )
}

const Header = ({ course }: { course: string }) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ content }: { content: { part: string; exercises: number } }) => {
    return (
        <p>
            {content.part} {content.exercises}
        </p>
    )
}


export default App
