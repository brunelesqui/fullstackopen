import { useState } from 'react'

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getAnecdoteIndex = () => getRandomIntInclusive(0, anecdotes.length - 1);

  const [selected, setSelected] = useState(getAnecdoteIndex())
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [mostVotes, setMostVotes] = useState('')

  const handleClick = () => {
    setSelected(getAnecdoteIndex())
    getAnecdoteWithMostVotes()
  }

  const handleClickVote = () => {
    const copyPoint = [... points]
    copyPoint[selected] += 1
    setPoints(copyPoint)
  }

  const getAnecdoteWithMostVotes = () => { 
    setMostVotes(anecdotes[points.indexOf(Math.max(... points))])
  }

  return (
    <>
      <h1>Anecdote of day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <button
        onClick={handleClickVote}
      >
        Vote
      </button>
      <button
        onClick={handleClick} 
      >
        Next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotes}</p>
    </>
  )
}

export default App
