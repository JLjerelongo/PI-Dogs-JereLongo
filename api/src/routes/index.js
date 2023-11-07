const { Router } = require('express');
const { getAllDogs } = require('../controllers/getAllDogs');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getAllDogs )


module.exports = router;
