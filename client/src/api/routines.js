import axios from 'axios';

export const createRoutine = routine => {
    return axios.post('/new-routine', routine)
        .then(res => console.log(res.data))
        .catch(err => console.error(`${err.message}`))
}