import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map( (answer, index) => {
            return (
                <AnswerItem 
                    state={props.state ? props.state[answer.id] : null} 
                    onAnswerClick={props.onAnswerClick} answer={answer} 
                    key={index}/>
            )
        })}
    </ul>
)
    

export default AnswersList