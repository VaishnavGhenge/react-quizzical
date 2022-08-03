import { useEffect, useState } from 'react'
import './App.css'
import Intro from './components/Intro'
import Quiz from './components/Quiz'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [quiz, setQuiz] = useState([])
  const [selected, setSelected] = useState(initializeSelected)

  function initializeSelected() {
      const newSeleted = []
      for (let i = 0; i < 10; i++) {
          newSeleted.push({id: i, answer: '', incorrect_answer: '', correct_answer: ''})
      }

      return newSeleted
  }

  function changePageToQuiz() {
    setCurrentPage('quizpage')
  }

  useEffect(() => {
    async function getQuiz() {
      const res = await fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple')
      let data = await res.json()

      function getOptions(que) {
        let options = []

        let randInt = 0
        if (que.incorrect_answers.length == 1)
          randInt = Math.floor(Math.random() * 2)
        else
          randInt = Math.floor(Math.random() * 4)

        let count = 0;
        for (let i = 0; i < que.incorrect_answers.length + 1; i++) {
          if (i == randInt) {
            let correct_answer = String(que.correct_answer)
            correct_answer = que.correct_answer.replaceAll('&quot;', '"')
            correct_answer = correct_answer.replaceAll('&#039;', "'")
            correct_answer = correct_answer.replaceAll('&rsquo;', "'")
            correct_answer = correct_answer.replaceAll('&Sigma;', 'Σ')
            correct_answer = correct_answer.replaceAll('&Pi;', 'π')
            correct_answer = correct_answer.replaceAll('&Omicron;', 'Ο')
            correct_answer = correct_answer.replaceAll('&Nu;', 'Ν')
            options.push({ opt: correct_answer, id: i })
          }
          else {
            let incorrect_answer = String(que.incorrect_answers[count])
            incorrect_answer = incorrect_answer.replaceAll('&#039;', "'")
            incorrect_answer = incorrect_answer.replaceAll('&rsquo;', "'")
            incorrect_answer = incorrect_answer.replaceAll('&Sigma;', 'Σ')
            incorrect_answer = incorrect_answer.replaceAll('&Pi;', 'π')
            incorrect_answer = incorrect_answer.replaceAll('&Omicron;', 'Ο')
            incorrect_answer = incorrect_answer.replaceAll('&Nu;', 'Ν')
            options.push({ opt: incorrect_answer, id: i })
            count = count + 1
          }
        }

        return options
      }

      function getQuestion(question) {
        let que_text = question.replaceAll('&quot;', '"')
        que_text = que_text.replaceAll('&#039;', "'")
        que_text = que_text.replaceAll('&rsquo;', "'")

        return que_text
      }

      let count = 0;
      data = await data.results.map(que => ({ id: count++, question: getQuestion(que.question), options: getOptions(que), correct_answer: que.correct_answer }))

      await setQuiz(data)
    }

    getQuiz()

  }, [])

  return (
    <div className="app">
      {currentPage === 'landing' ? <Intro changePageToQuiz={changePageToQuiz} /> : <Quiz quiz={quiz} selected={selected} setSelected={setSelected} setPage={setCurrentPage} />}
    </div>
  )
}

export default App
