import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-e2d80.firebaseio.com/'
})