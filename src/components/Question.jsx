import { useState } from "react";

export default function Question(props) {
    const [answer, setAnswer] = useState('')

    // console.log(options)
    // console.log(props.que)
    // console.log(props.selected)
    // props.selected === opt.opt? 'sel-option':'option'
    const jsxOptions = props.que.options.map(opt =>
        <div
            className={
                props.selected.incorrect_answer === '' && props.selected.answer != opt.opt ?
                    'option' : (props.selected.incorrect_answer === 'false' && opt.opt === props.selected.answer ?
                        'correct-option' : (props.selected.incorrect_answer === 'true' && opt.opt === props.selected.answer ?
                            'wrong-option' : (props.selected.incorrect_answer === 'true' && props.selected.correct_answer === opt.opt ?
                                'correct-option' : (props.selected.answer === opt.opt ? 'selected-option' : 'disabled-option')
                            )
                        )
                    )
            }
            key={opt.id}
            onClick={() => props.changeSelected(opt.opt, props.que.id)}>{opt.opt}</div>
    )

    return (
        <div className='question'>
            <h2 className="que-text">{props.que.question}</h2>
            <div className="options">{jsxOptions}</div>
            <hr />
        </div>
    )
}