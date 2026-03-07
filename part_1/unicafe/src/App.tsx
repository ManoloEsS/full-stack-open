import { useState } from 'react'
import "./styles.css"

type Feedback = {
    good: number;
    neutral: number;
    bad: number;
}

const App = () => {
    // save clicks of each button to its own state
    const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })

    const handleFeedback = (type: keyof Feedback): void => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [type]: prevFeedback[type] + 1
        }))
    }


    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={() => handleFeedback("good")} text="good" />
                <Button onClick={() => handleFeedback("neutral")} text="neutral" />
                <Button onClick={() => handleFeedback("bad")} text="bad" />
            </div>

            <div>
                <h1>statistics</h1>
            </div>
            <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} />
        </div>
    )
}

const Button = ({ onClick, text }: { onClick: () => void, text: string }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }: { text: string, value: { good: number, neutral: number, bad: number } }) => {
    switch (text) {
        case "good":
            return (<tr><td>{text}</td> <td>{value.good}</td></tr>)
        case "neutral":
            return (<tr><td>{text}</td> <td>{value.neutral}</td></tr>)
        case "bad":
            return (<tr><td>{text}</td> <td>{value.bad}</td></tr>)
        case "all":
            return (<tr><td>{text}</td> <td>{Object.values(value).reduce((a, b) => a + b, 0)}</td></tr>)
        case "average":
            return (<tr><td>{text}</td> <td>{(value.good * 1 + value.bad * -1) / (value.good + value.neutral + value.bad)}</td></tr>)
        case "positive":
            return (<tr><td>{text}</td> <td>{((value.good / (Object.values(value).reduce((a, b) => a + b, 0))) * 100)} %</td></tr>)
    }

}
const Statistics = ({ good, neutral, bad }: { good: number, neutral: number, bad: number }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <div>
            <table>
                <StatisticLine text="good" value={{ good, neutral, bad }} />
                <StatisticLine text="neutral" value={{ good, neutral, bad }} />
                <StatisticLine text="bad" value={{ good, neutral, bad }} />
                <StatisticLine text="all" value={{ good, neutral, bad }} />
                <StatisticLine text="average" value={{ good, neutral, bad }} />
                <StatisticLine text="positive" value={{ good, neutral, bad }} />
            </table>

        </div>
    )

}


// const positiveAvg = ({ good, neutral, bad }: { good: number, neutral: number, bad: number }): number => (good / allFeedback([good, neutral, bad])) * 100



export default App
