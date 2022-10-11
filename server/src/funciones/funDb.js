const { Videogame , Genres } = require('../db.js');
const {Op}=require('sequelize');

async function getAllDataBase(name) {
let noName=[];
if(!name){
    noName= await Videogame.findAll({
        include:{
            model:Genres,
            attributes:["name"],
            through:{
                attributes:[]
            } 
        }
    })

   return noName;
  }else{
    let nombres=[];
    nombres = await Videogame.findAll({
        
        include:{
            model:Genres,
            attributes:["name"],
            through:{
                attributes:[]
            } 
        },
        where:{
            name:{[Op.iLike]:`%${name}%`}
        },
       
    })
    return nombres 
  }
}
  module.exports=getAllDataBase;