const axios = require('axios');
const BASE_URL = 'https://api.thedogapi.com/v1/breeds/search?q=';

require('dotenv').config();
const { API_KEY } = process.env;

const getDogsByName = async (name) => {
    console.log(name);
    try {
        const { data } = await axios(`${BASE_URL}${encodeURIComponent(name)}`, { headers: { 'x-api-key' : `${API_KEY}` }});
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { getDogsByName };