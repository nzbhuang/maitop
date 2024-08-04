import axios from 'axios';
import config from '../config';

const { apiBase } = config; // ends in '/api/'

export async function createScore(chartId: number, accuracy: number, scoreRating: number) {
    try {
        const res = await axios.post(`${apiBase}Scores`, { chartId, accuracy, scoreRating });
        console.log(res);
        return res;
    } catch (err) {
        throw err
    }
}