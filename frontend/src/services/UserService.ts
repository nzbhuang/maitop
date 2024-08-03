import axios from 'axios';
import config from '../config';

const { apiBase } = config; // ends in '/api/'

export async function createUser(username: string) {
    try {
        const res = await axios.post(`${apiBase}Users`, {username});
        console.log(res);
        return res;
    } catch (err) {
        throw err;
    }
}

export async function getUserFromUsername(username: string) {
    try {
        const res = await axios.get(`${apiBase}Users/by-username/${username}`)
        console.log(res);
        return res;
    } catch (err) {
        throw err;
    }
}