import { useEffect, useState } from "react"
import Question from "./Question"
import './Quiz.css'
import blobBlue from '../assets/blob-blue.svg'
import blobYellow from '../assets/blob-yellow.svg'

export default function Quiz(props) {
    const [score, setScore] = useState(0)

    function changeSelected(ans, id) {
        props.setSelected(sel => {
            let newSeleted = []
            for (let i = 0; i < 10; i++) {
                if (id == i) {
                    newSeleted.push({ id: i, answer: ans, incorrect_answer: '', correct_answer: '' })
                }
                else {
                    newSeleted.push(sel[i])
                }
            }

            return newSeleted
        })
    }

    function getSelected(id) {
        return (props.selected[id])
    }

    function checkAnswers() {
        for (let i = 0; i < 10; i++) {
            if (props.selected[i].answer == '') {
                alert('All questions needs to be answered!')
                return
            }
        }

        props.setSelected(sel => {
            let points = 0;
            let count = 0
            const newArray = sel.map(que => {
                if (props.quiz[count++].correct_answer === que.answer) {
                    points++
                    return { ...que, incorrect_answer: 'false', correct_answer: props.quiz[count-1].correct_answer }
                } else {
                    return { ...que, incorrect_answer: 'true', correct_answer: props.quiz[count-1].correct_answer }
                }
            })

            setScore(points)

            return newArray
        })
    }

    function newGame() {
        if(confirm('New game?')) {
            props.setPage('landing')
        }
    }

    const questions = props.quiz.map(
        que =>
            <Question
                key={que.id}
                que={que}
                changeSelected={changeSelected}
                selected={getSelected(que.id)}
            />
    )

    return (
        <div className="quiz">
            <img src={blobYellow} alt="random shaped yellow figure" className="blob-yellow" />
            <img src={blobBlue} alt="random shaped blue figure" className="blob-blue" />
            <div className="questions">
                {questions}
            </div>
            {score != 0? <div className="footer"><h2 className="score-card">You scored {score}/10 correct answers</h2><button className='check__btn' onClick={newGame}>Play again</button></div>:<button className='check__btn' onClick={checkAnswers}>Check answers</button>}
        </div>
    )
}