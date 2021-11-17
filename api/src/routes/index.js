const {Router} = require('express');
const router = Router();

//Me traigo las rutas
const Words = require('./words')

//Configuro los routers
router.use('/words', Words);

module.exports = router;