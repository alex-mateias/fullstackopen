import { useState } from 'react'

const Title = (props) => (
  <h1>{props.text}</h1>
)

const Button = (props) => (
  <button onClick = {props.handleClick}>{props.text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <th>{value}</th>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  let average_score = (good + (bad * -1)) / all
  let positive_percent = good / all * 100
 
  if (all == 0) {
    return <p>No feedback given</p>
  }
  else {
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine value = {good} text = "good"/>
            <StatisticLine value = {neutral} text = "neutral"/>
            <StatisticLine value = {bad} text = "bad"/>
            <StatisticLine value = {all} text = "all"/>
            <StatisticLine value = {average_score} text = "average"/>
            <StatisticLine value = {positive_percent} text = "positive"/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad

  return (
    <div>
      <Title text = "give feedback"/>
      <Button handleClick = {() => setGood(good + 1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad + 1)} text = "bad"/>
      <Title text = "statistics"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App