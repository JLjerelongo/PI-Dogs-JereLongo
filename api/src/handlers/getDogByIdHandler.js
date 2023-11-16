const { getDogById } = require('../controllers/getDogById/getDogById');

const getDogByIdHandler = async (req, res) => {
    const { idRaza } = req.params;
    try {
        const dogDetail = await getDogById(idRaza);
        return res.status(200).json(dogDetail);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { getDogByIdHandler };