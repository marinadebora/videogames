require('dotenv').config();
const { Router } = require('express');
const router = Router();
const axios =require ('axios')
const {YOUR_API_KEY}=process.env;
const { Genres } = require('../db');





router.get('/',async(req,res,next)=>{
  try {

const genresDb= (await axios(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`))

const genresMap=genresDb.data.results
genresMap.forEach(e=>{Genres.findOrCreate({
  where:{
    name:e.name,
    id:e.id}
  
})})

    const allGenres= await Genres.findAll()  
    res.send(allGenres)
  } catch (error) {
    next(error)
  }
});





   


module.exports = router;