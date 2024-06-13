import { useState } from "react"
import "./App.css"
import QuestionCard from "./components/QuestionCard"
import {
  AnswerObject,
  Difficulty,
  Questions,
  fetchQuizQuestions,
} from "./api/api"

// agar yaha pe hum current question bana diye hote toh kitan kuch assan ho jata

const App = () => {
  const TOTAL_QUESTIONS = 10
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Questions[]>([])
  const [number, setNumber] = useState(0)
  const [usreAnswers, setUsreAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setGameOver(false)
    setScore(0)
    setNumber(0)
    setLoading(true)
    setUsreAnswers([])
    const newSetOfQustions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    )
    setQuestions(newSetOfQustions)
    setLoading(false)
  }

  const checkAnswer = (ans: string) => {
    const useAnswerObject: AnswerObject = {
      question: questions[number].question,
      userAnswer: ans,
      is_correct: ans === questions[number].correct_answer,
      correct_answer: questions[number].correct_answer,
    }
    if (ans === questions[number].correct_answer) {
      setScore((p) => p + 1)
      console.log(useAnswerObject)
    }
    if (number >= 9) {
      setGameOver(true)
      return
    }
    setUsreAnswers((p) => [...p, useAnswerObject])
    // nextQuestion()
    // setClassname("")
  }

  // ye hum ache se kar ne paa rahe hais
  const nextQuestion = () => {
    if (number >= 9) {
      setGameOver(true)
    } else setNumber((p) => p + 1) // yaha pe hum number+1 v kar sakte hai and kya difference aega
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver && (
        <button
          className="start"
          onClick={startTrivia}
        >
          Start
        </button>
      )}

      {!gameOver && <p className="score">Score:{score}</p>}

      {loading ? (
        <p>Loading Question...</p>
      ) : gameOver ? (
        <div>
          <h1>Bro Game over</h1>
          <p>your score is {score} </p>
        </div>
      ) : (
        <QuestionCard
          questionNbr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number]?.question}
          answers={questions[number]?.answers}
          userAnswer={usreAnswers ? usreAnswers[number] : undefined}
          callback={checkAnswer}
          correctAnswer={questions[number].correct_answer}

          // agar mereko api pata hota toh hm jante ki what to expect
        />
      )}

      {!loading && (
        <p
          style={{
            color: "wheat",
          }}
        >
          Correct answer: {questions[number].correct_answer}
        </p>
      )}

      {!gameOver &&
        !loading &&
        usreAnswers.length === number + 1 &&
        number <= 9 && (
          <button
            className="next"
            onClick={nextQuestion}
          >
            Next Question
          </button>
        )}
    </div>
  )
}
export default App

// is chote se problem ko solve karna hai and then completly fir se bulid karna hai ya
// completely build karo and then solve karo
// how the fuck am i going to solve this
// hm typeScript na bhul jaye issilye ye bohot important hai.?
// ki hum filhal isko practice kare
