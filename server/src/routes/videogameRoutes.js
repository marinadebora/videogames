require('dotenv').config();
const { Router } = require('express');
const router = Router();
const getAllApi=require('../funciones/funApi');
const getAllDataBase=require('../funciones/funDb')




router.get('/', async(req,res,next)=>{
  const {name}=req.query;

    let apiInfo= await getAllApi(name);
    let  dbInfo= await getAllDataBase(name);
    try {
      
      if(name){
   
      let totalVideogames=[...dbInfo,...apiInfo]
      totalVideogames.slice(0,15)
      return res.json(totalVideogames)
      }else{
        
        await Promise.all([apiInfo,dbInfo])
        .then((response => {
            const [apiInfo,dbInfo]=response
          }));
          res.send([...dbInfo,...apiInfo])
       
  
  
        let totalVideogames=[...dbInfo,...apiInfo]
        return totalVideogames;
      }
    } catch (error) {
      next(error)
    }
     
    
  })

  module.exports=router;