const axios = require('axios');
const BASE_URL = 'https://api.thedogapi.com/v1';

const getDogById = async (dogId) => {
    try {
        const { data } = await axios (`${BASE_URL}/breeds/${dogId}`);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { getDogById };