import { useState } from 'react'

const Button = ({text}) => {
  return (
    <button>
      {text}
    </button>
  )
}

const Button0 = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Button1 = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text} 
      </td>
      <td>
        {props.value}{props.symbol}
      </td>
    </tr>
  )
}

const Statistics = (props) => { 
  let rows = [];
  let symbol = ''
  for (let p in props) {
    if (p === 'positive')
      symbol = '%'
    rows.push(
      <StatisticLine
        text={p}
        value={props[p]}
        symbol={symbol}
      />
      )
  }

  if (props.total > 0)
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            {rows}
          </tbody>          
        </table>
      </>
    )
  else
    return (
      <>
        <p>No feedback given</p>
      </>
    )
}
/*
<StatisticLine
            text='Good'
            value={props.good}
            symbol=''
          />
          <StatisticLine
            text='Neutral'
            value={props.neutral}
            symbol=''
          />
          <StatisticLine
            text='Bad'
            value={props.bad}
            symbol=''
          />
          <StatisticLine
            text='Total'
            value={props.total}
            symbol=''
          />
          <StatisticLine
            text='Average'
            value={props.average}
            symbol=''
          />
          <StatisticLine
            text='Positive'
            value={props.positive}
            symbol='%'
          />
*/

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [positive, setPositive] = useState(0.0)
  const [average, setAverage] = useState(0.0)

  const onClickGoodButton = () => {
    setGood(good + 1)
    all(good + 1, neutral, bad)
    calculatePositive(good + 1, total + 1)
    calculateAverage(good + 1, neutral, bad)
  }

  const onClickNeutralButton = () => {
    setNeutral(neutral + 1)
    all( good, neutral + 1, bad)
    calculatePositive(good, total + 1)
    calculateAverage(good, neutral + 1, bad)
  }

  const all = (good, neutral, bad) => { 
    setTotal(good + neutral + bad)
  };

  const calculateAverage = (good, neutral, bad) => {
    setAverage((good + neutral + bad) / 3)
  }

  const calculatePositive = (good, total) => {
    setPositive(good / total * 100)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <button onClick={onClickGoodButton}
      >
        Good
      </button>
      <Button1
        text='Neutral'
        handleClick={onClickNeutralButton}
      />
      <Button0
        handleClick={()=>{
          setBad(bad + 1)
          all(good, neutral, bad + 1)
          calculatePositive(good, total + 1)
          calculateAverage(good, neutral, bad + 1)
        }}
        text='Bad'
      />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        positive={positive}
        average={average}
      />
    </>
  )
}

export default App
