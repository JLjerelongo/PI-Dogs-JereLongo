const { Dog, Temperament } = require ('../../db')

const createNewDog = async (dogData) => {
    try {
        const { imagen, name, height, weight, life_span } = await dogData
        if (!imagen || !name || !height || !weight || !life_span){ 
            throw Error('Faltan datos.')
        }
        const newDog = await Dog.create ({
            imagen,
            name,
            height,
            weight,
            life_span,
            isDB: true
        });
        if (dogData.temperaments && dogData.temperaments.length > 0) {
            const temperaments = await Temperament.findAll({
                where: {
                    name: dogData.temperaments,
                }
            })
            await newDog.setTemperaments(temperaments);
        }

        return newDog;
    } catch (error) {
        throw error;
    }
}

module.exports = { createNewDog };