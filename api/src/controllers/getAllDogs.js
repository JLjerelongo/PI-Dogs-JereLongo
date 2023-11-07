const axios = require("axios");
const BASE_URL = 'https://api.thedogapi.com/v1';
const IMAGE_URL = 'https://cdn2.thedogapi.com'


const getAllDogs = async (req, res) => {
    try{
        const { data } = await axios(`${BASE_URL}/breeds`);
        const dogs = data.map (dog => {
        const idImagen = dog.reference_image_id;
            return {
                id: dog.id,
                nombre: dog.name,
                imagen: (`${IMAGE_URL}/images/${idImagen}.jpg`),
                altura: dog.height,
                peso: dog.weight,
                longevidad: dog.life_span,
                temperamento: dog.temperament ? dog.temperament.split(', ') : [],
            };
        }) 
        return dogs;

    }catch(error){
        throw error 
        };
}

module.exports = { getAllDogs }