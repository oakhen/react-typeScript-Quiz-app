import { shuffleArray } from "../utils/util"

const apiURl = "https://opentdb.com/api.php?amount=10&type=multiple"

export const enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface RootObject {
  response_code: number
  results: Result[]
}

export interface Result {
  category: string
  correct_answer: string
  difficulty: Difficulty
  incorrect_answers: string[]
  question: string
  type: Type
}

export interface Questions extends Result {
  answers: string[]
}

export interface AnswerObject {
  question: string
  userAnswer: string
  is_correct: boolean
  correct_answer: string
}

export enum Type {
  Multiple = "multiple",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json()

  return data.results.map((question: Result) => {
    return {
      ...question,
      // answers: shuffleArray([
      //   ...question.incorrect_answers,
      //   question.correct_answer,
      // ]),
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }
  })
}

// ye hum kar toh diye hai jaise taise but achhes se practice chahiye mereko ache se
