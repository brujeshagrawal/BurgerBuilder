import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-96fc2-default-rtdb.firebaseio.com/',
});

export default instance;