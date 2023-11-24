const axios = require('axios');
const BASE_URL = 'https://api.thedogapi.com/v1';
const { Dog, Temperament, DogTemperament } = require('../../db'); 

const getDogById = async (dogId) => {
    try {
        if (dogId.length > 5) {
            const dog = await Dog.findOne({
                where: {
                    id: dogId
                },
                include: [{
                    model: Temperament,
                    attributes: ["name"]
                }]
            });
            if (dog) {
                const dogDb = {
                    id: dog.dataValues.id,
                    nombre: dog.dataValues.nombre,
                    altura: dog.dataValues.altura,
                    peso: dog.dataValues.peso,
                    longevidad: dog.dataValues.longevidad,
                    temperamento: dog.dataValues.temperaments.map((temperamento) => temperamento.name)
                };
                return dogDb;
            }
        } else {
            const { data } = await axios(`${BASE_URL}/breeds/${dogId}`);
            
            if (data) {
                const dogDb = {
                    id: data.id,
                    nombre: data.name,
                    altura: data.height.metric,
                    peso: data.weight.metric,
                    longevidad: data.life_span,
                    temperamento: data.temperament.split(","),
                    imagen: data.reference_image_id
                };
                return dogDb;
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { getDogById };
