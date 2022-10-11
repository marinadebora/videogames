
require('dotenv').config();
const { Router } = require('express');
const router = Router();
const axios =require ('axios');
const {YOUR_API_KEY}=process.env;


async function getAllApi(name)  {

let pages=[]
if(!name){
  for (let i = 1; i < 6; i++) {
    let p1 =( await axios(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`)).data.results.map(e=>(
      {
        id:e.id,
        name:e.name.toUpperCase(), 
        img:e.background_image,
        description:e.description,
        Release_date:e.Release_date,
        rating:Math.round(e.rating),
        platform:e.platforms.map(el=>el.platform.name),
        genres:e.genres.map(el=>({name:el.name}))}))
     
    pages.push(p1)
  }
      return (pages.flat())
 
}else{
  pag1=( await axios(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}&page_zise=15`)).data.results.map(e=>({img:e.background_image, name:e.name,genres:e.genres.map(el=>({name:el.name}))}))

  return pag1
}



}

module.exports=getAllApi;





