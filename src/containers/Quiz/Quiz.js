import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from './../../components/FinishedQuiz/FinishedQuiz'
import axios from './../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        result: {},
        ifFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true,
    }
    // Нажатие на один из вопросов
    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]

            if (this.state.answerState[key] === 'success') {
                return 
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const result = this.state.result

        // Если нажали на правильный ответ
        if (question.rightAnswerId === answerId) {
            if (!result[question.id]) {
                result[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                result
            })
            // Задержка после ответа и проверка на последний ли вопрос
            const timeout = window.setTimeout( ()=> {
                if (this.isQuizFiniched()) {
                    this.setState({
                        ifFinished: true,
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        }
        // Если нажали на не правильный ответ 
        else {
            result[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                result
            })
        }
    }
    // Проверка возвращает true/false ( Последний ли вопрос )
    isQuizFiniched() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    // 
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            ifFinished: false,
            result: {},
        })
    }
    async componentDidMount(  ) {
        try {
            const res = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = res.data

            this.setState({
                quiz,
                loading: false,
            })
        } catch (e) {
            console.log('asdasd', e)
        }
    }

    render() {
        return(
            <div className={classes.Quiz}>
            
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.loading
                            ? <Loader />
                            : this.state.ifFinished
                                ? <FinishedQuiz
                                    onRetry={this.retryHandler}
                                    result={this.state.result}
                                    quiz={this.state.quiz}
                                    />
                                : <ActiveQuiz
                                    onAnswerClick={this.onAnswerClickHandler}
                                    answers={this.state.quiz[this.state.activeQuestion].answers}
                                    question={this.state.quiz[this.state.activeQuestion ].question}
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion + 1}
                                    state={this.state.answerState}
                                    />
                    }
                    
                </div>
            </div>
        )
    }
}

export default Quiz