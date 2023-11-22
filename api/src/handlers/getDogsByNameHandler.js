const { searchDogsByName } = require("../controllers/getDogsByName/searchDogsByNameController");

searchDogsByName

const getDogsByNameHandler = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    try {
        const dogsByName = await getDogsByName(name);
        return res.status(200).json(dogsByName);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { getDogsByNameHandler };