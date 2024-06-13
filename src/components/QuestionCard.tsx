import { useState } from "react"
import { AnswerObject, Questions } from "../api/api"
interface props {
  question: string
  answers: string[]
  callback: (ans: string) => void
  userAnswer: AnswerObject | undefined // don't understand why
  questionNbr: number
  totalQuestions: number
  // className: string
  correctAnswer: string
}

const QuestionCard: React.FC<props> = ({
  question,
  answers,
  callback,
  questionNbr,
  totalQuestions,
  userAnswer,
  correctAnswer,
  // className,
}) => {
  const [selectedAnswerd, setSelectedAnswerd] = useState<number | null>(null)
  const paintAnswer = (index: number) => {
    setSelectedAnswerd(index)
  }

  return (
    <div className="question-card">
      <p className="number">
        Question: {questionNbr}/ {totalQuestions}
      </p>
      <p>{`${question}`}</p>

      {userAnswer ? <p>ready</p> : <p>answer is loading</p>}

      <div>
        {answers.map((ans, index) => (
          <div key={ans}>
            <button
              value={ans}
              className="btn"
              style={{
                background: userAnswer?.is_correct
                  ? "green"
                  : !userAnswer?.is_correct && index === selectedAnswerd
                  ? "red"
                  : "blue",

                // by adding some complex logic he has solved it
              }}
              disabled={!!userAnswer /* or convert it to terinary operator */}
              onClick={() => {
                callback(ans)
                paintAnswer(index)

                // socho ye solve kaise kar sakte hai...
                // jo v ho ab ye solve kaise ho sakta hai. local states se
              }}
            >
              <span>{ans}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default QuestionCard
// typeScript na bhul jae pehle javaScript TypeScript and Rect kar lo Nextjs kam v kiya toh ho jaega

// dimaag kharab ho raha hai isko solve kaise kare
// ye chota sa chize solve nai ho paa raha hai mere se
// socho aur kya approach ho sakta hai.
