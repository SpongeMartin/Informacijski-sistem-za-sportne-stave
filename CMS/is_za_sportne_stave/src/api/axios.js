import axios from 'axios'

export default axios.create({
    baseURL: 'http://88.200.63.148:5055',
    headers:{ Accept: 'application/json'},
})