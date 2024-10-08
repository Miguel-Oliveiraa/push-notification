import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://goldfish-app-2-riitt.ondigitalocean.app/',
});