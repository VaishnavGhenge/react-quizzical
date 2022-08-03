import blobBlue from '../assets/blob-blue.svg'
import blobYellow from '../assets/blob-yellow.svg'
import './Intro.css'

export default function Intro(props) {
    return (
        <div className="intro">
            <img src={blobYellow} alt="random shaped yellow figure" className="blob-yellow" />
            <img src={blobBlue} alt="random shaped blue figure" className="blob-blue" />
            <div className="intro-content">
                <h1 className='intro-heading'>Quizzical</h1>
                <p className='intro-description'>Quiz web app made by Vaishnav</p>
                <button className='intro-start__btn' onClick={props.changePageToQuiz}>Start quiz</button>
            </div>
        </div>
    )
}