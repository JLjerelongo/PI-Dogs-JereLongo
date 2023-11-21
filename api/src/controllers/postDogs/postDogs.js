const { Dog, Temperament } = require ('../../db')

const createNewDog = async (dogData) => {
    try {
        const { name, height, weight, life_span, temperaments } = await dogData
        if ( !name || !height || !weight || !life_span || !temperaments){ 
            throw Error('Faltan datos.')
        }
        const newDog = await Dog.create ({
            name,
            height,
            weight,
            life_span,
            temperaments,
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