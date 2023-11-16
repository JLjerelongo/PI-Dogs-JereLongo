const { Router } = require('express');
const { getAllDogsHandler } = require('../handlers/getAllDogsHandler');
const { getDogByIdHandler } = require('../handlers/getDogByIdHandler');
const { getDogsByNameHandler } = require('../handlers/getDogsByNameHandler');
const { createNewDogHandler } = require('../handlers/postDogHandler');
const { getTemperamentsHandler } = require('../handlers/getTemperamentsHandler');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getAllDogsHandler ); // ! FUNCIONA
router.get('/dogs/name/', getDogsByNameHandler ); // ! FUNCIONA
router.get('/dogs/:idRaza', getDogByIdHandler ); // ! FUNCIONA

router.post('/dogs', createNewDogHandler ); // ! FUNCIONA

router.get('/temperaments', getTemperamentsHandler); // ! FUNCIONA


module.exports = router;
