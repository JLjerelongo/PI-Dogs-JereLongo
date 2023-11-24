const { createNewDog } = require('../controllers/postDogs/createDogController');

const createNewDogHandler = async (req, res) => {
    const dogData = req.body;
    try {
        await createNewDog(dogData);
        return res.status(201).json( {status: true, createNewDog} );
    } catch (error) {
        return res.status(500).json({ error: error.message, status: false });
    }
}

module.exports = { createNewDogHandler };