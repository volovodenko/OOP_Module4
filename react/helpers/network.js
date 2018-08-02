import axios from 'axios';

const API_ROOT = '/api';

export const httpRequest = (url, method = 'GET', data) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('JWT')}`
    };

    return axios({
        method,
        url: `${API_ROOT}/${url}`,
        data,
        headers
    });
};


export const checkResponse = response => {
    if (response.status === 200) {
        return true;
    }

    throw new Error(response.statusText);
};