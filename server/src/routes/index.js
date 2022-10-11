const { Router } = require('express');
const  videogameRoutes = require('./videogameRoutes.js')
const genresRoutes= require('./genresRoutes.js');
const videogameId=require('./videogameRoutesId');
const Platform =require('./PlatformRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/videogame',videogameId);
router.use('/platforms', Platform);
router.use('/videogames',videogameRoutes);
router.use('/genres', genresRoutes);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
