const axios = require('axios');
const BASE_URL = 'https://api.thedogapi.com/v1';
const IMAGE_URL = 'https://cdn2.thedogapi.com';

const getDogsByName = async (name) => {
    try {
        const { data } = await axios(`${BASE_URL}/breeds/search?q=${name}`);
        console.log("soy la data: ", data);
        const searchDogs = data.map((dog) => {
            const idImagen = dog.reference_image_id;
            console.log("soy el Dog: ",dog);
                return {
                    id: dog.id,
                    nombre: dog.name,
                    imagen: (`${IMAGE_URL}/images/${idImagen}.jpg`),
                    altura: dog.height.metric,
                    peso: dog.weight.metric,
                    longevidad: dog.life_span,
                    temperamento: dog.temperament ? dog.temperament.split(', ') : [],
                };
            }) 
            console.log("soy el searchDogs: ", searchDogs);
        return searchDogs;
    } catch (error) {
        throw error;
    }
}

module.exports = { getDogsByName };