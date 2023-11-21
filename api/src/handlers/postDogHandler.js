const { createNewDog } = require('../controllers/postDogs/postDogs');

const createNewDogHandler = async (req, res) => {
    const dogData = req.body;
    try {
        await createNewDog(dogData);
        return res.status(201).json( createNewDog );
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { createNewDogHandler };