const axios = require("axios");
const BASE_URL = 'https://api.thedogapi.com/v1/breeds';
const IMAGE_URL = 'https://cdn2.thedogapi.com'

const getDogsApi = async () => {
    try{
        const { data } = await axios(`${BASE_URL}`);
        const dogs = data.map (dog => {
        const idImagen = dog.reference_image_id;
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
        return dogs;
       
        }catch(error){
            throw error 
            };
}

module.exports = { getDogsApi }