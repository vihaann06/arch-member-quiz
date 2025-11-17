import { useMemo, useState } from 'react'
import { members } from './members'
import './App.css'

const messageByStatus = {
  correct: 'Nice! You nailed it.',
  incorrect: "Not quite—flip back and study the name.",
  empty: 'Try typing a name before flipping!'
}

function normalize(value) {
  return value.trim().toLowerCase()
}

export default function App() {
  const playableMembers = useMemo(() => members, [])
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState('')
  const [isFlipped, setIsFlipped] = useState(false)
  const [status, setStatus] = useState(null)

  if (playableMembers.length === 0) {
    return (
      <main className="app-shell empty">
        <p>No member photos were found. Drop images into the `member-photos` folder to get started.</p>
      </main>
    )
  }

  const activeMember = playableMembers[index % playableMembers.length]

  const evaluateGuess = () => {
    if (!guess.trim()) {
      setStatus('empty')
      return
    }

    const isCorrect = normalize(guess) === normalize(activeMember.displayName)
    setStatus(isCorrect ? 'correct' : 'incorrect')
  }

  const flipCard = () => {
    setIsFlipped((prev) => {
      const next = !prev
      if (!prev) {
        evaluateGuess()
      }
      return next
    })
  }

  const goToMember = (nextIndex) => {
    setIndex((nextIndex + playableMembers.length) % playableMembers.length)
    setGuess('')
    setIsFlipped(false)
    setStatus(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isFlipped) {
      flipCard()
    } else {
      evaluateGuess()
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Who is this Arch member?</p>
        </div>
      </header>

      <main className="workspace">
        <section className="card-stage">
          <button
            type="button"
            className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}
            onClick={flipCard}
            aria-pressed={isFlipped}
          >
            <div className="flashcard-face flashcard-front">
              <img src={activeMember.photo} alt={`Portrait of ${activeMember.displayName}`} />
              <span className="hint">Click to reveal</span>
            </div>
            <div className="flashcard-face flashcard-back">
              <p>{activeMember.displayName}</p>
            </div>
          </button>
        </section>

        <section className="interactions">
          <form className="guess-panel" onSubmit={handleSubmit}>
            <label htmlFor="guess">Who is this member?</label>
            <input
              id="guess"
              type="text"
              value={guess}
              placeholder="Start typing a name..."
              onChange={(event) => setGuess(event.target.value)}
              autoComplete="off"
            />
            <small>Press Enter or click the card to reveal.</small>
          </form>

          <div className="controls">
            <button type="button" onClick={() => goToMember(index - 1)}>
              Previous
            </button>
            <button type="button" onClick={() => goToMember(index + 1)}>
              Next
            </button>
            <button type="button" className="ghost" onClick={() => goToMember(Math.floor(Math.random() * playableMembers.length))}>
              Shuffle
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
