import axios from 'axios';
import config from '../config';

const { apiBase } = config; // ends in '/api/'

export async function getAllCharts() {
    try {
        const response = await axios.get(`${apiBase}Charts`);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}