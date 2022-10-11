require('dotenv').config();
const { Router } = require('express');
const router = Router();
const axios =require ('axios');
const {YOUR_API_KEY}=process.env;
const { Videogame , Genres } = require('../db.js');

router.get('/:id',async(req,res,next)=>{
    const{id}=req.params;
    try {
     if(id.includes('-')){

      let nombres = await Videogame.findOne({
           
        where:{
            id:id
        },

        include: Genres,

      })
   
         res.json(nombres)
     }  else{

       let videogameId= (await axios(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`));
        
  
          let obj={
              img:videogameId.data.background_image,
              name:videogameId.data.name,
              genres: videogameId.data.genres.map(e=>({name:e.name})),                  
              description:videogameId.data.description,
              Release_date: videogameId.data.released,
              rating:videogameId.data.rating,
              platform:videogameId.data.platforms.map(e=>e.platform.name)
          }
          return res.json(obj)
     }

     
    
      } catch (error) {
        next(error)
      }
    });




    router.post('/', async(req,res,next)=>{
      const {name, description,released,rating,platform,genres,img,}=req.body;
   
    try {
      
      let newVideogame= await Videogame.create({
        name: name.toUpperCase(),
        description,
        released,
        rating,
        platform :platform + ' ',
        img,
        genres
      });
       let selecGenre= await Genres.findAll({
        where:{
          name:genres
        }
      });
      
     
      newVideogame.addGenres(selecGenre);
      res.send('Juego creado con exito')
     
    } catch (error) {
        next(error)
      
    }
  
  
  })








module.exports=router;