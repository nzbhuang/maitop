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

export async function getUserFromId(id: number) {
    try {
        const res = await axios.get(`${apiBase}Users/${id}`)
        console.log(res);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function addScoreToUser(userId: number, scoreId: number) {
    try {
        const res = await axios.post(`${apiBase}Users/add-score`, {userId, scoreId});
        console.log(res);
        return res;
    } catch (err) {
        throw err;
    }
}

export async function getScoresById(id: number) {
    try {
        const res = await axios.get(`${apiBase}Users/${id}/scores`)
        console.log(res);
        return res;
    } catch (err) {
        throw err;
    }
}

export async function updateRatingById(id: number) {
    try {
        await axios.put(`${apiBase}Users/update-rating/${id}`)
    } catch (err) {
        throw err;
    }
}