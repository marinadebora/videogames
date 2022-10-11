require('dotenv').config();
const { Router } = require('express');
const router = Router();
const axios =require ('axios')
const {YOUR_API_KEY}=process.env;
const { Platform } = require('../db');





router.get('/', async (req, res) => {  
    var apiresult = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${YOUR_API_KEY}`)
    var apivgplat = apiresult.data.results.map(p => p.name)
    
    res.send(apivgplat)
})

 




   


module.exports = router;