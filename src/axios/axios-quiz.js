import axios from 'axios'


export default axios.create({
    baseURL: 'https://react-quiz-db1e4.firebaseio.com/'
})