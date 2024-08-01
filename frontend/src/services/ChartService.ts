import axios from 'axios';
import config from '../config';

const { apiBase } = config; // ends in '/api/'

export async function getAllCharts() {
    try {
        const res = await axios.get(`${apiBase}Charts`);
        console.log(res);
        return res;
    } catch (err) {
        throw err;
    }
}