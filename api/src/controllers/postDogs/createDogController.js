const { Dog, Temperament, DogTemperament } = require('../../db')

const createNewDog = async (dogData) => {
    try {
        const { imagen, nombre, altura, peso, longevidad, temperaments } = await dogData
        if (!nombre || !altura || !peso || !longevidad || !temperaments) {
            throw Error('Faltan datos.')
        }
        const newDog = await Dog.create({
            imagen,
            nombre,
            altura,
            peso,
            longevidad,
            isDB: true
        });
        if (newDog) {
            const createTemperament = await temperaments.map(async (temperament) => {
                await Temperament.findOrCreate({ where: { name: temperament } })
            })
            await Promise.all(createTemperament)
            const temperamentId = await Promise.all( temperaments.map(async (temperamento) => {
                const tempId = await Temperament.findOne({ where: { name: temperamento } })
                return tempId.id
            }))
            await Promise.all(temperamentId)
            const dogAndTemperament = await temperamentId.map(async (id) => {
                await DogTemperament.create({ dogId: newDog.id, temperamentId: id })
            })
            await Promise.all(dogAndTemperament)
            return newDog;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { createNewDog };