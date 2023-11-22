const { Dog, Temperament, DogTemperament } = require('../../db'); 
const getAllDogsDb = async () => {
    try {
        const dogsFromDb = await Dog.findAll({
            include:[{
                model: Temperament,
                attributes: ["name"]
            }]
        });
        console.log(dogsFromDb);
        if (dogsFromDb) {
            const dogsDb = dogsFromDb.map(dog => {
                return {
                    id: dog.dataValues.id,
                    nombre: dog.dataValues.nombre,
                    altura: dog.dataValues.altura,
                    peso: dog.dataValues.peso,
                    longevidad: dog.dataValues.longevidad,
                    temperamento: dog.dataValues.temperaments.map((temperamento)=>
                    temperamento.name)
                }
            })  
            return dogsDb;
        }else{
            return "No se pudo ;("
        }
    } catch (error) {
        return error;
    }
};

module.exports = { getAllDogsDb };